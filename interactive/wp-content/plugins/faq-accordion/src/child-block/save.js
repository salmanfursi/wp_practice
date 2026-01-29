

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const blockProps = useBlockProps.save();
    const { name, bio, url, alt, id } = attributes;

    return (
        <div {...blockProps}>
            {url && <img
                src={url}
                alt={alt}
                // with that. class automatic make responsive !
                className={id ? `wp-image-${id}` : null}
            />}
            <RichText.Content tagName="h4" value={name} />
            <RichText.Content tagName="p" value={bio} />
        </div>
    );
}