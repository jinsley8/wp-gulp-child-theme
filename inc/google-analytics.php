<?php

function add_google_analytics() {

  // disabled for Admin users
  if ( !current_user_can( 'manage_options' ) ) {
    ?>
      <!-- Start Google Analytics Script -->
      <!-- Global Site Tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZZQW5YF2F4"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};
        gtag('js', new Date());

        gtag('config', 'G-ZZQW5YF2F4'); // Added Google Analytics 4 ID
      </script>
      <!-- End Google Analytics Script -->
    <?php
  }
}

add_action('wp_head', 'add_google_analytics');