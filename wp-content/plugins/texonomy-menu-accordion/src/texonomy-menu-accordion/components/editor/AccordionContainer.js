import { __ } from '@wordpress/i18n';
import renderList from './renderList';

export const AccordionContainer = ({ treeData, openItems, toggleItem, template }) => {
    if (!treeData?.length) {
        return (
            <p style={{ padding: '20px' }}>
                {__('কোনো ক্যাটাগরি পাওয়া যায়নি।', 'texonomy-menu-accordion')}
            </p>
        );
    }

    return renderList(treeData, openItems, toggleItem, template || 0, 0);
};
