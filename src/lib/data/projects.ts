export type Project = {
	title: string;
	type: string;
	imageUrl: string;
	url: string;
	comingSoon?: boolean;
};

export const projects: Project[] = [
	{
		title: 'Ticket Support',
		type: 'fullstack',
		imageUrl: 'ticket.webp',
		url: 'https://helpdesk.codebyliam.com/'
	},
	{
		title: 'NewstyleDirect',
		type: 'wordpress',
		imageUrl: 'newstyledirect.webp',
		url: 'https://newstyledirect.com.au/'
	},
	{
		title: 'Universal WP Plugin',
		type: 'wordpress',
		imageUrl: 'universal-wp-plugin.webp',
		url: 'https://github.com/imtbndev/newstyledirect-universal-wp-plugin'
	},
	{
		title: 'Migration CI',
		type: 'wordpress-tool',
		imageUrl: 'migration-ci.webp',
		url: '/',
		comingSoon: true
	},
	{
		title: 'Internal Tool',
		type: 'internal-app',
		imageUrl: 'internal-tool.webp',
		url: 'https://tool.newstyledirect.au/'
	},
	{
		title: 'Kit502',
		type: 'fullstack',
		imageUrl: 'kit502.webp',
		url: '#',
		comingSoon: true
	},
	{
		title: 'NuWave Oxygen',
		type: 'wordpress',
		imageUrl: 'nuwaveoxypure.webp',
		url: 'https://nuwaveoxypure.com.au/'
	},
	{
		title: 'AlphaPak Website',
		type: 'wordpress',
		imageUrl: 'alphapak.webp',
		url: 'https://alphapak.vn/'
	},
	{
		title: 'An Thanh Commodity',
		type: 'wordpress',
		imageUrl: 'anthanhcommodity.webp',
		url: 'https://anthanhcommodity.com.vn/'
	},
	{
		title: 'Bep That',
		type: 'wordpress',
		imageUrl: 'bepthat.webp',
		url: 'https://bepthat.com/'
	},
	{
		title: 'Co Dong Son',
		type: 'wordpress',
		imageUrl: 'codongson.webp',
		url: 'https://codongson.vn/'
	},
	{
		title: 'Fata Villa',
		type: 'wordpress',
		imageUrl: 'fatavilla.webp',
		url: 'https://fatavilla.com/'
	},
	{
		title: 'GCO IARC Asia',
		type: 'wordpress',
		imageUrl: 'gco-iarc-asia.webp',
		url: 'https://gco.iarc.asia/'
	},
	{
		title: 'Leaparfum',
		type: 'wordpress',
		imageUrl: 'leaparfum.webp',
		url: 'https://leaparfum.com/'
	},
	{
		title: 'Mid-Man',
		type: 'wordpress',
		imageUrl: 'mid-man.webp',
		url: 'https://mid-man.net/'
	},
	{
		title: 'OPK.edu.vn',
		type: 'wordpress',
		imageUrl: 'opk-edu-vn.webp',
		url: 'https://opk.edu.vn/'
	},
	{
		title: 'TravelNow VN',
		type: 'wordpress',
		imageUrl: 'travelnow-vn.webp',
		url: 'https://travelnow-vn.com/'
	}
];
