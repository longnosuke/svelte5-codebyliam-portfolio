export const spaceBackdropAssets = {
	background: '/images/space/space-background.png',
	planet: '/images/space/planet-hero.png',
	planet2x: '/images/space/planet-hero@2x.png'
} as const;

export const spaceBackdropMotion = {
	planetScaleStart: 1.28,
	planetScaleStartMobile: 1.18,
	planetScaleMax: 2.2,
	planetScaleMaxMobile: 2.2,
	parallaxVh: 2,
	planetOpacityFade: 0.15
} as const;

export function easeScrollProgress(progress: number): number {
	return progress ** 0.85;
}

export function planetScaleFromScroll(easedProgress: number, mobile: boolean): number {
	const start = mobile
		? spaceBackdropMotion.planetScaleStartMobile
		: spaceBackdropMotion.planetScaleStart;
	const max = mobile
		? spaceBackdropMotion.planetScaleMaxMobile
		: spaceBackdropMotion.planetScaleMax;
	return start + easedProgress * max;
}
