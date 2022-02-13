<?php


/**
 * Enqueue Google Analytics 4 script
 *
 * @package WP Gulp Child Theme
 */

/* Add Google Analytics 4 Site Tag as close to
the opening <head> tag as possible
=====================================================*/

define("GA4","G-XXXXXX", false);

function add_google_analytics() {

  // disabled for Admin users
  if ( !current_user_can( 'manage_options' ) ) {
    ?>
      <!-- Start Google Analytics Script -->
      <!-- Global Site Tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GA4 ?>"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};
        gtag('js', new Date());

        gtag('config', '<?php echo GA4 ?>');
      </script>
      <!-- End Google Analytics Script -->
    <?php
  }
}

add_action('wp_head', 'add_google_analytics');
