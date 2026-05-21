import type { Component } from 'svelte';
import Braces from '@lucide/svelte/icons/braces';
import Code2 from '@lucide/svelte/icons/code-2';
import Cpu from '@lucide/svelte/icons/cpu';
import Database from '@lucide/svelte/icons/database';
import FileCode from '@lucide/svelte/icons/file-code';
import GitBranch from '@lucide/svelte/icons/git-branch';
import Globe from '@lucide/svelte/icons/globe';
import Layers from '@lucide/svelte/icons/layers';
import LayoutGrid from '@lucide/svelte/icons/layout-grid';
import Package from '@lucide/svelte/icons/package';
import Rocket from '@lucide/svelte/icons/rocket';
import ShoppingCart from '@lucide/svelte/icons/shopping-cart';
import Sparkles from '@lucide/svelte/icons/sparkles';
import Table from '@lucide/svelte/icons/table';
import Terminal from '@lucide/svelte/icons/terminal';
import Wind from '@lucide/svelte/icons/wind';
import Zap from '@lucide/svelte/icons/zap';

const matchers: { match: (name: string) => boolean; icon: Component }[] = [
	{ match: (n) => n.includes('svelte'), icon: Code2 },
	{ match: (n) => n.includes('typescript') || n.includes('javascript'), icon: Braces },
	{ match: (n) => n.includes('shopify'), icon: ShoppingCart },
	{ match: (n) => n.includes('woocommerce'), icon: ShoppingCart },
	{ match: (n) => n.includes('rails') || n.includes('ruby'), icon: Terminal },
	{ match: (n) => n.includes('wordpress'), icon: Layers },
	{ match: (n) => n.includes('php'), icon: FileCode },
	{ match: (n) => n.includes('tailwind'), icon: Wind },
	{ match: (n) => n.includes('supabase') || n.includes('postgres') || n.includes('sqlite'), icon: Database },
	{ match: (n) => n.includes('drizzle'), icon: Table },
	{ match: (n) => n.includes('bun'), icon: Zap },
	{ match: (n) => n.includes('composer'), icon: Package },
	{ match: (n) => n.includes('github') || n.includes('actions'), icon: GitBranch },
	{ match: (n) => n.includes('wp-cli') || n.includes('bash'), icon: Terminal },
	{ match: (n) => n.includes('acf'), icon: LayoutGrid },
	{ match: (n) => n.includes('rest') || n.includes('api'), icon: Globe },
	{ match: (n) => n.includes('kamal'), icon: Rocket },
	{ match: (n) => n.includes('openrouter') || n.includes('ocr') || n.includes('vision'), icon: Sparkles }
];

export function getTechIcon(name: string): Component {
	const key = name.toLowerCase();
	const found = matchers.find(({ match }) => match(key));
	return found?.icon ?? Cpu;
}
