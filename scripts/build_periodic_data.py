#!/usr/bin/env python3
"""Build a local JS bundle for the periodic table app."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "periodic-table-data.js"
SOURCE_JSON_URL = (
    "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
)


def normalize_category(value: str | None) -> str:
    value = value or "unknown"
    if value.startswith("unknown"):
        if "alkali metal" in value:
            return "alkali metal"
        if "noble gas" in value:
            return "noble gas"
        if "metalloid" in value:
            return "metalloid"
        if "post-transition metal" in value:
            return "post-transition metal"
        if "transition metal" in value:
            return "transition metal"
        return "unknown"
    return value


def build_search_blob(element: dict[str, object]) -> str:
    tokens = [
        element.get("name"),
        element.get("symbol"),
        element.get("number"),
        element.get("category"),
        element.get("phase"),
        element.get("discovered_by"),
        element.get("named_by"),
        element.get("electron_configuration_semantic"),
        element.get("block"),
    ]
    return " ".join(str(token) for token in tokens if token).lower()


def transform_elements(source: dict[str, object]) -> dict[str, object]:
    cleaned: list[dict[str, object]] = []

    for element in source["elements"]:
        if element["number"] > 118:
            continue
        cleaned.append(
            {
                "number": element["number"],
                "name": element["name"],
                "symbol": element["symbol"],
                "atomic_mass": element.get("atomic_mass"),
                "category": element.get("category"),
                "normalized_category": normalize_category(element.get("category")),
                "phase": element.get("phase") or "Unknown",
                "appearance": element.get("appearance"),
                "period": element.get("period"),
                "group": element.get("group"),
                "block": element.get("block"),
                "xpos": element.get("xpos"),
                "ypos": element.get("ypos"),
                "shells": element.get("shells"),
                "electron_configuration": element.get("electron_configuration"),
                "electron_configuration_semantic": element.get(
                    "electron_configuration_semantic"
                ),
                "electronegativity_pauling": element.get("electronegativity_pauling"),
                "electron_affinity": element.get("electron_affinity"),
                "ionization_energies": element.get("ionization_energies"),
                "density": element.get("density"),
                "melt": element.get("melt"),
                "boil": element.get("boil"),
                "molar_heat": element.get("molar_heat"),
                "discovered_by": element.get("discovered_by"),
                "named_by": element.get("named_by"),
                "summary": element.get("summary"),
                "source": element.get("source"),
                "search_blob": build_search_blob(element),
            }
        )

    return {
        "metadata": {
            "title": "Periodic Table Explorer",
            "elementCount": len(cleaned),
            "sourceName": "Bowserinator/Periodic-Table-JSON",
            "sourceUrl": "https://github.com/Bowserinator/Periodic-Table-JSON",
            "sourceJsonUrl": SOURCE_JSON_URL,
            "summaryAttribution": "Element summaries are sourced from Wikipedia via Bowserinator's Periodic-Table-JSON and require attribution when published.",
        },
        "elements": cleaned,
    }


def load_source(args: argparse.Namespace) -> dict[str, object]:
    if args.input:
        return json.loads(Path(args.input).read_text(encoding="utf-8"))
    if not sys.stdin.isatty():
        return json.loads(sys.stdin.read())
    raise SystemExit("Provide source JSON via --input or stdin.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input",
        help="Optional path to a raw PeriodicTableJSON.json file. If omitted, stdin is used.",
    )
    parser.add_argument(
        "--output",
        default=str(OUTPUT_PATH),
        help="Output JS bundle path.",
    )
    args = parser.parse_args()

    source = load_source(args)
    bundle = transform_elements(source)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        "window.PERIODIC_TABLE_EXPLORER_DATA = " + json.dumps(bundle, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(output_path)


if __name__ == "__main__":
    main()
