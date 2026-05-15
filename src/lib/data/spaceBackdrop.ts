export const spaceBackdropAssets = {
	background: '/images/space/space-background.png',
	planet: '/images/space/planet-hero.png',
	planet2x: '/images/space/planet-hero@2x.png'
} as const;

export const spaceBackdropMotion = {
	planetScaleMax: 2.2,
	planetScaleMaxMobile: 2.2,
	parallaxVh: 2,
	planetOpacityFade: 0.15
} as const;

export function easeScrollProgress(progress: number): number {
	return progress ** 0.85;
}

export function planetScaleFromScroll(easedProgress: number, mobile: boolean): number {
	const max = mobile
		? spaceBackdropMotion.planetScaleMaxMobile
		: spaceBackdropMotion.planetScaleMax;
	return 1 + easedProgress * max;
}
