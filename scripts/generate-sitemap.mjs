import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { siteUrl } = await import(join(root, 'src/lib/data/site.ts'));
const { projects } = await import(join(root, 'src/lib/data/projects.ts'));

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'monthly' },
	{ path: '/portfolio', priority: '0.9', changefreq: 'monthly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.7', changefreq: 'yearly' }
];

const projectPages = projects.map((p) => ({
	path: `/portfolio/${p.slug}`,
	priority: '0.85',
	changefreq: 'monthly'
}));

const entries = [...staticPages, ...projectPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, priority, changefreq }) => `	<url>
		<loc>${siteUrl}${path === '/' ? '/' : path}</loc>
		<changefreq>${changefreq}</changefreq>
		<priority>${priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

writeFileSync(join(root, 'static/sitemap.xml'), xml);
console.log(`Wrote ${entries.length} URLs to static/sitemap.xml`);
