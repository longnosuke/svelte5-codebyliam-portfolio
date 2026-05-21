<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import { site } from '$lib/data/site';
	import { contactSeo } from '$lib/seo';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Github from '@lucide/svelte/icons/github';
	import Linkedin from '@lucide/svelte/icons/linkedin';
	import Mail from '@lucide/svelte/icons/mail';

	const channels = [
		{
			proto: 'mailto',
			label: 'Primary inbox',
			value: site.email,
			href: `mailto:${site.email}`,
			external: false,
			icon: Mail
		},
		{
			proto: 'https',
			label: 'LinkedIn',
			value: 'liamnguyen-dev',
			href: site.linkedinUrl,
			external: true,
			icon: Linkedin
		},
		{
			proto: 'https',
			label: 'GitHub',
			value: 'imtbndev',
			href: site.githubUrl,
			external: true,
			icon: Github
		},
		{
			proto: 'https',
			label: 'Blog',
			value: 'blog.codebyliam.com',
			href: site.blogUrl,
			external: true,
			icon: BookOpen
		}
	] as const;
</script>

<SeoHead {...contactSeo} />

<div class="page-shell">
	<TerminalWindow
		class="terminal--contact"
		title="~/contact"
		command="ssh liam@inbox"
		split
		statusDot
	>
		{#snippet aside()}
			<div class="contact-aside">
				<div class="contact-radar" aria-hidden="true">
					<span class="contact-radar__ring contact-radar__ring--3"></span>
					<span class="contact-radar__ring contact-radar__ring--2"></span>
					<span class="contact-radar__ring contact-radar__ring--1"></span>
					<span class="contact-radar__core"></span>
				</div>
				<dl class="contact-signal">
					<div class="contact-signal__row">
						<dt>host</dt>
						<dd>reachable</dd>
					</div>
					<div class="contact-signal__row">
						<dt>mail</dt>
						<dd>open</dd>
					</div>
					<div class="contact-signal__row">
						<dt>tz</dt>
						<dd>ICT · UTC+7</dd>
					</div>
					<div class="contact-signal__row">
						<dt>reply</dt>
						<dd>~2 business days</dd>
					</div>
				</dl>
			</div>
		{/snippet}

		{#snippet footer()}
			<p class="contact-foot">
			Cruising mode ...
			</p>
		{/snippet}

		<p class="eyebrow">open channel</p>
		<h1 class="terminal__title contact__title">Say hello</h1>
		<p class="contact__lead">
			No forms and no bots in the loop. Pick a channel below and tell me what you are building. I read
			every message myself.
		</p>

		<ul class="channels" aria-label="Ways to reach Liam">
			{#each channels as channel}
				{@const Icon = channel.icon}
				<li>
					<a
						class="channel"
						href={channel.href}
						{...(channel.external
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {})}
						aria-label="{channel.label}: {channel.value}"
					>
						<span class="channel__icon" aria-hidden="true">
							<Icon size={18} strokeWidth={2} />
						</span>
						<span class="channel__body">
							<span class="channel__proto">{channel.proto}://</span>
							<span class="channel__label">{channel.label}</span>
							<span class="channel__value">{channel.value}</span>
						</span>
						<span class="channel__arrow" aria-hidden="true">
							<ArrowRight size={16} strokeWidth={2} />
						</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="contact__actions">
			<a class="btn btn--primary" href="mailto:{site.email}">
				<Mail size={18} strokeWidth={2} aria-hidden="true" />
				compose mail
			</a>
			<a class="btn" href="/portfolio">cd ./work</a>
			<a class="btn" href="/about">cat profile.md</a>
		</div>
	</TerminalWindow>
</div>

<style>
	:global(.terminal--contact.terminal--split .terminal__aside) {
		align-items: stretch;
		justify-content: flex-start;
	}

	@media (max-width: 899px) {
		:global(.terminal--contact.terminal--split .terminal__aside) {
			order: -1;
			min-height: auto;
			max-height: none;
		}
	}

	@media (min-width: 900px) {
		:global(.terminal--contact.terminal--split .terminal__aside) {
			position: sticky;
			top: 0;
		}
	}

	.contact__title {
		margin-bottom: 0.5rem;
	}

	.contact__lead {
		margin: 0 0 clamp(1.25rem, 3vw, 1.5rem);
		max-width: 46ch;
		line-height: 1.7;
		color: var(--color-text-muted);
	}

	.channels {
		list-style: none;
		margin: 0 0 clamp(1.25rem, 3vw, 1.5rem);
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.channel {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.85rem 1rem;
		min-height: 3.25rem;
		padding: 0.9rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-terminal);
		background: rgba(0, 0, 0, 0.2);
		color: var(--color-text);
		transition:
			border-color 0.22s cubic-bezier(0.25, 1, 0.5, 1),
			background 0.22s cubic-bezier(0.25, 1, 0.5, 1),
			color 0.22s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.channel:hover {
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
		color: var(--color-text);
	}

	.channel:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
	}

	@media (hover: none), (pointer: coarse) {
		.channel:hover {
			border-color: var(--color-border);
			background: rgba(0, 0, 0, 0.2);
		}

		.channel:active {
			border-color: var(--color-accent);
			background: var(--color-accent-soft);
		}
	}

	.channel__icon {
		display: flex;
		color: var(--color-accent);
	}

	.channel__body {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.channel__proto {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		letter-spacing: 0.02em;
	}

	.channel__label {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}

	.channel__value {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-accent);
		overflow-wrap: anywhere;
	}

	.channel__arrow {
		display: flex;
		flex-shrink: 0;
		color: var(--color-text-muted);
		transition: color 0.22s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.channel:hover .channel__arrow {
		color: var(--color-accent);
	}

	.contact__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-bottom: 0.25rem;
	}

	.contact-aside {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		width: 100%;
		min-width: 0;
	}

	@media (max-width: 899px) {
		.contact-aside {
			display: grid;
			grid-template-columns: min(5.75rem, 28vw) minmax(0, 1fr);
			align-items: center;
			gap: 1rem 1.15rem;
		}
	}

	.contact-radar {
		position: relative;
		width: min(100%, 9.5rem);
		aspect-ratio: 1;
		margin: 0 auto;
		flex-shrink: 0;
	}

	@media (max-width: 899px) {
		.contact-radar {
			width: 100%;
			max-width: 5.75rem;
			margin: 0;
		}
	}

	.contact-radar__ring {
		position: absolute;
		inset: 0;
		border: 1px solid var(--color-border);
		border-radius: 50%;
		opacity: 0.55;
	}

	.contact-radar__ring--2 {
		inset: 18%;
		opacity: 0.7;
	}

	.contact-radar__ring--1 {
		inset: 36%;
		border-color: var(--color-accent-soft);
		opacity: 0.85;
	}

	.contact-radar__core {
		position: absolute;
		inset: 44%;
		border-radius: 50%;
		background: var(--color-accent);
		box-shadow: 0 0 18px var(--color-accent-soft);
		animation: pulse-core 2.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
	}

	@keyframes pulse-core {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.75;
			transform: scale(0.92);
		}
	}

	.contact-signal {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		min-width: 0;
	}

	.contact-signal__row {
		display: grid;
		grid-template-columns: minmax(3.25rem, auto) minmax(0, 1fr);
		gap: 0.5rem 0.75rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.contact-signal__row:last-child {
		border-bottom: none;
	}

	.contact-signal dt {
		margin: 0;
		color: var(--color-text-muted);
	}

	.contact-signal dd {
		margin: 0;
		color: var(--color-text);
		text-align: left;
		overflow-wrap: anywhere;
	}

	@media (min-width: 900px) {
		.contact-signal dd {
			text-align: right;
		}
	}

	.contact-foot {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-align: center;
		line-height: 1.55;
		max-width: 52ch;
		margin-inline: auto;
		text-wrap: balance;
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-radar__core {
			animation: none;
		}
	}
</style>
