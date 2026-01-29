
import { __ } from '@wordpress/i18n';
import './editor.scss';

import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';
import { people as imageIcon } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import { useState } from 'react';
import { ToolbarButton } from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const blockProps = useBlockProps();
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState(null);

	console.log('Current image URL:', isBlobURL(url));
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

		setAttributes({ url: image.url, alt: image.alt, id: image.id });
	}
	const onSelectUrl = (newUrl) => {
		console.log('Selected image URL:', newUrl);
		setAttributes({ url: newUrl, alt: '', id: undefined })
		// for download the image and use it !
		// sideloadImage(newUrl);
	}
	const onRemoveUrl = () => {
		setAttributes({ url: null, alt: '', id: null })
	}
	const mediaError = (err) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(err);
	}

	const sideloadImage = (externalUrl) => {
		console.log('Sideload image:', externalUrl);
    // Show a loading state or spinner if you want
    apiFetch({
        path: '/wp/v2/media',
        method: 'POST',
        data: {
            url: externalUrl, // WordPress REST API can handle 'url' to sideload
            status: 'publish',
        },
    }).then((image) => {
		console.log('Sideload downloaded image:', image);
        // Now you have a REAL ID and REAL local URL with srcset!
        setAttributes({
            url: image.source_url,
            id: image.id,
            alt: image.alt_text || '',
        });
    }).catch((err) => {
        mediaError(err);
    });
};

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
			<div {...blockProps}>
				{
					url &&
					<div className={`wp-block-create-block-child-block-img${isBlobURL(url) ? ' is-loading' : ''} `}>
						<img src={url} alt={alt} id={id} style={{ width: '100%'}} />
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
				/>
				<RichText
					tagName="p"
					value={bio}
					onChange={(newBio) => setAttributes({ bio: newBio })}
					placeholder={__('Enter bio...', 'faq-accordion')}
				/>
			</div ></>
	);
}
export default withNotices(Edit)