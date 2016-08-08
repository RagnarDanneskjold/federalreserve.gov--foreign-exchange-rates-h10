/*  JavaScript Document                       */
/*  Written by Chris Converse for Lynda.com   */

$(document).ready(function() {

	$('.faq').each(function(){
	//	$(this).append('<div class="letter_q"></div><div class="letter_a"></div>');
	});

// A1. Added this so that when javascript is turned off, all of the containers expand.
	$('.faq_answer_container').css("height","0");
// END A1.
	
	$('.faq_question').click(function(){
		if ($(this).parent().is('.open')) {
			$(this).closest('.faq').find('.faq_answer_container').animate({'height':'0'},500);
			$(this).closest('.faq').find('.letter_a').fadeOut(0);
			$(this).closest('.faq').find('.letter_q').fadeIn(0);
			$(this).closest('.faq').removeClass('open');
		}else{
			var newHeight = $(this).closest('.faq').find('.faq_answer').height() + 'px';
			$(this).closest('.faq').find('.faq_answer_container').animate({'height':newHeight},500);
			$(this).closest('.faq').find('.letter_a').fadeIn(0);
			$(this).closest('.faq').find('.letter_q').fadeOut(0);
			$(this).closest('.faq').addClass('open');
		}
	});
	findAnchorLink();
    			
});

function findAnchorLink(){
	if (location.href.indexOf('#') != -1) {
		var namedAnchor = window.location.hash;
		var faqToFind = namedAnchor + ' .faq_question';
		$(faqToFind).trigger('click');
	}
}

