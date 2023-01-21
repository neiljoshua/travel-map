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

function  trips_endpoint( $request_data ) {
	$args = array(
		'post_type' => 'trip',
		'posts_per_page'=> -1,
		'numberposts'=> -1
	);

	$posts = get_posts($args);
	foreach ($posts as $key => $post) {
		$posts[$key]->acf = get_fields($post->ID);
		// $posts[$key]->slug = str_replace( home_url(), '',get_permalink($post->ID) );
		// $posts[$key]->acf['slug'] = $key;
		$posts[$key]->acf['slug'] = str_replace( home_url(), '',get_permalink($post->ID) );
	}
	return  $posts;
}

add_action( 'rest_api_init', function () {
	register_rest_route( '/wp/v2/', '/trips/', array(
			'methods' => 'GET',
			'callback' => 'trips_endpoint'
	));
});


function  options_endpoint( $request_data ) {

	$countries = get_field('countries_and_cities', 'option');
	foreach ($countries as $key => $country) {
		$country[$key] = get_fields($country);
	}
	return  $countries;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'acf/v3/options', '/option/', array(
			'methods' => 'GET',
			'callback' => 'options_endpoint'
	));
});


add_theme_support( 'extralarge' );
the_post_thumbnail('extralarge');
add_image_size( 'extralarge', 2000, 2000, true );

require_once('includes/acf_select_options.php');

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



