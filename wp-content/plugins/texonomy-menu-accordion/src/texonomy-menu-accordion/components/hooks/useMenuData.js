

import { useSelect } from '@wordpress/data';

export const useMenuData = (dataSource, taxonomy, menuId) => {
    const isTaxonomy = dataSource === 'taxonomy';
    const isMenu = dataSource === 'menu';

    return useSelect((select) => {
        const { getEntityRecords, isResolving: checkResolving } = select('core');

        if (isTaxonomy) {
            const query = { per_page: -1, hide_empty: false };
            return {
                data: getEntityRecords('taxonomy', taxonomy || 'category', query),
                isResolving: checkResolving('core', 'getEntityRecords', [
                    'taxonomy', taxonomy || 'category', query,
                ]),
            };
        }

        if (isMenu) {
            const query = { per_page: -1 };
            return {
                data: getEntityRecords('postType', 'nav_menu_item', query),
                isResolving: checkResolving('core', 'getEntityRecords', [
                    'postType', 'nav_menu_item', query,
                ]),
            };
        }

        return { data: [], isResolving: false };
    }, [dataSource, taxonomy, menuId]);
};
