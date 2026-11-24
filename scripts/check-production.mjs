import fs from 'node:fs';
import path from 'node:path';
import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), false);
const failures = [];
for (const key of ['BREVO_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL', 'CONTACT_SUPPORT_EMAIL', 'CONTACT_SALES_EMAIL', 'CONTACT_PHONE_E164']) {
  const value = process.env[key]?.trim();
  if (!value || /example\.(com|test)|your[-_ ]|placeholder/i.test(value)) failures.push(`${key}: missing or placeholder value`);
}
if (!/^\+[1-9]\d{7,14}$/.test(process.env.CONTACT_PHONE_E164 || '')) failures.push('CONTACT_PHONE_E164: invalid international phone number');
if (process.env.SITE_URL) {
  try { if (new URL(process.env.SITE_URL).protocol !== 'https:') failures.push('SITE_URL must use HTTPS for production'); }
  catch { failures.push('SITE_URL is invalid'); }
}
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { scan(file); continue; }
    if (!file.endsWith('.tsx')) continue;
    fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, index) => {
      if (line.trimStart().startsWith('//')) return;
      if (/\[(?:INSERT|CONFIRM|SPECIFY|CRITICAL|COUNSEL|REGULATORY|VERIFY)\b|Publication status: Draft|This preview is not connected/.test(line)) failures.push(`${file}:${index + 1}: unfinished publication content`);
    });
  }
}
scan('app');
if (failures.length) { console.error('Launch checks need attention:\n' + failures.map(x => `- ${x}`).join('\n')); process.exitCode = 1; }
else console.log('Local launch checks passed. Build, hosting, HTTPS and email delivery still require separate verification.');
