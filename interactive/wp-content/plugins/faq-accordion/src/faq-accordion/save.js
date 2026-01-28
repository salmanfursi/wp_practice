

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { column } = attributes;
    const blockProps = useBlockProps.save({
        className: `has-${column}-columns`,
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
