<?php
$all_categories = get_terms(array(
    'taxonomy' => 'category',
    'hide_empty' => false,
));

if (is_wp_error($all_categories) || empty($all_categories)) {
    echo '<p>No categories found.</p>';
    return;
}

// Recursive function to build the tree
$build_tree = function (array $elements, $parentId = 0) use (&$build_tree) {
    $branch = array();
    foreach ($elements as $element) {
        if ($element->parent == $parentId) {
            $children = $build_tree($elements, $element->term_id);
            $totalDeepCount = 0;
            foreach ($children as $child) {
                $totalDeepCount += 1 + (isset($child->totalDeepCount) ? $child->totalDeepCount : 0);
            }
            $element->children = $children;
            $element->totalDeepCount = $totalDeepCount;
            $branch[] = $element;
        }
    }
    return $branch;
};

// CRITICAL: Define tree_data here
$tree_data = $build_tree($all_categories);

// Recursive function to render the HTML
$render_list = function ($items) use (&$render_list) {
    if (empty($items))
        return '';
    $html = '<ul class="ea-accordion-list">';

    foreach ($items as $item) {
        $has_children = !empty($item->children);

        // INTERACTIVITY API: Each <li> gets its own context (closure)
        $html .= '<li class="ea-item" 
                    data-wp-context=\'{ "isOpen": false }\' 
                    data-wp-class--is-open="context.isOpen">';

        $html .= '<div class="ea-item-header" ' . ($has_children ? 'data-wp-on--click="actions.toggle"' : '') . '>';
        $html .= '<span class="ea-title">';
        $html .= '<a href="' . esc_url(get_term_link($item)) . '">' . esc_html($item->name) . '</a>';

        if ($has_children && $item->totalDeepCount > 0) {
            $html .= '<span class="sub-count">(' . $item->totalDeepCount . ')</span>';
        }
        $html .= '</span>';

        if ($has_children) {
            $html .= '<span class="ea-icon-wrapper">';
            $html .= '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2"/></svg>';
            $html .= '</span>';
        }
        $html .= '</div>';

        if ($has_children) {
            // INTERACTIVITY API: Bind visibility to context state
            $html .= '<div class="ea-submenu" data-wp-bind--hidden="!context.isOpen">';
            $html .= $render_list($item->children);
            $html .= '</div>';
        }
        $html .= '</li>';
    }
    $html .= '</ul>';
    return $html;
};
?>

<div <?php echo get_block_wrapper_attributes(); ?> data-wp-interactive="create-block/texonomy-menu-accordion">
    <div class="ea-main-container">
        <?php echo $render_list($tree_data); ?>
    </div>
</div>