from __future__ import annotations

import json
import re
from pathlib import Path

try:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT
    from reportlab.lib.pagesizes import LETTER
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import inch
    from reportlab.lib.utils import ImageReader
    from reportlab.platypus import (
        Image as PlatypusImage,
        PageBreak,
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )
except ModuleNotFoundError:
    print("[sync:explainers] Skipping explainer PDF sync because reportlab is not installed.")
    raise SystemExit(0)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
SEO_SNAPSHOT_PATH = ROOT / "src" / "content" / "generated" / "shadewaterSeoSkillSnapshot.ts"
WEBP_SKILL_DIR = Path.home() / ".codex" / "skills" / "webp-me-daddy"
WEBP_SKILL_MD = WEBP_SKILL_DIR / "SKILL.md"
WEBP_SCRIPTS_DIR = WEBP_SKILL_DIR / "scripts"

PAGE_BG = colors.HexColor("#06202A")
SURFACE = colors.HexColor("#092731")
SURFACE_ALT = colors.HexColor("#0B303D")
SURFACE_CARD = colors.HexColor("#071F28")
FORE = colors.HexColor("#F8FBFF")
FORE_MUTED = colors.HexColor("#C9D8E7")
SAND = colors.HexColor("#A9C8EC")
SAND_SOFT = colors.HexColor("#86A7C8")
TEAL = colors.HexColor("#3D6FA6")
TEAL_DEEP = colors.HexColor("#234A7C")
LINE = colors.HexColor("#31556A")


def styles() -> dict[str, ParagraphStyle]:
    sample = getSampleStyleSheet()
    sample.add(
        ParagraphStyle(
            name="Eyebrow",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=SAND,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="HeroTitle",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=30,
            leading=31,
            textColor=FORE,
            alignment=TA_LEFT,
            spaceAfter=6,
        )
    )
    sample.add(
        ParagraphStyle(
            name="HeroBody",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=10.6,
            leading=15,
            textColor=FORE_MUTED,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="Tagline",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="MetaLabel",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=SAND_SOFT,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="MetaBody",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=FORE_MUTED,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=sample["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=18,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="SectionIntro",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=14,
            textColor=FORE_MUTED,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="MetricLabel",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.8,
            leading=9,
            textColor=SAND,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="MetricValue",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=24,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="MetricDetail",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.5,
            textColor=FORE_MUTED,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="CardTitle",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13.2,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="CardBody",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.5,
            textColor=FORE_MUTED,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="StepLabel",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=SAND,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="CodeTitle",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=10,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    sample.add(
        ParagraphStyle(
            name="CodeBody",
            parent=sample["BodyText"],
            fontName="Courier",
            fontSize=7.9,
            leading=10,
            textColor=FORE,
            alignment=TA_LEFT,
        )
    )
    return sample


STYLE = styles()


def parse_snapshot() -> dict:
    content = SEO_SNAPSHOT_PATH.read_text(encoding="utf8")
    match = re.search(r"export const shadewaterSeoSkillSnapshot = (\{[\s\S]*\}) as const;", content)
    if not match:
        raise ValueError("Could not parse SEO snapshot data.")
    return json.loads(match.group(1))


def extract_markdown_section(markdown: str, heading: str) -> str:
    match = re.search(rf"## {re.escape(heading)}\s+([\s\S]*?)(?:\n## |\Z)", markdown)
    return match.group(1).strip() if match else ""


def parse_webp_skill() -> dict:
    markdown = WEBP_SKILL_MD.read_text(encoding="utf8") if WEBP_SKILL_MD.exists() else ""
    scripts = sorted(path.name for path in WEBP_SCRIPTS_DIR.glob("*") if path.is_file()) if WEBP_SCRIPTS_DIR.exists() else []

    commands_section = extract_markdown_section(markdown, "Commands")
    commands = re.findall(r"- `scripts/webp_me_daddy.py ([^` ]+)", commands_section)

    recipe_match = re.search(r"--recipe ([^:]+): choose the semantic recipe", markdown)
    recipes = recipe_match.group(1).split("|") if recipe_match else []

    return {
        "command_count": len(sorted(set(commands))),
        "recipe_count": len(recipes),
        "script_count": len(scripts),
        "snippet_targets": 4,
        "outputs": [
            "Optimized WebP assets with responsive variants",
            "Versioned sidecars and manifests",
            "Paste-ready snippets across frameworks",
            "Audit, cleanup, and proof artifacts",
        ],
    }


def image(path: Path, width: float, height: float) -> PlatypusImage | None:
    if not path.exists():
        return None
    source = ImageReader(str(path))
    original_width, original_height = source.getSize()
    scale = min(width / original_width, height / original_height)
    img = PlatypusImage(
        str(path),
        width=original_width * scale,
        height=original_height * scale,
    )
    img.hAlign = "CENTER"
    return img


def section_rule(width: float = 6.92 * inch) -> Table:
    rule = Table([["", ""]], colWidths=[1.2 * inch, width - (1.2 * inch)], rowHeights=[0.05 * inch])
    rule.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), SAND),
                ("BACKGROUND", (1, 0), (1, 0), LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return rule


def card(inner, width: float, background=SURFACE_CARD, border=LINE, pad: int = 12) -> Table:
    table = Table([[inner]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.85, border),
                ("LEFTPADDING", (0, 0), (-1, -1), pad),
                ("RIGHTPADDING", (0, 0), (-1, -1), pad),
                ("TOPPADDING", (0, 0), (-1, -1), pad),
                ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def two_col_cards(items: list[tuple[str, str]], columns: int = 2) -> Table:
    total_width = 6.92 * inch
    gap = 0.14 * inch
    col_width = (total_width - (gap * (columns - 1))) / columns
    rows = []
    current = []
    for title, body in items:
        current.append(
            card(
                [
                    Paragraph(title, STYLE["CardTitle"]),
                    Spacer(1, 0.05 * inch),
                    Paragraph(body, STYLE["CardBody"]),
                ],
                width=col_width,
            )
        )
        if len(current) == columns:
            rows.append(current)
            current = []

    if current:
        while len(current) < columns:
            current.append(Spacer(1, 0.1 * inch))
        rows.append(current)

    grid = Table(rows, colWidths=[col_width] * columns)
    grid.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0.14 * inch),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    for row_index in range(len(rows)):
        grid.setStyle(TableStyle([("RIGHTPADDING", (columns - 1, row_index), (columns - 1, row_index), 0)]))
    return grid


def bullet_block(items: list[str]) -> list[Table]:
    blocks = []
    for item in items:
        block = Table(
            [["-", Paragraph(item, STYLE["CardBody"])]],
            colWidths=[0.18 * inch, 6.62 * inch],
        )
        block.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), SURFACE_CARD),
                    ("BOX", (0, 0), (-1, -1), 0.75, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("TEXTCOLOR", (0, 0), (0, 0), SAND),
                ]
            )
        )
        blocks.append(block)
        blocks.append(Spacer(1, 0.08 * inch))
    return blocks


def metrics_grid(items: list[tuple[str, str, str]]) -> Table:
    total_width = 6.92 * inch
    gap = 0.14 * inch
    col_width = (total_width - gap) / 2
    rows = []
    current = []
    for label, value, detail in items:
        current.append(
            card(
                [
                    Paragraph(label, STYLE["MetricLabel"]),
                    Spacer(1, 0.05 * inch),
                    Paragraph(value, STYLE["MetricValue"]),
                    Spacer(1, 0.04 * inch),
                    Paragraph(detail, STYLE["MetricDetail"]),
                ],
                width=col_width,
                background=SURFACE_ALT,
            )
        )
        if len(current) == 2:
            rows.append(current)
            current = []

    if current:
        while len(current) < 2:
            current.append(Spacer(1, 0.1 * inch))
        rows.append(current)

    table = Table(rows, colWidths=[col_width] * 2)
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), gap),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    for row_index in range(len(rows)):
        table.setStyle(TableStyle([("RIGHTPADDING", (1, row_index), (1, row_index), 0)]))
    return table


def step_grid(items: list[tuple[str, str, str]]) -> Table:
    total_width = 6.92 * inch
    gap = 0.16 * inch
    col_width = (total_width - gap) / 2
    rows = []
    current = []
    for step, title, body in items:
        current.append(
            card(
                [
                    Paragraph(step, STYLE["StepLabel"]),
                    Spacer(1, 0.05 * inch),
                    Paragraph(title, STYLE["CardTitle"]),
                    Spacer(1, 0.04 * inch),
                    Paragraph(body, STYLE["CardBody"]),
                ],
                width=col_width,
            )
        )
        if len(current) == 2:
            rows.append(current)
            current = []

    if current:
        while len(current) < 2:
            current.append(Spacer(1, 0.1 * inch))
        rows.append(current)

    table = Table(rows, colWidths=[col_width] * 2)
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), gap),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    for row_index in range(len(rows)):
        table.setStyle(TableStyle([("RIGHTPADDING", (1, row_index), (1, row_index), 0)]))
    return table


def code_panel(title: str, lines: list[str]) -> Table:
    title_bar = Table([[Paragraph(title, STYLE["CodeTitle"])]], colWidths=[6.92 * inch])
    title_bar.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), TEAL_DEEP),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    body = Table(
        [[Paragraph("<br/>".join(lines), STYLE["CodeBody"])]],
        colWidths=[6.92 * inch],
    )
    body.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE_CARD),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
            ]
        )
    )
    shell = Table([[title_bar], [body]], colWidths=[6.92 * inch])
    shell.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return shell


def hero_block(title: str, summary: str, tagline: str, project_logo: Path, meta_title: str, meta_lines: list[str]) -> list:
    left_col = [
        Paragraph("Shadewater Labs Explainer", STYLE["Eyebrow"]),
        Spacer(1, 0.08 * inch),
        Paragraph(title, STYLE["HeroTitle"]),
        Spacer(1, 0.06 * inch),
        Paragraph(summary, STYLE["HeroBody"]),
        Spacer(1, 0.14 * inch),
        card([Paragraph(tagline, STYLE["Tagline"])], width=4.08 * inch, background=TEAL_DEEP, border=TEAL_DEEP, pad=10),
    ]

    logo = image(project_logo, width=2.15 * inch, height=2.15 * inch)
    right_parts = []
    if logo is not None:
        right_parts.append(logo)
        right_parts.append(Spacer(1, 0.08 * inch))
    right_parts.append(Paragraph(meta_title, STYLE["MetaLabel"]))
    for line in meta_lines:
        right_parts.append(Spacer(1, 0.04 * inch))
        right_parts.append(Paragraph(line, STYLE["MetaBody"]))

    shell = Table(
        [[card(left_col, width=4.08 * inch, background=SURFACE), card(right_parts, width=2.7 * inch, background=SURFACE)]],
        colWidths=[4.08 * inch, 2.7 * inch],
    )
    shell.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 0.14 * inch),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return [shell]


def build_seo_story(snapshot: dict) -> list:
    brand_logo = PUBLIC_DIR / "shadewater-labs-logo-cropped.webp"
    story = []
    story.extend(
        hero_block(
            "Shadewater SEO Report",
            snapshot["summary"],
            "Evidence first. Branded reports second. Better rankings after the rerun.",
            brand_logo,
            "Current Sync",
            [
                f"Last synced: {snapshot['lastSyncedAt'][:10]}",
                f"Latest skill update: {snapshot['newestSkillArtifactAt'][:10]}",
                "Source: local SEO skill snapshot",
                "Dashboard: novice readout plus operator evidence",
            ],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        metrics_grid(
            [
                ("Command Routes", str(snapshot["stats"]["commandCount"]), "Top-level operator commands"),
                ("Sub-skills", str(snapshot["stats"]["subSkillCount"]), "Focused audit workflows"),
                ("Agents", str(snapshot["stats"]["agentCount"]), "Specialist deep-dive roles"),
                ("Scripts", str(snapshot["stats"]["scriptCount"]), "Deterministic evidence checks"),
            ]
        )
    )
    story.append(PageBreak())
    story.append(Paragraph("Why This Exists", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph(snapshot["headline"], STYLE["SectionIntro"]))
    story.append(Spacer(1, 0.08 * inch))
    story.append(two_col_cards([(item["title"], item["description"]) for item in snapshot["valueProps"]], columns=2))

    story.append(PageBreak())
    story.append(Paragraph("Current Report Experience", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "The dashboard now separates executive readability from technical evidence. A client can understand the score, the speed context, and the next move quickly, while an operator can still open findings, inspect evidence, copy tasks, print the full report, or hand the work to Claude/Codex.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                (
                    "Overall Score",
                    "A full audit score across technical SEO, content, AI readiness, and site health. It is meant for quick client orientation, not as a replacement for the findings.",
                ),
                (
                    "Speed Insights",
                    "A separate Google PageSpeed mobile performance score for Core Web Vitals context, shown apart from the overall audit score so performance does not get buried.",
                ),
                (
                    "Novice Summary",
                    "Critical Issues, Warnings, Info / Opportunities, and Strong Scores are grouped into readable sections with explanation, impact, effort, and how-to-resolve language.",
                ),
                (
                    "Print & PDF Friendly Evidence",
                    "Evidence and fix details are expanded during print/PDF export so the saved report includes the full technical context instead of hidden dropdown content.",
                ),
            ],
            columns=2,
        )
    )

    story.append(Paragraph("Operator Workflow", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "The skill is built for rerun cycles: gather public evidence, verify it with deterministic checks, package the findings, ship fixes, and audit again until the score moves for real.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(step_grid([(step["label"], step["title"], step["description"]) for step in snapshot["workflow"]]))

    story.append(PageBreak())
    story.append(Paragraph("Built-In Outputs", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "Every serious audit path ends with artifacts that are usable by operators, stakeholders, and the follow-on image pipeline.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(two_col_cards([(item["title"], item["description"]) for item in snapshot["outputs"]], columns=2))

    story.append(Paragraph("Claude & Codex Handoff", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "Every generated report can now produce agent-specific handoff markdown. The buttons copy the handoff text from the dashboard, and the same content is saved beside the report for later implementation work.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                (
                    "Claude Handoff",
                    "Guides Claude Code to open the SEO/web project, read CLAUDE.md when present, run tests before and after changes, and avoid secrets or pushes without approval.",
                ),
                (
                    "Codex Handoff",
                    "Guides Codex to inspect git state, read AGENTS.md or project memory where present, use existing tests and report artifacts, and avoid reset/delete/push actions without approval.",
                ),
            ],
            columns=2,
        )
    )

    story.append(Paragraph("Command Coverage", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "These examples come straight from the live skill snapshot, so the PDF stays grounded in the real operator surface rather than a marketing-only version of the tool.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    for command in snapshot["commands"][:6]:
        story.append(
            code_panel(
                f"{command['subSkill']} route",
                [command["command"], command["description"]],
            )
        )
        story.append(Spacer(1, 0.08 * inch))

    story.append(Paragraph("Guardrails & Use Cases", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph("The skill is intentionally opinionated about public evidence, safety, and reporting quality.", STYLE["SectionIntro"]))
    story.append(Spacer(1, 0.08 * inch))
    story.extend(bullet_block(snapshot["guardrails"]))
    story.append(Spacer(1, 0.04 * inch))
    story.extend(bullet_block(snapshot["builtFor"]))
    return story


def build_webp_story(stats: dict) -> list:
    project_logo = PUBLIC_DIR / "webp-me-daddy-logo-lockup-transparent.png"
    story = []
    story.extend(
        hero_block(
            "Webp Me Daddy",
            "A recipe-driven image pipeline for turning messy website assets into production-ready WebP outputs with framing-aware crops, structured metadata, proof sheets, snippets, and codebase audits.",
            "Shave bytes. Keep vibes. Give website images a real production loop.",
            project_logo,
            "Project Position",
            [
                "Shadewater Labs image workflow",
                "CLI-first today, product-ready tomorrow",
                "Built around proofing, audits, and shipping",
            ],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        metrics_grid(
            [
                ("Recipes", str(stats["recipe_count"]), "Semantic asset roles built into the skill"),
                ("Command Routes", str(stats["command_count"]), "Top-level CLI paths for still and animated assets"),
                ("Scripts", str(stats["script_count"]), "Helpers inside the local skill bundle"),
                ("Snippet Targets", str(stats["snippet_targets"]), "HTML, React, Next.js, and Astro outputs"),
            ]
        )
    )
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Why It Exists", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "Most teams do not have an image pipeline. They have a pile of manual exports, inconsistent filenames, weak alt text, forgotten width and height attributes, and no proofing. Webp Me Daddy turns that chaos into a repeatable website workflow.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                (
                    "Semantic recipes",
                    "Prepare heroes, review art, blog covers, avatars, poster crops, and transparent logos with defaults that match the real slot instead of one-off image math.",
                ),
                (
                    "Proof before ship",
                    "Generate surface proofs and batch boards so crop problems, matte halos, and contrast issues show up before they hit production.",
                ),
                (
                    "Metadata with teeth",
                    "Use accessibility modes, visible-text inputs, and usage overrides so alt text and captions are deliberate instead of filler.",
                ),
                (
                    "Audit and cleanup",
                    "Review a live codebase for legacy formats, missing markup, animated assets, unused originals, and safe autofix opportunities.",
                ),
            ]
        )
    )

    story.append(Paragraph("Core Workflow", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "The workflow is strongest when it follows the same operator loop every time: understand the placement, preview intentionally, prove the output visually, then clean up the codebase around it.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        step_grid(
            [
                ("01", "Audit the project", "Scan public and src usage, surface stale formats, markup gaps, unused files, and animated assets that belong in the loop optimizer."),
                ("02", "Dry-run the prep", "Preview recipes, framing, responsive sizes, and lint status before writing anything to disk."),
                ("03", "Proof the visuals", "Review dark, light, and checker surfaces so transparent assets and crops get real QA instead of guesswork."),
                ("04", "Ship snippets and fixes", "Generate sidecars, manifests, framework snippets, fix plans, safe autofix patches, and cleanup output."),
            ]
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("Best-Fit Use Cases", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.extend(
        bullet_block(
            [
                "Homepage hero banners that need the right crop, eager loading, and responsive WebP variants.",
                "Review-note and blog-cover art derived from posters without destroying the subject or readable title treatment.",
                "Transparent brand marks and wordmarks that need proofing on dark, light, and checker surfaces.",
                "Shared public assets that need usage-specific alt text across multiple placements.",
                "Codebase cleanup passes where image debt is slowing launches down.",
                "SEO handoff flows where Shadewater SEO Report identifies asset work and Webp Me Daddy handles the actual remediation.",
            ]
        )
    )

    story.append(Paragraph("What Comes Back", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(two_col_cards([(f"Output {index + 1}", description) for index, description in enumerate(stats["outputs"])], columns=2))

    story.append(Paragraph("Command Patterns", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    for title, lines in [
        (
            "Prepare one transparent logo lockup",
            [
                "python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py prepare public/logo.png",
                "  --recipe logo-lockup --accessibility-mode logo --public-root public --write-sidecar",
            ],
        ),
        (
            "Preview a batch review pass",
            [
                "python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py batch public",
                "  --recipe review-hero --dry-run --proof-contact-sheet batch-proof.png --manifest image-manifest.json",
            ],
        ),
        (
            "Audit and apply safe fixes",
            [
                "python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py audit C:/path/to/project",
                "  --apply-autofix --json image-audit.json",
            ],
        ),
        (
            "Consume the SEO image handoff",
            [
                "python C:/Users/Alex/.codex/skills/webp-me-daddy/scripts/webp_me_daddy.py seo-handoff seo-image-handoff.json",
                "  --dry-run --json seo-image-apply-report.json",
            ],
        ),
    ]:
        story.append(code_panel(title, lines))
        story.append(Spacer(1, 0.08 * inch))

    story.append(Paragraph("Current Limits", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.extend(
        bullet_block(
            [
                "The core path is intentionally WebP-first today; AVIF and multi-format delivery still belong to the next layer of work.",
                "The audit can emit fix plans and safe autofix patches, but a full orchestrated apply-everything workflow is still future product work.",
                "The operator surface is strong in CLI form, but the broader hosted app experience is still an upcoming phase.",
            ]
        )
    )
    return story


def build_inkmaster_story() -> list:
    project_logo = PUBLIC_DIR / "inkmaster-studio-site-logo.webp"
    live_surface = PUBLIC_DIR / "inkmaster-live-landing.webp"
    mockup_board = PUBLIC_DIR / "inkmaster-showcase-mockup-board.webp"
    underbase_preview = PUBLIC_DIR / "inkmaster-showcase-underbase.webp"

    story = []
    story.extend(
        hero_block(
            "InkMaster Studio",
            "A browser-based print-prep workflow for apparel graphics. InkMaster helps creators turn rough source art into DTG-ready assets with knockout cleanup, texture controls, underbase generation, mockup previews, and export tooling built around actual garment production needs.",
            "From rough artwork to print-ready merch assets in one focused workflow.",
            project_logo,
            "Project Position",
            [
                "Shadewater Labs merch-production workflow",
                "Public beta with a real browser-based operator surface",
                "Built for DTG prep, previews, and production export",
            ],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        metrics_grid(
            [
                ("Overall Progress", "76%", "The beta is real, useful, and now focused on polish and product clarity."),
                ("Print Core", "88%", "The standardized print-master flow, DPI feedback, and garment prep are already strong."),
                ("Mockups & Export", "84%", "Underbases, mockups, PDF export, and production assets make it feel like a real operator tool."),
                ("Workflow Memory", "71%", "Batching, presets, checkpoints, and export history are working but still being refined."),
            ]
        )
    )
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Why It Exists", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "Most apparel graphics are not born print-ready. They need cleanup, resizing, texture preservation, mockups, and export prep before they can actually be sold or printed. InkMaster exists to compress those repetitive last-mile steps into one focused browser workflow.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                (
                    "Print-first cleanup",
                    "Remove black or white backgrounds, preserve distress and transparency, and shape edges for garments instead of forcing generic image tools to do specialized print work.",
                ),
                (
                    "Production assets",
                    "Generate print masters, underbases, PDFs, SVGs, and mockup-ready outputs from the same session instead of bouncing between multiple tools.",
                ),
                (
                    "Merch preview loop",
                    "Preview designs on multiple garment colors, compare placements, and produce sellable mockups without leaving the app.",
                ),
                (
                    "Beta with real utility",
                    "The live product already solves a real operator problem: taking messy source art and turning it into something printable and merch-ready faster.",
                ),
            ]
        )
    )

    story.append(Paragraph("Core Workflow", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "InkMaster is strongest when the workflow stays tight: validate the artwork, prep it for the garment, preview it on real surfaces, and export both production files and merch assets from the same session.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        step_grid(
            [
                ("01", "Upload and validate", "Start with raw artwork, normalize it into a 4200 x 5100 print master, and surface DPI feedback so weak source files get flagged early."),
                ("02", "Prep the artwork", "Choose the right garment-prep mode, remove black or white backgrounds, refine thresholds, preserve texture, replace colors, and shape the final print feel."),
                ("03", "Preview on real surfaces", "Check the processed design on artboards and garment mockups, compare colors, test placement, and confirm the asset still reads once it leaves a neutral editor background."),
                ("04", "Export production assets", "Download the final print file, create PDFs and underbases, or batch out mockup sets so the same workflow supports both production and merchandising."),
            ]
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("Who It Is For", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "InkMaster is best for people who already know they need to print something and want a faster route from rough art to a sellable or production-ready result.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                ("Merch creators", "Independent creators who want to move faster from rough artwork to something they can actually list, print, and sell."),
                ("Apparel brands & print shops", "Small operators who need repeatable DTG prep, mockup output, and better consistency without a bloated studio workflow."),
                ("Freelance designers", "Designers who inherit messy files and need a faster route to production-ready graphics for client merch work."),
                ("Shadewater Labs ops", "A live internal test bed for understanding where a focused merch-production product is already strong and where it still needs polish."),
            ]
        )
    )

    story.append(Paragraph("Why It Is Different", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        two_col_cards(
            [
                (
                    "Not a general creative suite",
                    "The point is not to replace Photoshop. The point is to remove the repetitive merch-prep steps that most people end up doing inside Photoshop.",
                ),
                (
                    "More than background removal",
                    "Background cleanup matters, but the real value is the whole loop: sizing, DPI checks, texture control, underbase generation, mockups, and export packaging.",
                ),
                (
                    "More than a mockup toy",
                    "Mockups are part of the experience, but the real product sits earlier in the pipeline where artwork becomes print-ready in the first place.",
                ),
                (
                    "Browser-first workflow",
                    "The key promise is speed and accessibility: do serious merch prep in a focused web workflow instead of getting buried in heavyweight desktop tools for every iteration.",
                ),
            ]
        )
    )

    story.append(Paragraph("Real Output Surface", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "The project already has real product surface and artifact outputs. These pages and previews matter because they show the tool is operating on more than theory.",
            STYLE["SectionIntro"],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    for title, body, image_path, max_height in [
        (
            "Public beta landing page",
            "The live site frames InkMaster around batch processing, print-master sizing, knockout cleanup, and DTG-focused output instead of generic image editing.",
            live_surface,
            2.5 * inch,
        ),
        (
            "Multi-color mockup board",
            "The same processed design staged across multiple shirt colors shows whether the asset survives contrast, placement, and merchandising realities before shipping.",
            mockup_board,
            2.45 * inch,
        ),
        (
            "Underbase generation preview",
            "InkMaster can turn processed art into a white underbase layer for dark-garment DTG printing while preserving silhouette and soft alpha information.",
            underbase_preview,
            2.45 * inch,
        ),
    ]:
        panel = [Paragraph(title, STYLE["CardTitle"]), Spacer(1, 0.06 * inch), Paragraph(body, STYLE["CardBody"])]
        preview = image(image_path, 6.55 * inch, max_height)
        if preview is not None:
            panel.extend([Spacer(1, 0.12 * inch), preview])
        story.append(card(panel, width=6.92 * inch))
        story.append(Spacer(1, 0.1 * inch))

    story.append(Paragraph("Current Limits", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.extend(
        bullet_block(
            [
                "The AI-assisted editing path exists in the codebase, but the public beta still treats it as an inactive future-facing feature rather than a fully shipped operator path.",
                "The workflow is still tee-first today even though the product story points toward hoodies, hats, mugs, totes, and broader merch surfaces.",
                "The underlying tools are stronger than the onboarding and public explanation around them, which is why the explainer and Labs page matter right now.",
            ]
        )
    )
    story.append(Spacer(1, 0.04 * inch))
    story.append(Paragraph("What Comes Next", STYLE["SectionTitle"]))
    story.append(section_rule())
    story.append(Spacer(1, 0.08 * inch))
    story.extend(
        bullet_block(
            [
                "Decide how to ship the AI editing layer in a production-safe way instead of leaving it as a beta curiosity.",
                "Expand beyond tees without diluting the clarity of the current print-prep workflow.",
                "Tighten onboarding, feature framing, and public messaging so the product clicks in a few seconds for new visitors.",
            ]
        )
    )
    return story


def draw_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
    canvas.setFillColor(TEAL_DEEP)
    canvas.roundRect(0.45 * inch, LETTER[1] - 0.58 * inch, LETTER[0] - 0.9 * inch, 0.08 * inch, 0.03 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(FORE_MUTED)
    canvas.drawString(doc.leftMargin, 0.4 * inch, "Shadewater Labs Explainer")
    canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.4 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build_pdf(path: Path, title: str, author: str, story: list) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.56 * inch,
        title=title,
        author=author,
    )
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)


def main() -> int:
    seo_snapshot = parse_snapshot()
    webp_stats = parse_webp_skill()

    build_pdf(
        PUBLIC_DIR / "shadewater-seo-report-explainer.pdf",
        "Shadewater SEO Report Explainer",
        "Shadewater Labs",
        build_seo_story(seo_snapshot),
    )
    build_pdf(
        PUBLIC_DIR / "webp-me-daddy-explainer.pdf",
        "Webp Me Daddy Explainer",
        "Shadewater Labs",
        build_webp_story(webp_stats),
    )
    build_pdf(
        PUBLIC_DIR / "inkmaster-studio-explainer.pdf",
        "InkMaster Studio Explainer",
        "Shadewater Labs",
        build_inkmaster_story(),
    )
    print("[sync:explainers] Generated explainer PDFs in public/.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
