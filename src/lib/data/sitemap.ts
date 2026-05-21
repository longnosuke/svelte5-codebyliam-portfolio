import { projects } from './projects';

export type SitemapEntry = {
	path: string;
	priority: string;
	changefreq: string;
};

export function getSitemapEntries(): SitemapEntry[] {
	const staticPages: SitemapEntry[] = [
		{ path: '/', priority: '1.0', changefreq: 'monthly' },
		{ path: '/portfolio', priority: '0.9', changefreq: 'monthly' },
		{ path: '/about', priority: '0.8', changefreq: 'monthly' },
		{ path: '/contact', priority: '0.7', changefreq: 'yearly' }
	];

	const projectPages: SitemapEntry[] = projects.map((p) => ({
		path: `/portfolio/${p.slug}`,
		priority: '0.85',
		changefreq: 'monthly'
	}));

	return [...staticPages, ...projectPages];
}
