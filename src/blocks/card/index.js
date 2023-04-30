import { registerBlockType } from "@wordpress/blocks";
// import { __ } from "@wordpress/i18n";

import blockMeta from "./metadata";
import edit from "./edit";
import save from "./save";


registerBlockType("fir-cards/card", {
	title: blockMeta.name,
	description: blockMeta.description,
	category: "fir-general",
	icon: 'smiley',
	// icon: <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 	<path d="M34.2222 12H7.77778C5.7 12 4 13.62 4 15.6V26.4C4 28.38 5.7 30 7.77778 30H34.2222C36.3 30 38 28.38 38 26.4V15.6C38 13.62 36.3 12 34.2222 12ZM35.1111 23.6C35.1111 24.68 34.3556 25.4 33.2222 25.4H8.77778C7.64444 25.4 6.88889 24.68 6.88889 23.6V16.6C6.88889 15.52 7.64444 14.8 8.77778 14.8H33.2222C34.3556 14.8 35.1111 15.52 35.1111 16.6V23.6Z" fill="#007CBA"/>
	// </svg>,
	keywords: blockMeta.keywords,

	attributes: blockMeta.attributes,
	edit,
	save
});

