var breakingStart = true; // autostart breaking news
var breakingSpeed = 40; // breaking msg speed

var breakingScroll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var breakingOffset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var elementsToClone = [true, true, true, true, true, true, true, true, true, true];
var elementsActive = [];
var theCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


(function ($) {
    "use strict";

	var supports = (function() {
		var div = document.createElement('div'),
			vendors = 'Khtml Ms O Moz Webkit'.split(' '),
			len = vendors.length;

		return function(prop) {
			if ( prop in div.style ) return true;

			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});

			while(len--) {
				if ( vendors[len] + prop in div.style ) {
					return true;
				}
			}
			return false;
		};
	})();


	jQuery(window).scroll(function() {
		if(jQuery(".sidebar-fixed").length){

			if(parseInt(jQuery("#sidebar").height()) >= parseInt(jQuery(".left-content").height())){
				jQuery(".sidebar-fixed.is-now-fixed").removeClass("is-now-fixed").css("paddingTop", "0px");
				return false;
			}

			var fixedSidebar = jQuery(".sidebar-fixed"),
				additionalPx = (jQuery("#wpadminbar").length > 0)?32:0;
			if(jQuery(window).scrollTop()+100+additionalPx >= fixedSidebar.offset().top){
				var newtop = parseInt(jQuery(window).scrollTop())-parseInt(fixedSidebar.offset().top)+100+additionalPx,
					v1 = parseInt(fixedSidebar.height()),
					v2 = parseInt(newtop)+parseInt(fixedSidebar.offset().top);

				if(parseInt(jQuery(".footer").offset().top) <= (v1+v2)){
					// reached end
				}else{
					fixedSidebar.addClass("is-now-fixed").css("paddingTop", newtop+"px");
				}
			}else{
				jQuery(".sidebar-fixed.is-now-fixed").removeClass("is-now-fixed").css("paddingTop", "0px");
			}

		}
	});

	jQuery(window).ready(function() {

		jQuery(".breaking-news").wrap("<div class='breaking-wrapper'></div>");

		jQuery("body").addClass("ot-menu-ipad-enable").addClass("ot-menu-iphone-enable");

		function init() {
			var speed = 250,
				easing = mina.easeinout;

			[].slice.call ( document.querySelectorAll( 'a.image-hover[data-path-hover]' ) ).forEach( function( el ) {
				var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
					pathConfig = {
						from : path.attr( 'd' ),
						to : el.getAttribute( 'data-path-hover' )
					};

				el.addEventListener( 'mouseenter', function() {
					path.animate( { 'path' : pathConfig.to }, speed, easing );
				} );

				el.addEventListener( 'mouseleave', function() {
					path.animate( { 'path' : pathConfig.from }, speed, easing );
				} );
			} );
		}

		function makeFixedHeader(){
			var element = jQuery(".header.willfix");
			if(element.hasClass("makefixed"))return false;
			element.css("height", element.children(".wrapper").height());
			element.addClass("makefixed");
			element.children("div").addClass("animated bounceInDown");
		}

		function removeFixedHeader(){
			var element = jQuery(".header.willfix");
			if(!element.hasClass("makefixed"))return false;
			element.css("height", "auto");
			element.removeClass("makefixed");
			element.children("div").removeClass("animated bounceInDown");
		}

		jQuery(window).resize(function() {
			var htop = (parseInt(jQuery(".header").offset().top+100)+parseInt(jQuery(".header").css("padding-top")));
			if(jQuery(window).scrollTop() >= htop){
				makeFixedHeader();
			}else{
				removeFixedHeader();
			}
			jQuery(".header.makefixed > .wrapper").css("left", "50%").css("margin-left", -(parseInt(jQuery(".header.makefixed > .wrapper").css("width"))/2));
		});

		jQuery(window).scroll(function() {
			var htop = (parseInt(jQuery(".header").offset().top+100)+parseInt(jQuery(".header").css("padding-top")));
			if(jQuery(window).scrollTop() >= htop){
				makeFixedHeader();
			}else{
				removeFixedHeader();
			}
			jQuery(".header.makefixed > .wrapper").css("left", "50%").css("margin-left", -(parseInt(jQuery(".header.makefixed > .wrapper").css("width"))/2));
		});

		jQuery("a[href='#close-alert']").click(function(){
			jQuery(this).parent().hide();
			return false;
		});

		init();

		if ( supports('perspective') ) {
			jQuery(".main-menu").addClass("transition-active");
		}else{
			jQuery(".main-menu").removeClass("transition-active");
		}

		function otdoanim(element, theway){
			var animel = (!element.data("anim-object"))?element:jQuery(element.data("anim-object")),
				animationin = (!element.data("anim-in"))?"":element.data("anim-in"),
				animationout = (!element.data("anim-out"))?"":element.data("anim-out");

			// element.css("width", element.width()).css("height", element.height());

			if(theway == "in"){
				if(element.data("anim-object") == ".header-logo a.otanimation img, .header-logo a.otanimation h1"){
					otdoanim(jQuery(".header-logo > strong"), "out");
				}
				animel.removeClass("animated "+animationout);
				animel.addClass("animated "+animationin);
			}else
			if(theway == "out"){
				if(element.data("anim-object") == ".header-logo a.otanimation img, .header-logo a.otanimation h1"){
					otdoanim(jQuery(".header-logo > strong"), "in");
				}
				animel.removeClass("animated "+animationin);
				animel.addClass("animated "+animationout);
			}
		}

		jQuery(".otanimation").mouseenter(function (){
			otdoanim(jQuery(this), "in");
		}).mouseleave(function (){
			otdoanim(jQuery(this), "out");
		});

		jQuery(".search-header input[type=text], .search-header input[type=search]").on("focus", function(){
			var elemet = jQuery(".search-header");
			elemet.addClass("active").siblings("ul").addClass("hidelis");
		}).on("blur", function(){
			jQuery(".search-header").removeClass("active").siblings("ul").removeClass("hidelis");
		});

		var mega_widget_height = new Array(),
			mega_widget_counter = 0;

		jQuery(".has-ot-mega-menu").mouseenter(function (){
			var getThisel = jQuery(this).find(".widget");
				mega_widget_height[mega_widget_counter] = 0;
			getThisel.css("height", "auto");
			for (var i = 0; i <= getThisel.length - 1; i++) {
				if(parseInt(getThisel.eq(i).height())+(parseInt(getThisel.eq(i).css("padding-top"))*2) > mega_widget_height[mega_widget_counter]){
					mega_widget_height[mega_widget_counter] = parseInt(getThisel.eq(i).height())+(parseInt(getThisel.eq(i).css("padding-top"))*2);
				}
			}
			getThisel.css("height", mega_widget_height[mega_widget_counter]+"px");
			mega_widget_counter += 1;
		});



		jQuery(".ot-tabbed h3").click(function(){
			var element = jQuery(this);
			element.addClass("active").siblings(".active").removeClass("active");
			element.parent().siblings("div").eq(element.index()).addClass("active").siblings(".active").removeClass("active");
			return false;
		});



		// Breaking News Scroller
        jQuery(".breaking-news").mouseenter(function () {
            var thisindex = jQuery(this).attr("rel");
            clearTimeout(elementsActive[thisindex]);
        }).mouseleave(function () {
            var thisindex = jQuery(this).attr("rel");
            elementsActive[thisindex] = false;
        });

        start();




		// Accordion blocks
		jQuery(".accordion > div > a").click(function () {
		    var thisel = jQuery(this).parent();
		    if (thisel.hasClass("active")) {
		        thisel.removeClass("active").children("div").animate({
		            "height": "toggle",
		            "opacity": "toggle",
		            "padding-top": "toggle"
		        }, 300);
		        return false;
		    }
		    // thisel.siblings("div").removeClass("active");
		    thisel.siblings("div").each(function () {
		        var tz = jQuery(this);
		        if (tz.hasClass("active")) {
		            tz.removeClass("active").children("div").animate({
		                "height": "toggle",
		                "opacity": "toggle",
		                "padding-top": "toggle"
		            }, 300);
		        }
		    });
		    // thisel.addClass("active");
		    thisel.addClass("active").children("div").animate({
		        "height": "toggle",
		        "opacity": "toggle",
		        "padding-top": "toggle"
		    }, 300);
		    return false;
		});


		// Tabbed blocks
		jQuery(".short-tabs").each(function () {
		    var thisel = jQuery(this);
		    thisel.children("div").eq(0).addClass("active");
		    thisel.children("ul").children("li").eq(0).addClass("active");
		});

		jQuery(".short-tabs > ul > li a").click(function () {
		    var thisel = jQuery(this).parent();
		    thisel.siblings(".active").removeClass("active");
		    thisel.addClass("active");
		    thisel.parent().siblings("div.active").removeClass("active");
		    thisel.parent().siblings("div").eq(thisel.index()).addClass("active");
		    return false;
		});
		

        jQuery(".lightbox").click(function () {
            jQuery(".lightbox").css('overflow', 'hidden');
            jQuery("body").css('overflow', 'auto');
            jQuery(".lightbox .lightcontent").fadeOut('fast');
            jQuery(".lightbox").fadeOut('slow');
        }).children().click(function (e) {
            return false;
        });


		jQuery(".widget .photo-gallery-widget .gallery-navi a").click(function(){
			var thisel = jQuery(this),
				imageel = thisel.parent().siblings(".gallery-change").children("a.active");
			if(thisel.attr("href") == "#gal-left") {
				imageel.parent().find("img").removeClass("bounceInLeft").removeClass("bounceOutRight").removeClass("bounceInRight").removeClass("bounceOutLeft");
				imageel.prev().addClass("active").children("img").addClass("animated bounceInLeft").parent().siblings("a.active").removeClass("active").children("img").addClass("animated bounceOutRight");
			}else
			if(thisel.attr("href") == "#gal-right") {
				imageel.parent().find("img").removeClass("bounceInLeft").removeClass("bounceOutRight").removeClass("bounceInRight").removeClass("bounceOutLeft");
				imageel.next().addClass("active").children("img").addClass("animated bounceInRight").parent().siblings("a.active").removeClass("active").children("img").addClass("animated bounceOutLeft");
			}
			return false;
		});

		jQuery(".home-featured-article .home-featured-menu a").click(function(){
			var thisel = jQuery(this);
			thisel.addClass("active").siblings("a").removeClass("active").parent().parent().children(".home-featured-item").eq(thisel.index()).addClass("active").siblings(".home-featured-item").removeClass("active");
			return false;
		});

		jQuery(".portfolio-single-images-thumbnails a").click(function(){
			var thisel = jQuery(this);

			thisel.addClass("active").siblings(".active").removeClass("active").parent().siblings(".portfolio-single-images-frame").children("span").eq(thisel.index()).addClass("active").siblings(".active").removeClass("active");
			return false;
		});

	});


})(jQuery);


function refreshMegamenu() {
	var getThisel = jQuery(".has-ot-mega-menu").find(".widget");
		mega_widget_height = 0;
	getThisel.css("height", "auto");
	for (var i = 0; i <= getThisel.length - 1; i++) {
		if(parseInt(getThisel.eq(i).height())+(parseInt(getThisel.eq(i).css("padding-top"))*2) > mega_widget_height){
			mega_widget_height = parseInt(getThisel.eq(i).height())+(parseInt(getThisel.eq(i).css("padding-top"))*2);
		}
	}
	getThisel.css("height", mega_widget_height+"px");
}

function start() {
    var z = 0;
    jQuery('.breaking-block ul').each(function () {
        var thisitem = jQuery(this), thisindex = z;
        z = z + 1;
        if (thisitem.find("li").size() > 0) {

            if (!breakingStart) { return false; }
            var theBreakingMargin = parseInt(thisitem.find("li").css("margin-right")),
            	theBreakingWidth = parseInt(thisitem.parent().css("width")),

				itemul = thisitem,
            	itemtemp = 0,
            	items = itemul.find("li").each(function(){
            		itemtemp = itemtemp+parseInt(jQuery(this).width()) + parseInt(jQuery(this).css("padding-right")) + parseInt(jQuery(this).css("margin-right"));
            	});

            theCount[thisindex] = (itemtemp / 2);

            if (elementsToClone[thisindex]) {
                jQuery(this).parent().parent().addClass("isscrolling");
                jQuery('.breaking-block').eq(thisindex).parent().attr("rel", thisindex);
                thisitem.find("li").clone().appendTo(this);

                elementsToClone[thisindex] = false;
            }
            var theNumber = theCount[thisindex] + breakingOffset[thisindex];

            if (Math.abs(theNumber) <= (Math.abs(breakingScroll[thisindex]))) {
                cloneBreakingLine(thisindex);
            }

            if (!elementsActive[thisindex]) {
                elementsActive[thisindex] = setInterval(function () {
                    beginScrolling(thisitem, thisindex);
                }, breakingSpeed);
            }
        }
    });

    setTimeout("start()", breakingSpeed);
}

function beginScrolling(thisitem, thisindex) {
    breakingScroll[thisindex] = breakingScroll[thisindex] - 1;
    thisitem.css("left", breakingScroll[thisindex] + 'px');
}

function cloneBreakingLine(thisindex) {
    breakingScroll[thisindex] = 0;
    jQuery('.breaking-block').eq(thisindex).find('ul').css("left", "0px");
}

function lightboxclose() {
	jQuery(".lightbox").css('overflow', 'hidden');
	jQuery(".lightbox .lightcontent").fadeOut('fast');
	jQuery(".lightbox").fadeOut('slow');
	jQuery("body").css('overflow', 'auto');
}

