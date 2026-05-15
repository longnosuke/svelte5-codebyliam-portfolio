const SELECTABLE = 'input, textarea, [contenteditable="true"]';

function isSelectableTarget(target: EventTarget | null): boolean {
	return target instanceof Element && Boolean(target.closest(SELECTABLE));
}

export function installInteractionGuards(): () => void {
	const onContextMenu = (e: MouseEvent) => {
		if (!isSelectableTarget(e.target)) e.preventDefault();
	};

	const onSelectStart = (e: Event) => {
		if (!isSelectableTarget(e.target)) e.preventDefault();
	};

	const onDragStart = (e: DragEvent) => {
		if (!isSelectableTarget(e.target)) e.preventDefault();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a' && !isSelectableTarget(e.target)) {
			e.preventDefault();
		}
	};

	document.addEventListener('contextmenu', onContextMenu);
	document.addEventListener('selectstart', onSelectStart);
	document.addEventListener('dragstart', onDragStart);
	document.addEventListener('keydown', onKeyDown);

	return () => {
		document.removeEventListener('contextmenu', onContextMenu);
		document.removeEventListener('selectstart', onSelectStart);
		document.removeEventListener('dragstart', onDragStart);
		document.removeEventListener('keydown', onKeyDown);
	};
}
