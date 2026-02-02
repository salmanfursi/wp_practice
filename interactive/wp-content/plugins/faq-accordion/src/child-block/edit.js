
import { __ } from '@wordpress/i18n';
import './editor.scss';

import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, InspectorControls, store } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	people as imageIcon, dashicons_facebook
} from '@wordpress/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextControl, SelectControl, Icon } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { usePrevious } from '@wordpress/compose';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const blockProps = useBlockProps();
	const { name, bio, url, alt, id, sizeSlug, socialLinks } = attributes;
	const [blobURL, setBlobURL] = useState(null);

	const prevURL = usePrevious(url);

	// console.log('social link is here :', socialLinks[0].icon);
	console.log('icons-----------||', icons);



	useEffect(() => {
		// Only revoke if the URL has actually changed to a permanent one
		if (blobURL && !isBlobURL(url)) {
			revokeBlobURL(blobURL);
			setBlobURL(undefined);
		}
	}, [url, blobURL]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (blobURL) revokeBlobURL(blobURL);
		};
	}, [blobURL]);

	const onSelectImage = (image) => {
		if (isBlobURL(image.url)) {
			setBlobURL(image.url); // 👈 STORE THE BLOB
		}
		setAttributes({ url: image.url, alt: image.alt, id: image.id, sizeSlug: 'full' });
	}

	const onSelectUrl = (newUrl) => {
		setAttributes({
			url: newUrl,
			id: undefined,
			alt: '',
			sizeSlug: 'full'
		});
	};

	const onRemoveUrl = () => {
		setAttributes({ url: null, alt: '', id: null })
	}
	const mediaError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	}
	//image size options --------------------------
	const imageObject = useSelect(
		(select) => {
			return id ? select('core').getEntityRecord('postType', 'attachment', id) : null;
		},
		[id]
	);

	// 1. Dropdown Options (Save the SLUG as the value)
	const getImageSizeOptions = () => {
		if (!imageObject?.media_details?.sizes) return [];
		return Object.keys(imageObject.media_details.sizes).map((slug) => ({
			label: slug.toUpperCase(),
			value: slug, // Saving "thumbnail", "medium", etc.
		}));
	};

	// 2. The Change Handler
	const onChangeImageSize = (newSlug) => {
		const newURL = imageObject.media_details.sizes[newSlug].source_url;
		setAttributes({
			sizeSlug: newSlug, // Pro: Save the label
			url: newURL        // Preview: Update the editor view
		});
	};

	const titleInputRef = useRef(null);
	// 2. The Focus Logic
	useEffect(() => {
		if (id && !prevURL) {
			titleInputRef.current.focus();
		}
	}, [url]);

	return (
		<>
			{/* this BlockControls use to put the image upload feature at the toolbar  */}
			{url &&
				<BlockControls group='inline'>
					<MediaReplaceFlow
						name={__('replace image', 'child-block')}
						onSelect={onSelectImage}
						onError={mediaError}
						onSelectURL={onSelectUrl}
						accept="image/*"
						allowedTypes={['image']}
						mediaId={id}
						mediaURL={url}
					/>
					<ToolbarButton onClick={onRemoveUrl}>
						{__('remove image', 'child-block')}
					</ToolbarButton>
				</BlockControls>
			}
			{/* id say that whil the condition meet then show the alt text modifier in the sidebar ! */}

			<InspectorControls>
				<PanelBody initialOpen={true}>
					{url && (
						<SelectControl
							label={__('Image Size', 'team-members')}
							options={getImageSizeOptions()}
							value={sizeSlug}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) &&
						<TextControl
							label={__('Image Alt Text', 'child-block')}
							value={alt}
							onChange={(val) => setAttributes({ alt: val })}
							help="Describe the purpose of the image for accessibility."
						/>}

				</PanelBody>
			</InspectorControls>


			<div {...blockProps}>
				{
					url &&
					<div className={`wp-block-create-block-child-block-img${isBlobURL(url) ? ' is-loading' : ''} `}>
						<img src={url} alt={alt} id={id} style={{ width: '100%' }} />
						{isBlobURL(url) && <Spinner />}
					</div>
				}

				<MediaPlaceholder
					// icon="format-image"
					icon={imageIcon} // Use the imported component here
					labels={{
						title: __('Profile Image', 'faq-accordion'),
						instructions: __('Upload or select an image', 'faq-accordion'),
					}}
					onSelect={onSelectImage}
					onError={mediaError}
					onSelectURL={onSelectUrl}
					accept="image/*"
					allowedTypes={['image']}
					multiple={false}
					disableMediaButtons={url}
					notices={noticeUI}
				/>
				<RichText
					tagName="h4"
					value={name}
					onChange={(newName) => setAttributes({ name: newName })}
					placeholder={__('Enter name...', 'faq-accordion')}
					ref={titleInputRef}
				/>
				<RichText
					tagName="p"
					value={bio}
					onChange={(newBio) => setAttributes({ bio: newBio })}
					placeholder={__('Enter bio...', 'faq-accordion')}
				/>

				<div className="wp-block-blocks-course-team-member-social-links">
					<ul>
						<li>
							<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
								<span className="dashicons dashicons-facebook"></span>
								<Icon icon={dashicons_facebook}/>
							</a>
						</li>
						<li>
							<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
								<span className="dashicons dashicons-instagram"></span>
							</a>
						</li>
					</ul>
				</div>


			</div ></>
	);
}
export default withNotices(Edit)