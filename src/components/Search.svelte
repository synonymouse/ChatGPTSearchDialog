<script lang='ts'>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const handleInput = (event) => {
		dispatch('search', event.target.value);
	};
</script>

<input placeholder='Search...' on:input={handleInput} />
