import { getContext, setContext } from 'svelte';
import type { ConvexClient } from 'convex/browser';

import type { FunctionReference } from 'convex/server';
import { readable } from 'svelte/store';

const _contextKey = '$$_convexClient';

export const getConvexClientContext = (): ConvexClient => {
	const client = getContext(_contextKey) as ConvexClient | undefined;
	if (!client) {
		throw new Error(
			'No ConvexReactClient was found in Svelte context. Did you forget to wrap your component with ConvexClientProvider?'
		);
	}

	return client;
};

export const setConvexClientContext = (client: ConvexClient): void => {
	setContext(_contextKey, client);
};

export function useConvexClient(): ConvexClient {
	const queryClient = getConvexClientContext();
	return queryClient;
}

export function createQuery<Query extends FunctionReference<'query'>>(
	query: Query,
	args: Query['_args']
): Query['_returnType'] {
	const client = useConvexClient();

	let set: (data: Query['_returnType'] | undefined) => void;
	const sub = client.onUpdate(query, args, (result) => {
		set(result);
	});

	// TODO update (use a different store?) whenever query or args changes

	return readable(sub.getCurrentValue(), (_set) => {
		set = _set;
		return sub.unsubscribe;
	});
}
