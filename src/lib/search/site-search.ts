import { Document } from 'flexsearch';
import { homeSections } from '$lib/data/home';
import { dockLinks } from '$lib/data/site';
import { projects } from '$lib/data/projects';

export type SiteSearchItem = {
	id: string;
	href: string;
	label: string;
	path: string;
	keywords: string;
	external?: boolean;
};

const items: SiteSearchItem[] = [
	...dockLinks.map((link) => ({
		id: `page:${link.href}`,
		href: link.href,
		label: link.label,
		path: link.href === '/' ? '/home' : link.href,
		keywords: `${link.label} ${link.icon}`.toLowerCase(),
		external: 'external' in link ? link.external : undefined
	})),
	...projects.map((project) => ({
		id: `project:${project.slug}`,
		href: `/portfolio/${project.slug}`,
		label: project.title,
		path: `/portfolio/${project.slug}`,
		keywords: `${project.type} ${project.detail.summary} ${project.slug}`.toLowerCase()
	}))
];

const itemById = new Map(items.map((item) => [item.id, item]));

const navigableItems = items.filter((item) => !item.external);

const terminalHints = [...homeSections.map((section) => section.command), 'cd'];

const index = new Document({
	tokenize: 'forward',
	document: {
		id: 'id',
		index: ['label', 'path', 'keywords']
	}
});

for (const item of items) {
	index.add(item);
}

function collectIds(results: unknown): string[] {
	const ids: string[] = [];
	if (!Array.isArray(results)) return ids;

	for (const group of results) {
		if (!group || typeof group !== 'object' || !('result' in group)) continue;
		const fieldResult = group.result;
		if (!Array.isArray(fieldResult)) continue;
		for (const id of fieldResult) {
			if (typeof id === 'string' && !ids.includes(id)) ids.push(id);
		}
	}
	return ids;
}

export function searchSite(query: string, limit = 8): SiteSearchItem[] {
	const trimmed = query.trim();
	if (!trimmed) {
		return navigableItems.slice(0, limit);
	}

	const ids = collectIds(index.search(trimmed, { limit: limit * 2 }));
	return ids
		.map((id) => itemById.get(id))
		.filter((item): item is SiteSearchItem => item !== undefined)
		.slice(0, limit);
}

export function navigableSiteItems(): SiteSearchItem[] {
	return navigableItems;
}

function pathToken(item: SiteSearchItem): string {
	return item.path.replace(/^\//, '') || 'home';
}

export function sitePathGhost(query: string, hintIndex = 0): string {
	const matches = searchSite(query, 16);
	const item = matches[hintIndex % matches.length] ?? matches[0];
	if (!item) return '';

	const token = pathToken(item);
	if (!query.trim()) return token;

	const lower = query.toLowerCase();
	for (const candidate of [token, item.path, item.label]) {
		if (candidate.toLowerCase().startsWith(lower) && candidate.length > query.length) {
			return candidate.slice(query.length);
		}
	}

	return '';
}

export function resolveSitePath(query: string, hintIndex = 0): SiteSearchItem | undefined {
	const trimmed = query.trim();
	const matches = searchSite(trimmed, 16);
	return matches[hintIndex % matches.length] ?? matches[0];
}

export function terminalGhostHints(): readonly string[] {
	return terminalHints;
}

export function cdPathGhost(pathQuery: string, hintIndex = 0): string {
	const item = navigableItems[hintIndex % navigableItems.length] ?? navigableItems[0];
	if (!item) return '';

	const token = pathToken(item);

	if (!pathQuery.trim()) {
		return ` ${token}`;
	}

	const lower = pathQuery.toLowerCase();
	for (const candidate of [token, item.path.replace(/^\//, ''), item.label]) {
		if (candidate.toLowerCase().startsWith(lower) && candidate.length > pathQuery.length) {
			return candidate.slice(pathQuery.length);
		}
	}

	return '';
}

export function ghostSuffixFromHints(
	query: string,
	hints: readonly string[],
	hintIndex: number
): string {
	if (!query.trim()) {
		return hints[hintIndex % hints.length] ?? '';
	}

	const trimmed = query.trimStart();
	const lower = trimmed.toLowerCase();

	if (lower === 'cd' || lower.startsWith('cd ')) {
		const pathPart = lower.startsWith('cd ') ? trimmed.slice(3) : '';
		return cdPathGhost(pathPart, hintIndex);
	}

	for (const hint of hints) {
		if (hint.toLowerCase().startsWith(lower) && hint.length > trimmed.length) {
			return hint.slice(trimmed.length);
		}
	}

	return sitePathGhost(trimmed, 0);
}

export function resolveTerminalInput(
	input: string
): { href: string; external?: boolean } | undefined {
	const trimmed = input.trim();
	if (!trimmed) return undefined;

	const lower = trimmed.toLowerCase();

	if (lower === 'whoami' || lower.startsWith('whoami')) return { href: '/about' };
	if (lower.includes('work') || lower.startsWith('ls')) return { href: '/portfolio' };
	if (lower.includes('contact')) return { href: '/contact' };

	if (lower === 'cd') return { href: '/' };

	if (lower.startsWith('cd ')) {
		const item = resolveSitePath(trimmed.slice(3));
		if (item) return { href: item.href, external: item.external };
	}

	const item = resolveSitePath(trimmed);
	if (!item) return undefined;
	return { href: item.href, external: item.external };
}
