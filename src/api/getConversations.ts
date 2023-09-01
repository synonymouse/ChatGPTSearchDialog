import { MAGIC_OFFSET, TARGET_DOMAIN } from '../consts';

const maxLimit = 100;

export type Conversations = {
	has_missing_conversations: boolean;
	limit: number;
	offset: number;
	total: number;
	items: Array<{
		create_time: string;
		current_node: unknown;
		id: string;
		mapping: unknown;
		title: string;
		update_time: string;
	}>;
};

export const getConversationsApi = async (
	token: string,
	offset: number = 0,
	limit: number = maxLimit,
): Promise<Conversations | null> => {
	try {
		const response = await fetch(
			`${TARGET_DOMAIN}/backend-api/conversations?offset=${offset}&limit=${limit}&order=updated`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error(`Failed to fetch: ${response.status}`);
		}
	} catch (error) {
		console.log('Error:', error);
		return null;
	}
};

export const getAllConversationsApi = async (
	token: string,
	onProgress?: (loaded: number, total: number) => void,
): Promise<Conversations | null> => {
	let allConversations: Conversations | null = null;

	const fetchMoreConversations = async (
		totalConversations: number,
		offset: number = 0,
		loaded: number = 0,
	): Promise<Conversations | null> => {
		if (onProgress) {
			onProgress(loaded, totalConversations);
		}

		if (loaded >= totalConversations) {
			return allConversations;
		}

		const moreConversations = await getConversationsApi(token, offset);

		if (moreConversations) {
			if (!allConversations) {
				allConversations = moreConversations;
			} else {
				allConversations.items = allConversations.items.concat(moreConversations.items);
			}

			return await fetchMoreConversations(
				totalConversations,
				offset + maxLimit,
				allConversations.items.length,
			);
		}

		return allConversations;
	};

	const initialConversations = await getConversationsApi(token);

	if (!initialConversations) {
		return null;
	}

	if (initialConversations.total <= maxLimit) {
		if (onProgress) {
			onProgress(initialConversations.total, initialConversations.total);
		}
		return initialConversations;
	}

	allConversations = initialConversations;
	return await fetchMoreConversations(
		initialConversations.total - MAGIC_OFFSET,
		initialConversations.items.length,
		initialConversations.items.length,
	);
};
