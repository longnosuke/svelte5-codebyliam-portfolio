import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return projects.map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) throw error(404, 'Project not found');
	return { project };
};
