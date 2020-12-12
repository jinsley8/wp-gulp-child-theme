<?php
/**
 * Elementor Overrides
 *
 * @package nextgen
 */

// remove Google Fonts
add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );

// remove Font Awesome
// add_action( 'elementor/frontend/after_register_styles',function() {
// 	foreach( [ 'solid', 'regular', 'brands' ] as $style ) {
// 		wp_deregister_style( 'elementor-icons-fa-' . $style );
// 	}
// }, 20 );

// Remove Eicons on frontend only
add_action( 'elementor/frontend/after_enqueue_styles', 'js_dequeue_eicons' );
function js_dequeue_eicons() {

  // Don't remove it in the backend
  if ( is_admin() || current_user_can( 'manage_options' ) ) {
        return;
  }
  wp_dequeue_style( 'elementor-icons' );
}

// Show the related posts with category
add_filter( 'uael_posts_query_args', function( $query, $settings ) {

  $post_id = get_the_ID();
  $cat_ids = array();
  $categories = get_the_category( $post_id );

  if( ! empty( $categories ) && ! is_wp_error( $categories ) ):

    foreach ( $categories as $category ):
      array_push( $cat_ids, $category->term_id );
    endforeach;
  endif;

  $query['category__in'] = $cat_ids;
  $query['post_not_in'] = array($post_id);

  return $query;
}, 10, 2 );

// Display only sub-categories in Taxonomy Badge
add_filter( 'uael_posts_tax_filter', function( $terms ) {
	$child_terms = array();
	$terms = wp_get_post_terms( get_the_ID(), 'category' );

	foreach( $terms as $term ){
		if( $term->parent !== 0 ){

			array_push( $child_terms, $term );
		}
	}

	return $child_terms;
}, 10, 2 );