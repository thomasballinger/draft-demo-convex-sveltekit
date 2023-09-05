<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { ConvexReactClient } from 'convex/react';
	import { setConvexClientContext } from './convex';

	// This is like a default value, maybe this expression never gets evaluated?
	export let client: ConvexReactClient;

	onMount(() => {
		// Is this where we're supposed to build the client?
	});

	setConvexClientContext(client);

	onDestroy(() => {
		client.close();
	});
</script>

<slot />
