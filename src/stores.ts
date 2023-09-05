import { writable } from 'svelte/store';
import { getStorageData } from './helpers/storage';

export const tokenStore = writable('');
export const dialogsStore = writable([]);

getStorageData('token', (result) => {
	tokenStore.set(result);
});

getStorageData('dialogs', (result) => {
	dialogsStore.set(result);
});
