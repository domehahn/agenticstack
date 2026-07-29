#!/usr/bin/env bash
# Pulls new articles from the content/blog submodule (agentic-devsecops),
# bumps the pointer in this repo, and builds + deploys the site.
#
# Usage:
#   scripts/publish-content.sh          # interactive: asks before push/deploy
#   scripts/publish-content.sh -y       # non-interactive: no prompts
#   scripts/publish-content.sh --no-deploy   # skip the Cloudflare deploy step

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

ASSUME_YES=false
DO_DEPLOY=true
for arg in "$@"; do
  case "$arg" in
    -y|--yes) ASSUME_YES=true ;;
    --no-deploy) DO_DEPLOY=false ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

confirm() {
  local prompt="$1"
  $ASSUME_YES && return 0
  read -r -p "$prompt [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]]
}

echo "==> Fetching content/blog submodule"
before_sha=$(git -C content/blog rev-parse HEAD)
git -C content/blog fetch origin
git -C content/blog checkout main
git -C content/blog pull origin main
after_sha=$(git -C content/blog rev-parse HEAD)

if [[ "$before_sha" == "$after_sha" ]]; then
  echo "No new articles — submodule already up to date."
  exit 0
fi

echo "==> New commits pulled into content/blog:"
git -C content/blog log --oneline "$before_sha..$after_sha"

if ! git diff --quiet -- content/blog; then
  if confirm "Bump content/blog pointer and push to origin/main?"; then
    git add content/blog
    git commit -m "Bump content submodule"
    git push
  else
    echo "Skipped commit/push — submodule pointer left unbumped in the working tree."
    exit 0
  fi
fi

if ! $DO_DEPLOY; then
  echo "Skipping deploy (--no-deploy)."
  exit 0
fi

if confirm "Build and deploy to Cloudflare (npm run deploy)?"; then
  npm run deploy
else
  echo "Skipped deploy. Run 'npm run deploy' manually when ready."
fi
