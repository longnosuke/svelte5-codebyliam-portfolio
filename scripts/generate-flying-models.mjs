globalThis.FileReader = class {
	readAsArrayBuffer(blob) {
		Promise.resolve(blob instanceof Blob ? blob.arrayBuffer() : blob).then((buf) => {
			this.result = buf;
			this.onloadend?.({ target: this });
		});
	}
};

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFileSync } from 'fs';

function exportGlb(name, object) {
	return new Promise((resolve) => {
		new GLTFExporter().parse(
			object,
			(gltf) => {
				writeFileSync(`static/models/${name}`, Buffer.from(gltf));
				console.log(name, `${(gltf.byteLength / 1024).toFixed(1)} KB`);
				resolve();
			},
			undefined,
			{ binary: true }
		);
	});
}

const astGeo = new THREE.IcosahedronGeometry(1, 4);
const pos = astGeo.attributes.position;
for (let i = 0; i < pos.count; i++) {
	const x = pos.getX(i);
	const y = pos.getY(i);
	const z = pos.getZ(i);
	const n = 0.85 + Math.random() * 0.3;
	pos.setXYZ(i, x * n, y * n, z * n);
}
astGeo.computeVertexNormals();
await exportGlb(
	'asteroid.glb',
	new THREE.Mesh(astGeo, new THREE.MeshStandardMaterial({ color: 0x6b6358, roughness: 0.95 }))
);

const sat = new THREE.Group();
sat.add(
	new THREE.Mesh(
		new THREE.BoxGeometry(0.6, 0.4, 0.4),
		new THREE.MeshStandardMaterial({ color: 0x888899, metalness: 0.7 })
	)
);
const panelMat = new THREE.MeshStandardMaterial({ color: 0x224466, metalness: 0.4 });
for (const sx of [-0.9, 0.9]) {
	const panel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.35), panelMat);
	panel.position.x = sx;
	sat.add(panel);
}
const dish = new THREE.Mesh(
	new THREE.CylinderGeometry(0.15, 0.12, 0.08, 16),
	new THREE.MeshStandardMaterial({ color: 0xcccccc })
);
dish.position.y = 0.28;
sat.add(dish);
await exportGlb('satellite.glb', sat);

const craft = new THREE.Group();
const hull = new THREE.Mesh(
	new THREE.ConeGeometry(0.25, 0.9, 12),
	new THREE.MeshStandardMaterial({ color: 0xd97757, metalness: 0.5 })
);
hull.rotation.x = Math.PI / 2;
craft.add(hull);
const wingMat = new THREE.MeshStandardMaterial({ color: 0x3d4f7c, metalness: 0.6 });
for (const sz of [-1, 1]) {
	const wing = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.03, 0.2), wingMat);
	wing.position.set(0, 0, sz * 0.25);
	craft.add(wing);
}
await exportGlb('craft.glb', craft);
