export const site = {
	name: 'Thanh Long',
	alias: 'Liam',
	title: 'Fullstack Web Developer',
	bio: 'I build elegant, performant web experiences with clean code and modern technologies.',
	email: 'info.liamnguyen@gmail.com',
	location: 'Vietnam',
	blogUrl: 'https://blog.codebyliam.com',
	githubUrl: 'https://github.com/imtbndev',
	linkedinUrl: 'https://www.linkedin.com/in/liamnguyen-dev/'
} as const;

export const dockLinks = [
	{ href: '/', label: 'Home', icon: 'home' as const },
	{ href: '/portfolio', label: 'Work', icon: 'code' as const },
	{ href: site.blogUrl, label: 'Blog', icon: 'rss' as const, external: true as const },
	{ href: '/contact', label: 'Contact', icon: 'mail' as const },
	{ href: '/about', label: 'About', icon: 'user' as const }
] as const;

export type DockLink = (typeof dockLinks)[number];
