import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { color, backgroundcolor, content, image } = attributes;
	console.log('from   save .js', attributes);
	const blockprops = useBlockProps.save({
		className: 'my-description'
	});
	return (
		<div {...blockprops}>
			<img alt={image.alt} src={image.url} />
			{/* <RichText.Content
				style={{ color: color, backgroundColor: backgroundcolor }}
				tagName="p"
				value={content}
			/> */}

<InnerBlocks.Content />

		</div>
	);
}
