/**
 * Batch-capture project screenshots for static/projects/*.webp
 * Run: node scripts/capture-project-screenshots.mjs
 */
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.PROJECT_ROOT
	? path.resolve(process.env.PROJECT_ROOT)
	: path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'static/projects/_captures');
const WEBP_DIR = path.join(ROOT, 'static/projects');

/** @type {{ slug: string, shots: { name: string, url: string, fullPage?: boolean }[] }[]} */
const TARGETS = [
	{
		slug: 'ticket-support',
		shots: [
			{ name: 'ticket-login', url: 'https://helpdesk.codebyliam.com/session/new' },
			{ name: 'ticket-home', url: 'https://helpdesk.codebyliam.com/' }
		]
	},
	{
		slug: 'newstyledirect',
		shots: [
			{ name: 'newstyledirect-home', url: 'https://newstyledirect.com.au/' },
			{ name: 'newstyledirect-shop', url: 'https://newstyledirect.com.au/shop/' }
		]
	},
	{
		slug: 'universal-wp-plugin',
		shots: [
			{
				name: 'universal-wp-plugin-repo',
				url: 'https://github.com/imtbndev/newstyledirect-universal-wp-plugin'
			}
		]
	},
	{
		slug: 'internal-tool',
		shots: [{ name: 'internal-tool-home', url: 'https://tool.newstyledirect.au/' }]
	},
	{
		slug: 'nuwave-oxygen',
		shots: [
			{ name: 'nuwave-oxygen-home', url: 'https://nuwaveoxypure.com.au/' },
			{ name: 'nuwave-oxygen-product', url: 'https://nuwaveoxypure.com.au/product/oxypure/' }
		]
	},
	{
		slug: 'alphapak-website',
		shots: [
			{ name: 'alphapak-home', url: 'https://alphapak.vn/' },
			{ name: 'alphapak-products', url: 'https://alphapak.vn/san-pham/' }
		]
	},
	{
		slug: 'an-thanh-commodity',
		shots: [
			{ name: 'an-thanh-commodity-home', url: 'https://anthanhcommodity.com.vn/' },
			{ name: 'an-thanh-commodity-services', url: 'https://anthanhcommodity.com.vn/dich-vu/' }
		]
	},
	{
		slug: 'bep-that',
		shots: [
			{ name: 'bep-that-home', url: 'https://bepthat.com/' },
			{ name: 'bep-that-shop', url: 'https://bepthat.com/cua-hang/' }
		]
	},
	{
		slug: 'co-dong-son',
		shots: [
			{ name: 'co-dong-son-home', url: 'https://codongson.vn/' },
			{ name: 'co-dong-son-projects', url: 'https://codongson.vn/du-an/' }
		]
	},
	{
		slug: 'fata-villa',
		shots: [
			{ name: 'fata-villa-home', url: 'https://fatavilla.com/' },
			{ name: 'fata-villa-villas', url: 'https://fatavilla.com/villas/' }
		]
	},
	{
		slug: 'gco-iarc-asia',
		shots: [
			{ name: 'gco-iarc-asia-home', url: 'https://gco.iarc.asia/' },
			{ name: 'gco-iarc-asia-events', url: 'https://gco.iarc.asia/events/' }
		]
	},
	{
		slug: 'leaparfum',
		shots: [
			{ name: 'leaparfum-home', url: 'https://leaparfum.com/' },
			{ name: 'leaparfum-shop', url: 'https://leaparfum.com/shop/' }
		]
	},
	{
		slug: 'mid-man',
		shots: [
			{ name: 'mid-man-home', url: 'https://mid-man.net/' },
			{ name: 'mid-man-services', url: 'https://mid-man.net/services/' }
		]
	},
	{
		slug: 'opk-edu-vn',
		shots: [
			{ name: 'opk-edu-vn-home', url: 'https://opk.edu.vn/' },
			{ name: 'opk-edu-vn-programs', url: 'https://opk.edu.vn/chuong-trinh-dao-tao/' }
		]
	},
	{
		slug: 'travelnow-vn',
		shots: [
			{ name: 'travelnow-vn-home', url: 'https://travelnow-vn.com/' },
			{ name: 'travelnow-vn-tours', url: 'https://travelnow-vn.com/tour/' }
		]
	}
];

const RETRY_ONLY = process.argv.includes('--retry-failed');
const targets = RETRY_ONLY
	? TARGETS.filter((t) =>
			['leaparfum', 'mid-man', 'travelnow-vn', 'an-thanh-commodity', 'fata-villa', 'gco-iarc-asia', 'opk-edu-vn'].includes(
				t.slug
			)
		)
	: TARGETS;

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
	viewport: { width: 1280, height: 800 },
	deviceScaleFactor: 1
});
/** @type {Record<string, { ok: string[]; fail: { name: string; url: string; error: string }[] }>} */
const report = {};

for (const { slug, shots } of targets) {
	report[slug] = { ok: [], fail: [] };
	for (const shot of shots) {
		const pngPath = path.join(OUT_DIR, `${shot.name}.png`);
		const webpPath = path.join(WEBP_DIR, `${shot.name}.webp`);
		const page = await context.newPage();
		try {
			const response = await page.goto(shot.url, {
				waitUntil: 'networkidle',
				timeout: 60000
			});
			await page.waitForTimeout(2500);
			await page.screenshot({
				path: pngPath,
				fullPage: shot.fullPage ?? false,
				type: 'png'
			});
			execSync(`cwebp -q 82 "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
			fs.unlinkSync(pngPath);
			report[slug].ok.push(shot.name);
			console.log(`OK ${shot.name}.webp <- ${shot.url} (${response?.status() ?? '?'})`);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			report[slug].fail.push({ name: shot.name, url: shot.url, error: message });
			console.error(`FAIL ${shot.name}: ${message}`);
		} finally {
			await page.close();
		}
	}
}

await browser.close();
console.log('\n--- capture report ---');
console.log(JSON.stringify(report, null, 2));
