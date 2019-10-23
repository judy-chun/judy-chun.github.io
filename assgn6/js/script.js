// Map color names to image files
var image_dict = {
	'After School': 'img/yellow_pillow.jpeg',
	'Morning Haze': 'img/rainy_pillow.jpeg',
	'Rainy Day': 'img/purple_pillow.jpeg',
	'Cozy Denim': 'img/denim_pillow.jpeg'
};

$(function() {
	// Detect click on color buttons
	$('.color-button').on('click', function() {
		activateColor($(this).attr('id'));
	});

	// Detect click on dropdown menu items
	$('.color-dropdown-content > div').on('click', function(e) {
		activateColor($(this).find('span').attr('id'));
		e.stopPropagation();
		$(this).parent().removeClass('color-dropdown-content-hover');
	});

	$('.material-dropdown-content > div').on('click', function(e) {
		activateMaterial($(this).attr('id'));
		e.stopPropagation();
		$(this).parent().removeClass('material-dropdown-content-hover');
	});


	// Detect clickin on dropdown menu
	$('.color-dropdown-button').on('click', function() {
		$(this).parent().find('.color-dropdown-content').toggleClass('color-dropdown-content-hover').focus();
	});

	$('.material-dropdown').on('click', function() {
		$(this).parent().find('.material-dropdown-content').toggleClass('material-dropdown-content-hover').focus();
	})

	// Detect clickout on dropdown menu
	$('.color-dropdown').on('focusout', function() {
		$(this).find('.color-dropdown-content').removeClass('color-dropdown-content-hover');
	});	

	$('.material-dropdown').on('focusout', function() {
		$(this).find('.material-dropdown-content').removeClass('material-dropdown-content-hover');
	});
});

function activateColor(clicked) {
	// Deactivate all color buttons and then activate the selected one
	$('.color-button').removeClass('button-active');
	$('.color-button#' + clicked).addClass('button-active');

	// Show all dropdown items and then hide the selected one
	$('.color-square').parent().removeClass('hidden');
	$('.color-square#' + clicked).parent().addClass('hidden');

	// Replace text and color swatch in dropdown display
	var element = document.getElementById('color-dropdown-display');
	var color = idToName(clicked);		
	element.innerHTML = color + element.innerHTML.substring(element.innerHTML.indexOf('<'));
	$('.color-square-display').attr('id', clicked);

	// Changing the image source 
	$('.large-image').attr('src', image_dict[color]);

}

function activateMaterial(clicked) {
	// Show all dropdown items and then hide the selected one
	$('.material-item').removeClass('hidden');
	$('.material-item#' + clicked).addClass('hidden');

	// Replace text in dropdown display
	var element = document.getElementById('material-dropdown-display');
	element.innerHTML = idToName(clicked) + element.innerHTML.substring(element.innerHTML.indexOf('<'));
}

function idToName(clicked) {
	// Programatically retrieve name of selected color with proper capitalization
	var split_clicked_color = clicked.substring(7).split('-');
	for (var i = 0; i < split_clicked_color.length; i++) {
		lower = split_clicked_color[i];
		split_clicked_color[i] = lower.charAt(0).toUpperCase() + lower.substring(1);
	}
	return split_clicked_color.join(' ');
}

function processProduct() {
	// Get the selected quantity value
	var menu = document.getElementById('quantity-menu');
	var qty = parseInt(menu.options[menu.selectedIndex].text);
	var string;
	if (qty == 1) {
		string = (qty + ' item has been added to your shopping bag!');
	} else {
		string = (qty + ' items have been added to your shopping bag!');
	}

	// Update product page with quantity value and also Window.alert()
	document.getElementById('added').innerHTML = string;
	setTimeout(function() {alert(string);}, 0.25);
}