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

export type Project = {
	slug: string;
	title: string;
	type: string;
	imageUrl: string;
	url: string;
	comingSoon?: boolean;
	detail: ProjectDetail;
};

export const projects: Project[] = [
	{
		slug: 'ticket-support',
		title: 'Ticket Support',
		type: 'fullstack',
		imageUrl: 'ticket.webp',
		url: 'https://helpdesk.codebyliam.com/',
		detail: {
			summary:
				'A lightweight helpdesk for tracking support tickets with real-time updates and a focused agent workflow.',
			techStack: ['SvelteKit', 'TypeScript', 'Supabase', 'Tailwind CSS'],
			problem: `Support requests were scattered across email threads and ad-hoc spreadsheets. There was no single place to see open issues, assign ownership, or close the loop with clients.`,
			solution: `Built a fullstack helpdesk with ticket creation, status tracking, and role-based views. Agents get a clear queue; clients get visibility without drowning in tooling. Deployed as a fast, prerender-friendly app backed by Supabase for auth and data.`,
			screenshots: [
				{
					src: 'ticket.webp',
					alt: 'Ticket Support dashboard overview',
					caption: 'Agent dashboard with open ticket queue'
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
		imageUrl: 'newstyledirect.webp',
		url: 'https://newstyledirect.com.au/',
		detail: {
			summary:
				'WordPress commerce site for an Australian retail brand — custom theme, performance tuning, and ongoing product integrations.',
			techStack: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'JavaScript'],
			problem: `The brand needed a reliable online storefront that could handle catalog updates, promotions, and regional shipping rules without slowing down day-to-day merchandising.`,
			solution: `Delivered a custom WordPress + WooCommerce build with a tailored theme, optimized asset loading, and admin workflows the client team can run themselves. Integrated internal tooling hooks for inventory and order flows used across the wider NewstyleDirect stack.`,
			screenshots: [
				{
					src: 'newstyledirect.webp',
					alt: 'NewstyleDirect storefront homepage',
					caption: 'Storefront homepage with product highlights'
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
		imageUrl: 'universal-wp-plugin.webp',
		url: 'https://github.com/imtbndev/newstyledirect-universal-wp-plugin',
		detail: {
			summary:
				'Reusable WordPress plugin that standardizes integrations and admin utilities across multiple client sites in the NewstyleDirect ecosystem.',
			techStack: ['WordPress', 'PHP', 'REST API', 'Composer'],
			problem: `Several WordPress properties duplicated the same custom logic — shipping helpers, admin tweaks, and API bridges — leading to drift and painful multi-site updates.`,
			solution: `Packaged shared functionality into one versioned plugin with clear hooks and configuration. Sites opt in via Composer or standard WP install; fixes ship once and roll out consistently. Open-sourced on GitHub for transparency and reuse.`,
			screenshots: [
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
				'CI pipeline tooling for repeatable WordPress site migrations — database sync, media handling, and environment promotion with guardrails.',
			techStack: ['WordPress', 'PHP', 'GitHub Actions', 'WP-CLI', 'Bash'],
			problem: `WordPress migrations between staging and production were manual, error-prone, and different on every project. Teams risked broken URLs, missing uploads, or partial database dumps during launches.`,
			solution: `Designing a migration CI workflow that standardizes export/import steps, validates checksums, and documents rollback paths. The tool will plug into existing NewstyleDirect hosting patterns so migrations become a repeatable pipeline instead of a one-off firefight.`,
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
		imageUrl: 'internal-tool.webp',
		url: 'https://tool.newstyledirect.au/',
		detail: {
			summary:
				'Internal operations app for the NewstyleDirect team — order visibility, inventory signals, and admin shortcuts tied to the retail stack.',
			techStack: ['SvelteKit', 'TypeScript', 'REST API', 'WordPress'],
			problem: `Store staff and ops relied on scattered spreadsheets and WooCommerce admin screens to reconcile orders and stock. Critical checks took too many clicks and lacked a single dashboard.`,
			solution: `Built a focused internal app that surfaces live order and inventory data with role-based views. Reduced time-to-answer for common ops questions and connected back to the main WooCommerce store without exposing customer-facing complexity.`,
			screenshots: [
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
				'Fullstack product in development — modern web app with authenticated workflows and a component-driven UI.',
			techStack: ['SvelteKit', 'TypeScript', 'PostgreSQL'],
			problem: `The product needs a cohesive web experience with secure accounts, structured data, and room to grow features without rewriting the foundation.`,
			solution: `Scaffolding a SvelteKit app with typed API routes, auth-ready data models, and a design system aligned to the portfolio terminal aesthetic. Launching once core flows are stable and tested.`,
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
		slug: 'nuwave-oxygen',
		title: 'NuWave Oxygen',
		type: 'wordpress',
		imageUrl: 'nuwaveoxypure.webp',
		url: 'https://nuwaveoxypure.com.au/',
		detail: {
			summary:
				'WordPress site for NuWave OxyPure — Australian health-product brand focused on clear product education and trust.',
			techStack: ['WordPress', 'PHP', 'ACF', 'WooCommerce'],
			problem: `The brand needed a credible web presence that explained technical product benefits to Australian buyers while supporting enquiries and retail partnerships.`,
			solution: `Delivered a responsive WordPress theme with structured product pages, FAQ blocks, and performance-focused assets. Content editors can update specs and compliance copy without developer involvement.`,
			screenshots: [
				{
					src: 'nuwaveoxypure.webp',
					alt: 'NuWave OxyPure homepage',
					caption: 'Product-led homepage for the Australian market'
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
					src: 'alphapak.webp',
					alt: 'AlphaPak corporate homepage',
					caption: 'B2B packaging showcase and capability overview'
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
					src: 'bepthat.webp',
					alt: 'Bep That homepage',
					caption: 'Culinary content and product discovery'
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
					src: 'codongson.webp',
					alt: 'Co Dong Son corporate site',
					caption: 'Corporate profile and project highlights'
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
					src: 'mid-man.webp',
					alt: 'Mid-Man business website',
					caption: 'Services overview and contact funnel'
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
