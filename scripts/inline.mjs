// Inlines the built CSS + JS into one self-contained index.html for static
// preview hosting. Assets are already inlined as data URIs by the Vite config.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const out = 'dist-single';
const assets = readdirSync(join(out, 'assets'));
const cssFile = assets.find((f) => f.endsWith('.css'));
const jsFile = assets.find((f) => f.endsWith('.js'));

const css = readFileSync(join(out, 'assets', cssFile), 'utf8');
const js = readFileSync(join(out, 'assets', jsFile), 'utf8');

let html = readFileSync(join(out, 'index.html'), 'utf8');
html = html
  .replace(/<link[^>]+href="\/assets\/[^"]+\.css"[^>]*>/, () => `<style>\n${css}\n</style>`)
  .replace(/<script[^>]+src="\/assets\/[^"]+\.js"[^>]*><\/script>/, () => `<script type="module">\n${js}\n</script>`);

writeFileSync(join(out, 'operon-site-preview.html'), html);
console.log('single file:', (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), 'MB');
