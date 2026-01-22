<?php
if (!defined('ABSPATH')) exit;

function sfp_feedback_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'feedback';

    // Fetch all feedbacks
    $feedbacks = $wpdb->get_results("SELECT * FROM $table_name ORDER BY time DESC");
    ?>

    <div class="wrap">
        <h1>All Feedbacks</h1>
        <table class="widefat fixed striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Submitted On</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($feedbacks) : ?>
                    <?php foreach ($feedbacks as $fb) : ?>
                        <tr>
                            <td><?php echo esc_html($fb->id); ?></td>
                            <td><?php echo esc_html($fb->name); ?></td>
                            <td><?php echo esc_html($fb->email); ?></td>
                            <td><?php echo esc_html($fb->message); ?></td>
                            <td><?php echo esc_html($fb->time); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php else : ?>
                    <tr>
                        <td colspan="5">No feedbacks yet.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <?php
}
