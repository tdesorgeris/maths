#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "sources" / "latex" / "kholles"
OUTPUT_ROOT = ROOT / "assets" / "data" / "kholles"


class ParseError(Exception):
    pass


def skip_whitespace(text: str, index: int) -> int:
    while index < len(text) and text[index].isspace():
        index += 1
    return index


def read_command_name(text: str, index: int) -> tuple[str, int]:
    if index >= len(text) or text[index] != "\\":
        raise ParseError(f"Commande attendue a la position {index}.")

    index += 1
    start = index

    while index < len(text) and (text[index].isalpha() or text[index] == "@"):
        index += 1

    if start == index:
        raise ParseError(f"Nom de commande vide a la position {start}.")

    return text[start:index], index


def read_braced_group(text: str, index: int) -> tuple[str, int]:
    index = skip_whitespace(text, index)
    if index >= len(text) or text[index] != "{":
        raise ParseError(f"Groupe entre accolades attendu a la position {index}.")

    depth = 0
    start = index + 1
    index += 1

    while index < len(text):
        char = text[index]
        if char == "\\":
            index += 2
            continue
        if char == "{":
            depth += 1
        elif char == "}":
            if depth == 0:
                return text[start:index], index + 1
            depth -= 1
        index += 1

    raise ParseError("Accolade fermante manquante.")


def clean_block(text: str) -> str:
    lines = text.strip().splitlines()
    return "\n".join(line.rstrip() for line in lines).strip()


def slug_to_name(slug: str) -> str:
    return " ".join(part.capitalize() for part in slug.split("-"))


def parse_exercise_body(text: str) -> dict[str, object]:
    result: dict[str, object] = {}
    index = 0

    while index < len(text):
        index = skip_whitespace(text, index)
        if index >= len(text):
            break
        if text[index] != "\\":
            index += 1
            continue

        command, index = read_command_name(text, index)

        if command in {"difficulty", "title", "statement", "answer"}:
            value, index = read_braced_group(text, index)
            result[command] = clean_block(value)
        else:
            raise ParseError(f"Commande non geree dans un exercice : \\{command}")

    if "difficulty" not in result or "statement" not in result:
        raise ParseError("Chaque exercice doit contenir \\difficulty{...} et \\statement{...}.")

    return result


def parse_theme_file(path: Path) -> dict[str, object]:
    text = path.read_text(encoding="utf-8")
    data: dict[str, object] = {
        "courseQuestions": [],
        "exercises": [],
    }
    index = 0

    while index < len(text):
        index = skip_whitespace(text, index)
        if index >= len(text):
            break

        if text[index] == "%":
            while index < len(text) and text[index] != "\n":
                index += 1
            continue

        if text[index] != "\\":
            index += 1
            continue

        command, index = read_command_name(text, index)

        if command == "input":
            _, index = read_braced_group(text, index)
            continue

        if command in {"theme", "track", "name", "description"}:
            value, index = read_braced_group(text, index)
            data[command] = clean_block(value)
            continue

        if command == "questioncours":
            question_id, index = read_braced_group(text, index)
            question_text, index = read_braced_group(text, index)
            data["courseQuestions"].append({
                "id": clean_block(question_id),
                "text": clean_block(question_text),
            })
            continue

        if command == "exercice":
            exercise_id, index = read_braced_group(text, index)
            exercise_body, index = read_braced_group(text, index)
            parsed_exercise = parse_exercise_body(exercise_body)
            data["exercises"].append({
                "id": clean_block(exercise_id),
                "difficulty": int(parsed_exercise["difficulty"]),
                "title": parsed_exercise.get("title") or f"Exercice {clean_block(exercise_id)}",
                "statement": parsed_exercise["statement"],
                "answer": parsed_exercise.get("answer", ""),
            })
            continue

        raise ParseError(f"Commande non geree dans {path}: \\{command}")

    if "theme" not in data or "track" not in data:
        raise ParseError(f"{path} doit contenir \\theme{{...}} et \\track{{...}}.")

    theme_id = str(data["theme"])
    data["id"] = theme_id
    data["name"] = data.get("name") or slug_to_name(theme_id)
    data["description"] = data.get("description") or ""
    return data


def to_javascript(theme: dict[str, object]) -> str:
    lines = [
        "window.registerKholleTheme({",
        f"  id: {json.dumps(theme['id'], ensure_ascii=False)},",
        f"  track: {json.dumps(theme['track'], ensure_ascii=False)},",
        f"  name: {json.dumps(theme['name'], ensure_ascii=False)},",
        f"  description: {json.dumps(theme['description'], ensure_ascii=False)},",
        "  courseQuestions: [",
    ]

    course_questions = theme["courseQuestions"]
    for index, question in enumerate(course_questions):
        suffix = "," if index < len(course_questions) - 1 else ""
        lines.append(f"    {json.dumps(question['text'], ensure_ascii=False)}{suffix}")
    lines.append("  ],")
    lines.append("  exercises: [")

    exercises = theme["exercises"]
    for index, exercise in enumerate(exercises):
        suffix = "," if index < len(exercises) - 1 else ""
        lines.extend([
            "    {",
            f"      title: {json.dumps(exercise['title'], ensure_ascii=False)},",
            f"      track: {json.dumps(theme['track'], ensure_ascii=False)},",
            f"      difficulty: {exercise['difficulty']},",
            f"      statement: {json.dumps(exercise['statement'], ensure_ascii=False)},",
            f"      answer: {json.dumps(exercise['answer'], ensure_ascii=False)}",
            f"    }}{suffix}",
        ])

    lines.append("  ]")
    lines.append("});")
    lines.append("")
    return "\n".join(lines)


def convert_all() -> int:
    tex_files = sorted(path for path in SOURCE_ROOT.rglob("*.tex") if path.name != "README.md")
    tex_files = [path for path in tex_files if path.name == "base-exercices.tex"]

    if not tex_files:
        print("Aucun fichier kholle .tex trouve.", file=sys.stderr)
        return 1

    converted = 0
    for tex_file in tex_files:
        theme = parse_theme_file(tex_file)
        relative_dir = tex_file.parent.relative_to(SOURCE_ROOT)
        output_dir = OUTPUT_ROOT / relative_dir
        output_dir.mkdir(parents=True, exist_ok=True)
        output_file = output_dir / "base-exercices.js"
        output_file.write_text(to_javascript(theme), encoding="utf-8")
        converted += 1
        print(f"Converti : {tex_file.relative_to(ROOT)} -> {output_file.relative_to(ROOT)}")

    return 0 if converted else 1


if __name__ == "__main__":
    try:
        raise SystemExit(convert_all())
    except ParseError as exc:
        print(f"Erreur de conversion : {exc}", file=sys.stderr)
        raise SystemExit(1)
