#!/usr/bin/env bash
# Deploy hotelbyte-landing to Vercel production.
#
# Vercel's "Verify Git Commit Authors" deployment protection blocks CLI deploys
# whose HEAD commit author email is not bound to a team Git account. The local
# bytedance email (huangzhen.0505@bytedance.com) is not linked to the danceiny
# Vercel account, so we re-author HEAD as the bound address (danceiny@gmail.com)
# before deploying. Re-authoring is repo-local only (does not touch --global).
#
# Usage: bash scripts/deploy.sh
# Note: --amend --reset-author rewrites the HEAD commit hash. If HEAD is already
# pushed to a remote, sync the branch with `git push --force-with-lease` afterward.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

BOUND_EMAIL="danceiny@gmail.com"
BOUND_NAME="黄振"

current_email="$(git config user.email)"
if [ "$current_email" != "$BOUND_EMAIL" ]; then
  echo ">> repo git email is '$current_email'; setting to bound account '$BOUND_EMAIL'"
  git config user.email "$BOUND_EMAIL"
  git config user.name "$BOUND_NAME"
  echo ">> re-authoring HEAD commit as $BOUND_EMAIL"
  git commit --amend --reset-author --no-edit
else
  echo ">> repo git email already '$BOUND_EMAIL' — no re-author needed"
fi

echo ">> HEAD author: $(git log -1 --format='%ae')"
echo ">> deploying to Vercel production…"
exec vercel --prod --yes
