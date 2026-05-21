import { getSitemapEntries } from '$lib/data/sitemap';
import { type Project } from '$lib/data/projects';
import { brand, defaultDescription, defaultOgImagePath, site, siteUrl } from '$lib/data/site';
import { theme } from '$lib/theme';

export type OgType = 'website' | 'article' | 'profile';

export type SeoConfig = {
	title: string;
	description?: string;
	/** Site path starting with `/`, e.g. `/portfolio/easybill` */
	path?: string;
	/** Path or absolute URL for og:image / twitter:image */
	image?: string;
	imageAlt?: string;
	type?: OgType;
	robots?: string;
	noindex?: boolean;
	jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function formatTitle(pageTitle: string): string {
	return `${pageTitle} — ${brand}`;
}

export function absoluteUrl(pathOrUrl: string): string {
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
		return pathOrUrl;
	}
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${siteUrl}${path}`;
}

export function absoluteImageUrl(imagePath?: string): string {
	return absoluteUrl(imagePath ?? defaultOgImagePath);
}

export function canonicalUrl(path = '/'): string {
	return absoluteUrl(path);
}

function projectImagePath(project: Project): string {
	return `/projects/${project.imageUrl}`;
}

export function projectSeo(project: Project): SeoConfig {
	const path = `/portfolio/${project.slug}`;
	const description = project.detail.summary;

	return {
		title: formatTitle(project.title),
		description,
		path,
		image: projectImagePath(project),
		imageAlt: `${project.title} — project preview`,
		type: 'article',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: project.title,
			description,
			url: canonicalUrl(path),
			image: absoluteImageUrl(projectImagePath(project)),
			applicationCategory: 'WebApplication',
			author: {
				'@type': 'Person',
				name: site.name,
				url: siteUrl
			},
			creator: {
				'@type': 'Person',
				name: site.name,
				url: siteUrl
			}
		}
	};
}

export const homeSeo: SeoConfig = {
	title: formatTitle('Interactive portfolio'),
	description: defaultDescription,
	path: '/',
	type: 'website',
	jsonLd: {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: brand,
		url: siteUrl,
		description: defaultDescription,
		inLanguage: 'en',
		author: {
			'@type': 'Person',
			name: site.name,
			url: `${siteUrl}/about`
		}
	}
};

export const portfolioIndexSeo: SeoConfig = {
	title: formatTitle('Work'),
	description:
		'Selected fullstack apps, client sites, and internal tools by Liam Nguyen — SvelteKit, TypeScript, WordPress, and Ruby on Rails.',
	path: '/portfolio',
	type: 'website',
	jsonLd: {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Portfolio work',
		url: canonicalUrl('/portfolio'),
		description:
			'Case studies and shipped projects by Liam Nguyen, fullstack web developer.',
		isPartOf: { '@type': 'WebSite', url: siteUrl, name: brand }
	}
};

export const aboutSeo: SeoConfig = {
	title: formatTitle('About'),
	description: `${site.name} — ${site.title} based in ${site.location}. ${site.bio}`,
	path: '/about',
	type: 'profile',
	image: defaultOgImagePath,
	imageAlt: `Portrait and profile of ${site.name}`,
	jsonLd: {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		name: `About ${site.name}`,
		url: canonicalUrl('/about'),
		mainEntity: {
			'@type': 'Person',
			name: site.name,
			alternateName: site.legalName,
			jobTitle: site.title,
			description: site.bio,
			email: site.email,
			url: siteUrl,
			sameAs: [site.githubUrl, site.linkedinUrl, site.blogUrl],
			address: {
				'@type': 'PostalAddress',
				addressCountry: 'VN'
			}
		}
	}
};

export const contactSeo: SeoConfig = {
	title: formatTitle('Contact'),
	description: `Contact ${site.name} for freelance and full-time web development. Email ${site.email}.`,
	path: '/contact',
	type: 'website',
	jsonLd: {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact',
		url: canonicalUrl('/contact'),
		description: `Contact ${site.name}, ${site.title}.`
	}
};

export const seoDefaults = {
	author: site.legalName,
	themeColor: theme.bg,
	siteName: brand,
	locale: site.locale,
	twitterCard: 'summary_large_image' as const,
	defaultRobots: 'index, follow, max-image-preview:large'
};

/** Paths for static/sitemap.xml — run `npm run sitemap` after adding routes */
export const sitemapPaths = getSitemapEntries;
