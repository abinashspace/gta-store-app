#!/usr/bin/env node
/**
 * Copy the GitHub Pages static site into www/ for Capacitor,
 * bundle native helpers, and leave sw.js out of the Android shell.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const www = path.join(root, 'www');

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}
function copyDir(src, dest) {
  mkdirp(dest);
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else copyFile(s, d);
  }
}

fs.rmSync(www, { recursive: true, force: true });
mkdirp(www);
copyFile(path.join(root, 'index.html'), path.join(www, 'index.html'));
copyFile(path.join(root, 'manifest.webmanifest'), path.join(www, 'manifest.webmanifest'));
copyFile(path.join(root, '.nojekyll'), path.join(www, '.nojekyll'));
copyDir(path.join(root, 'css'), path.join(www, 'css'));
copyDir(path.join(root, 'js'), path.join(www, 'js'));
copyDir(path.join(root, 'icons'), path.join(www, 'icons'));
// Intentionally omit sw.js — the Android WebView origin is https://localhost
// and a service worker there can fight Capacitor's asset loading.

execSync(
  'npx esbuild scripts/native-entry.js --bundle --format=iife --platform=browser --outfile=www/js/native.js',
  { cwd: root, stdio: 'inherit' }
);

const indexPath = path.join(www, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('js/native.js')) {
  html = html.replace(
    '<script src="js/app.js"></script>',
    '<script src="js/native.js"></script>\n<script src="js/app.js"></script>'
  );
  fs.writeFileSync(indexPath, html);
}

console.log('www/ synced for Capacitor');
