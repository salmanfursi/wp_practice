<?php
/**
 * PHP Render logic for Taxonomy Menu Accordion
 * ব্যবহার করা হয়েছে: Closures (Anonymous Functions) এবং Recursion
 */

// ১. ডাটাবেস থেকে সব ক্যাটাগরি (Terms) নিয়ে আসা
// আমরা একবারে সব ডাটা নিয়ে আসছি যাতে বারবার ডাটাবেসে হিট করতে না হয় (Performance)
$all_categories = get_terms( array(
    'taxonomy'   => 'category', // আপনি চাইলে এখানে আপনার কাস্টম ট্যাক্সোনমি দিতে পারেন
    'hide_empty' => false,
) );

if ( is_wp_error( $all_categories ) || empty( $all_categories ) ) {
    echo 'No categories found.';
    return;
}

/**
 * ২. ট্রি বিল্ডার (Tree Builder) - Closure + Recursion
 * এই ফাংশনটি ফ্ল্যাট ডাটাকে 'Parent-Child' ফরমেটে সাজাবে।
 */
$build_category_tree = function( array &$elements, $parentId = 0 ) use ( &$build_category_tree ) {
    $branch = array();

    foreach ( $elements as $element ) {
        if ( $element->parent == $parentId ) {
            // রিকার্শন: এই ক্যাটাগরির কোনো চাইল্ড আছে কি না তা চেক করতে নিজেকে আবার কল করছে
            $children = $build_category_tree( $elements, $element->term_id );
            
            if ( $children ) {
                $element->children = $children;
            }
            $branch[] = $element;
        }
    }
    return $branch;
};

// ডাটা প্রসেস করে ট্রি তৈরি করা
$nested_categories = $build_category_tree( $all_categories );

/**
 * ৩. এইচটিএমএল রেন্ডারার (HTML Renderer) - Closure + Recursion
 * এই ফাংশনটি নেস্টেড ট্রি থেকে অ্যাকর্ডিয়ন এইচটিএমএল তৈরি করবে।
 */
$render_accordion_html = function( $items ) use ( &$render_accordion_html ) {
    if ( empty( $items ) ) return '';

    $html = '<ul class="ea-accordion-list">';
    
    foreach ( $items as $item ) {
        $has_children = ! empty( $item->children );
        
        // লিস্ট আইটেম তৈরি
        $html .= '<li class="ea-item ' . ( $has_children ? 'has-children' : '' ) . '">';
        
        // হেডার অংশ (টাইটেল এবং আইকন)
        $html .= '<div class="ea-item-header">';
        $html .= '<a href="' . esc_url( get_term_link( $item ) ) . '">' . esc_html( $item->name ) . '</a>';
        
        if ( $has_children ) {
            // যদি চাইল্ড থাকে তবে একটি টগল আইকন যোগ করা
            $html .= '<span class="ea-toggle-icon">▼</span>'; 
        }
        $html .= '</div>';

        // রিকার্শন: যদি চাইল্ড থাকে, তবে সাব-মেনু তৈরি করা
        if ( $has_children ) {
            $html .= '<div class="ea-submenu" style="display: none;">';
            $html .= $render_accordion_html( $item->children ); 
            $html .= '</div>';
        }

        $html .= '</li>';
    }
    
    $html .= '</ul>';
    return $html;
};

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="easy-accordion-pro-container">
        <?php echo $render_accordion_html( $nested_categories ); ?>
    </div>
</div>