<?php


if( function_exists('acf_add_options_page') ) {

	// acf_add_options_page();
	acf_add_options_page(array(
		'page_title' 	=> 'options',
		'menu_title'	=> 'Options',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

}

// Register custom post Trips

add_action( 'init', 'create_post_type_trips' );

function create_post_type_trips() {

  register_post_type( 'trip',
    array(
      'labels' => array(
        'name' => __( 'Trips' ),
        'singular_name' => __( 'Trip' )
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'trips'),
      'menu_position' => 5,
      'capability_type' => 'post',
      'delete_with_user' => true
    )
  );
}


add_action('wp_rest_user_user_register', 'user_registered');
function user_registered($user) {
  $user->remove_role( 'subscriber' );
  $user->add_role('author');
}

add_filter('jwt_auth_token_before_dispatch', 'add_user_role_response', 10, 2);
function add_user_role_response($data, $user){
  $data['roles'] = $user->roles;
  return $data;
}

add_filter('jwt_auth_token_before_dispatch', 'add_user_id_response', 10, 2);
function add_user_id_response($data, $user){
  $data['user_id'] = $user->id;
  return $data;
}

add_theme_support( 'extralarge' );
the_post_thumbnail('extralarge');
add_image_size( 'extralarge', 2000, 2000, true );

require_once('includes/acf_select_options.php');
require_once('includes/my_endpoints.php');


