import re
import json
import sys

input_file = 'frontend/scripts/notion-importer/output/generated-regression-module.ts'
output_file = 'frontend/scripts/notion-importer/output/generated-regression-module-fixed.ts'
config_file = 'frontend/scripts/notion-importer/config.json'

# Load config to know the correct lesson order
with open(config_file, 'r') as f:
    config = json.load(f)

lesson_order = [lesson['id'] for lesson in config['lessons']]
project_lesson_ids = config['projectLessonIds']

print(f"Correct lesson order: {lesson_order}")
print(f"Project lessons: {project_lesson_ids}\n")

# Read the corrupted file
with open(input_file, 'r') as f:
    content = f.read()

# Find all lesson blocks
# Pattern to match: '  'lesson-id': {...},\n'
lesson_pattern = r"  '([a-z-]+)': \{[^}]*?(?=\n  '|^};\s*$)"

# This is complex because of nested braces in the content function
# Let's use a different approach - find lesson keys and track their positions

lesson_starts = []
key_pattern = r"  '([a-z-]+)': \{"
for match in re.finditer(key_pattern, content):
    lesson_starts.append((match.group(1), match.start(), match.end()))

print(f"Found {len(lesson_starts)} lesson keys:")
for lesson_id, start, end in lesson_starts:
    line_num = content[:start].count('\n') + 1
    print(f"  {lesson_id} at line {line_num}")

# Identify duplicates
from collections import Counter
lesson_ids = [l[0] for l in lesson_starts]
duplicates = [id for id, count in Counter(lesson_ids).items() if count > 1]

print(f"\nDuplicates found: {duplicates}")
print(f"Total lessons to keep: {len(lesson_order)}")
print(f"Current lessons: {len(lesson_starts)}")
print(f"Lessons to remove: {len(lesson_starts) - len(lesson_order)}")

# Create a unique lesson list by keeping first occurrence
seen = set()
unique_lessons = []
for lesson_id, start, end in lesson_starts:
    if lesson_id not in seen:
        unique_lessons.append((lesson_id, start, end))
        seen.add(lesson_id)

print(f"\nAfter deduplication: {len(unique_lessons)} unique lessons")
print("Unique lesson order in file:")
for lesson_id, _, _ in unique_lessons:
    print(f"  {lesson_id}")

print("\nTo fix the file, remove the duplicate entries found above.")
print(f"Expected order: {lesson_order}")
print(f"Actual order: {[l[0] for l in unique_lessons]}")

# Check if order matches config
if [l[0] for l in unique_lessons] != lesson_order:
    print("\n⚠️  WARNING: Lesson order doesn't match config!")
    print("Some lessons may have wrong keys or missing entries.")
