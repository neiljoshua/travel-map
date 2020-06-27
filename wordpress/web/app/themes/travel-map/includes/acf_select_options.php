<?php
function acf_load_country_value( $field ) {
	// Reset choices
	$field['choices'] = array();
	// Get field from options page
	$countries_and_cities = get_field('countries_and_cities', 'options');
	// Get only countries in array
	foreach ( $countries_and_cities as $key => $value ) {
		$countries[] = $value['country'];
	}
	// Sort countries alphabetically
	natsort( $countries );
	array_unshift($countries, 'Select Country');
	// Populate choices
	foreach( $countries as $choice ) {
		$field['choices'][ $choice ] = $choice;
	}
	// Return choices
	return $field;
}
// Populate select field using filter
add_filter('acf/load_field/name=country_list', 'acf_load_country_value');

function acf_load_city_value( $field ) {
	$field['choices'] = array();
	$page_id = strval(get_the_ID());
	$country_selected = get_field('country_list', $page_id);
	$selected_city = get_post_meta(get_the_ID(), 'city_list', false);

	$countries_and_cities = get_field('countries_and_cities', 'options');
	foreach ($countries_and_cities as $key => $value) {
	   $countries[$value['country']] = $value['cities'];
	}
	if (array_key_exists( $country_selected, $countries)) {
	  $cities = $countries[$country_selected];
	  foreach ($cities as $city) {
	  	// $city is an array
	  	// $value and $label are set by city key
	  	// echo '<pre>' , var_dump($city) , '</pre>';
  		$value = $city['city'];
  		$label = $city['city'];
  		$field['choices'][ $value ] = $label;
	  }
	}
	return $field;
}
add_filter('acf/load_field/name=city_list', 'acf_load_city_value');

function acf_admin_enqueue( $hook ) {
	$type = get_post_type(); // Check current post type
	// var_dump($type);
	$types = array( 'trip'); // Allowed post types
	// var_dump($types);
	if( !in_array( $type, $types ) )
			return; // Only applies to post types in array
	wp_enqueue_script( 'populate-area', get_template_directory_uri() . '/assets/js/autopopulates.js', array(), null, false);
	wp_localize_script( 'populate-area', 'pa_vars', array(
				'pa_nonce' => wp_create_nonce( 'pa_nonce' ), // Create nonce which we later will use to verify AJAX request
			)
	);
}
add_action( 'admin_enqueue_scripts', 'acf_admin_enqueue' );

// Return cities by country chose from country select field
function acf_load_city_select( $selected_country ) {
	// Verify nonce
	if( !isset( $_POST['pa_nonce'] ) || !wp_verify_nonce( $_POST['pa_nonce'], 'pa_nonce' ) )
		die('Permission denied');
	// Get country var
	$selected_country = $_POST['country'];
	// Get field from options page
	$countries_and_cities = get_field('countries_and_cities', 'options');
	// Simplify array to look like: country => cities
	foreach ($countries_and_cities as $key => $value) {
		$countries[$value['country']] = $value['cities'];
	}
	// Returns Cities by Country selected if selected country exists in array
	if (array_key_exists( $selected_country, $countries)) {
		// Convert cities to array
		$arr_data = $countries[$selected_country];
		return wp_send_json($arr_data);
	} else {
		$data = array();
		return wp_send_json($arr_data);
	}
	die();
}
add_action('wp_ajax_pa_add_cities', 'acf_load_city_select');
add_action('wp_ajax_nopriv_pa_add_cities', 'acf_load_city_select');
