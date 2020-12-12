<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue scripts
 *
 * @package fore8
 */

if ( ! function_exists( 'site_scripts' ) ) :
  function site_scripts() {

    wp_enqueue_style( 'cassio-style' , get_template_directory_uri() . '/style.css' );

    wp_enqueue_style( 'cassio-child-style',
        get_stylesheet_directory_uri() . '/style.min.css',
        array( 'cassio-style' ),
        wp_get_theme()->get('Version')
    );

    // wp_enqueue_script('custom-scripts', get_stylesheet_directory_uri() . '/assets/dist/js/custom.min.js', array('jquery'), ASTRA_CHILD_THEME_VERSION, true);

  }

  add_action( 'wp_enqueue_scripts', 'site_scripts', 15 );
endif;
