import { getContext, setContext } from 'svelte';
import type { ConvexReactClient } from 'convex/react';

import type { FunctionReference } from 'convex/server';
import { readable } from 'svelte/store';

const _contextKey = '$$_convexClient';

export const getConvexClientContext = (): ConvexReactClient => {
	const client = getContext(_contextKey) as ConvexReactClient | undefined;
	if (!client) {
		throw new Error(
			'No ConvexReactClient was found in Svelte context. Did you forget to wrap your component with ConvexClientProvider?'
		);
	}

	return client;
};

export const setConvexClientContext = (client: ConvexReactClient): void => {
	setContext(_contextKey, client);
};

export function useConvexClient(): ConvexReactClient {
	const queryClient = getConvexClientContext();
	return queryClient;
}

export function createQuery<Query extends FunctionReference<'query'>>(
	query: Query,
	args: Query['_args']
): Query['_returnType'] {
	const client = useConvexClient();

	let set: (data: Query['_returnType'] | undefined) => void;
	const watch = client.watchQuery(query, args);
	const unsubscribe = watch.onUpdate(() => {
		set(watch.localQueryResult());
	});

	// TODO update (use a different store?) whenever query or args changes

	return readable(watch.localQueryResult(), (_set) => {
		set = _set;
		return unsubscribe;
	});
}
