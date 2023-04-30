

export const defaultAttributes = {
	content: 'Test content biatch!',
}


export const blockMeta = {
	slug: "fircards_card",
	name: "Card",
	description: "A a card container the controls how content is incrementally displayed.",

	keywords: [],

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: defaultAttributes.content
		},
	}
};

export default blockMeta;
