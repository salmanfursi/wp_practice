import { Icon, chevronDown } from '@wordpress/icons';  


const renderList = (items,openItems={}, toggleItem) => {
 if (!items || !Array.isArray(items) || items.length === 0) return null;
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
									{renderList(item.children, openItems, toggleItem)}
								</div>
							)}
						</li>
					);
				})}
			</ul>
		);
	};
    export default renderList