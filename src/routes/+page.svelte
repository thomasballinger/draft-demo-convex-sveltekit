<script lang="ts">
	import Chat from './Chat.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import convex_logo from '$lib/images/convex.svg';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		to SvelteKit with<br />

		<span class="convex-welcome">
			<a href="https://convex.dev">
				<img src={convex_logo} alt="Convex" />
			</a>
		</span>
		<span class="welcome-convex" />
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Chat initialMessages={data.messages} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
