

// import { registerBlockType } from '@wordpress/blocks';
// import { useBlockProps } from '@wordpress/block-editor';
// import Edit from './edit';
// import save from './save';
// import metadata from './block.json';
// const deprecatedV1 = {
// 	attributes: {
// 		text: { type: 'string', default: 'My Info – hello from the saved content!' },
// 		heading: { type: 'string', default: 'heading' },
// 	},

// 	migrate({ text, heading }) {
// 		return {
// 			heading,
// 			content: text,
// 		};
// 	},

// 	save({ attributes }) {
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h>{attributes.heading}</h>
// 				<p>{attributes.text}</p>
// 			</div>
// 		);
// 	},
// };

// const deprecatedV2 = {
// 	attributes: {
// 		heading: { type: 'string', selector: 'h2' },
// 		text: { type: 'string', selector: 'p' },
// 		content2: { type: 'string', selector: 'div' }
// 	},
// 	migrate({ heading, text, content }) {
// 		return {
// 			heading,
// 			text,
// 			content2: content || 'Default content'
// 		};
// 	},
// 	save({ attributes }) {
// 		const { heading, text, content2 } = attributes;
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading}</h2>
// 				<p>{text}</p>
// 				<div>{content2}</div>
// 			</div>
// 		);
// 	}
// };

// const deprecatedV3 = {
// 	save({ attributes }) {
// 		const { heading, text, content } = attributes;
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading || 'Default Heading'}</h2>
// 				<p>{text || 'Default text'}</p>
// 				<div>{content || 'Default content'}</div>
// 			</div>
// 		);
// 	}
// };

// const deprecatedV4 = {
// 	attributes: {
// 		heading: { type: 'string', selector: 'h2' },
// 		text: { type: 'string', selector: 'p' },
// 		content: { type: 'string', selector: 'div' },
// 		content2: { type: 'string', selector: 'p' },
// 		content5: { type: 'string', selector: 'p' },
// 	},
// 	migrate({ heading, text, content, content2, content5 }) {
// 		return {
// 			heading,
// 			text,
// 			content9: `${content || ''} ${content2 || ''} ${content5 || ''}`.trim(),
// 		};
// 	},
// 	save({ attributes }) {
// 		const { heading, text, content, content5 } = attributes || {};
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading || 'Default Heading'}</h2>
// 				<p>{text || 'Default text'}</p>
// 				<div>{content || 'Default content'}</div>
// 				<div>{content5 || ' content no 5 !'}</div>
// 			</div>
// 		)
// 	}
// };





// registerBlockType(metadata.name, {
// 	edit: Edit,
// 	save,
// 	deprecated: [deprecatedV1, deprecatedV2, deprecatedV3, deprecatedV4],
// });







import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';


registerBlockType(metadata.name, {
	edit: Edit,
	save,
	attributes: {
		title: {
			type: 'string',
			default: 'default content is here !'
		}
	}
});
