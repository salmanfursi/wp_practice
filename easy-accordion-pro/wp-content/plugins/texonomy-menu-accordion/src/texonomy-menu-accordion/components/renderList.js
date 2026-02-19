


import { Icon, chevronDown, category } from '@wordpress/icons';

const renderList = (items, openItems = {}, toggleItem, template = 0, depth = 0) => {
	//                                                     ↑ template    ↑ depth
	if (!items || !Array.isArray(items) || items.length === 0) return null;

	// ✅ Add template class only at depth 0
	const templateClass = depth === 0 ? `ea-template-${template + 1}` : '';

	return (
		<ul className={`ea-editor-preview-list ${templateClass}`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
							<span className="ea-title">
								{/* ✅ Show icon only at depth 0 */}
								{/* {depth === 0 && (
									<Icon icon={category} size={18} className="ea-category-icon" />
								)} */}

{depth === 0 && template !== 0 && (
        <Icon icon={category} size={18} className="ea-category-icon" />
    )}

								{item.name || item.title?.rendered}
							</span>

							{hasSub && (
								<div className="ea-header-right">
									{item.totalDeepCount > 0 && (
										<span className="sub-count">{item.totalDeepCount}</span>
									)}
									<span className={`ea-icon-wrapper ${isOpen ? 'is-open' : ''}`}>
										<Icon icon={chevronDown} size={30} />
									</span>
								</div>
							)}
						</div>

						{hasSub && isOpen && (
							<div className="ea-editor-submenu" style={{ paddingLeft: '20px' }}>
								{/* ✅ Pass template and increment depth */}
								{renderList(item.children, openItems, toggleItem, template, depth + 1)}
							</div>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default renderList;