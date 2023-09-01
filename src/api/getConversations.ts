export const getConversationsApi = async (token: string) => {
	try {
		const response = await fetch(
			'https://chat.openai.com/backend-api/conversations?offset=0&limit=100&order=updated',
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
