import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner, Placeholder } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';
import { Icon, chevronDown } from '@wordpress/icons'; // chevronDown ইম্পোর্ট করুন
import Inspector from './components/Inspector/inspector';
import renderList from './components/renderList';


export default function Edit(props) {

	const blockProps = useBlockProps();
	const { attributes } = props; // ✅ Get attributes

	// ১. স্টেট ম্যানেজমেন্ট (এডিটর ইন্টারঅ্যাক্টিভিটি)
	const [openItems, setOpenItems] = useState({});

	const toggleItem = (id) => {
		setOpenItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// ২. ওয়ার্ডপ্রেস ডাটাবেস থেকে ক্যাটাগরি ডাটা নিয়ে আসা

	const currentSource = attributes.dataSource || 'taxonomy';
	const isTaxonomy = currentSource === 'taxonomy';
	const isMenu = currentSource === 'menu';

const { data, isResolving } = useSelect((select) => {
    const { getEntityRecords, isResolving: checkResolving } = select('core');

    // 👉 TAXONOMY DATA (Working perfect ✅)
    if (isTaxonomy) {
        const query = { per_page: -1, hide_empty: false };
        return {
            data: getEntityRecords('taxonomy', attributes.taxonomy || 'category', query),
            isResolving: checkResolving('core', 'getEntityRecords', [
                'taxonomy',
                attributes.taxonomy || 'category',
                query,
            ]),
        };
    }

    // 👉 FIXED MENU DATA
    if (isMenu) {
        // Get ALL menu items first (no menu filter in REST API)
        const query = { per_page: -1 };
        const allMenuItems = getEntityRecords('postType', 'nav_menu_item', query);
        
        // Filter by your selected menu in normalizeData instead
        return {
            data: allMenuItems, 
            isResolving: checkResolving('core', 'getEntityRecords', [
                'postType',
                'nav_menu_item',
                query,
            ]),
        };
    }

    return { data: [], isResolving: false };
}, [attributes.dataSource, attributes.taxonomy, attributes.menuId]); // ✅ Added menuId



 


const normalizeData = (list) => {
    if (!list) return [];
    
    if (isTaxonomy) {
        return list.map(item => ({
            id: item.id,
            name: item.name || 'No name',
            parent: item.parent ? parseInt(item.parent) : 0,
        }));
    }

    // ✅ FIXED: Filter by menu + parent validation
    const idMap = list.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
    }, {});

    return list
        // Filter by selected menu first
        .filter(item => {
            // Check if this menu item belongs to our selected menu
            return !attributes.menuId || 
                   item.menus?.includes(attributes.menuId) || 
                   item.nav_menu_items?.some(menu => menu === attributes.menuId);
        })
        .map((item) => {
            let parentId = parseInt(item.menu_item_parent || 0);
            
            // Fallback: if parent doesn't exist, make top-level
            if (parentId !== 0 && !idMap[parentId]) {
                parentId = 0;
            }

            return {
                id: item.id,
                name: item.title?.rendered || item.title || 'No title',
                parent: parentId,
            };
        });
};




	// --------------
	// const { categories, isResolving } = useSelect((select) => {
	// 	const query = { per_page: -1, hide_empty: false };
	// 	const { getEntityRecords, isResolving: checkResolving } = select('core');

	// 	return {
	// 		categories: getEntityRecords('taxonomy', 'category', query),
	// 		isResolving: checkResolving('core', 'getEntityRecords', ['taxonomy', 'category',
	// 			query]),
	// 	};
	// 	// return {
	// 	// 	categories: getEntityRecords('postType', 'nav_menu_item', { per_page: -1 }),
	// 	// 	isResolving: checkResolving('core', 'getEntityRecords', ['postType', 'nav_menu_item', query]),
	// 	// };
	// }, []);

	const buildTree = (list, parentId = 0) => {
		// console.log('Building tree for parentId:', parentId);
		if (!list || !Array.isArray(list)) return [];

		return list
			.filter((item) => item.parent === parentId)
			.map((item) => {
				const children = buildTree(list, item.id);

				const totalDeepCount = children.reduce((acc, child) => {
					return acc + 1 + (child.totalDeepCount || 0);
				}, 0);

				return {
					...item,
					children,
					totalDeepCount,
				};
			});
	};


	// লোডিং অবস্থা চেক করা
	if (isResolving) {
		return (
			<div {...blockProps}>
				<Placeholder label={__('Taxonomy Menu Accordion', 'texonomy-menu-accordion')}>
					<Spinner />
					<p>{__('ডাটাবেস থেকে ক্যাটাগরি লোড হচ্ছে...', 'texonomy-menu-accordion')}</p>
				</Placeholder>
			</div>
		);
	}

	// const treeData = buildTree(categories);
	const treeData = buildTree(normalizeData(data));
	console.log('Normalized Menu Data:', normalizeData(data));
	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<div className="ea-main-editor-container" style={{ border: '1px solid #2c2c2c', borderRadius: '4px', '--item-gap': `${attributes?.itemGap}px` }}>


				{treeData.length > 0 ? (
					// এখানে arguments হিসেবে ডেটা পাস করুন
					renderList(treeData, openItems, toggleItem, attributes.template || 0, 0)

				) : (
					<p style={{ padding: '20px' }}>{__('কোনো ক্যাটাগরি পাওয়া যায়নি।', 'texonomy-menu-accordion')}</p>
				)}
			</div>
		</div>
	);
}





