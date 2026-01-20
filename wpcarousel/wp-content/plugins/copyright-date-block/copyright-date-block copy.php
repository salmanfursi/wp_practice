<?php
/**
 * Plugin Name:       Copyright Date Block
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       copyright-date-block
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit;
}

function create_block_copyright_date_block_block_init()
{
	if (function_exists('wp_register_block_types_from_metadata_collection')) {
		wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		
		// Override my-info with render callback
		register_block_type(
			__DIR__ . '/build/my-info',
			array(
				'render_callback' => 'fursi_copyright_date_render',
			)
		);
		return;
	}

	if (function_exists('wp_register_block_metadata_collection')) {
		wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
	}
	
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach (array_keys($manifest_data) as $block_type) {
		if ($block_type === 'my-info') {
			continue;
		}
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
	
	register_block_type(
		__DIR__ . '/build/my-info',
		array(
			'render_callback' => 'fursi_copyright_date_render',
		)
	);
}

add_action('init', 'create_block_copyright_date_block_block_init');


function fursi_filter_block_categories_when_post_provided($block_categories, $editor_context)
{
	if (!empty($editor_context->post)) {
		array_push(
			$block_categories,
			array(
				'slug' => 'fursi-block',
				'title' => __('Fursi-Block', 'fursi-block'),
				'icon' => null,
			),
			array(
				'slug' => 'tharin-block',
				'title' => __('Tharin-Block', 'fursi-block'),
				'icon' => null,
			)
		);
	}
	return $block_categories;
}
add_filter('block_categories_all', 'fursi_filter_block_categories_when_post_provided', 10, 2);


function fursi_copyright_date_render($attributes, $content) {
	$title = isset($attributes['title']) ? $attributes['title'] : 'default content is here !';
	
	ob_start(); 
	?>
	<div class="wp-block-create-block-my-info">
		<h2><?php echo wp_kses_post($title); ?></h2>
	</div>
	<?php
	return ob_get_clean();
}