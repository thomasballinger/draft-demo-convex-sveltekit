<script lang="ts">
	import { createQuery, useConvexClient } from '../lib/convex';
	import { api } from '../../convex/_generated/api.js';
	import type { Doc } from "../../convex/_generated/dataModel.js"

	export let initialMessages: Doc<"messages">[];

	let muteWords: string = '';
	let toSend: string = '';
	let author: string = 'me';
	let messagesStore;
	let staleMessages: Doc<"messages">[] | undefined = undefined;
	let isStale = false;
	let derived: Doc<"messages">[] = initialMessages;

	$: {
		const cur = $messagesStore;
		if (cur !== undefined) {
			staleMessages = cur;
			isStale = true;
		}
		const arg = {
			muteWords: muteWords.split(',').map(x => x.trim()).filter((x) => x)
		}
		messagesStore = createQuery(api.messages.list, arg);
		if ($messagesStore) {
			staleMessages = messagesStore;
			isStale = false;
		}
		derived = $messagesStore || staleMessages || initialMessages
	}


	const convex = useConvexClient();

	function onSubmit(e: SubmitEvent) {
		const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
		toSend = '';
		convex.mutation(api.messages.send, { author: data.author as string, body: data.body as string });
	}
</script>

<div class="chat">
	<label for="muteWords">
		Hide messages containing these words:
	</label>
	<input
		type="text"
		id="muteWords"
		name="muteWords"
		placeholder="vim, emacs"
		bind:value={muteWords}
	/>

	<form on:submit|preventDefault={onSubmit}>
		<input type="text" id="author" name="author" bind:value={author} />
		<input type="text" id="body" name="body" bind:value={toSend} />
		<button type="submit" disabled={!toSend}>Send</button>
	</form>
	{#if (derived) === undefined}
		Loading...
	{:else}
		<ul class="messages" class:stale={isStale}>
			<ul>
				{#each derived as message}
					<li>
						<span>{message.author}</span>
						<span>{message.body}</span>
						<span>{new Date(message._creationTime).toLocaleString()}</span>
					</li>
				{/each}
			</ul>
		</ul>
	{/if}
</div>

<style>
	.chat {
		display: flex;
		align-items: center;
		flex-direction: column;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
		max-width: 100%;
	}

	.stale {
		color: darkgray;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-width: 100%;
	}

	li {
		display: flex;
		width: 100%;
		gap: 1rem;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	li span:nth-child(1) {
		flex: 0 0 100px;
		overflow-wrap: break-word;
		min-width: 0;
		font-weight: bold;
	}
	li span:nth-child(2) {
		flex: 1 0 160px;
		overflow-wrap: break-word;
		min-width: 0;
	}
	li span:nth-child(3) {
		flex: 0 0;
		white-space: nowrap;
	}

	button {
		padding: 0.3rem;
		margin: 0.2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
	}

	button:hover {
		background-color: var(--color-bg-1);
	}
	button:active {
		opacity: .6;
	}

	form {
		display: flex;
		align-items: center;
		max-width: 500px;
	}

	input#muteWords {
		width: 40%;
		max-width: 400px;
		min-width: 200px;
	}

	form input {
		margin: 4px;
	}
</style>
