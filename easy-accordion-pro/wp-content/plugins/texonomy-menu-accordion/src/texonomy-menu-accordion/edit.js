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

	// ১. স্টেট ম্যানেজমেন্ট (এডিটর ইন্টারঅ্যাক্টিভিটি)
	const [openItems, setOpenItems] = useState({});

	const toggleItem = (id) => {
		setOpenItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// ২. ওয়ার্ডপ্রেস ডাটাবেস থেকে ক্যাটাগরি ডাটা নিয়ে আসা
	const { categories, isResolving } = useSelect((select) => {
		const query = { per_page: -1, hide_empty: false };
		const { getEntityRecords, isResolving: checkResolving } = select('core');

		return {
			categories: getEntityRecords('taxonomy', 'category', query),
			isResolving: checkResolving('core', 'getEntityRecords', ['taxonomy', 'category',
				query]),
		};
		// return {
		// 	categories: getEntityRecords('postType', 'nav_menu_item', { per_page: -1 }),
		// 	isResolving: checkResolving('core', 'getEntityRecords', ['postType', 'nav_menu_item', query]),
		// };
	}, []);

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

	const treeData = buildTree(categories);

 	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<div className="ea-main-editor-container" style={{ border: '1px solid #2c2c2c', borderRadius: '4px' }}>
			 
				{treeData.length > 0 ? (
                // এখানে arguments হিসেবে ডেটা পাস করুন
                renderList(treeData, openItems, toggleItem) 
            ) : (
                <p style={{ padding: '20px' }}>{__('কোনো ক্যাটাগরি পাওয়া যায়নি।', 'texonomy-menu-accordion')}</p>
            )}
			</div>
		</div>
	);
}

