<script lang='ts'>
	import { TARGET_DOMAIN } from '../consts';

	export let dialogs;

	const navigate = (id: string) => {
		const url = `${TARGET_DOMAIN}/c/${id}`;

		chrome.tabs.update({ url });
	};
</script>

<div>
	<ul>
		{#each dialogs as item (item.id)}
			<li on:click={() => navigate(item.id)}>{item.title}</li>
		{/each}
	</ul>
</div>
