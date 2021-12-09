<?php
/**
 * Preload Featured Image
 *
 * @package CWOF
 */

function preload_featured_image(){
  if (has_post_thumbnail()) {
    $attachment_image = wp_get_attachment_url( get_post_thumbnail_id() );
    echo '<link rel="preload" as="image" href="'.$attachment_image.'">';
  }
}
add_action('wp_head', 'preload_featured_image');