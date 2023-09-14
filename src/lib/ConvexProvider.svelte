<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { ConvexClient } from 'convex/browser';
	import { setConvexClientContext } from './convex';

	// This is like a default value, maybe this expression never gets evaluated?
	export let client: ConvexClient;

	onMount(() => {
		// Is this where we're supposed to build the client?
	});

	setConvexClientContext(client);

	onDestroy(() => {
		client.close();
	});
</script>

<slot />
