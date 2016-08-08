// JavaScript Document
$(document).ready(function() {
	$('.tabcontent:first').show();
	$('#tabs li a:first').addClass('tab-active');
	$('#tabs li:first').addClass('selected');
	$('ul#tabs li a').bind('click' ,function() {
		var linkIndex = $('#tabs li a').index(this);
		$('ul#tabs li a').removeClass('tab-active');
		$(".tabcontent:visible").hide();
		$(".tabcontent:eq("+linkIndex+")").customFadeIn('slow' );
		$(this).addClass('tab-active');
		return false;
	});
});
(function($) {
	$.fn.customFadeIn = function(speed, callback) {
		$(this).fadeIn(speed, function() {
			if(jQuery.browser.msie)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};
	$.fn.customFadeOut = function(speed, callback) {
		$(this).fadeOut(speed, function() {
			if(jQuery.browser.msie)
				$(this).get(0).style.removeAttribute('filter');
			if(callback != undefined)
				callback();
		});
	};
})(jQuery);

