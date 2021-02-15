<?php
/**
 * Child Theme functions and definitions
 *
 * @package WP Gulp Child
 * @since 1.0.0
 */

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add Google Analytics
 */
require_once( 'inc/google-analytics.php');

/**
 * Enqueue scripts and styles.
 */
require_once( 'inc/enqueue.php');

/**
 * Elementor changes
 */
require_once( 'inc/elementor.php');

/**
 * Custom Login page.
 */
require_once( 'inc/login.php');