export type ProjectScreenshot = {
	src: string;
	alt: string;
	caption?: string;
};

export type ProjectDetail = {
	summary: string;
	techStack: string[];
	problem: string;
	solution: string;
	screenshots: ProjectScreenshot[];
	role?: string;
	year?: number;
	repoUrl?: string;
};

export type ProjectTier = 'flagship' | 'client';

export type Project = {
	slug: string;
	title: string;
	type: string;
	imageUrl: string;
	url: string;
	comingSoon?: boolean;
	/** Highlights best work on the portfolio index */
	tier?: ProjectTier;
	/** Tall/portrait hero — scrollable viewport with gentle auto-pan */
	heroScroll?: boolean;
	detail: ProjectDetail;
};

export function projectImageSrc(project: Project): string {
	return `/projects/${project.imageUrl}`;
}

export function partitionPortfolioProjects(list: Project[]): {
	flagship: Project[];
	comingSoon: Project[];
	client: Project[];
} {
	return {
		flagship: list.filter((p) => p.tier === 'flagship'),
		comingSoon: list.filter((p) => p.comingSoon),
		client: list.filter((p) => p.tier === 'client')
	};
}

export const projects: Project[] = [
	{
		slug: 'shq-connect',
		title: 'SHQ Connect',
		type: 'shopify-app',
		tier: 'flagship',
		imageUrl: 'shq-connect-dashboard.webp',
		url: 'https://shqconnect.com/',
		detail: {
			summary:
				'Shopify app that connects merchant stores to StationeryHQ — SKU mapping, paid-order transfer into SHQ draft orders, and checkout artwork upload. Merchants install once, map catalog variants, and ops review transfers from a single embedded dashboard at shqconnect.com.',
			techStack: [
				'Rails 8',
				'Ruby',
				'PostgreSQL',
				'Redis',
				'shopify_app',
				'Shopify GraphQL',
				'Trailblazer',
				'Hotwire',
				'Stimulus',
				'Tailwind CSS v4',
				'Checkout UI Extensions',
				'Kamal'
			],
			problem:
				'Print-on-demand merchants on Shopify needed StationeryHQ fulfillment without re-keying orders or losing artwork files. SKUs drifted between storefronts and SHQ catalogs, and checkout had no structured place to attach print-ready assets before payment.\n\nOps teams chased email threads when transfers failed — there was no shared order view tying Shopify line items, SHQ draft references, file uploads, and retry history.',
			solution:
				'Built SHQ Connect as an embedded Shopify app with admin product mapping, OAuth into the SHQ hub store, and webhooks that create SHQ draft orders when Shopify orders are paid. A checkout UI extension collects per-line artwork before checkout completes; the Rails app surfaces notifications, mapping gaps, and manual retries for Mark\'s operations team.\n\nTrailblazer operations keep mapping and transfer logic testable; metafield definitions sync through data migrations so new stores get the right Shopify schema on install. Production runs at shqconnect.com with Kamal-deployed Rails, Sidekiq jobs, and GDPR-compliant webhooks.',
			screenshots: [
				{
					src: 'shq-connect-dashboard.webp',
					alt: 'SHQ Connect dashboard with revenue cards and recent orders',
					caption: 'Operations dashboard — revenue summary and recent Shopify orders'
				},
				{
					src: 'shq-connect-queue.webp',
					alt: 'SHQ Connect transfer queue table with order status and SHQ draft references',
					caption: 'Transfer queue for paid orders moving into StationeryHQ draft orders'
				},
				{
					src: 'shq-connect-order.webp',
					alt: 'SHQ Connect order detail with line items, artwork files, and SHQ JSON payload',
					caption: 'Order detail — line items, file uploads, and SHQ transfer payload for retries'
				}
			],
			role: 'Fullstack developer',
			year: 2026
		}
	},
	{
		slug: 'newstyledirect-v2',
		title: 'NewstyleDirect v2',
		type: 'fullstack',
		tier: 'flagship',
		imageUrl: 'newstyledirect-v2-home.webp',
		url: 'https://v2.newstyledirect.com.au/',
		detail: {
			summary:
				'Next-generation NewstyleDirect storefront — a SvelteKit redesign of the live WordPress + WooCommerce site at newstyledirect.com.au. Same retail brand and catalog story, rebuilt for faster browsing, clearer merchandising, and a modern component-driven front end on v2.newstyledirect.com.au.',
			techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vite'],
			problem:
				'The flagship NewstyleDirect WordPress build carried years of WooCommerce plugins, ACF sections, and performance debt. Peak campaigns stressed LCP and admin workflows; the team wanted a storefront that felt as fast as their internal SvelteKit tools without losing catalog depth.\n\nMerchandising still depended on flexible layouts and seasonal heroes, but the old theme made every major visual change a PHP deploy.',
			solution:
				'Shipped v2.newstyledirect.com.au as a SvelteKit storefront redesign paired with the existing NewstyleDirect ecosystem — universal WP plugin, internal ops app, and hub tooling. Product storytelling and category navigation are rebuilt in typed routes with Tailwind, while the original newstyledirect.com.au case study documents the WordPress foundation this release replaces.\n\nThe v2 site is the public face of the same Australian kitchenware and hardware catalog; case-study copy links back to the WordPress flagship entry for continuity.',
			screenshots: [
				{
					src: 'newstyledirect-v2-home.webp',
					alt: 'NewstyleDirect v2 Pizzell pizza oven campaign hero',
					caption:
						'v2 redesign — seasonal Pizzell hero on the SvelteKit storefront (replaces WordPress newstyledirect homepage templates)'
				},
				{
					src: 'newstyledirect-v2-versamax.webp',
					alt: 'NewstyleDirect v2 Versamax 5-in-1 kitchen system hero',
					caption: 'Versamax 5-in-1 product landing rebuilt in v2 with campaign typography and CTA layout'
				},
				{
					src: 'newstyledirect-v2-connector.webp',
					alt: 'NewstyleDirect v2 Versamax change-tools-in-seconds hero',
					caption:
						'Connector-system storytelling — swap tools in seconds, merchandised on the v2 stack instead of ACF blocks'
				},
				{
					src: 'newstyledirect-v2-kitchenware.webp',
					alt: 'NewstyleDirect v2 kitchenware category grid',
					caption:
						'Kitchenware category hub with icon tiles and filters — v2 navigation over the legacy WooCommerce shop archive'
				},
				{
					src: 'newstyledirect-v2-carousel.webp',
					alt: 'NewstyleDirect v2 Versamax carousel and nibbler highlights',
					caption: 'Versamax carousel and nibbler promos on the redesigned newstyledirect catalog pages'
				},
				{
					src: 'newstyledirect-v2-nuwave.webp',
					alt: 'NewstyleDirect v2 NuWave OxyPure product detail page',
					caption:
						'NuWave OxyPure PDP with spec tabs and add-to-cart — same catalog as newstyledirect, faster v2 product template'
				}
			],
			role: 'Lead developer',
			year: 2026
		}
	},
	{
		slug: 'vaclock-v2',
		title: 'Vaclock v2',
		type: 'fullstack',
		tier: 'flagship',
		imageUrl: 'vaclock-v2-home.webp',
		url: 'https://v2.vaclock.com.au/',
		detail: {
			summary:
				'Vaclock brand site redesign on v2.vaclock.com.au — modern SvelteKit storefront for the vacuum-storage product line in the NewstyleDirect portfolio. Replaces the earlier vaclock.com.au WordPress presence with faster product education pages and a cleaner path to purchase.',
			techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vite'],
			problem:
				'Vaclock shoppers research suction specs and use cases before buying, but the legacy WordPress site split editorial content and product detail across heavy templates. Mobile performance and campaign landing updates were slow for a single-SKU brand that still shares ops tooling with NewstyleDirect.\n\nThe brand needed a focused v2 experience without rebuilding the entire multi-site WooCommerce stack.',
			solution:
				'Delivered v2.vaclock.com.au as a dedicated redesign — typed SvelteKit routes, Tailwind layout, and product-led storytelling aligned with sibling NewstyleDirect v2 work. The release keeps Vaclock as its own slug while sharing engineering patterns with the main NSD storefront refresh.\n\nOriginal vaclock.com.au remains documented as the WordPress baseline; v2 is the public redesign recruiters and buyers should evaluate first.',
			screenshots: [
				{
					src: 'vaclock-v2-home.webp',
					alt: 'Vaclock v2 homepage with Keep it Fresh hero for clinicians',
					caption: 'Clinicians homepage — Keep it Fresh hero and primary navigation'
				},
				{
					src: 'vaclock-v2-top-sellers.webp',
					alt: 'Vaclock v2 Top Sellers product carousel',
					caption: 'Top Sellers carousel for quick product discovery'
				},
				{
					src: 'vaclock-v2-how-it-works.webp',
					alt: 'Vaclock v2 How Vaclock Works three-step section',
					caption: 'How Vaclock Works — three-step product education'
				},
				{
					src: 'vaclock-v2-shop.webp',
					alt: 'Vaclock v2 shop grid with eleven products',
					caption: 'Shop catalog grid with filters and product cards'
				},
				{
					src: 'vaclock-v2-guide.webp',
					alt: 'Vaclock v2 four-step visual guide Prepare Seal Preserve Enjoy',
					caption: 'Prepare → Seal → Preserve → Enjoy visual usage guide'
				},
				{
					src: 'vaclock-v2-goin-off-grid.webp',
					alt: 'Vaclock v2 Goin Off Grid campaign hero',
					caption: 'Goin Off Grid campaign hero variant'
				}
			],
			role: 'Lead developer',
			year: 2026
		}
	},
	{
		slug: 'easybill',
		title: 'EasyBill',
		type: 'fullstack',
		tier: 'flagship',
		imageUrl: 'easybill.webp',
		url: 'https://easybill.codebyliam.com/',
		heroScroll: true,
		detail: {
			summary:
				'Mobile-first property management for Vietnamese landlords — room revenue, AI meter readings, and PDF invoices in one calm interface. Built for parents and small operators who run several rooms from a phone, not a back-office ERP.',
			techStack: [
				'SvelteKit 5',
				'Svelte 5 runes',
				'Bun',
				'SQLite',
				'Drizzle ORM',
				'Tailwind CSS v4',
				'OpenRouter vision OCR',
				'Kamal'
			],
			problem:
				'Parents and landlords were tracking multiple rental rooms with spreadsheets, manual utility math, and ad-hoc invoices. Nothing was mobile-first or fully in Vietnamese, and re-logging in every week added friction.\n\nMeter readings lived in camera rolls or paper notes; rent and utility totals were recalculated by hand each month. When a tenant asked for a breakdown, there was no single source of truth — only scattered messages and half-finished spreadsheets.',
			solution:
				'Built EasyBill as a SvelteKit app with a revenue dashboard, room payment status, AI-assisted meter capture, automated billing, PDF/share invoices, multi-merchant SQLite isolation, and one-year PIN sessions tuned for non-technical users.\n\nLandlords see monthly collection at a glance, filter rooms by paid or vacant, and generate itemized bills from configured rates. Vision OCR on meter photos reduces typos; Kamal deploys keep the stack small enough to run on a single VPS. The outcome is fewer billing mistakes and less time spent reconciling rooms each cycle.',
			screenshots: [
				{
					src: 'easybill.webp',
					alt: 'EasyBill revenue dashboard on mobile',
					caption: 'Monthly collection hero with room status filters'
				},
				{
					src: 'easybill-rooms.webp',
					alt: 'EasyBill room list',
					caption: 'Room grid with paid, unpaid, and vacant states'
				},
				{
					src: 'easybill-invoice.webp',
					alt: 'EasyBill invoice detail',
					caption: 'Automated bill breakdown ready to export'
				},
				{
					src: 'easybill-reading.webp',
					alt: 'EasyBill meter reading flow',
					caption: 'New reading entry with camera-assisted capture'
				},
				{
					src: 'easybill-settings.webp',
					alt: 'EasyBill rate settings',
					caption: 'Per-room utility rates and fee configuration'
				}
			],
			role: 'Fullstack developer',
			year: 2026
		}
	},
	{
		slug: 'ticket-support',
		title: 'Ticket Support',
		type: 'fullstack',
		tier: 'flagship',
		imageUrl: 'ticket-support-tickets.webp',
		url: 'https://helpdesk.codebyliam.com/',
		detail: {
			summary:
				'A lightweight helpdesk for tracking support tickets with real-time updates and a focused agent workflow. Designed for a small team that needed structure without enterprise IT overhead.',
			techStack: ['SvelteKit', 'TypeScript', 'Supabase', 'Tailwind CSS'],
			problem: `Support requests were scattered across email threads and ad-hoc spreadsheets. There was no single place to see open issues, assign ownership, or close the loop with clients.\n\nAgents duplicated context in replies because prior threads were hard to find. Clients had no shared view of status, so "any update?" messages piled up and slowed resolution.`,
			solution: `Built a fullstack helpdesk with ticket creation, status tracking, and role-based views. Agents get a clear queue; clients get visibility without drowning in tooling. Deployed as a fast, prerender-friendly app backed by Supabase for auth and data.\n\nSupabase Realtime keeps ticket state in sync across tabs without polling. Status transitions are explicit so handoffs between agents stay auditable. The app stays prerender-friendly where possible so first paint stays fast on modest connections.`,
			screenshots: [
				{
					src: 'ticket-support-home.webp',
					alt: 'Ticket Support agent home screen with welcome message and quick actions',
					caption: 'Dashboard home with shortcuts to tickets, notifications, and new requests'
				},
				{
					src: 'ticket-support-tickets.webp',
					alt: 'Ticket Support tickets list with status, priority, and assignee columns',
					caption: 'Sortable ticket queue with filters and row actions'
				},
				{
					src: 'ticket-support-detail.webp',
					alt: 'Ticket Support ticket detail view with conversation thread and internal notes',
					caption: 'Ticket detail with comments, notes, and status controls'
				},
				{
					src: 'ticket-support-notifications.webp',
					alt: 'Ticket Support notifications panel listing recent ticket activity',
					caption: 'In-app notifications for assignments, replies, and status changes'
				},
				{
					src: 'ticket-support-shortcuts.webp',
					alt: 'Ticket Support keyboard shortcuts modal showing dark and light theme variants',
					caption: 'Keyboard shortcuts overlay for power-user navigation'
				}
			],
			role: 'Fullstack developer',
			year: 2025
		}
	},
	{
		slug: 'newstyledirect',
		title: 'NewstyleDirect',
		type: 'wordpress',
		tier: 'flagship',
		imageUrl: 'newstyledirect.webp',
		url: 'https://newstyledirect.com.au/',
		detail: {
			summary:
				'WordPress commerce site for an Australian retail brand — custom theme, performance tuning, and ongoing product integrations. The public storefront sits at the center of a wider NewstyleDirect stack that includes internal ops tooling.',
			techStack: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'JavaScript'],
			problem: `The brand needed a reliable online storefront that could handle catalog updates, promotions, and regional shipping rules without slowing down day-to-day merchandising.\n\nPeak seasons exposed fragile admin workflows: bulk price changes, campaign landing pages, and shipping exceptions each required developer time. Store staff needed to publish confidently without breaking layout or checkout.`,
			solution: `Delivered a custom WordPress + WooCommerce build with a tailored theme, optimized asset loading, and admin workflows the client team can run themselves. Integrated internal tooling hooks for inventory and order flows used across the wider NewstyleDirect stack.\n\nACF-driven sections keep merchandising flexible while the theme enforces consistent product presentation. Asset loading and image discipline keep LCP reasonable on catalog-heavy pages. Shared plugin utilities reduce duplicate PHP across sibling properties so fixes ship once.`,
			screenshots: [
				{
					src: 'newstyledirect-home.webp',
					alt: 'NewstyleDirect storefront homepage',
					caption: 'Hero carousel featuring Versamax and seasonal promotions'
				},
				{
					src: 'newstyledirect-shop.webp',
					alt: 'NewstyleDirect WooCommerce shop',
					caption: 'Product catalog with filters and category navigation'
				},
				{
					src: 'newstyledirect.webp',
					alt: 'NewstyleDirect brand homepage overview',
					caption: 'Kitchenware, hardware, and outdoor product highlights'
				}
			],
			role: 'Lead developer',
			year: 2024
		}
	},
	{
		slug: 'universal-wp-plugin',
		title: 'Universal WP Plugin',
		type: 'wordpress',
		tier: 'flagship',
		imageUrl: 'universal-wp-plugin.webp',
		url: 'https://github.com/imtbndev/newstyledirect-universal-wp-plugin',
		detail: {
			summary:
				'Reusable WordPress plugin that standardizes integrations and admin utilities across multiple client sites in the NewstyleDirect ecosystem. One package replaces copy-pasted mu-plugins and one-off theme hacks.',
			techStack: ['WordPress', 'PHP', 'REST API', 'Composer'],
			problem: `Several WordPress properties duplicated the same custom logic — shipping helpers, admin tweaks, and API bridges — leading to drift and painful multi-site updates.\n\nA fix on one storefront did not guarantee the same behavior on another. Onboarding a new site meant re-scoping which snippets were "canonical" and which were stale forks buried in old themes.`,
			solution: `Packaged shared functionality into one versioned plugin with clear hooks and configuration. Sites opt in via Composer or standard WP install; fixes ship once and roll out consistently. Open-sourced on GitHub for transparency and reuse.\n\nREST bridges and admin utilities live behind documented hooks so themes stay presentation-focused. Composer installs give deterministic versions in CI; standard WP install remains supported for hosts without Composer. The plugin is the integration surface the internal SvelteKit tool and WooCommerce store both rely on.`,
			screenshots: [
				{
					src: 'universal-wp-plugin-repo.webp',
					alt: 'Universal WP Plugin GitHub repository',
					caption: 'Open-source plugin README and release history on GitHub'
				},
				{
					src: 'universal-wp-plugin.webp',
					alt: 'Universal WP Plugin repository and admin integration',
					caption: 'Plugin architecture shared across client WordPress installs'
				}
			],
			role: 'Plugin author',
			year: 2024,
			repoUrl: 'https://github.com/imtbndev/newstyledirect-universal-wp-plugin'
		}
	},
	{
		slug: 'migration-ci',
		title: 'Migration CI',
		type: 'wordpress-tool',
		imageUrl: 'migration-ci.webp',
		url: '/',
		comingSoon: true,
		detail: {
			summary:
				'CI pipeline tooling for repeatable WordPress site migrations — database sync, media handling, and environment promotion with guardrails. Targets the same multi-site hosting patterns used across NewstyleDirect properties.',
			techStack: ['WordPress', 'PHP', 'GitHub Actions', 'WP-CLI', 'Bash'],
			problem: `WordPress migrations between staging and production were manual, error-prone, and different on every project. Teams risked broken URLs, missing uploads, or partial database dumps during launches.\n\nEach launch invented its own checklist: search-replace scripts, rsync flags, and "did we remember uploads?" threads in chat. Rollback was rarely documented until something broke in production.`,
			solution: `Designing a migration CI workflow that standardizes export/import steps, validates checksums, and documents rollback paths. The tool will plug into existing NewstyleDirect hosting patterns so migrations become a repeatable pipeline instead of a one-off firefight.\n\nGitHub Actions will orchestrate WP-CLI export/import with explicit media sync and URL validation gates. Failed steps fail the job early so partial migrations do not reach production. The goal is a documented, repeatable promotion path any developer on the stack can run with confidence.`,
			screenshots: [
				{
					src: 'migration-ci.webp',
					alt: 'Migration CI pipeline concept',
					caption: 'Planned pipeline for staged WordPress migrations'
				}
			],
			role: 'Tooling developer',
			year: 2025
		}
	},
	{
		slug: 'internal-tool',
		title: 'Internal Tool',
		type: 'internal-app',
		tier: 'flagship',
		imageUrl: 'internal-tool.webp',
		url: 'https://tool.newstyledirect.au/',
		detail: {
			summary:
				'Internal operations app for the NewstyleDirect team — order visibility, inventory signals, and admin shortcuts tied to the retail stack. Staff use it daily instead of hopping between WooCommerce screens and spreadsheets.',
			techStack: ['SvelteKit', 'TypeScript', 'REST API', 'WordPress'],
			problem: `Store staff and ops relied on scattered spreadsheets and WooCommerce admin screens to reconcile orders and stock. Critical checks took too many clicks and lacked a single dashboard.\n\nQuestions like "is this SKU actually available?" or "where is this order stuck?" required exporting lists or opening multiple admin tabs. There was no lightweight view tuned to how the team actually works shifts.`,
			solution: `Built a focused internal app that surfaces live order and inventory data with role-based views. Reduced time-to-answer for common ops questions and connected back to the main WooCommerce store without exposing customer-facing complexity.\n\nThe SvelteKit UI calls WordPress and WooCommerce through the shared universal plugin APIs, so business rules stay centralized. Role-based screens hide customer-facing noise while keeping fulfillment signals up to date. Ops can answer routine questions in one place instead of reconstructing state from exports.`,
			screenshots: [
				{
					src: 'internal-tool-home.webp',
					alt: 'Internal Tool sign-in and landing',
					caption: 'Authenticated entry to the NewstyleDirect ops app'
				},
				{
					src: 'internal-tool.webp',
					alt: 'Internal Tool operations dashboard',
					caption: 'Ops dashboard for order and inventory overview'
				}
			],
			role: 'Fullstack developer',
			year: 2024
		}
	},
	{
		slug: 'kit502',
		title: 'Kit502',
		type: 'fullstack',
		imageUrl: 'kit502.webp',
		url: '#',
		comingSoon: true,
		detail: {
			summary:
				'Fullstack product in development — modern web app with authenticated workflows and a component-driven UI. Early focus is on auth, data modeling, and a UI shell that can grow without a rewrite.',
			techStack: ['SvelteKit', 'TypeScript', 'PostgreSQL'],
			problem: `The product needs a cohesive web experience with secure accounts, structured data, and room to grow features without rewriting the foundation.\n\nWithout a typed API boundary and consistent components, each new screen would reintroduce layout drift and duplicate validation logic.`,
			solution: `Scaffolding a SvelteKit app with typed API routes, auth-ready data models, and a design system aligned to the portfolio terminal aesthetic. Launching once core flows are stable and tested.\n\nPostgreSQL backs structured entities from day one so reporting and permissions do not require a later migration. Shared UI primitives match the terminal palette used on this portfolio for a coherent brand surface.`,
			screenshots: [
				{
					src: 'kit502.webp',
					alt: 'Kit502 product preview',
					caption: 'Early UI exploration for Kit502'
				}
			],
			role: 'Fullstack developer',
			year: 2025
		}
	},
	{
		slug: 'vaclock',
		title: 'Vaclock',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'newstyledirect.webp',
		url: 'https://vaclock.com.au/',
		detail: {
			summary:
				'WordPress product site for Vaclock — vacuum-storage brand in the NewstyleDirect family. Single-product storytelling, specs, and retail discovery before the v2 SvelteKit redesign shipped at v2.vaclock.com.au.',
			techStack: ['WordPress', 'PHP', 'WooCommerce', 'ACF'],
			problem:
				'Vaclock needed a credible product site that explained suction performance and accessories to Australian buyers without the overhead of a full multi-brand storefront.\n\nCampaign updates and mobile layouts were tied to the shared NewstyleDirect WordPress patterns, which slowed one-off brand tweaks.',
			solution:
				'Delivered a focused WooCommerce-backed WordPress build with ACF-driven product sections and shared plugin utilities from the NewstyleDirect stack. The site remains the baseline case study; vaclock-v2 documents the modern redesign on SvelteKit.\n\nOps and finance tooling in the NewstyleDirect hub still recognizes Vaclock as a first-class product line alongside Keepeez and VersaMax.',
			screenshots: [
				{
					src: 'newstyledirect.webp',
					alt: 'Vaclock WordPress product site',
					caption: 'Legacy Vaclock storefront (placeholder — capture vaclock.com.au)'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'nuwave-oxygen',
		title: 'NuWave Oxygen',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'nuwaveoxypure.webp',
		url: 'https://nuwaveoxypure.com.au/',
		detail: {
			summary:
				'WordPress site for NuWave OxyPure — Australian health-product brand focused on clear product education and trust. Buyers research technical specs before purchase, so clarity and credibility matter more than flashy merchandising.',
			techStack: ['WordPress', 'PHP', 'ACF', 'WooCommerce'],
			problem: `The brand needed a credible web presence that explained technical product benefits to Australian buyers while supporting enquiries and retail partnerships.\n\nDense spec sheets and compliance language were hard to present on mobile without overwhelming shoppers or burying the call to action.`,
			solution: `Delivered a responsive WordPress theme with structured product pages, FAQ blocks, and performance-focused assets. Content editors can update specs and compliance copy without developer involvement.\n\nACF modules separate education blocks from commerce templates so merchandising updates do not break explanatory content. Image formats and caching keep media-heavy product pages usable on Australian mobile networks.`,
			screenshots: [
				{
					src: 'nuwave-oxygen-home.webp',
					alt: 'NuWave OxyPure Australian storefront homepage',
					caption: 'Product-led homepage for the Australian market'
				},
				{
					src: 'nuwave-oxygen-product.webp',
					alt: 'NuWave OxyPure product detail page',
					caption: 'OxyPure air purifier specs, pricing, and purchase options'
				},
				{
					src: 'nuwaveoxypure.webp',
					alt: 'NuWave OxyPure brand overview',
					caption: 'Health-product positioning and trust-focused layout'
				}
			],
			role: 'WordPress developer',
			year: 2024
		}
	},
	{
		slug: 'alphapak-website',
		title: 'AlphaPak Website',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'alphapak.webp',
		url: 'https://alphapak.vn/',
		detail: {
			summary:
				'Corporate WordPress site for AlphaPak — Vietnamese packaging manufacturer showcasing capabilities and export readiness.',
			techStack: ['WordPress', 'PHP', 'ACF', 'JavaScript'],
			problem: `AlphaPak needed a bilingual-friendly structure to present product lines, certifications, and contact paths for B2B buyers researching packaging partners.`,
			solution: `Built a clean corporate theme with modular page sections for industries served, catalog highlights, and lead capture. Optimized images and caching for visitors browsing from industrial procurement teams.`,
			screenshots: [
				{
					src: 'alphapak-home.webp',
					alt: 'AlphaPak corporate homepage',
					caption: 'B2B packaging showcase and capability overview'
				},
				{
					src: 'alphapak.webp',
					alt: 'AlphaPak corporate site overview',
					caption: 'Export-ready manufacturer profile for Vietnamese buyers'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'an-thanh-commodity',
		title: 'An Thanh Commodity',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'anthanhcommodity.webp',
		url: 'https://anthanhcommodity.com.vn/',
		detail: {
			summary:
				'WordPress site for An Thanh Commodity — commodity trading company presenting services, markets, and company credentials.',
			techStack: ['WordPress', 'PHP', 'ACF'],
			problem: `Prospective partners had limited visibility into trading scope, compliance posture, and how to initiate contact — the old presence did not reflect the firm's scale.`,
			solution: `Implemented a professional WordPress build with service breakdowns, market focus areas, and structured contact flows. Editors maintain news and trade updates through familiar admin tools.`,
			screenshots: [
				{
					src: 'anthanhcommodity.webp',
					alt: 'An Thanh Commodity homepage',
					caption: 'Commodity trading services and company profile'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'bep-that',
		title: 'Bep That',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'bepthat.webp',
		url: 'https://bepthat.com/',
		detail: {
			summary:
				'WordPress site for Bep That — culinary brand combining recipes, product storytelling, and retail discovery.',
			techStack: ['WordPress', 'PHP', 'ACF', 'WooCommerce'],
			problem: `The brand wanted to merge content marketing with product sales, but their previous site separated blog and shop experiences awkwardly.`,
			solution: `Created an integrated WordPress + WooCommerce experience where editorial content drives product discovery. Category templates and reusable blocks keep the kitchen brand voice consistent across pages.`,
			screenshots: [
				{
					src: 'bep-that-home.webp',
					alt: 'Bep That homepage',
					caption: 'Culinary content and product discovery'
				},
				{
					src: 'bep-that-shop.webp',
					alt: 'Bep That WooCommerce shop',
					caption: 'Integrated store for kitchen products and accessories'
				},
				{
					src: 'bepthat.webp',
					alt: 'Bep That brand homepage overview',
					caption: 'Editorial recipes driving retail discovery'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'co-dong-son',
		title: 'Co Dong Son',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'codongson.webp',
		url: 'https://codongson.vn/',
		detail: {
			summary:
				'Corporate WordPress site for Co Dong Son — company profile, projects, and investor-facing information.',
			techStack: ['WordPress', 'PHP', 'ACF'],
			problem: `Stakeholders needed a authoritative digital profile with project history and governance information that could be updated as the business evolved.`,
			solution: `Delivered a structured corporate theme with timeline and project modules, leadership bios, and downloadable assets. Navigation prioritizes clarity for partners reviewing the company online.`,
			screenshots: [
				{
					src: 'co-dong-son-home.webp',
					alt: 'Co Dong Son corporate homepage',
					caption: 'Corporate profile and project highlights'
				},
				{
					src: 'codongson.webp',
					alt: 'Co Dong Son corporate site overview',
					caption: 'Investor-facing company information and leadership'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'fata-villa',
		title: 'Fata Villa',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'fatavilla.webp',
		url: 'https://fatavilla.com/',
		detail: {
			summary:
				'Hospitality WordPress site for Fata Villa — villa rentals, gallery, and booking enquiry flows.',
			techStack: ['WordPress', 'PHP', 'ACF', 'JavaScript'],
			problem: `Travelers researching stays could not easily compare villa options, view amenities, or submit booking requests from mobile devices.`,
			solution: `Built a visual-first WordPress theme with gallery grids, amenity breakdowns, and enquiry forms integrated to the owner's workflow. Performance tuning keeps image-heavy pages fast on mobile networks.`,
			screenshots: [
				{
					src: 'fatavilla.webp',
					alt: 'Fata Villa hospitality site',
					caption: 'Villa gallery and booking enquiry experience'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'gco-iarc-asia',
		title: 'GCO IARC Asia',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'gco-iarc-asia.webp',
		url: 'https://gco.iarc.asia/',
		detail: {
			summary:
				'Regional organization WordPress site for GCO IARC Asia — programs, publications, and event information.',
			techStack: ['WordPress', 'PHP', 'ACF'],
			problem: `The organization needed to publish research updates, event calendars, and member resources without a technical team maintaining static HTML.`,
			solution: `Implemented an accessible WordPress build with document libraries, event post types, and multilingual-ready structure. Staff publish announcements through admin workflows tuned to their content cadence.`,
			screenshots: [
				{
					src: 'gco-iarc-asia.webp',
					alt: 'GCO IARC Asia regional site',
					caption: 'Programs and publications hub'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'leaparfum',
		title: 'Leaparfum',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'leaparfum.webp',
		url: 'https://leaparfum.com/',
		detail: {
			summary:
				'WordPress retail site for Leaparfum — fragrance catalog, brand story, and store locator patterns.',
			techStack: ['WordPress', 'PHP', 'WooCommerce', 'ACF'],
			problem: `The fragrance line needed a premium-feel catalog that highlighted notes and collections while supporting online and retail partner discovery.`,
			solution: `Designed a WooCommerce-backed experience with collection landing pages, scent detail templates, and editorial lookbooks. Checkout and catalog rules align with regional retail partnerships.`,
			screenshots: [
				{
					src: 'leaparfum-home.webp',
					alt: 'Leaparfum fragrance retail homepage',
					caption: 'Premium fragrance brand landing and collections'
				},
				{
					src: 'leaparfum-shop.webp',
					alt: 'Leaparfum WooCommerce shop',
					caption: 'Catalog browsing for scents and gift sets'
				},
				{
					src: 'leaparfum.webp',
					alt: 'Leaparfum fragrance retail site',
					caption: 'Collection pages and product storytelling'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'mid-man',
		title: 'Mid-Man',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'mid-man.webp',
		url: 'https://mid-man.net/',
		detail: {
			summary:
				'Business WordPress site for Mid-Man — services overview, case highlights, and client contact funnel.',
			techStack: ['WordPress', 'PHP', 'ACF'],
			problem: `Mid-Man's services were hard to parse online; prospects bounced before understanding scope, pricing signals, or how to start a project.`,
			solution: `Rebuilt the site around clear service tiers, proof points, and a single primary contact path. Reusable sections let the team add case studies as new work ships.`,
			screenshots: [
				{
					src: 'mid-man-home.webp',
					alt: 'Mid-Man business homepage',
					caption: 'Services overview and primary contact funnel'
				},
				{
					src: 'mid-man-services.webp',
					alt: 'Mid-Man services page',
					caption: 'Service tiers, scope, and proof points for prospects'
				},
				{
					src: 'mid-man.webp',
					alt: 'Mid-Man business website',
					caption: 'Case highlights and project inquiry path'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'opk-edu-vn',
		title: 'OPK.edu.vn',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'opk-edu-vn.webp',
		url: 'https://opk.edu.vn/',
		detail: {
			summary:
				'Education WordPress site for OPK — course information, admissions guidance, and school news.',
			techStack: ['WordPress', 'PHP', 'ACF'],
			problem: `Prospective students and parents struggled to find program details, schedules, and admission steps across outdated static pages.`,
			solution: `Delivered an education-focused WordPress theme with program directories, announcement posts, and downloadable forms. Staff update intake periods and events without redeploying the site.`,
			screenshots: [
				{
					src: 'opk-edu-vn.webp',
					alt: 'OPK education website',
					caption: 'Programs and admissions information'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	},
	{
		slug: 'travelnow-vn',
		title: 'TravelNow VN',
		type: 'wordpress',
		tier: 'client',
		imageUrl: 'travelnow-vn.webp',
		url: 'https://travelnow-vn.com/',
		detail: {
			summary:
				'Travel WordPress site for TravelNow VN — tour packages, destination guides, and booking enquiries.',
			techStack: ['WordPress', 'PHP', 'ACF', 'JavaScript'],
			problem: `Tour offerings changed seasonally, but the previous site made it slow to publish new itineraries and capture leads from mobile travelers.`,
			solution: `Built a travel-focused WordPress experience with package templates, destination taxonomies, and enquiry forms wired to the agency inbox. Image-heavy layouts stay responsive through lazy loading and WebP assets.`,
			screenshots: [
				{
					src: 'travelnow-vn-home.webp',
					alt: 'TravelNow VN travel agency homepage',
					caption: 'Featured tours and destination discovery'
				},
				{
					src: 'travelnow-vn-tours.webp',
					alt: 'TravelNow VN tour listings',
					caption: 'Package catalog with seasonal itineraries'
				},
				{
					src: 'travelnow-vn.webp',
					alt: 'TravelNow VN travel agency site',
					caption: 'Tour packages and destination guides'
				}
			],
			role: 'WordPress developer',
			year: 2023
		}
	}
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
	return projects.map((p) => p.slug);
}

export function getProjectsWithDetail(): Project[] {
	return projects;
}
