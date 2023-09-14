<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { env } from '$env/dynamic/public';
	import { browser } from '$app/environment';

	import { ConvexClient } from 'convex/browser';

	import ConvexProvider from '../lib/ConvexProvider.svelte';

	const client = new ConvexClient(env.PUBLIC_CONVEX_URL!, {disabled: !browser});
</script>

<div class="app">
	<Header />

	<main>
		<ConvexProvider {client}>
			<slot />
		</ConvexProvider>
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
