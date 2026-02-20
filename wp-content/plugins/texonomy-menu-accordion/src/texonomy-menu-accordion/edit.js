
import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import Inspector from './components/Inspector/inspector';
import { useMenuData } from './components/hooks/useMenuData';
import { normalizeData, buildTree } from './components/utils/menuUtils';
import { LoadingPlaceholder } from './components/common/LoadingPlaceholder';
import { AccordionContainer } from './components/editor/AccordionContainer';
 

export default function Edit(props) {
    const blockProps = useBlockProps();
    const { attributes } = props;

    // State
    const [openItems, setOpenItems] = useState({});
    const toggleItem = (id) => {
        setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Data
    const currentSource = attributes.dataSource || 'taxonomy';
    const isTaxonomy = currentSource === 'taxonomy';
    const isMenu = currentSource === 'menu';
    
    const { data, isResolving } = useMenuData(
        currentSource, 
        attributes.taxonomy, 
        attributes.menuId
    );

    // Early return for loading
    if (isResolving) {
        return (
            <div {...blockProps}>
                <LoadingPlaceholder />
            </div>
        );
    }

    // Transform data
    const treeData = buildTree(normalizeData(data, isMenu));

    return (
        <div {...blockProps}>
            <Inspector {...props} />
            <div 
                className="ea-main-editor-container" 
                style={{ 
                    border: '1px solid #2c2c2c', 
                    borderRadius: '4px', 
                    '--item-gap': `${attributes?.itemGap}px` 
                }}
            >
                <AccordionContainer
                    treeData={treeData}
                    openItems={openItems}
                    toggleItem={toggleItem}
                    template={attributes.template}
                />
            </div>
        </div>
    );
}
