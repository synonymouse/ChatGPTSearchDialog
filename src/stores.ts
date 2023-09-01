import { writable } from 'svelte/store';
import { getStorageData } from './helpers/storage';

export const tokenStore = writable('');

getStorageData('token', (result) => {
	tokenStore.set(result || '');
});
