
import { __ } from '@wordpress/i18n';
import './editor.scss';


import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { name, bio } = attributes;

	return (
		<div {...blockProps}>
			<RichText
				tagName="h4"
				value={name}
				onChange={(newName) => setAttributes({ name: newName })}
				placeholder={__('Enter name...', 'faq-accordion')}
			/>
			<RichText
				tagName="p"
				value={bio}
				onChange={(newBio) => setAttributes({ bio: newBio })}
				placeholder={__('Enter bio...', 'faq-accordion')}
			/>
		</div>
	);
}   