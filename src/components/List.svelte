<script lang='ts'>
	import { Conversations, getAllConversationsApi, getConversationsApi } from '../api/getConversations';
	import { tokenStore } from '../stores';
	import { TARGET_DOMAIN } from '../consts';

	let data: Conversations | null | undefined = null;
	let { loaded: loadedDialogs, total: totalDialogs } = {
		loaded: 0,
		total: 0,
	};


	tokenStore.subscribe(async (token) => {
		if (token) {
			data = await getAllConversationsApi(token, (loaded, total) => {
				loadedDialogs = loaded;
				totalDialogs = total;
			});
		}
	});

	const navigate = (id: string) => {
		const url = `${TARGET_DOMAIN}/c/${id}`;

		chrome.tabs.update({ url });
	};
</script>

{#if $tokenStore}
	<div>
		{#if data}
			<ul>
				{#each data.items as item (item.id)}
					<li on:click={() => navigate(item.id)}>{item.title}</li>
				{/each}
			</ul>
		{:else}
			<p>Loading dialogs {loadedDialogs + '/' + totalDialogs}</p>
		{/if}
	</div>
{:else}
	<a href={chrome.runtime.getURL('options.html')} target='_blank'>
		Setup token
	</a>
{/if}
