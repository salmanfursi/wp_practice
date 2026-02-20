import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Icon } from '@wordpress/components';
 import SidebarBanner from './CategoryMenuTemplates/SidebarBanner';
import CategoryMenuTemplates from './CategoryMenuTemplates/CategoryMenuTemplates';

const Inspector = (props) => {
    return (
        <InspectorControls>
         <SidebarBanner />

{/* ছবির সব সেটিংস এখন এই কম্পোনেন্টে */}
            <CategoryMenuTemplates { ...props } />

        </InspectorControls>
    );
};

export default Inspector;