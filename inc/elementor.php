<?php
/**
 * Elementor Overrides
 *
 * @package WP Gulp Child Theme
 */

// remove Google Fonts
add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );

// remove Font Awesome
add_action( 'elementor/frontend/after_register_styles',function() {
	foreach( [ 'solid', 'regular', 'brands' ] as $style ) {
		wp_deregister_style( 'elementor-icons-fa-' . $style );
	}
}, 20 );


// Remove Eicons on frontend only
add_action( 'elementor/frontend/after_enqueue_styles', 'js_dequeue_eicons' );

function js_dequeue_eicons() {

  // Don't remove it in the backend
  if ( is_admin() || current_user_can( 'manage_options' ) ) {
    return;
  }
  wp_dequeue_style( 'elementor-icons' );
}