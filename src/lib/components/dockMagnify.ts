export type DockMagnifyOptions = {
	maxScale?: number;
	range?: number;
	lerp?: number;
};

const DEFAULTS: Required<DockMagnifyOptions> = {
	maxScale: 1.55,
	range: 120,
	lerp: 0.18
};

/** Cosine falloff: 1 at center, 0 at range. */
export function targetScale(mouseX: number, iconCenterX: number, maxScale: number, range: number): number {
	const dist = Math.abs(mouseX - iconCenterX);
	if (dist >= range) return 1;
	const t = dist / range;
	const influence = Math.cos(t * Math.PI * 0.5);
	return 1 + (maxScale - 1) * influence;
}

export function createDockMagnify(
	getCenters: () => number[],
	options: DockMagnifyOptions = {}
) {
	const { maxScale, range, lerp } = { ...DEFAULTS, ...options };
	const count = () => getCenters().length;
	let targets: number[] = [];
	let current: number[] = [];
	let rafId = 0;
	let active = false;

	function ensureArrays() {
		const n = count();
		if (current.length !== n) {
			current = Array(n).fill(1);
			targets = Array(n).fill(1);
		}
	}

	function tick() {
		ensureArrays();
		let settled = true;
		for (let i = 0; i < current.length; i++) {
			const next = current[i] + (targets[i] - current[i]) * lerp;
			if (Math.abs(next - targets[i]) > 0.002) settled = false;
			current[i] = settled && !active ? targets[i] : next;
		}
		onUpdate?.(current.slice());
		if (!settled || (active && targets.some((t) => t !== 1))) {
			rafId = requestAnimationFrame(tick);
		} else {
			rafId = 0;
		}
	}

	function schedule() {
		if (!rafId) rafId = requestAnimationFrame(tick);
	}

	let onUpdate: ((scales: number[]) => void) | undefined;

	return {
		set onUpdate(fn: ((scales: number[]) => void) | undefined) {
			onUpdate = fn;
		},
		pointerMove(mouseX: number) {
			active = true;
			ensureArrays();
			const centers = getCenters();
			for (let i = 0; i < centers.length; i++) {
				targets[i] = targetScale(mouseX, centers[i], maxScale, range);
			}
			schedule();
		},
		pointerLeave() {
			active = false;
			ensureArrays();
			targets = Array(current.length).fill(1);
			schedule();
		},
		reset() {
			active = false;
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			const n = count();
			current = Array(n).fill(1);
			targets = Array(n).fill(1);
			onUpdate?.(current.slice());
		},
		destroy() {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			onUpdate = undefined;
		}
	};
}
