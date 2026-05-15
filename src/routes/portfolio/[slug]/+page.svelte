<script lang="ts">
	import ProjectCaseStudy from '$lib/components/ProjectCaseStudy.svelte';

	let { data } = $props();

	const project = $derived(data.project);
	const detail = $derived(project.detail);
</script>

<svelte:head>
	<title>{project.title} — CodebyLiam</title>
	<meta name="description" content={detail.summary} />
</svelte:head>

<ProjectCaseStudy {project} />
