<script lang='ts'>
	import List from '../components/List.svelte';
	import Search from '../components/Search.svelte';
	import { setStorageData } from '../helpers/storage';
	import { dialogsStore, tokenStore } from '../stores';
	import { getAllConversationsApi } from '../api/getConversations';
	import Fuse from 'fuse.js';

	const fuseOptions = {
		includeScore: true,
		keys: [['title']],
	};

	let fuse = null;
	let dialogs;

	$: if ($dialogsStore) {
		fuse = new Fuse($dialogsStore, fuseOptions);
	}

	$: dialogs = $dialogsStore;

	let { loaded: loadedDialogs, total: totalDialogs } = {
		loaded: 0,
		total: 0,
	};

	const handleSearch = (event) => {
		const query = event.detail;

		dialogs = fuse!.search(query);

		const searchResults = fuse.search(query).map(result => result.item);
		dialogs = searchResults.length ? searchResults : $dialogsStore;
	};

	tokenStore.subscribe(async (token) => {
		if (token && !dialogs.length) {
			const data = await getAllConversationsApi(token, (loaded, total) => {
				loadedDialogs = loaded;
				totalDialogs = total;
			});

			if (data) {
				setStorageData('dialogs', data.items, () => {
					dialogsStore.set(data.items);
				});
			}
		}
	});

</script>

{#if $tokenStore}
	{#if dialogs}
		<Search on:search={handleSearch} />
		<List {dialogs} />
	{:else}
		<p>Loading dialogs {totalDialogs ? loadedDialogs + '/' + totalDialogs : ''}</p>
	{/if}
{:else}
	<a href={chrome.runtime.getURL('options.html')} target='_blank'>
		Setup token
	</a>
{/if}

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    min-width: 20rem;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h3 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 1.2rem;
    margin: 2rem auto;
  }

  h6 {
    font-size: 0.5rem;
    color: #333333;
    margin: 0.5rem;
  }

  a {
    font-size: 0.5rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
  }

  @media (min-width: 480px) {
    h3 {
      max-width: none;
    }
  }
</style>
