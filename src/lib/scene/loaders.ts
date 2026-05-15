import { useGltf } from '@threlte/extras';
import type { ThrelteGltf } from '@threlte/extras';
import * as THREE from 'three';

/** Clone a loaded GLTF scene and normalize to target size (world units). */
export function cloneGltfScene(gltf: ThrelteGltf, targetSize = 0.25): THREE.Group {
	const root = gltf.scene.clone(true);
	const box = new THREE.Box3().setFromObject(root);
	const size = new THREE.Vector3();
	box.getSize(size);
	const maxDim = Math.max(size.x, size.y, size.z, 0.001);
	const scale = targetSize / maxDim;
	root.scale.setScalar(scale);
	box.setFromObject(root);
	const center = new THREE.Vector3();
	box.getCenter(center);
	root.position.sub(center);
	return root;
}

export { useGltf };
