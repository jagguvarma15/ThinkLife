#!/usr/bin/env bash
#
# sync-with-upstream.sh
# Sync parent repo code into this repo without copying parent's commit history.
# Keeps this repo's own history and optionally keeps README, SECURITY, LICENSE, CODE_OF_CONDUCT.
#
# Set EXCLUDE_OWN_FILES=true (e.g. on manual workflow run) to keep this repo's
# README.md, SECURITY.md, LICENSE.txt, CODE_OF_CONDUCT.md instead of parent's.
#
# If you see "Unable to merge unrelated histories" (e.g. on GitHub), run once:
#   ALLOW_UNRELATED_HISTORIES=true ./sync-with-upstream.sh
# Then run the script normally for future syncs.
#
# Prerequisites: Git
# Usage: ./sync-with-upstream.sh
#

set -e

UPSTREAM_ORG="Think-Round-Inc"
UPSTREAM_REPO="ThinkLife"
UPSTREAM_URL="https://github.com/${UPSTREAM_ORG}/${UPSTREAM_REPO}.git"
UPSTREAM_REMOTE="upstream"
BRANCH_MAIN="main"

# Files to keep (our version) when EXCLUDE_OWN_FILES=true (e.g. manual run)
OWN_FILES="README.md SECURITY.md LICENSE.txt CODE_OF_CONDUCT.md"

EXCLUDE_OWN="${EXCLUDE_OWN_FILES:-false}"

echo "==> ThinkLife upstream sync (parent code only, own history)"
echo "    Parent: ${UPSTREAM_ORG}/${UPSTREAM_REPO}"
echo "    Keep own copies of (README,SECURITY,LICENSE,CODE_OF_CONDUCT): ${EXCLUDE_OWN}"
echo ""

# --- Non-interactive / CI: set git user ---
if [ -n "${GITHUB_ACTIONS:-}" ] || [ -n "${CI:-}" ]; then
  git config user.name  >/dev/null 2>&1 || git config user.name  "${GIT_USER_NAME:-github-actions[bot]}"
  git config user.email >/dev/null 2>&1 || git config user.email "${GIT_USER_EMAIL:-41898282+github-actions[bot]@users.noreply.github.com}"
fi

# --- Repo root and branch ---
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"
CURRENT_BRANCH="$(git branch --show-current)"
if [ "$CURRENT_BRANCH" != "$BRANCH_MAIN" ]; then
  echo "==> Checking out ${BRANCH_MAIN}"
  git checkout "$BRANCH_MAIN"
fi

# --- Upstream remote ---
if ! git remote get-url "$UPSTREAM_REMOTE" &>/dev/null; then
  echo "==> Adding upstream remote: ${UPSTREAM_URL}"
  git remote add "$UPSTREAM_REMOTE" "$UPSTREAM_URL"
else
  echo "==> Upstream remote already configured"
fi

# --- Fetch upstream (no parent history copied yet) ---
echo "==> Fetching ${UPSTREAM_REMOTE}/${BRANCH_MAIN}"
git fetch "$UPSTREAM_REMOTE" "$BRANCH_MAIN"

# --- Optional: one-time connect unrelated histories (fixes "Unable to merge unrelated histories") ---
if [ "${ALLOW_UNRELATED_HISTORIES:-false}" = "true" ]; then
  if ! git merge-base HEAD "$UPSTREAM_REMOTE/$BRANCH_MAIN" &>/dev/null; then
    echo "==> Connecting unrelated histories (one-time merge)"
    git merge "$UPSTREAM_REMOTE/$BRANCH_MAIN" --allow-unrelated-histories -m "chore: connect with upstream (unrelated histories)"
    echo "==> Pushing to origin/${BRANCH_MAIN}"
    git push origin "$BRANCH_MAIN"
    echo "==> Done. Histories connected; run sync without ALLOW_UNRELATED_HISTORIES for future syncs."
    exit 0
  fi
fi

# --- Save our four files when we keep them (manual run) ---
TMPDIR=""
if [ "$EXCLUDE_OWN" = "true" ]; then
  TMPDIR="$(mktemp -d)"
  for f in $OWN_FILES; do
    [ -f "$f" ] && cp "$f" "$TMPDIR/"
  done
  echo "==> Saved own copies of: $OWN_FILES"
fi

# --- Overlay parent's file tree (code only); keeps our commit history ---
echo "==> Applying parent code (no history copy)"
git checkout "$UPSTREAM_REMOTE/$BRANCH_MAIN" -- .

# --- Remove files that exist in our repo but not in parent (so we match parent code) ---
OURS="$(git ls-tree -r --name-only HEAD)"
THEIRS="$(git ls-tree -r --name-only "$UPSTREAM_REMOTE/$BRANCH_MAIN")"
REMOVE="$(echo "$OURS" | while read -r f; do echo "$THEIRS" | grep -qFx "$f" || echo "$f"; done)"
for f in $REMOVE; do
  if [ "$EXCLUDE_OWN" = "true" ]; then
    case "$f" in README.md|SECURITY.md|LICENSE.txt|CODE_OF_CONDUCT.md) continue ;; esac
  fi
  git rm -f "$f" 2>/dev/null || true
done

# --- Restore our four files when we kept them ---
if [ "$EXCLUDE_OWN" = "true" ] && [ -n "$TMPDIR" ]; then
  for f in $OWN_FILES; do
    [ -f "$TMPDIR/$f" ] && cp "$TMPDIR/$f" "$REPO_ROOT/$f" && git add "$f"
  done
  rm -rf "$TMPDIR"
  echo "==> Restored own copies of: $OWN_FILES"
fi

# --- Commit and push (one commit = parent code; our history) ---
if git diff --staged --quiet && git diff --quiet; then
  echo "==> No changes; already in sync with parent code."
else
  echo "==> Committing parent code (own history)"
  git add -A
  git commit -m "chore: sync code from upstream (parent repo only)"
  echo "==> Pushing to origin/${BRANCH_MAIN}"
  git push origin "$BRANCH_MAIN"
fi

echo ""
echo "==> Done. This repo has parent code only; own settings and history kept."
