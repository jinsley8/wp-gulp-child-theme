<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Calling your own login css so you can style it
function custom_login_css() {
	wp_enqueue_style( 'custom_login_css', get_stylesheet_directory_uri().'/login/login-styles.css', false );
}

// Changing the logo link from wordpress.org to your site
function custom_login_url() {  return home_url(); }

// Changing the alt text on the logo to show your site name
function custom_login_title( $headertext ) {
  $headertext = esc_html__( get_option('blogname') );
  return $headertext;
}

// Calling it only on the login page
add_action( 'login_enqueue_scripts', 'custom_login_css', 10 );
add_filter('login_headerurl', 'custom_login_url');
add_filter('login_headertext', 'custom_login_title');
add_action('login_head', 'custom_login_css');

/** REPLACE HOWDY **/
function replace_howdy( $wp_admin_bar ) {
	$my_account=$wp_admin_bar->get_node('my-account');
	$newtitle = str_replace( 'Howdy,', 'Logged in as', $my_account->title );
	$wp_admin_bar->add_node( array(
		'id' => 'my-account',
		'title' => $newtitle,
	) );
}
add_filter( 'admin_bar_menu', 'replace_howdy',25 );
