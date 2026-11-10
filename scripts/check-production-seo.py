"""Check the public SEO endpoints after a production release."""

import re
import string
import sys
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from time import sleep
from urllib.request import HTTPRedirectHandler, Request, build_opener

ORIGIN = "https://shadewaterlabs.com"
PAGES = ("/projects/brinespace", "/projects/webp-example", "/projects/seo-audit-example")
BOT = "OAI-SearchBot"
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
UNRESERVED = frozenset(string.ascii_letters + string.digits + "-._~")


class NoRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def fetch(path):
    request = Request(ORIGIN + path, headers={"User-Agent": f"{BOT}/1.4"})
    with build_opener(NoRedirects()).open(request, timeout=8) as response:
        if response.status != 200:
            raise ValueError(f"expected HTTP 200, got {response.status}")
        return response.read().decode("utf-8-sig")


def crawler_rules(body):
    groups = []
    agents, rules = [], []
    for line in body.splitlines():
        field, _, value = line.split("#", 1)[0].partition(":")
        field, value = field.strip().lower(), value.strip()
        if field == "user-agent":
            if not agents or rules:
                agents, rules = [], []
                groups.append((agents, rules))
            agents.append(value.lower())
        elif agents and field in {"allow", "disallow"}:
            rules.append((field, value))

    if not groups:
        raise ValueError("no robots.txt user-agent groups found")
    named = [rules for agents, rules in groups if BOT.lower() in agents]
    applicable = named or [rules for agents, rules in groups if "*" in agents]
    return [rule for group in applicable for rule in group if rule[1]]


def allows(path, rules):
    matches = []
    for field, rule in rules:
        pattern = rule
        # The checked paths are ASCII. Encoded unreserved characters match their literal forms.
        for encoded in set(re.findall(r"%[0-9a-fA-F]{2}", pattern)):
            character = chr(int(encoded[1:], 16))
            if character in UNRESERVED:
                pattern = pattern.replace(encoded, character)
        regex = re.escape(pattern.removesuffix("$")).replace(r"\*", ".*")
        if re.match(regex + (r"\Z" if pattern.endswith("$") else ""), path):
            matches.append((len(pattern.encode("utf-8")), field == "allow"))
    # The longest match wins, and Allow wins a tie.
    return max(matches, default=(0, True))[1]


class CanonicalLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.urls = []

    def handle_starttag(self, tag, attrs):
        if tag == "head":
            self.in_head = True
        if self.in_head and tag == "link":
            attrs = dict(attrs)
            if "canonical" in (attrs.get("rel") or "").lower().split():
                self.urls.append(attrs.get("href"))

    def handle_endtag(self, tag):
        if tag == "head":
            self.in_head = False


def check(path):
    try:
        body = fetch(path)
        if path == "/robots.txt":
            rules = crawler_rules(body)
            blocked = [page for page in PAGES if not allows(page, rules)]
            if blocked:
                raise ValueError(f"{BOT} blocked from {', '.join(blocked)}")
        elif path == "/sitemap.xml":
            root = ET.fromstring(body)
            locations = {loc.text.strip() for loc in root.findall("sm:url/sm:loc", SITEMAP_NS) if loc.text}
            missing = [ORIGIN + page for page in PAGES if ORIGIN + page not in locations]
            if missing:
                raise ValueError(f"missing sitemap entries: {', '.join(missing)}")
        else:
            canonical = CanonicalLinks()
            canonical.feed(body)
            expected = ORIGIN + path
            if canonical.urls != [expected]:
                raise ValueError(f"expected one canonical URL, {expected}; found {canonical.urls}")
    except (OSError, ValueError, ET.ParseError) as error:
        return f"{path}: {error}"
    return None


def main():
    paths = ("/robots.txt", "/sitemap.xml", *PAGES)
    with ThreadPoolExecutor() as pool:
        for attempt in range(1, 4):
            errors = [error for error in pool.map(check, paths) if error]
            if not errors:
                print(f"Production SEO passed for {ORIGIN}: robots.txt, sitemap, and {len(PAGES)} page canonicals.")
                return 0
            for error in errors:
                print(f"Attempt {attempt}: {error}", file=sys.stderr)
            if attempt < 3:
                sleep(5)
    return 1


if __name__ == "__main__":
    sys.exit(main())
