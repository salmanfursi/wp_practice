
import { __ } from '@wordpress/i18n';
import './editor.scss';

import { useBlockProps, RichText, MediaPlaceholder, BlockControls, MediaReplaceFlow, InspectorControls, store } from '@wordpress/block-editor';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { people as imageIcon, calendar } from '@wordpress/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextControl, SelectControl, Icon, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { usePrevious } from '@wordpress/compose';
import { Tooltip } from '@wordpress/components';


// dnd kit imports
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
 	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './Sortable-Item';


function Edit({ attributes, setAttributes, noticeOperations, noticeUI, isSelected }) {
	const blockProps = useBlockProps();
	const { name, bio, url, alt, id, sizeSlug, socialLinks } = attributes;
	const [blobURL, setBlobURL] = useState(null);
	const [selectedLink, setSelectedLink] = useState(null);

	const prevURL = usePrevious(url);


	 

	// 1. PLACE THE SENSORS HERE
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, 
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
 
	const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
        const oldIndex = socialLinks.findIndex((_, i) => i === active.id);
        const newIndex = socialLinks.findIndex((_, i) => i === over.id);

        const newSocialLinks = arrayMove(socialLinks, oldIndex, newIndex);
        setAttributes({ socialLinks: newSocialLinks });

        // This ensures the item you just dragged BECOMES the selected one
        setSelectedLink(newIndex);
    }
};
	// above dnd kit above

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

	//icons selectedurl issue solve !
	// Reset selected icon when the block itself is deselected
	// for when unselect the block then the icon also got deselect ok || and then the prevselected not needed here !
	useEffect(() => {
		if (!isSelected) {
			setSelectedLink(null);
		}
	}, [isSelected]);


	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks, // Copy existing links
				{ link: '', icon: 'wordpress' } // Add the new default object
			],
		});
		// thiis line to show seelcted every last item .
		setSelectedLink(socialLinks.length)
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

				{/* <div className="wp-block-blocks-course-team-member-social-links">
					<ul>
						{socialLinks.map((item, index) => {
							return (
								<li key={index} className={selectedLink === index ? 'is-selected' : null} >
									<button
										aria-label={__(
											'Add Social Link',
											'faq-accordion'
										)}
										onClick={() => {
											setSelectedLink(index)
										}}
									>
										<Icon icon={item.icon} />
									</button>
								</li>
							);
						})}

						{isSelected && socialLinks.length < 5 && (
							<li className="wp-block-blocks-course-team-member-add-icon-li">
								<Tooltip
									text={__(
										'Add Social Link',
										'faq-accordion'
									)}
								>
									<button
										aria-label={__(
											'Add Social Link',
											'faq-accordion'
										)}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div> */}

				<div className="wp-block-blocks-course-team-member-social-links">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={socialLinks.map((_, index) => index)}
							strategy={horizontalListSortingStrategy}
						>
							<ul>
								{socialLinks.map((item, index) => (
									<SortableItem
										key={index}
										id={index}
										item={item}
										index={index}
										selectedLink={selectedLink}
										setSelectedLink={setSelectedLink}
									/>
								))}

								{isSelected && socialLinks.length < 5 && (
									<li className="wp-block-blocks-course-team-member-add-icon-li">
										<Tooltip
											text={__('Add Social Link', 'faq-accordion')}
										>
											<button
												aria-label={__('Add Social Link', 'faq-accordion')}
												onClick={addNewSocialItem}
											>
												<Icon icon="plus" />
											</button>
										</Tooltip>
									</li>
								)}
							</ul>
						</SortableContext>
					</DndContext>
				</div>

				{selectedLink !== null && socialLinks[selectedLink] && (
					<div className="wp-block-blocks-course-team-member-social-form">
						<TextControl
							label={__('Link URL', 'faq-accordion')}
							value={socialLinks[selectedLink].link}
							onChange={(val) => {
								const updatedLinks = [...socialLinks];
								updatedLinks[selectedLink].link = val;
								setAttributes({ socialLinks: updatedLinks });
							}}
						/>
						<SelectControl
							label={__('Icon', 'faq-accordion')}
							value={socialLinks[selectedLink].icon}
							options={[
								{ label: 'WordPress', value: 'wordpress' },
								{ label: 'Facebook', value: 'facebook' },
								{ label: 'Twitter', value: 'twitter' },
								{ label: 'LinkedIn', value: 'linkedin' },
							]}
							onChange={(val) => {
								const updatedLinks = [...socialLinks];
								updatedLinks[selectedLink].icon = val;
								setAttributes({ socialLinks: updatedLinks });
							}}
						/>
						<Button
							className="is-destructive"
							onClick={() => {
								const updatedLinks = socialLinks.filter((_, i) => i !== selectedLink);
								setAttributes({ socialLinks: updatedLinks });
								setSelectedLink(null);
							}}
						>
							{__('Remove Link', 'faq-accordion')}
						</Button>
					</div>
				)}


			</div ></>
	);
}
export default withNotices(Edit)






