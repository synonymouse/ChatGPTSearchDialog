<script>
	import { getConversationsApi } from '../api/getConversations';
	import { tokenStore } from '../stores';

	let data = null;


	tokenStore.subscribe(async (token) => {
		if (token) {
			data = await getConversationsApi(token);
		}
	});

	$: console.log(data, 'data');
</script>

{#if $tokenStore}
	<div>
		{#if data}
			<ul>
				{#each data as item (item.id)}
					<li>{item.name}</li>
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
