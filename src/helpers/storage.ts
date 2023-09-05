export const getStorageData = (name: string, cb?: (result: any) => void) =>
	chrome.storage.local.get([name], function (result) {
		if (cb) cb(result[name]);
		console.log(result[name], 'get storage data');
	});

export const setStorageData = (name: string, data: any, cb?: () => void) =>
	chrome.storage.local.set({ [name]: data }, function () {
		if (cb) cb();
		console.log(data, 'set storage data');
	});

export const removeStorageData = (name: string, cb?: () => void) =>
	chrome.storage.local.remove(name, function () {
		if (cb) cb();
		console.log(name, 'remove storage data');
	});
