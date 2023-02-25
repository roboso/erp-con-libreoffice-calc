"use strict";


jQuery(".similar-articles-list .similar-articles").owlCarousel({
     items : 4,
     autoPlay : false,
     stopOnHover : true,
     navigation : false,
     lazyLoad : true,
     singleItem : false,
     pagination : true
});

jQuery(document).ready(function() {
	jQuery(".gallery-shortcode-photos").owlCarousel({
		items : 3,
		autoPlay : false,
		stopOnHover : true,
		navigation : false,
		lazyLoad : true,
		singleItem : false,
		pagination : true
	});
});

jQuery(document).ready(function() {
	jQuery(".ot-slider").owlCarousel({
		items : 1,
		autoPlay : true,
		stopOnHover : true,
		navigation : true,
		lazyLoad : true,
		singleItem : true,
		pagination : false
	});
});