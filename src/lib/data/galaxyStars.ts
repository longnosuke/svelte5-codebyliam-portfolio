export type GalaxyDimStar = {
	x: number;
	y: number;
	size: number;
	opacity: number;
};

export type GalaxyGlowStar = {
	x: number;
	y: number;
	size: number;
	hue: 'cool' | 'warm' | 'white';
	delay: number;
	duration: number;
};

function mulberry32(seed: number) {
	return () => {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function buildDimStars(count: number, seed: number): GalaxyDimStar[] {
	const rand = mulberry32(seed);
	return Array.from({ length: count }, () => ({
		x: +(rand() * 100).toFixed(2),
		y: +(rand() * 100).toFixed(2),
		size: rand() > 0.82 ? 1.5 : 1,
		opacity: +(0.18 + rand() * 0.38).toFixed(2)
	}));
}

function buildGlowStars(count: number, seed: number): GalaxyGlowStar[] {
	const rand = mulberry32(seed);
	const hues: GalaxyGlowStar['hue'][] = ['white', 'cool', 'warm'];
	return Array.from({ length: count }, (_, i) => ({
		x: +(rand() * 100).toFixed(2),
		y: +(rand() * 100).toFixed(2),
		size: +(1.5 + rand() * 2).toFixed(1),
		hue: hues[i % hues.length]!,
		delay: +(rand() * 4).toFixed(2),
		duration: +(2.8 + rand() * 2.4).toFixed(2)
	}));
}

/** Dense star field for the global CSS backdrop. */
export const galaxyDimStars = buildDimStars(58, 0x7a4f21);

/** Subset that pulse with a soft glow. */
export const galaxyGlowStars = buildGlowStars(12, 0x3c91e6);

export function dimStarBackground(stars: GalaxyDimStar[]): string {
	return stars
		.map(
			(s) =>
				`radial-gradient(${s.size}px ${s.size}px at ${s.x}% ${s.y}%, rgba(255,255,255,${s.opacity}), transparent)`
		)
		.join(',');
}

export const galaxyGlowColors: Record<GalaxyGlowStar['hue'], { core: string; halo: string }> = {
	white: {
		core: 'rgba(255,255,255,0.95)',
		halo: 'rgba(220,230,255,0.55)'
	},
	cool: {
		core: 'rgba(210,235,255,0.95)',
		halo: 'rgba(140,190,255,0.5)'
	},
	warm: {
		core: 'rgba(255,245,220,0.95)',
		halo: 'rgba(255,200,140,0.45)'
	}
};
