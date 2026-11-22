#!/usr/bin/env bash
set -euo pipefail

# Local-only export helper. It never uploads, publishes, or deletes source bytes.
# Usage: scripts/export-owner-media.sh /absolute/output/path.tar.gz

if [[ $# -ne 1 ]]; then
  echo "usage: $0 /absolute/output/path.tar.gz" >&2
  exit 2
fi

output="$1"
case "$output" in
  /*) ;;
  *) echo "output must be an absolute path" >&2; exit 2 ;;
esac

mkdir -p "$(dirname "$output")"
tmp_manifest="$(mktemp)"
trap 'rm -f "$tmp_manifest"' EXIT

roots=(/home/ubuntu/upload /home/ubuntu/webdev-static-assets)
for root in "${roots[@]}"; do
  if [[ -d "$root" ]]; then
    find "$root" -type f -print0
  fi
done | sort -z | while IFS= read -r -d '' file; do
  sha256sum "$file"
done > "$tmp_manifest"

# Include source-relative paths and the manifest itself in a reproducible local archive.
archive_dir="$(mktemp -d)"
trap 'rm -rf "$archive_dir"' EXIT
cp "$tmp_manifest" "$archive_dir/SHA256SUMS.absolute.txt"
for root in "${roots[@]}"; do
  [[ -d "$root" ]] || continue
  name="$(basename "$root")"
  mkdir -p "$archive_dir/$name"
  cp -a "$root"/. "$archive_dir/$name"/
done

sha256sum "$archive_dir"/upload/* "$archive_dir"/webdev-static-assets/* 2>/dev/null | sed "s#${archive_dir}/##" > "$archive_dir/SHA256SUMS.archive-relative.txt" || true
tar -czf "$output" -C "$archive_dir" .
sha256sum "$output"
echo "Created local owner media export: $output"
