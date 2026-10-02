// Turns a normal build in out/ into the private team preview (deployed to the preview subdomain while the public
// domain shows Coming Soon):
//   • HTTP Basic Auth on every page (out/.htaccess + out/.htpasswd)
//   • noindex for search engines (X-Robots-Tag header + robots.txt Disallow)
//
// Env (set by .github/workflows/deploy.yml from GitHub secrets / variables):
//   PREVIEW_USER           login name for the team (default: "team")
//   PREVIEW_PASSWORD       required — the script refuses to produce an unprotected preview
//   PREVIEW_HTPASSWD_PATH  absolute path of .htpasswd ON THE SERVER, e.g.
//                          /home/u123456789/domains/barokuthirajbariheritagedining.com/public_html/preview/.htpasswd
//
// Usage: node scripts/protect-preview.mjs [buildDir]   (default: out)
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(siteDir, process.argv[2] || 'out');
const user = (process.env.PREVIEW_USER || 'team').trim();
const password = process.env.PREVIEW_PASSWORD || '';
const htpasswdPath = (process.env.PREVIEW_HTPASSWD_PATH || '').trim();

function fail(msg) {
  console.error(`protect-preview: ${msg}`);
  process.exit(1);
}
if (!existsSync(join(dir, 'index.html'))) fail(`${dir} has no index.html — run \`npm run build\` first.`);
if (!password) fail('PREVIEW_PASSWORD is empty. Refusing to build an unprotected preview.');
if (password.length < 10) fail('PREVIEW_PASSWORD must be at least 10 characters.');
if (!htpasswdPath.startsWith('/') || !htpasswdPath.endsWith('/.htpasswd')) {
  fail('PREVIEW_HTPASSWD_PATH must be the absolute server path ending in /.htpasswd (see site/README.md).');
}
if (!/^[A-Za-z0-9._-]+$/.test(user)) fail('PREVIEW_USER may only contain letters, digits, dot, dash and underscore.');

// Apache/LiteSpeed-compatible MD5 (apr1) hash. The password goes in on stdin, never on the command line.
const hash = execFileSync('openssl', ['passwd', '-apr1', '-stdin'], { input: password + '\n' }).toString().trim();
if (!hash.startsWith('$apr1$')) fail('openssl did not return an apr1 hash.');
writeFileSync(join(dir, '.htpasswd'), `${user}:${hash}\n`);

const guard = `# ── Team preview: password-protected and hidden from search engines (scripts/protect-preview.mjs) ──
AuthType Basic
AuthName "Baro Kuthi - team preview"
AuthUserFile ${htpasswdPath}
Require valid-user
<IfModule mod_headers.c>
  Header always set X-Robots-Tag "noindex, nofollow"
</IfModule>

`;
const htaccess = join(dir, '.htaccess');
writeFileSync(htaccess, guard + (existsSync(htaccess) ? readFileSync(htaccess, 'utf8') : ''));
writeFileSync(join(dir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`protect-preview: ${dir} is now password-protected (user "${user}") and set to noindex.`);
