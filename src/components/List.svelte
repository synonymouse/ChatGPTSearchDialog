<script lang='ts'>
	import { Conversations, getConversationsApi } from '../api/getConversations';
	import { tokenStore } from '../stores';

	let data: Conversations | null = null;


	tokenStore.subscribe(async (token) => {
		if (token) {
			data = await getConversationsApi(token);
		}
	});

	const navigate = (id: string) => {
		const url = `https://chat.openai.com/c/${id}`;

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
			<p>Loading...</p>
		{/if}
	</div>
{:else}
	<div>
		Установите токен
	</div>
{/if}
