/** Sphere width/height segments for planets (mobile vs desktop). */
export function getPlanetSegments(isMobile: boolean): number {
	return isMobile ? 32 : 64;
}
