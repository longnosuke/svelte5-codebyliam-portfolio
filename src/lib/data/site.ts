export const site = {
	name: 'Thanh Long',
	alias: 'Liam',
	title: 'Fullstack Web Developer',
	email: 'info.liamnguyen@gmail.com',
	location: 'Vietnam',
	blogUrl: 'https://blog.codebyliam.com',
	githubUrl: 'https://github.com/imtbndev',
	linkedinUrl: 'https://www.linkedin.com/in/liamnguyen-dev/'
} as const;

export const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/portfolio', label: 'Work' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
	{ href: site.blogUrl, label: 'Blog', external: true }
] as const;
