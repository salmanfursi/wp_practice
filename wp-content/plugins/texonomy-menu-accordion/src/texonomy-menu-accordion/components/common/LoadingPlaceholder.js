import { Placeholder, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const LoadingPlaceholder = () => (
    <Placeholder label={__('Taxonomy Menu Accordion', 'texonomy-menu-accordion')}>
        <Spinner />
        <p>{__('ডাটাবেস থেকে ক্যাটাগরি লোড হচ্ছে...', 'texonomy-menu-accordion')}</p>
    </Placeholder>
);
