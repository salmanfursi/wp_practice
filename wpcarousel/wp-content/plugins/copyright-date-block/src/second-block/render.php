<!-- <?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Copyright Date Block – hello from a dynamic block!', 'new dynamic blog created !' ); ?>
</p> -->



<?php
// Fallbacks
$prefix      = ( $attributes['prefix'] ?? 'Copyright' ) ?: 'Copyright';
$year        = gmdate( 'Y' );
$align       = $attributes['textAlign'] ?? 'left';
$textColor   = $attributes['textColor'] ?? '';
$customColor = $attributes['style']['color']['text'] ?? '';

// Build inline colour if a custom one is picked
$colorStyle = '';
if ( $customColor ) {
    $colorStyle = ' style="color:' . esc_attr( $customColor ) . '"';
}

// Wrapper classes (alignment + colour class)
$classes = [
    'wp-block-create-block-copyright-date-block',
    'has-text-align-' . $align,
];
if ( $textColor ) {
    $classes[] = 'has-' . esc_attr( $textColor ) . '-color';
}
$wrapper_class = implode( ' ', $classes );
?>
<p class="<?php echo esc_attr( $wrapper_class ); ?>" <?php echo $colorStyle; ?>>
    <?php echo esc_html( $prefix ); ?> © <?php echo esc_html( $year ); ?>
</p>