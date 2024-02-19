<?php

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
			'callback' => 'trips_endpoint',
			'permission_callback' => '__return_true'
	));
});

function  pages_endpoint( $request_data ) {
	$args = array(
		'post_type' => 'page',
		'posts_per_page'=> -1,
		'numberposts'=> -1
	);

	$posts = get_posts($args);
	foreach ($posts as $key => $post) {
		$posts[$key]->acf = get_fields($post->ID);
		$posts[$key]->acf['slug'] = str_replace( home_url(), '',get_permalink($post->ID) );
	}
	return  $posts;
}

add_action( 'rest_api_init', function () {
	register_rest_route( '/wp/v2/', '/pages/', array(
			'methods' => 'GET',
			'callback' => 'pages_endpoint',
			'permission_callback' => '__return_true'
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
			'callback' => 'options_endpoint',
			'permission_callback' => '__return_true'
	));
});

//Added on 4/26/23
add_action( 'rest_api_init', function () {
	register_rest_route('/wp/v2/', '/get-by-url/(?P<url>\S+)', array(
			'methods'  => 'GET',
			'callback' => array('get_by_url'),
			'permission_callback' => '__return_true'
		));
});

function get_by_url($request) {
		print_r($request);
}
//Added on 4/26/23
