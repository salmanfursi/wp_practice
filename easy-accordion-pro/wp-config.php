<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'easy_accordion_pro' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

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
define( 'AUTH_KEY',          'zf=q1(*q5zCs#%it<7jr]v*zw9;c@ZP{Md%7pTHAQudeeaPhu~&%ntgt3Pv*,MV#' );
define( 'SECURE_AUTH_KEY',   'NMXk.%m=?Bn#Z/S=Xa&?cr44<lW.z_*k~WpfI%$4eUDYc5^cMcNk-cd6?(WwpASc' );
define( 'LOGGED_IN_KEY',     'yIC*C8UC`r;W2QX%;8{s3KdP sH6|F#T((ohiw$VY$k}}a)?^X38a4r]a|a6I6NM' );
define( 'NONCE_KEY',         'mp?pDgk6aVPBPu` n<7oP2cmg[WbI`3hwtAi,K1LtzCJ;fsK3:+nq`K{d6Fzd7^j' );
define( 'AUTH_SALT',         '6nPhEqw$g5~(T+a{{RJi6j+OdVyGl+MjsJB`bo5A10%]ivc}@}/Xa{Z_Uz@qMZ-y' );
define( 'SECURE_AUTH_SALT',  '-3R(k(I`JZ`9Gt(FMRV_Zf%e@7Ipzs/?8r+]uBvK?-:m.LfQ0~qt)bb%h@j7sqY2' );
define( 'LOGGED_IN_SALT',    'WRm(//WBmFsvF:5y42lLMC=XNE{igvTmZ$EHtOE=_!S0IM~x%_5qg:y0!.m^g)sQ' );
define( 'NONCE_SALT',        'q923q?y-]`dom?gNR1>niOf.v4xA~z2oda.5ru1dep1:x+Fwg+fX b,`4$QT-v Z' );
define( 'WP_CACHE_KEY_SALT', 'sY@f7_Y.u@Tg]nN)ch#rD>HQ0=5jGskX,U&hje3H3z.)7%$CSkDQ=}5mmJv)XW)L' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', true );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
