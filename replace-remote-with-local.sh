#!/usr/bin/env bash
#
# replace-remote-with-local.sh
# Replaces the remote repo (origin) with this local repo: same code, commits, and history.
# Remote's current code, commits, and contributors will be overwritten.
#
# Usage: ./replace-remote-with-local.sh [--yes] [branch]
#   --yes  skip confirmation prompt
#   branch: default is current branch (e.g. main)
#

set -e

SKIP_CONFIRM=false
BRANCH=""

for arg in "$@"; do
  case "$arg" in
    --yes|-y) SKIP_CONFIRM=true ;;
    *)        BRANCH="$arg" ;;
  esac
done

BRANCH="${BRANCH:-$(git branch --show-current)}"

if [ -z "$BRANCH" ]; then
  echo "Error: could not detect branch. Run: ./replace-remote-with-local.sh main"
  exit 1
fi

echo "==> Replace remote with local"
echo "    Branch: ${BRANCH}"
echo "    Remote: origin (will be overwritten)"
echo ""

if [ "$SKIP_CONFIRM" = false ]; then
  read -p "Continue? This cannot be undone. [y/N] " -r
  case "$REPLY" in
    [yY][eE][sS]|[yY]) ;;
    *) echo "Aborted."; exit 0 ;;
  esac
fi

git push origin "$BRANCH" --force

echo ""
echo "==> Done. Remote now matches this local repo (code, commits, history)."
