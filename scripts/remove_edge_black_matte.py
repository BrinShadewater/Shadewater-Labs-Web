#!/usr/bin/env python3
from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

from PIL import Image


def luminance(pixel: tuple[int, int, int, int]) -> float:
    r, g, b, _ = pixel
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def chroma(pixel: tuple[int, int, int, int]) -> int:
    r, g, b, _ = pixel
    return max(r, g, b) - min(r, g, b)


def is_background_candidate(
    pixel: tuple[int, int, int, int],
    *,
    threshold: int,
    max_chroma: int,
) -> bool:
    return pixel[3] > 0 and luminance(pixel) <= threshold and chroma(pixel) <= max_chroma


def remove_edge_black_matte(
    image: Image.Image,
    *,
    threshold: int,
    max_chroma: int,
    feather_threshold: int,
) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = [rgba.getpixel((x, y)) for y in range(height) for x in range(width)]
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def index(x: int, y: int) -> int:
        return y * width + x

    def enqueue(x: int, y: int) -> None:
        idx = index(x, y)
        if visited[idx]:
            return
        pixel = pixels[idx]
        if is_background_candidate(pixel, threshold=threshold, max_chroma=max_chroma):
            visited[idx] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height:
                enqueue(nx, ny)

    output = pixels[:]

    for y in range(height):
        for x in range(width):
            idx = index(x, y)
            r, g, b, a = output[idx]
            if visited[idx]:
                output[idx] = (r, g, b, 0)
                continue

            neighbor_removed = False
            for nx in range(max(0, x - 1), min(width, x + 2)):
                for ny in range(max(0, y - 1), min(height, y + 2)):
                    if nx == x and ny == y:
                        continue
                    if visited[index(nx, ny)]:
                        neighbor_removed = True
                        break
                if neighbor_removed:
                    break

            if not neighbor_removed or a == 0:
                continue

            lum = luminance((r, g, b, a))
            if lum > feather_threshold:
                continue

            alpha_factor = max(r, g, b) / 255 if max(r, g, b) else 0
            new_alpha = max(0, min(255, int(a * alpha_factor)))
            if new_alpha == 0:
                output[idx] = (r, g, b, 0)
                continue

            scale = new_alpha / 255
            unmult_r = min(255, int(round(r / scale))) if scale else r
            unmult_g = min(255, int(round(g / scale))) if scale else g
            unmult_b = min(255, int(round(b / scale))) if scale else b
            output[idx] = (unmult_r, unmult_g, unmult_b, new_alpha)

    cleaned = Image.new("RGBA", rgba.size)
    cleaned.putdata(output)
    return cleaned


def trim_to_alpha_bounds(image: Image.Image, *, padding: int) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return image
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove edge-connected black matte from logo art.")
    parser.add_argument("input", type=Path, help="Input image path.")
    parser.add_argument("output", type=Path, help="Output PNG path.")
    parser.add_argument("--threshold", type=int, default=26, help="Luminance threshold for background flood fill.")
    parser.add_argument("--max-chroma", type=int, default=34, help="Maximum color spread for background pixels.")
    parser.add_argument("--feather-threshold", type=int, default=140, help="Luminance threshold for edge feathering.")
    parser.add_argument("--trim-padding", type=int, default=18, help="Transparent padding to keep after trimming alpha bounds.")
    args = parser.parse_args()

    image = Image.open(args.input)
    cleaned = remove_edge_black_matte(
        image,
        threshold=args.threshold,
        max_chroma=args.max_chroma,
        feather_threshold=args.feather_threshold,
    )
    cleaned = trim_to_alpha_bounds(cleaned, padding=max(0, args.trim_padding))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    cleaned.save(args.output)
    print(args.output)


if __name__ == "__main__":
    main()
