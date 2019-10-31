// Map color names to image files
var image_dict = {
	'After School': 'img/yellow_pillow.jpeg',
	'Morning Haze': 'img/rainy_pillow.jpeg',
	'Rainy Day': 'img/purple_pillow.jpeg',
	'Cozy Denim': 'img/denim_pillow.jpeg'
};

// Create dictionary for all items. These are unique IDs for each item.
var item_dict = {
	'After_School-Duck_Down': {
		Color: 'After School',
		Material: 'Duck Down'
	},
	'After_School-Hypoallergenic_Poly_Blend': {
		Color: 'After School',
		Material: 'Hypoallergenic Poly Blend'
	},
	'After_School-Memory_Foam': {
		Color: 'After School',
		Material: 'Memory Foam'
	},
	'Morning_Haze-Duck_Down': {
		Color: 'Morning Haze',
		Material: 'Duck Down'
	},
	'Morning_Haze-Hypoallergenic_Poly_Blend': {
		Color: 'Morning Haze',
		Material: 'Hypoallergenic Poly Blend'
	},
	'Morning_Haze-Memory_Foam': {
		Color: 'Morning Haze',
		Material: 'Memory Foam'
	},
	'Rainy_Day-Duck_Down': {
		Color: 'Rainy Day',
		Material: 'Duck Down'
	},
	'Rainy_Day-Hypoallergenic_Poly_Blend': {
		Color: 'Rainy Day',
		Material: 'Hypoallergenic Poly Blend'
	},
	'Rainy_Day-Memory_Foam': {
		Color: 'Rainy Day',
		Material: 'Memory Foam'
	},
	'Cozy_Denim-Duck_Down': {
		Color: 'Cozy Denim',
		Material: 'Duck Down'
	},
	'Cozy_Denim-Hypoallergenic_Poly_Blend': {
		Color: 'Cozy Denim',
		Material: 'Hypoallergenic Poly Blend'
	},
	'Cozy_Denim-Memory_Foam': {
		Color: 'Cozy Denim',
		Material: 'Memory Foam'
	},
}

$(document).ready(function() {
	// https://stackoverflow.com/questions/27101409/jquery-load-in-a-loop
	// Handles load(), keeping inputs consistent
	function buildHandler(key) {
		return function() {
			// Populate new div
			$('#cart-item-' + key).find('.cart-item-material').html("Material: " + item_dict[key]['Material']);
			$('#cart-item-' + key).find('.cart-item-color').html("Color: " + item_dict[key]['Color']);
			$('#cart-item-' + key).find('#qty').html(" " + localStorage.getItem(key));
			$('#cart-item-' + key).find('.cart-item-price').html("$" + (parseInt(localStorage.getItem(key) * 40)) + ".00");
			$('#cart-item-' + key).find('a').find('img').attr('src', image_dict[item_dict[key]['Color']]).width(122);
		};
	}

	for (var i = 0; i < localStorage.length; i++) {
		k = localStorage.key(i);
		// Create new cart-item with correct properties
		var newDiv = document.createElement('div');
		newDiv.setAttribute('id', 'cart-item-' + k);
		$('.cart-body').eq(0).append(newDiv);
		$('#cart-item-' + k).load("https://judy-chun.github.io/assgn6/include/cart_item.html", buildHandler(k));
	}
});

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

	// Detect click on Remove button in cart
	$('.cart-remove-item').on('click', function() {
		console.log('here');
		console.log($(this).parent().parent().parent().attr('id').substring(10));
		localStorage.removeItem($(this).parent().parent().parent().attr('id').substring(10));
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

function constructId(color, material) {
	// https://w3schools.com/jsref/jsref_replace.asp for global replacement
	// Construct unique ID for color/material combination
	return color.replace(/ /g, '_') + '-' + material.replace(/ /g,'_');
}
	
function cartString() {
	// Debug string to retrieve cart contents
	var cartString = 'Current Cart:';
	for (var i = 0; i < localStorage.length; i++) {
		k = localStorage.key(i);
		cartString = cartString + '\n\t' + k + ': ' + localStorage.getItem(k) + ' items';
	}
	console.log(cartString);
}

function processProduct() {
	// Process product after "Add to Cart" button is clicked

	// Retrieve: quantity, color, material. Create ID out of color+material
	var menu = document.getElementById('quantity-menu');
	var qty = parseInt(menu.options[menu.selectedIndex].text);
	var active_color = idToName($($('.hidden')[0]).find('span').attr('id'));
	var active_material = idToName($($('.hidden')[1]).attr('id'));
	var active_id = constructId(active_color, active_material);

// active_color:    "button-after-school" -> "After School"
// active_material: "button-duck-down" -> "Duck Down"

// active_id:       "After_School-Duck_Down"

// qty:             6

/*
{
"After_School-Duck_Down": 6
"Misty_rain-Memory_Foam" : 9
.
.
.
.
}*/



	// Create string to display for user
	var string;
	if (qty == 1) {
		string = (qty + ' item has been added to your shopping bag!');
	} else {
		string = (qty + ' items have been added to your shopping bag!');
	}

	// Update localStorage
	if (typeof(Storage) !== "undefined") {
		// Create new item in localStorage if it's not in the cart yet. Otherwise, update amount.
		if (localStorage.getItem(active_id) !== null) {
			localStorage.setItem(active_id, parseInt(localStorage.getItem(active_id)) + qty);
		} else {
			localStorage.setItem(active_id, qty);
		}

		// Debug adding items
		cartString();

		// Update product page with quantity value and also Window.alert()
		document.getElementById('added').innerHTML = string;
		setTimeout(function() {alert(string);}, 0.25);
	} else {
		document.getElementById('added').innerHTML = "This browser does not support localstorage."
	}
}

/*function clearCart() {
	localStorage.clear();
	cartString();
}*/

function remove(el) {
	localStorage.removeItem(el.parentNode.parentNode.parentNode.id.substring(10));
	location.reload();
}