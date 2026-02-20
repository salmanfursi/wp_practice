
export const normalizeData = (list, isMenu) => {
    if (!list) return [];

    if (!isMenu) {
        return list.map(item => ({
            id: item.id,
            name: item.name || 'No name',
            parent: item.parent ? parseInt(item.parent) : 0,
        }));
    }

    const idMap = list.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
    }, {});

    return list.map(item => {
        const parentId = parseInt(item.parent || item.menu_item_parent || '0');
        const finalParent = parentId !== 0 && !idMap[parentId] ? 0 : parentId;

        return {
            id: item.id,
            name: item.title?.rendered || item.title || 'No title',
            parent: finalParent,
        };
    });
};

export const buildTree = (list, parentId = 0) => {
    if (!list || !Array.isArray(list)) return [];

    return list
        .filter(item => item.parent === parentId)
        .map(item => {
            const children = buildTree(list, item.id);
            const totalDeepCount = children.reduce((acc, child) => {
                return acc + 1 + (child.totalDeepCount || 0);
            }, 0);

            return { ...item, children, totalDeepCount };
        });
};
