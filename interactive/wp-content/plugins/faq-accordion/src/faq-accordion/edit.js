
import { __ } from '@wordpress/i18n';

import './editor.scss';

import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

	const { column } = attributes;
	const blockProps = useBlockProps({
		className: `has-${column}-columns`,
	});
 	const TEMPLATE = [
		["create-block/child-block"],
		["create-block/child-block"],
		["create-block/child-block"]
	];
//with the template default value can be set for accordian you can st 2 !
	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody>
					<RangeControl label={__('column ', 'faq-accordion')}
						onChange={(newColumn) => setAttributes({ column: newColumn })}
						value={column}
						min={2} max={5} />
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={['create-block/child-block']}
				template={TEMPLATE}
				// renderAppender={InnerBlocks.ButtonBlockAppender} with that can see the default button or border !
				orientation="vertically"
				templateLock={false}
 			/>
		</div>
	);
}
