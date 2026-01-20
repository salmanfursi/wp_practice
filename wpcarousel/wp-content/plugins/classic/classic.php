<?php
/**
 * Plugin Name:       Classic Plugin
 * Plugin URI:        https://example.com/plugins/classic/
 * Description:       A brief description of what your plugin does.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name
 * Author URI:        https://example.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       classic-plugin
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
} 
require_once __DIR__.'/setting.php';

function wporg_custom_post_type_and_tax() {
    
    // ১. Register Custom Post Type: Book
    $post_type_labels = array(
        'name'          => 'Books',
        'singular_name' => 'Book',
        'add_new'       => 'Add New Book',
        'add_new_item'  => 'Add New Book',
        'edit_item'     => 'Edit Book',
        'all_items'     => 'All Books',
    );

    $post_type_args = array(
        'labels'      => $post_type_labels,
        'public'      => true,
        'has_archive' => true,
        'menu_icon'   => 'dashicons-book',
        'supports'    => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest'=> true, // ব্লক এডিটর চালু করার জন্য
    );

    register_post_type('book', $post_type_args);

    // ২. Register Taxonomy: Author
    $taxonomy_labels = array(
        'name'              => 'Authors',
        'singular_name'     => 'Author',
        'search_items'      => 'Search Authors',
        'all_items'         => 'All Authors',
        'edit_item'         => 'Edit Author',
        'update_item'       => 'Update Author',
        'add_new_item'      => 'Add New Author',
        'new_item_name'     => 'New Author Name',
        'menu_name'         => 'Author',
    );

    $taxonomy_args = array(
        'hierarchical'      => true, // true দিলে ক্যাটাগরির মতো কাজ করবে
        'labels'            => $taxonomy_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'book-author' ),
        'show_in_rest'      => true, 
    );
    $labels = array(
        'name'              => 'genres',
        'singular_name'     => 'genre',
        'search_items'      => 'Search Genres',
        'all_items'         => 'All Genres',
        'edit_item'         => 'Edit Genre',
        'update_item'       => 'Update Genre',
        'add_new_item'      => 'Add New Genre',
        'new_item_name'     => 'New Genre Name',
        'menu_name'         => 'Genre',
    );

    $args = array(
        'hierarchical'      => true, // true দিলে ক্যাটাগরির মতো হবে
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true, // অল বুকস পেজে আলাদা কলাম দেখাবে
        'query_var'         => true,
        'show_in_rest'      => true,
        'rewrite'           => array( 'slug' => 'book-author' ),
    );

    // 'book' পোস্ট টাইপের সাথে 'genre' কানেক্ট করা
    register_taxonomy( 'genre', array( 'book' ), $args );

    // এখানে 'book' এর সাথে 'author' ট্যাক্সোনমিটি লিঙ্ক করা হয়েছে
    register_taxonomy( 'author', array( 'book' ), $taxonomy_args );
}

add_action('init', 'wporg_custom_post_type_and_tax');