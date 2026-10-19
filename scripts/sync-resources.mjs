/**
 * scripts/sync-resources.mjs
 * Build-time fetch of the resources GitHub repo tree -> JSON.
 * Scheduled for full integration in Phase 3 once repository URL is provided.
 */

import fs from 'node:fs';
import path from 'node:path';

const REPO_URL = process.env.RESOURCES_GITHUB_REPO || '';

if (!REPO_URL) {
  console.log('[sync-resources] No repo configured. [TODO: owner to provide GitHub repository]');
  // Write default empty catalog to preserve build pipeline
  const targetDir = path.resolve('src', 'content');
  const targetFile = path.join(targetDir, 'resources.generated.json');
  if (!fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, JSON.stringify([], null, 2), 'utf8');
  }
  process.exit(0);
}

console.log(`[sync-resources] Fetching resources from: ${REPO_URL}`);
