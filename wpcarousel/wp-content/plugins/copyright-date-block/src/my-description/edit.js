import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	MediaUpload, MediaUploadCheck,
	InnerBlocks
} from '@wordpress/block-editor';
import './editor.scss';
import { ColorPicker } from '@wordpress/components';
import { PanelBody, Button } from '@wordpress/components';

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { color, backgroundcolor, content, image } = attributes;
	console.log('form edit js wanna see the image url !', image);
	const ALLOWED_MEDIA_TYPES = ['image'];


	const blockprops = useBlockProps({
		className: 'my-description'
	});
	const ALLOWED_BLOCKS = ['core/image', 'core/paragraph'];
		// if you put it empty it jsut show column by default to chose ok 
	const TEMPLATE = [['core/columns', {}, [
		['core/column', {}, [
			['core/image',{
				lock:{
					remove:false,
					move:false
				}
			}],
		]],
		['core/column', {}, [
			['core/paragraph', { placeholder: 'Enter side content...' }],
		]],
		['core/column', {}, [
			['core/list', { placeholder: 'Enter side content...' }],
		]],
	]]];
	return (
		<div {...blockprops}>
			<InspectorControls>
				<PanelBody
					title={__('Color Settings', 'src/my-description')}
				>
					<label>Background Color </label>
					<ColorPicker
						color={backgroundcolor}
						onChange={(newBackgroundcolor) =>
							setAttributes({
								backgroundcolor: newBackgroundcolor
							})
						}
						enableAlpha
					/>
					<label>color</label>
					<ColorPicker
						color={color}
						onChange={(newColor) =>
							setAttributes({ color: newColor })
						}
						enableAlpha
					/>
				</PanelBody>
			</InspectorControls>

			{/* media upload  */}
			{/* this is for upload image  */}

			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => setAttributes({ image: media })}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={image.url}
					render={({ open }) => (
						<div onDoubleClick={open} >
							{image ? (
								<img src={image.url} alt={image.alt} style={{ width: '100%' }} />
							) : (
								<Button onClick={open}>Open Media Library</Button>
							)}
						</div>
					)}
				/>
			</MediaUploadCheck>


			{/* <RichText
				style={{ color: color, backgroundColor: backgroundcolor }}
				tagName="p"
				value={content}
				allowedFormats={['core/bold', 'core/italic']}
				onChange={(content) => setAttributes({ content })}
				placeholder={__('Heading content placeholder...')}
			/> */}

			{/* for use other block inside my block i can fix also that how many block it can use with alloweed block etc or do not use allowedblock to avoid the control ! */}


			{/* <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } /> */}


			{/* we could use template as innerblock its actually a template of block with placeholder that jsut click and block will appear ok ! */}

			<InnerBlocks
				template={TEMPLATE} templateLock="all"
			/>


		</div>
	);
}
