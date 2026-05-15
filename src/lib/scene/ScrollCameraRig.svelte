<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import type { Fog, PerspectiveCamera } from 'three';
	import { homeScroll } from './home-scroll';

	let camera = $state<PerspectiveCamera | undefined>();
	let fog = $state<Fog | undefined>();

	useTask(() => {
		if (!camera) return;
		const t = homeScroll.progress;
		camera.position.set(
			Math.sin(t * Math.PI) * 1.8,
			0.8 + t * 1.2,
			7 - t * 3.5
		);
		camera.lookAt(0, 0, -2 - t * 1.5);
		if (fog) fog.far = 32 - t * 8;
	});
</script>

<T.PerspectiveCamera bind:ref={camera} makeDefault position={[0, 0.8, 7]} fov={55} />
<T.Fog bind:ref={fog} color="#020203" near={10} far={32} />
