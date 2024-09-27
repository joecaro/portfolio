#!/bin/bash

# Check if the directory is provided
if [ -z "$1" ]; then
  echo "Please provide a directory."
  exit 1
fi

# Initialize counters and an array to store invalid files
matching_count=0
not_matching_count=0
invalid_files=()

# Loop through all .md files in the specified directory
for file in "$1"/*.md; do
  # Get the file name without the extension
  filename=$(basename "$file" .md)

  # Extract the slug from the file
  slug=$(grep '^slug:' "$file" | awk '{print $2}')

  # Compare the slug and filename
  if [ "$filename" == "$slug" ]; then
    matching_count=$((matching_count + 1))
  else
    not_matching_count=$((not_matching_count + 1))
    invalid_files+=("$file")
  fi
done

# Print results
echo "Matching files: $matching_count"
echo "Non-matching files: $not_matching_count"

# If there are invalid files, print them and return a non-zero exit status
if [ $not_matching_count -gt 0 ]; then
  echo "Invalid files (slug doesn't match filename):"
  for invalid in "${invalid_files[@]}"; do
    echo "- $invalid"
  done

  # Exit with a non-zero status to prevent commit
  exit 1
else
  # Exit with zero status (success) if no mismatches are found
  exit 0
fi