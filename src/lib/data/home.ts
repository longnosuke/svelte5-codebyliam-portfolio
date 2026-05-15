import { site } from './site';

export const homeStats = [
	{ value: '4+', label: 'Years Exp.' },
	{ value: '15+', label: 'Projects' },
	{ value: '10+', label: 'Happy Clients' }
] as const;

export const homeTech = [
	{ name: 'Svelte', icon: 'svelte' as const },
	{ name: 'TypeScript', icon: 'typescript' as const },
	{ name: 'WordPress', icon: 'wordpress' as const }
] as const;

export type PlanetId = 'earthNight' | 'earthBlue' | 'mars' | 'jupiter';

export const planetMeta: Record<
	PlanetId,
	{ label: string; src: string; accent: string; accentSoft: string }
> = {
	earthNight: {
		label: 'Dark Earth at night with glowing city lights',
		src: '/images/planets/earth-night.svg',
		accent: '#f28a3c',
		accentSoft: 'rgba(242, 138, 60, 0.34)'
	},
	earthBlue: {
		label: 'Blue Earth with clouds and city lights',
		src: '/images/planets/earth-blue.svg',
		accent: '#8bb8ff',
		accentSoft: 'rgba(139, 184, 255, 0.36)'
	},
	mars: {
		label: 'Mars with cratered terrain and warm rim light',
		src: '/images/planets/mars.svg',
		accent: '#e27841',
		accentSoft: 'rgba(226, 120, 65, 0.32)'
	},
	jupiter: {
		label: 'Jupiter with storm bands and great red spot',
		src: '/images/planets/jupiter.svg',
		accent: '#d7a06b',
		accentSoft: 'rgba(215, 160, 107, 0.32)'
	}
};

export const homeSections = [
	{
		id: 'whoami',
		command: 'whoami',
		planet: 'earthNight' as PlanetId,
		title: site.name,
		lines: [],
		showBio: true,
		showTech: true
	},
	{
		id: 'stack',
		command: 'cat stack.txt',
		planet: 'earthBlue' as PlanetId,
		title: 'Ship reliable interfaces',
		lines: [
			{ text: 'Svelte · TypeScript · WordPress', accent: false },
			{ text: 'Scroll-driven 3D — same craft I bring to products.', accent: false }
		],
		showBio: false,
		showTech: false
	},
	{
		id: 'work',
		command: 'ls ./work',
		planet: 'mars' as PlanetId,
		title: 'Selected projects',
		lines: [
			{ text: 'Client sites, internal tools, fullstack apps.', accent: false },
			{ text: 'Full index: /portfolio', accent: false }
		],
		showBio: false,
		showTech: false,
		linkCta: { label: 'ls -la ./work →', href: '/portfolio' }
	},
	{
		id: 'contact',
		command: 'contact --open',
		planet: 'jupiter' as PlanetId,
		title: 'Open to collaborate',
		lines: [
			{ text: 'Freelance and full-time.', accent: false },
			{ text: 'Say hello when you are ready.', accent: false }
		],
		showBio: false,
		showTech: false,
		primaryCta: { label: 'View Projects', href: '/portfolio' },
		secondaryCta: { label: 'Contact Me', href: '/contact' }
	}
] as const;
