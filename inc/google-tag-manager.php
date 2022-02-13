<?php

/**
 * Enqueue Google Tag Manager script
 *
 * @package WP Gulp Child Theme
 */

/* Add Google Tag Manager javascript code as close to
the opening <head> tag as possible
=====================================================*/

define("GTM_TAG","GTM-XXXXXX", false);

function add_gtm_head(){

  // disabled for Admin users
  if ( !current_user_can( 'manage_options' ) ) {
    ?>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','<?php echo GTM_TAG ?>');</script>
    <!-- End Google Tag Manager -->

    <?php
  }
}
add_action( 'wp_head', 'add_gtm_head', 10 );

/* Add Google Tag Manager noscript code immediately after
the opening <body> tag
========================================================*/

function add_gtm_body(){

  // disabled for Admin users
  if ( !current_user_can( 'manage_options' ) ) {
    ?>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo GTM_TAG ?>"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <?php
  }
}
add_action( 'wp_body_open', 'add_gtm_body' );
