<script lang='ts'>
	import { tokenStore } from '../stores';
	import { removeStorageData, setStorageData } from '../helpers/storage';

	let tokenValue = '';

	const saveToken = () => {
		setStorageData('token', tokenValue, () => tokenStore.update((token) => token = tokenValue));
	};

	const resetToken = () => {
		removeStorageData('token', () => tokenStore.update((token) => token = ''));
	};

</script>

<main>
	{#if $tokenStore}
		<div>
			<p>Current token: {$tokenStore}</p>
			<button on:click={resetToken}>Reset Token</button>
		</div>
	{:else}
		<div>
			<input type='text' placeholder='Enter your token here' bind:value={tokenValue} />
			<button on:click={saveToken}>Save Token</button>
		</div>
	{/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
