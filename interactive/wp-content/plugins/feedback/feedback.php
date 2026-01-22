<?php
/**
 * Plugin Name: Simple Feedback Plugin
 * Description: Learning AJAX with a simple feedback form
 * Version: 1.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// Include admin page code
require_once plugin_dir_path(__FILE__) . '/admin-page.php';

register_activation_hook( __FILE__, 'sfp_create_feedback_table' );

function sfp_create_feedback_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'feedback'; // wp_feedback
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name tinytext NOT NULL,
        email text NOT NULL,
        message text NOT NULL,
        time datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}

add_action('admin_menu', 'sfp_admin_menu');

function sfp_admin_menu() {
    add_menu_page(
        'Feedbacks',                  // Page title
        'Feedbacks',                  // Menu title
        'manage_options',             // Capability
        'sfp_feedback',               // Menu slug
        'sfp_feedback_admin_page',    // Callback function
        'dashicons-feedback',         // Icon
        26                            // Position
    );
}


/**
 * Enqueue Scripts & Styles
 */
function sfp_enqueue_assets() {
	wp_enqueue_style(
		'sfp-style',
		plugin_dir_url( __FILE__ ) . 'assets/css/style.css'
	);

	wp_enqueue_script(
		'sfp-script',
		plugin_dir_url( __FILE__ ) . 'assets/js/feedback.js',
		array( 'jquery' ),
		null,
		true
	);

	// Pass AJAX URL to JS
    //with that we pass the config liek the server php file wehre have to send request and the nounce config for security !
	wp_localize_script(
		'sfp-script',
		'sfp_ajax',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'sfp_nonce' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'sfp_enqueue_assets' );

/**
 * Feedback Form Shortcode
 */
function sfp_feedback_form() {
	ob_start();
	?>
	<form id="sfp-feedback-form">
		<input type="text" name="name" placeholder="Your Name" required>
		<input type="email" name="email" placeholder="Your Email" required>
		<textarea name="message" placeholder="Your Feedback" required></textarea>

		<button type="submit">Send Feedback</button>
	</form>

	<div id="sfp-response"></div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'feedback_form', 'sfp_feedback_form' );

/**
 * AJAX Handler
 */
 


function sfp_handle_feedback() {
    check_ajax_referer('sfp_nonce', 'nonce'); // security

    $name    = sanitize_text_field($_POST['name']);
    $email   = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);

    // Save to DB
    global $wpdb;
    $table_name = $wpdb->prefix . 'feedback';

    $inserted = $wpdb->insert(
        $table_name,
        [
            'name'    => $name,
            'email'   => $email,
            'message' => $message,
            'time'    => current_time('mysql')
        ],
        [
            '%s', '%s', '%s', '%s'
        ]
    );

    if($inserted) {
        wp_send_json_success([
            'message' => 'Feedback saved successfully!',
            'name'    => $name,
        ]);
    } else {
        wp_send_json_error([
            'message' => 'Failed to save feedback. Try again!',
        ]);
    }
}

// Enqueue Admin Styles
add_action('admin_enqueue_scripts', function() {
    wp_enqueue_style('sfp-admin-style', plugin_dir_url(__FILE__) . 'assets/css/admin-style.css');
});



// this are jsut for accept the request 
// Logged-in users
add_action( 'wp_ajax_sfp_submit_feedback', 'sfp_handle_feedback' );

// Guest users
add_action( 'wp_ajax_nopriv_sfp_submit_feedback', 'sfp_handle_feedback' );
