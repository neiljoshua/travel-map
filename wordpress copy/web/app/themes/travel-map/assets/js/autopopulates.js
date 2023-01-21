jQuery(document).ready(function($) {

  function update_selected_country() {
  	console.log('update_selected_country');

    var selected_country = ''; // Selected value

    // Get selected value

    console.log(' Change Country ', $( '#acf-field_5cc511b8f37c8 option:selected' ));
    $( '#acf-field_5cc511b8f37c8 option:selected' ).each(function() {
        selected_country += $( this ).text();
    });


    // If default is not selected get cities for selected country
    if( selected_country != 'Select Country' ) {
        // Send AJAX request
      data = {
          action: 'pa_add_cities',
          pa_nonce: pa_vars.pa_nonce,
          country: selected_country
      };

      // Get response and populate city select field
      $.post( ajaxurl, data, function(response) {
      	console.log('ajaxurl', ajaxurl);
    		console.log("Response", response);
    		var data = response;
        if(data){
          //   Disable 'Select city' field until country is selected
          $('#acf-field_5d9129abb5f6c').html( $('<option></option>').val('Select').html('Select city').attr({ selected: 'selected City'}) );

          // Add cities to select field options
          $.each(response, function( index, value ) {
              $('#acf-field_5d9129abb5f6c').append( $('<option></option>').val(value.city).html(value.city).removeAttr('Selected') );
          });

          // // Enable 'Select city' field
          $('#acf-field_5d9129abb5f6c').removeAttr( 'disabled' );
        }
      });
    }
  };

  function update_selected_city() {
  	var selected_city ='';
  	console.log('update_selected_city');

  	$( '#acf-field_5d9129abb5f6c option:selected' ).each(function() {
      selected_city += $( this ).text();
    });

    $( '#acf-field_5d9129abb5f6c option' ).each(function() {
    	if ( $(this).val() ==  selected_city ) {
    		$(this).attr({selected: 'Selected'});
    		selected_city_value = $(this).val();
    	}
    });

  };

	function loading_selects() {
		var country_options = $( '#acf-field_5cc511b8f37c8' ),
				city_options = $('#acf-field_5d9129abb5f6c'),
				selected_country_value = $( '#acf-field_5cc511b8f37c8 option:selected' ).val(),
				selected_city_value = $('#acf-field_5d9129abb5f6c').val();

		console.log('Country selected', selected_country_value);

		if ($('body').hasClass('post-new-php')) {
      $('#acf-field_5d9129abb5f6c').attr( 'disabled', 'disabled' );
		}

		$('.acf-postbox select').change( function() {
			var selected_value = $(this).attr('name');
			var selected_option = $(this);
			// console.log('selected_option', selected_option);

			switch(selected_value) {
				// 'Country Selected' is selected
				case 'acf[field_5cc511b8f37c8]':
					// console.log('Country Selected', selected_value);
					update_selected_country();
					break
				// 'City Selected' is selected
				case 'acf[field_5d9129abb5f6c]':
					// console.log('City selected', selected_value);
					update_selected_city();
					break
			}

		});
	}

	loading_selects();

});
