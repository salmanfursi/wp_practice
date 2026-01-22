<?php
/**
 * 1. Create the Admin Menu
 */
add_action('admin_menu', 'sbs_book_shop_menu');
function sbs_book_shop_menu() {
    add_menu_page(
        'Store Settings', 'Book Store', 'manage_options', 'sbs-settings', 'sbs_settings_markup', 'dashicons-store', 100
    );
}

/**
 * 2. Register Settings & Fields
 */
add_action('admin_init', 'sbs_register_settings');
function sbs_register_settings() {
    register_setting('sbs_settings_group', 'sbs_store_options');

    add_settings_section('sbs_main_section', 'Store Information', null, 'sbs-settings');

    // Store Name (Text)
    add_settings_field('store_name', 'Store Name', 'sbs_field_text', 'sbs-settings', 'sbs_main_section');
    // Store Email (Email)
    add_settings_field('store_email', 'Store Email', 'sbs_field_email', 'sbs-settings', 'sbs_main_section');
    // Store Status (Checkbox)
    add_settings_field('store_status', 'Store Status (Open)', 'sbs_field_checkbox', 'sbs-settings', 'sbs_main_section');
    // Store Location (Dropdown)
    add_settings_field('store_location', 'Location', 'sbs_field_dropdown', 'sbs-settings', 'sbs_main_section');
    // Store Type (Radio)
    add_settings_field('store_type', 'Business Type', 'sbs_field_radio', 'sbs-settings', 'sbs_main_section');
    // Store Details (Textarea)
    add_settings_field('store_details', 'Store Details', 'sbs_field_textarea', 'sbs-settings', 'sbs_main_section');
}

/**
 * 3. Field Rendering Functions
 */
function sbs_field_text() {
    $opt = get_option('sbs_store_options');
    echo '<input type="text" name="sbs_store_options[name]" value="' . esc_attr($opt['name'] ?? '') . '" class="regular-text">';
}

function sbs_field_email() {
    $opt = get_option('sbs_store_options');
    echo '<input type="email" name="sbs_store_options[email]" value="' . esc_attr($opt['email'] ?? '') . '" class="regular-text">';
}

function sbs_field_checkbox() {
    $opt = get_option('sbs_store_options');
    $checked = isset($opt['status']) ? checked(1, $opt['status'], false) : '';
    echo '<input type="checkbox" name="sbs_store_options[status]" value="1" ' . $checked . '> Store is active';
}

function sbs_field_dropdown() {
    $opt = get_option('sbs_store_options');
    $selected = $opt['location'] ?? '';
    echo '<select name="sbs_store_options[location]">
        <option value="dhaka" ' . selected($selected, 'dhaka', false) . '>Dhaka</option>
        <option value="chittagong" ' . selected($selected, 'chittagong', false) . '>Chittagong</option>
        <option value="sylhet" ' . selected($selected, 'sylhet', false) . '>Sylhet</option>
    </select>';
}

function sbs_field_radio() {
    $opt = get_option('sbs_store_options');
    $val = $opt['type'] ?? 'online';
    echo '<label><input type="radio" name="sbs_store_options[type]" value="online" ' . checked($val, 'online', false) . '> Online</label><br>';
    echo '<label><input type="radio" name="sbs_store_options[type]" value="physical" ' . checked($val, 'physical', false) . '> Physical</label><br>';
    echo '<label><input type="radio" name="sbs_store_options[type]" value="both" ' . checked($val, 'both', false) . '> Both</label>';
}

function sbs_field_textarea() {
    $opt = get_option('sbs_store_options');
    echo '<textarea name="sbs_store_options[details]" rows="5" cols="50">' . esc_textarea($opt['details'] ?? '') . '</textarea>';
}

/**
 * 4. Settings Page UI
 */
function sbs_settings_markup() {
    ?>
    <div class="wrap">
        <h1>Store Configuration</h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('sbs_settings_group');
            do_settings_sections('sbs-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
//creating whole setting page !