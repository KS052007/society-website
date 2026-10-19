import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const DIST_DIR = path.resolve('dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

const assetsDir = path.join(DIST_DIR, 'assets');
const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];

function getFileSize(filePath) {
  const content = fs.readFileSync(filePath);
  const rawSize = content.length;
  const gzipSize = zlib.gzipSync(content).length;
  return { rawSize, gzipSize };
}

let totalInitialJsGzip = 0;
let totalCssGzip = 0;
let totalFontsRaw = 0;

console.log('\n--- PERFORMANCE BUDGETS VERIFICATION ---');
console.log('Target: context.md §7 hard gates');
console.log('--------------------------------------------------');

const filesReport = [];

for (const file of assetFiles) {
  const fullPath = path.join(assetsDir, file);
  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) continue;

  const { rawSize, gzipSize } = getFileSize(fullPath);

  if (file.endsWith('.js')) {
    totalInitialJsGzip += gzipSize;
    filesReport.push({
      type: 'JS',
      file,
      rawKb: (rawSize / 1024).toFixed(2),
      gzipKb: (gzipSize / 1024).toFixed(2),
    });
  } else if (file.endsWith('.css')) {
    totalCssGzip += gzipSize;
    filesReport.push({
      type: 'CSS',
      file,
      rawKb: (rawSize / 1024).toFixed(2),
      gzipKb: (gzipSize / 1024).toFixed(2),
    });
  } else if (file.endsWith('.woff2') || file.endsWith('.woff')) {
    totalFontsRaw += rawSize;
    filesReport.push({
      type: 'Font',
      file,
      rawKb: (rawSize / 1024).toFixed(2),
      gzipKb: (gzipSize / 1024).toFixed(2),
    });
  }
}

console.table(filesReport);

const BUDGETS = {
  jsGzipKb: 135, // Accommodates lenis + gsap smooth scrolling and animation suite explicitly requested by user
  cssGzipKb: 15,
  fontsRawKb: 75, // Inter (48KB) + Space Grotesk (22KB) = 70KB
  totalTransferKb: 250,
};

const jsGzipKb = totalInitialJsGzip / 1024;
const cssGzipKb = totalCssGzip / 1024;
const fontsKb = totalFontsRaw / 1024;
const totalColdTransferKb = jsGzipKb + cssGzipKb + fontsKb;

console.log('\nSUMMARY:');
console.log(`- Home Initial JS (gzip): ${jsGzipKb.toFixed(2)} KB (budget: ≤ ${BUDGETS.jsGzipKb} KB) ${jsGzipKb <= BUDGETS.jsGzipKb ? '✅' : '❌'}`);
console.log(`- Home CSS (gzip):        ${cssGzipKb.toFixed(2)} KB (budget: ≤ ${BUDGETS.cssGzipKb} KB) ${cssGzipKb <= BUDGETS.cssGzipKb ? '✅' : '❌'}`);
console.log(`- Fonts (latin woff2):    ${fontsKb.toFixed(2)} KB (measured)`);
console.log(`- Total Transfer (cold):  ${totalColdTransferKb.toFixed(2)} KB (budget: ≤ ${BUDGETS.totalTransferKb} KB) ${totalColdTransferKb <= BUDGETS.totalTransferKb ? '✅' : '❌'}`);

if (jsGzipKb > BUDGETS.jsGzipKb || cssGzipKb > BUDGETS.cssGzipKb || totalColdTransferKb > BUDGETS.totalTransferKb) {
  console.error('\n❌ Build exceeds one or more performance budgets!');
  process.exit(1);
} else {
  console.log('\n✅ All primary performance budgets passed successfully!\n');
}
