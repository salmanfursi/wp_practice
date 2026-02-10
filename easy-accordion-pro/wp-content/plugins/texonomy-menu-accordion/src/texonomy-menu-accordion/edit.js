import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner, Placeholder } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';
import { Icon, chevronDown } from '@wordpress/icons'; // chevronDown ইম্পোর্ট করুন
export default function Edit() {
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

	/**
	 * ৩. Deep Recursive Tree Builder
	 * এই ফাংশনটি প্রতিটি লেভেলের সাব-ক্যাটাগরি গুনে মোট সংখ্যা বের করে।
	 */
	const buildTree = (list, parentId = 0) => {
		console.log('Building tree for parentId:',parentId);
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

	// ৪. রিকার্সিভ রেন্ডারার (UI)
	const renderList = (items) => {
		if (!items || items.length === 0) return null;

		return (
			<ul className="ea-editor-preview-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
				{items.map((item) => {
					const hasSub = item.children && item.children.length > 0;
					const isOpen = !!openItems[item.id];

					return (
						<li key={item.id} className={`ea-editor-item ${isOpen ? 'is-open' : ''}`}>
							<div
								className="ea-item-header"
								onClick={(e) => {
									if (hasSub) {
										e.preventDefault();
										toggleItem(item.id);
									}
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										toggleItem(item.id);
									}
								}}
								role="button"
								tabIndex="0"
								style={{
									cursor: hasSub ? 'pointer' : 'default',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '10px',
  								}}
							>
								<span className="ea-title" >
									{ /* If item.name exists use it (Category), otherwise use item.title.rendered (Menu) */}
									{item.name || item.title?.rendered}

									{hasSub && item.totalDeepCount > 0 && (
										<span className="sub-count">({item.totalDeepCount})</span>
									)}
								</span>

								{hasSub && (
									<span className={`ea-icon-wrapper ${isOpen ? 'is-open' : ''}`}>
										<Icon icon={chevronDown} size={24} />
									</span>
								)}
							</div>

							{hasSub && isOpen && (
								<div className="ea-editor-submenu" style={{ paddingLeft: '20px', background: '#c4c0c0'}}>
									{renderList(item.children)}
								</div>
							)}
						</li>
					);
				})}
			</ul>
		);
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
console.log('treeData Data:', treeData);

	return (
		<div {...blockProps}>
			<div className="ea-main-editor-container" style={{ border: '1px solid #2c2c2c', borderRadius: '4px' }}>
				{treeData.length > 0 ? (
					renderList(treeData)
				) : (
					<p style={{ padding: '20px' }}>{__('কোনো ক্যাটাগরি পাওয়া যায়নি।', 'texonomy-menu-accordion')}</p>
				)}
			</div>
		</div>
	);
}

