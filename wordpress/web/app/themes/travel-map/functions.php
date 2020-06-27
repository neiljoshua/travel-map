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

// Register custom post Properties

add_action( 'init', 'create_post_type' );

function create_post_type() {

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
      'capability_type' => 'post'
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
			$posts[$key]->acf['slug'] = 'Neil';
		}
		return  $posts;
}

add_action( 'rest_api_init', function () {
		register_rest_route( 'trips/v1', '/trip/', array(
				'methods' => 'GET',
				'callback' => 'trips_endpoint'
		));
});

add_theme_support( 'extralarge' );
the_post_thumbnail('extralarge');
add_image_size( 'extralarge', 2000, 2000, true );

require_once('includes/acf_select_options.php');
