<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import ProjectCaseStudy from '$lib/components/ProjectCaseStudy.svelte';
	import { projectSeo } from '$lib/seo';

	let { data } = $props();

	const project = $derived(data.project);
	const seo = $derived(projectSeo(project));
</script>

<SeoHead {...seo} />

<ProjectCaseStudy {project} />
