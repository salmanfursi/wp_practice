<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'interactive_db');

/** Database username */
define('DB_USER', 'root');

/** Database password */
define('DB_PASSWORD', '');

/** Database hostname */
define('DB_HOST', 'localhost');

/** Database charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '0@HJrV_/w2)6/Z%&mFP9 w$w9(9RlzJ/<9y[OPYow/$:0+LX*sb5Zq90M- 0Zl/|');
define('SECURE_AUTH_KEY', 'A+U:b[gX!s{&|;*IOu0Pt~Lr$#z!KEq`Na[hVZARs)uOBSg53>cdisN:(uZU!,!:');
define('LOGGED_IN_KEY', 'HOa&%hAhY&1Qz SH>-q<Jn3xJwJgMv@B+Pp>Buqh*LOeCdSp[CU0ZE+N{. ilX%>');
define('NONCE_KEY', '63)OVBU+-}s!.>&uwA@#~W|YK<dNH$9<`]g>Je0:X4o6;A8h|H%#ty,P= iJ:PZ6');
define('AUTH_SALT', 'f1 -,uvJ +2 mQAdq]~9CAM0XaTJiOl,M8a}{oi3KV_2M&^WXCR{,g>?J^STT6y.');
define('SECURE_AUTH_SALT', '&(F[-)<HC(lA88/`t&([u}hP1$ 0Dbg/qX_0F3m-MwRxk<0|D0eu=Jm29&`E]}AH');
define('LOGGED_IN_SALT', 'w,U8D6ba8Ufe%,T<DR-J,UC>1a#!|;+2J]ko]XdW](YoVQL)Xd&*d+u;K+p[$3bX');
define('NONCE_SALT', '~t*:-[eSE4Z5L,T6OdBt<{$l:(7jhNzVX?}2=pJS>&<R!AF,{ f1/>tWg; /a~>;');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

/* Add any custom values between this line and the "stop editing" line. */




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
