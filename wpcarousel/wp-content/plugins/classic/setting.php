<?php
/**
 * ১. অ্যাডমিন ড্যাশবোর্ডে মেনু যোগ করা
 */
add_action('admin_menu', 'sbs_add_settings_menu');

function sbs_add_settings_menu() {
    add_menu_page(
        'Book Shop Settings',    // পেজ টাইটেল
        'Book Shop',             // মেনু টাইটেল (ড্যাশবোর্ডে যা দেখাবে)
        'manage_options',        // সক্ষমতা (কাকে দেখাবে - অ্যাডমিন)
        'sbs-settings-page',     // মেনু স্লাগ (ইউনিক আইডি)
        'sbs_render_settings_page', // কোন ফাংশনটি পেজের কন্টেন্ট দেখাবে
        'dashicons-admin-generic', // আইকন
        100                      // পজিশন
    );
}

/**
 * ২. সেটিংস পেজের কন্টেন্ট রেন্ডার করা
 */
function sbs_render_settings_page() {
    ?>
    <div class="wrap">
        <h1>Book Shop Settings</h1>
        <form action="options.php" method="post">
            <?php
            // ওয়ার্ডপ্রেসের সিকিউরিটি ও সেটিংস লোড করা
            settings_fields('sbs_settings_group');
            do_settings_sections('sbs-settings-page');
            submit_button('Save Changes');
            ?>
        </form>
    </div>
    <?php
}