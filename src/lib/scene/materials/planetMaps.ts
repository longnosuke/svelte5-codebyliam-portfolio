import * as THREE from 'three';

const cache = new Map<string, THREE.Texture>();

function loadImageTexture(path: string, colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace): Promise<THREE.Texture> {
	const cached = cache.get(path);
	if (cached) return Promise.resolve(cached);

	return new Promise((resolve, reject) => {
		const loader = new THREE.TextureLoader();
		loader.load(
			path,
			(tex) => {
				tex.colorSpace = colorSpace;
				tex.anisotropy = 4;
				cache.set(path, tex);
				resolve(tex);
			},
			undefined,
			reject
		);
	});
}

function createEarthColorMap(size = 512): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;

	const ocean = ctx.createLinearGradient(0, 0, size, size);
	ocean.addColorStop(0, '#1a3a5c');
	ocean.addColorStop(1, '#0d2840');
	ctx.fillStyle = ocean;
	ctx.fillRect(0, 0, size, size);

	ctx.fillStyle = '#2d5a3d';
	for (let i = 0; i < 28; i++) {
		const x = Math.random() * size;
		const y = Math.random() * size;
		const w = 40 + Math.random() * 120;
		const h = 30 + Math.random() * 90;
		ctx.beginPath();
		ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
		ctx.fill();
	}

	const tex = new THREE.CanvasTexture(canvas);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

function createEarthNormalMap(size = 512): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	const img = ctx.createImageData(size, size);
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const n = (Math.sin(x * 0.08) * Math.cos(y * 0.06) + Math.random() * 0.15) * 0.5 + 0.5;
			const i = (y * size + x) * 4;
			img.data[i] = 128 + n * 40;
			img.data[i + 1] = 128 + n * 40;
			img.data[i + 2] = 255;
			img.data[i + 3] = 255;
		}
	}
	ctx.putImageData(img, 0, 0);
	return new THREE.CanvasTexture(canvas);
}

function createEarthRoughnessMap(size = 512): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	ctx.fillStyle = '#888888';
	ctx.fillRect(0, 0, size, size);
	return new THREE.CanvasTexture(canvas);
}

function createCloudMap(size = 512): THREE.CanvasTexture {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	ctx.fillStyle = 'rgba(255,255,255,0)';
	ctx.fillRect(0, 0, size, size);
	for (let i = 0; i < 40; i++) {
		ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.35})`;
		ctx.beginPath();
		ctx.ellipse(Math.random() * size, Math.random() * size, 30 + Math.random() * 80, 20 + Math.random() * 50, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	const tex = new THREE.CanvasTexture(canvas);
	tex.colorSpace = THREE.SRGBColorSpace;
	return tex;
}

export type EarthMaps = {
	color: THREE.Texture;
	normal: THREE.Texture;
	roughness: THREE.Texture;
	clouds: THREE.Texture;
};

const EARTH_PATHS = {
	color: '/textures/planets/earth/color.jpg',
	normal: '/textures/planets/earth/normal.jpg',
	roughness: '/textures/planets/earth/roughness.jpg',
	clouds: '/textures/planets/earth/clouds.png'
} as const;

export async function loadEarthMaps(): Promise<EarthMaps> {
	if (typeof document === 'undefined') {
		throw new Error('loadEarthMaps requires browser');
	}

	try {
		const [color, normal, roughness, clouds] = await Promise.all([
			loadImageTexture(EARTH_PATHS.color),
			loadImageTexture(EARTH_PATHS.normal, THREE.LinearSRGBColorSpace),
			loadImageTexture(EARTH_PATHS.roughness, THREE.LinearSRGBColorSpace),
			loadImageTexture(EARTH_PATHS.clouds)
		]);
		clouds.wrapS = THREE.RepeatWrapping;
		clouds.wrapT = THREE.ClampToEdgeWrapping;
		return { color, normal, roughness, clouds };
	} catch {
		const color = createEarthColorMap();
		const normal = createEarthNormalMap();
		const roughness = createEarthRoughnessMap();
		const clouds = createCloudMap();
		cache.set(EARTH_PATHS.color, color);
		return { color, normal, roughness, clouds };
	}
}

export function disposePlanetMaps(): void {
	for (const tex of cache.values()) tex.dispose();
	cache.clear();
}
