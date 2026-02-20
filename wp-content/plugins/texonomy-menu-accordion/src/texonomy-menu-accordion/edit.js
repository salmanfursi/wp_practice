// import { __ } from '@wordpress/i18n';
// import { useBlockProps } from '@wordpress/block-editor';
// import { useSelect } from '@wordpress/data';
// import { Spinner, Placeholder } from '@wordpress/components';
// import { useState } from '@wordpress/element';
// import './editor.scss';
//  import Inspector from './components/Inspector/inspector';
// import renderList from './components/editor/renderList';



// export default function Edit(props) {

// 	const blockProps = useBlockProps();
// 	const { attributes } = props; // ✅ Get attributes

// 	// ১. স্টেট ম্যানেজমেন্ট (এডিটর ইন্টারঅ্যাক্টিভিটি)
// 	const [openItems, setOpenItems] = useState({});

// 	const toggleItem = (id) => {
// 		setOpenItems((prev) => ({
// 			...prev,
// 			[id]: !prev[id],
// 		}));
// 	};

// 	// ২. ওয়ার্ডপ্রেস ডাটাবেস থেকে ক্যাটাগরি ডাটা নিয়ে আসা

// 	const currentSource = attributes.dataSource || 'taxonomy';
// 	const isTaxonomy = currentSource === 'taxonomy';
// 	const isMenu = currentSource === 'menu';

// 	const { data, isResolving } = useSelect((select) => {
// 		const { getEntityRecords, isResolving: checkResolving } = select('core');

// 		// 👉 TAXONOMY DATA (Working perfect ✅)
// 		if (isTaxonomy) {
// 			const query = { per_page: -1, hide_empty: false };
// 			return {
// 				data: getEntityRecords('taxonomy', attributes.taxonomy || 'category', query),
// 				isResolving: checkResolving('core', 'getEntityRecords', [
// 					'taxonomy',
// 					attributes.taxonomy || 'category',
// 					query,
// 				]),
// 			};
// 		}

// 		// 👉 FIXED MENU DATA
// 		if (isMenu) {
// 			// Get ALL menu items first (no menu filter in REST API)
// 			const query = { per_page: -1 };
// 			const allMenuItems = getEntityRecords('postType', 'nav_menu_item', query);
// 			console.log('Fetching menu items- for menu ID:', isMenu, '--', allMenuItems); // ✅ Log selected menu ID

// 			// Filter by your selected menu in normalizeData instead
// 			return {
// 				data: allMenuItems,
// 				isResolving: checkResolving('core', 'getEntityRecords', [
// 					'postType',
// 					'nav_menu_item',
// 					query,
// 				]),
// 			};
// 		}

// 		return { data: [], isResolving: false };
// 	}, [attributes.dataSource, attributes.taxonomy, attributes.menuId]); // ✅ Added menuId


// 	// ✅ CHANGE THIS LINE (around line 90)

// 	// ✅ REPLACE your normalizeData function with this:
// 	const normalizeData = (list, menuId, isMenu) => {
// 		console.log('RAW DATA:', list?.[0]); // ✅ See raw menu_item structure

// 		if (!list) return [];

// 		if (!isMenu) {  // Taxonomy
// 			return list.map(item => ({
// 				id: item.id,
// 				name: item.name || 'No name',
// 				parent: item.parent ? parseInt(item.parent) : 0,
// 			}));
// 		}

// 		// MENU: Simple - no complex filtering needed first
// 		const idMap = list.reduce((acc, item) => {
// 			acc[item.id] = true;
// 			return acc;
// 		}, {});

// 		const normalized = list.map((item) => {
// 			const parentId = parseInt(item.parent || item.menu_item_parent || '0');
// 			// Log parent relationships
// 			if (parentId !== 0) {
// 				console.log(`Item ${item.id} "${item.title?.rendered}" has parent: ${parentId}`);
// 			}

// 			// Fallback if parent missing
// 			const finalParent = parentId !== 0 && !idMap[parentId] ? 0 : parentId;

// 			return {
// 				id: item.id,
// 				name: item.title?.rendered || item.title || 'No title',
// 				parent: finalParent,
// 			};
// 		});

// 		console.log('NORMALIZED MENU:', normalized.filter(item => item.parent !== 0));
// 		return normalized;
// 	};



// 	const buildTree = (list, parentId = 0) => {
// 		// console.log('Building tree for parentId:', parentId);
// 		if (!list || !Array.isArray(list)) return [];

// 		return list
// 			.filter((item) => item.parent === parentId)
// 			.map((item) => {
// 				const children = buildTree(list, item.id);

// 				const totalDeepCount = children.reduce((acc, child) => {
// 					return acc + 1 + (child.totalDeepCount || 0);
// 				}, 0);

// 				return {
// 					...item,
// 					children,
// 					totalDeepCount,
// 				};
// 			});
// 	};


// 	// লোডিং অবস্থা চেক করা
// 	if (isResolving) {
// 		return (
// 			<div {...blockProps}>
// 				<Placeholder label={__('Taxonomy Menu Accordion', 'texonomy-menu-accordion')}>
// 					<Spinner />
// 					<p>{__('ডাটাবেস থেকে ক্যাটাগরি লোড হচ্ছে...', 'texonomy-menu-accordion')}</p>
// 				</Placeholder>
// 			</div>
// 		);
// 	}

// 	// const treeData = buildTree(categories);
// 	// ✅ REPLACE these 2 lines (around line 130)

// 	const treeData = buildTree(normalizeData(data, attributes.menuId, isMenu));

// 	console.log('Tree Data:', treeData);  // ✅ Shows final tree structure


// 	return (
// 		<div {...blockProps}>
// 			<Inspector {...props} />
// 			<div className="ea-main-editor-container" style={{ border: '1px solid #2c2c2c', borderRadius: '4px', '--item-gap': `${attributes?.itemGap}px` }}>


// 				{treeData.length > 0 ? (
// 					// এখানে arguments হিসেবে ডেটা পাস করুন
// 					renderList(treeData, openItems, toggleItem, attributes.template || 0, 0)

// 				) : (
// 					<p style={{ padding: '20px' }}>{__('কোনো ক্যাটাগরি পাওয়া যায়নি।', 'texonomy-menu-accordion')}</p>
// 				)}
// 			</div>
// 		</div>
// 	);
// }








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
