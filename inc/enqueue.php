<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue scripts
 *
 * @package WP Gulp Child Theme
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define('ASTRA_CHILD_THEME_VERSION', '1.0.0');


if (!function_exists('site_scripts')) :
	function site_scripts()
	{

		wp_enqueue_style('child-theme-css', get_stylesheet_directory_uri() . '/style.min.css', array('astra-theme-css'), ASTRA_CHILD_THEME_VERSION, 'all');

		wp_enqueue_script('custom-scripts', get_stylesheet_directory_uri() . '/assets/dist/js/custom.min.js', array('jquery'), ASTRA_CHILD_THEME_VERSION, true);
	}

	add_action('wp_enqueue_scripts', 'site_scripts', 15);
endif;
