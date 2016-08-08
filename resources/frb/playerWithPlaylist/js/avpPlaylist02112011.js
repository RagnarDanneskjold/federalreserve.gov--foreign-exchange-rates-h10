// Scroll Plugin
(function($){$.fn.tinyscrollbar=function(options){var defaults={axis:'y',wheel:40,scroll:true,size:'auto',sizethumb:'auto'};var options=$.extend(defaults,options);var oWrapper=$(this);var oViewport={obj:$('.viewport',this)};var oContent={obj:$('.overview',this)};var oScrollbar={obj:$('.scrollbar',this)};var oTrack={obj:$('.track',oScrollbar.obj)};var oThumb={obj:$('.thumb',oScrollbar.obj)};var sAxis=options.axis=='x',sDirection=sAxis?'left':'top',sSize=sAxis?'Width':'Height';var iScroll,iPosition={start:0,now:0},iMouse={};if(this.length>1){this.each(function(){$(this).tinyscrollbar(options)});return this;}
this.initialize=function(){this.update();setEvents();};this.update=function(){iScroll=0;oViewport[options.axis]=oViewport.obj[0]['offset'+sSize];oContent[options.axis]=oContent.obj[0]['scroll'+sSize];oContent.ratio=oViewport[options.axis]/oContent[options.axis];oScrollbar.obj.toggleClass('disable',oContent.ratio>=1);oTrack[options.axis]=options.size=='auto'?oViewport[options.axis]:options.size;oThumb[options.axis]=Math.min(oTrack[options.axis],Math.max(0,(options.sizethumb=='auto'?(oTrack[options.axis]*oContent.ratio):options.sizethumb)));oScrollbar.ratio=options.sizethumb=='auto'?(oContent[options.axis]/oTrack[options.axis]):(oContent[options.axis]-oViewport[options.axis])/(oTrack[options.axis]-oThumb[options.axis]);setSize();};function setSize(){oContent.obj.removeAttr('style');oThumb.obj.removeAttr('style');iMouse['start']=oThumb.obj.offset()[sDirection];var sCssSize=sSize.toLowerCase();oScrollbar.obj.css(sCssSize,oTrack[options.axis]);oTrack.obj.css(sCssSize,oTrack[options.axis]);oThumb.obj.css(sCssSize,oThumb[options.axis]);};function setEvents(){oThumb.obj.bind('mousedown',start);oTrack.obj.bind('mouseup',drag);if(options.scroll&&this.addEventListener){oWrapper[0].addEventListener('DOMMouseScroll',wheel,false);oWrapper[0].addEventListener('mousewheel',wheel,false);}
else if(options.scroll){oWrapper[0].onmousewheel=wheel;}};function start(oEvent){iMouse.start=sAxis?oEvent.pageX:oEvent.pageY;if (oThumb.obj.css(sDirection) == 'auto'){
iPosition.start=0;}else{iPosition.start=parseInt(oThumb.obj.css(sDirection));}$(document).bind('mousemove',drag);$(document).bind('mouseup',end);oThumb.obj.bind('mouseup',end);return false;};function wheel(oEvent){if(!(oContent.ratio>=1)){oEvent=$.event.fix(oEvent||window.event);var iDelta=oEvent.wheelDelta?oEvent.wheelDelta/120:-oEvent.detail/3;iScroll-=iDelta*options.wheel;iScroll=Math.min((oContent[options.axis]-oViewport[options.axis]),Math.max(0,iScroll));oThumb.obj.css(sDirection,iScroll/oScrollbar.ratio);oContent.obj.css(sDirection,-iScroll);oEvent.preventDefault();};};function end(oEvent){$(document).unbind('mousemove',drag);$(document).unbind('mouseup',end);oThumb.obj.unbind('mouseup',end);return false;};function drag(oEvent){if(!(oContent.ratio>=1)){iPosition.now=Math.min((oTrack[options.axis]-oThumb[options.axis]),Math.max(0,(iPosition.start+((sAxis?oEvent.pageX:oEvent.pageY)-iMouse.start))));iScroll=iPosition.now*oScrollbar.ratio;oContent.obj.css(sDirection,-iScroll);oThumb.obj.css(sDirection,iPosition.now);;}
return false;};return this.initialize();};})(jQuery);

//Custom Fig Leaf "target='_self' emulation" 
var bcplayer='avp'
function onTemplateLoaded(bcplayer){var bcExp;var modVP;var modExp;bcExp=brightcove.getExperience(bcplayer);modVP=bcExp.getModule(APIModules.VIDEO_PLAYER);modExp=bcExp.getModule(APIModules.EXPERIENCE);modExp.addEventListener(BCExperienceEvent.TEMPLATE_READY,function onTemplateReady(){var currentVideo=modVP.getCurrentVideo();var tlink=modExp.getElementByID("transcriptLink");if(tlink){var Turl=currentVideo.customFields["transcriptlinkurl"];tlink.addEventListener("elementClick",function onLinkClick(evt){if(evt.elementID=="transcriptLink"){window.location.href=Turl;}});}
var r1link=modExp.getElementByID("relatedLink");if(r1link){var R1url=currentVideo.linkURL;r1link.addEventListener("elementClick",function onLinkClick(evt){if(evt.elementID=="relatedLink"){window.location.href=R1url;}});}
var r2link=modExp.getElementByID("relatedLink2");if(r2link){var R2url=currentVideo.customFields["relatedlink2url"];r2link.addEventListener("elementClick",function onLinkClick(evt){if(evt.elementID=="relatedLink2"){window.location.href=R2url;}});}
var r3link=modExp.getElementByID("relatedLink3");if(r3link){var R3url=currentVideo.customFields["relatedlink3url"];r3link.addEventListener("elementClick",function onLinkClick(evt){if(evt.elementID=="relatedLink3"){window.location.href=R3url;}})}});}

//START OF ACCESSIBLE BRIGHTCOVE PLAYLIST PLAYER
//START OF ACCESSIBLE BRIGHTCOVE PLAYLIST PLAYER
//START OF ACCESSIBLE BRIGHTCOVE PLAYLIST PLAYER

// Constants
var MODE_AUDIO = 0; // page display mode for audio only 
var MODE_VIDEO = 1; // page display mode for video only

var SEARCH_TYPE_TAG = 0; // search videos by category keyword/tag
var SEARCH_TYPE_KEYWORD = 1; // standard keyword search

var ITEMS_PER_PAGE = 10;  // maximum number of items to show per page
var PLAYLIST_MAX = 100; // maximum number of items that can be loaded into a playlist
var DEFAULT_SORT = 'PUBLISH_DATE:DESC'; // default sort order for media results

var NO_RESULTS_TEXT = 'No results were found for your search.';
var SEARCH_TEXT = 'Search all videos';
var MISSING_IMAGE = 'img/missing.jpg';

var PLAYER_ID_AUDIO = "746572018001";
var PLAYER_ID_VIDEO = "720309829001";
var PLAYER_WIDTH_AUDIO = 440;
var PLAYER_WIDTH_VIDEO = 440;
var PLAYER_HEIGHT_AUDIO = 340;
var PLAYER_HEIGHT_VIDEO = 580;
var PLAYER_BGCOLOR_AUDIO = '#ffffff';
var PLAYER_BGCOLOR_VIDEO = '#ffffff';
// Default values
var mode = MODE_VIDEO;
var token = decode('UkZuQWZmSGRxV2V6NmEwaUN1Y3BPVndkTmFVUG5kMFpUWjNNVmhodzE2cG9yYkhwaWlLX25BLi4='); // encoded READ-ONLY token W/O direct URL access to video. Can only read access text.
var currentSearch = SEARCH_TYPE_KEYWORD;
var currentSearchKeyword = '';
// indicates that we are loading the featured media for the main player and the next video that is received should be loaded into the player window (used when player mode changes and/or tabs clicked)
var loadingFeature = true; 

String.prototype.trim = function() {
	return this.replace(/[^\w\s]/gi, '');
}
String.prototype.replaceURL = function(){
	var linkTagReg = /<a.*?>(.*?)<\/a>/gi
	var retval = "";

	if (this.toLowerCase().indexOf('<a') != -1) {
		return this.replace(linkTagReg ,'<i>$1</i>')
	} else {
		return this;
	}
}
String.prototype.isEmpty = function() {
	var trimmed = this.trim();
	if (trimmed.length == 0 || trimmed == 'null') {
		return true;
	}
	return false;
}
function addScriptTag(id, url, callback) { 	
	$('#topVideos').remove();
   var scriptTag = document.createElement("script");
   var noCacheIE = '&noCacheIE=' + (new Date()).getTime();
   
   // Add script object attributes
   scriptTag.setAttribute("type", "text/javascript");
   scriptTag.setAttribute("charset", "utf-8");
   scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
   scriptTag.setAttribute("id", id);
	
   var head = document.getElementsByTagName("head").item(0);
   head.appendChild(scriptTag);	
}
function getMaxVideos () {
	/**
	 * If we are loading the featured video then we can limit results to one item, otherwise load the maximum number of videos
	 */
	return loadingFeature ? 1 : PLAYLIST_MAX;
}
function getPageSize () {
	return ITEMS_PER_PAGE;//Set this to set the max number of items per page
}
function getPageMode () {
	if (mode == MODE_AUDIO) {
		return '&all=tag%3Aaudio'; // audio
	} else {
		return '&none=tag%3Aaudio';  // video
	}	
}
function decode(input) {
	  var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"+"=";var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;var basetest=/[^A-Za-z0-9\+\/\=]/g;if(basetest.exec(input)){alert("That was an invalidly encoded token.")}input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}chr1=chr2=chr3="";enc1=enc2=enc3=enc4=""}while(i<input.length);
      return output;
}
function formatDate(epoch) {
   var months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
       d = new Date(epoch/1),
       month = months[d.getUTCMonth()],
       day = d.getUTCDate(),
       year = d.getFullYear();
   if( year < 2000 ) year += 1900; 
   return month + ', ' + day + ' ' + year;
}
function getMediaDate(media) {
	if (typeof media.customFields != 'undefined' 
		&& media.customFields != null 
		&& typeof media.customFields.actualdatetext != 'undefined' 
		&& media.customFields.actualdatetext != null 
		&& String(media.customFields.actualdatetext).trim().length > 0) {
		// if user entered a date for this media then return it
		return media.customFields.actualdatetext;
	} else {
		// otherwise, format and use the creation date
		return formatDate(media.creationDate);
	}
}

// Player & Playlist Creation
// Player & Playlist Creation
// Player & Playlist Creation
function getSearchCall(searchType){
	// retrieves the type of call to perform on BC web services based on type of search
	if (searchType == SEARCH_TYPE_TAG) {
		return 'getSearchCategory';
	} else {
		return 'getSearchVideos';
	}
}

function searchVideos(searchType,keyword,pageNum,sortBy) {
	var str = '';
	var searchKeyword = '';
	if (typeof keyword != 'undefined') searchKeyword = escape(keyword.toLowerCase().trim()); // lower case and trimmed and urlencoded
	//searchKeyword = searchKeyword.replace(/%20/g,'&all=');
	
	// set to globals for later
	currentSearch = searchType;
	currentSearchKeyword = searchKeyword;

	//if arguments are omitted assume they want:||(pageNum == NaN)
	if ((typeof pageNum == "undefined") || isNaN(Number(pageNum)) || Number(pageNum) < 0)  {
		pageNum = 0;
	}
	if ((typeof sortBy  == "undefined")||(sortBy.trim() === '')) {
		sortBy = DEFAULT_SORT;
	}	
	// build the query string
	str += getPageMode();
	str += '&custom_fields=%2Cactualdatetext'; // pull custom date field so we can use it in the playlist
	str += '&page_size=' + getPageSize();
	str += '&page_number=' + pageNum;
	str += '&sort_by=' + sortBy;
	// str += '&sort_order=DESC'; // bc does not support sort_order with this seach method
	str += '&get_item_count=true';
	str += '&token=' + token;
	if (searchType == SEARCH_TYPE_TAG) {
		if (searchKeyword.length > 0) {
			str += '&any=primarycategory%3A' + searchKeyword;
			str += '&any=secondarycategory%3A' + searchKeyword;
			str += '&any=tag%3A' + searchKeyword;
		}
	} else {
		str += '&fields=searchText';
		if (searchKeyword.length > 0) {
			str += '&all=' + searchKeyword;
		} else {
			str += '&all=%20';
		}
	}
	// add generated script tag
	addScriptTag("topVideos", "http://api.brightcove.com/services/library?command=search_videos" + str + "", "response");
}
function searchByKeyword(keyword,pageNum,sortBy) {
	return searchVideos(SEARCH_TYPE_KEYWORD,keyword,pageNum,sortBy);
}
function searchByCategory(keyword,pageNum,sortBy) {
	return searchVideos(SEARCH_TYPE_TAG,keyword,pageNum,sortBy);
}
function response(jsonData) {
	var current, i, videoLoopNum;
	var pl = document.getElementById("bcplaylists");
	var featureVideoID = null;	
	var ulPlayList = '';
	var maxVideosInPlaylist	= getMaxVideos();//Set this to set the max number of playlist items 
	// total videos returned set as max number visible per page
	// total videos that match the query
	var videoCount = jsonData["total_count"];	
	// total pages of results
	var pages = Math.round((videoCount / getPageSize()) + 0.4999);	

	
	// add page numbering - pagination
	var pagesBtns = "";
	var pageNum = "";

	for (i=0; i<pages; i++) {
	//for (i=(pages -1); i>=0; i--) {
		pageNum = i+1;
		//pagesBtns += '<a href="' + 'javascript:getTopVideos(' + tab1test + ',' + pageNum + ')">' +  pageNum + '</a>';
		pagesBtns += '<a href="javascript:';
		pagesBtns += currentSearch == SEARCH_TYPE_TAG ? 'searchByCategory' : 'searchByKeyword';
		pagesBtns += "('";
		pagesBtns += currentSearchKeyword;					// keyword user searched on
		pagesBtns += "', '";						// ', '
		pagesBtns += pageNum - 1;					// 0
		pagesBtns += "')";  						// ')
		pagesBtns += '">';  						// ">
		
		pagesBtns += pageNum;
		pagesBtns += "</a>";
		
		//pagesBtns += '<a>' +  pageNum + '</a>';
	};
	pagesBtns = 'Pages:' + pagesBtns

	if (typeof jsonData["items"] != 'undefined' && jsonData["items"] != null) {
	    if (jsonData["items"].length > 0) {		
		videoLoopNum = Math.min(jsonData["items"].length,maxVideosInPlaylist);		
		ulPlayList = '<div><div class="scrollthis"><div class="scrollbar"><div class="track"><div class="thumb"></div></div></div><div class="viewport"><div class="overview"><ul id="brightcoveList">';
	     	  for (i=0; i<videoLoopNum; i++) {
			    ///////for (i=(videoLoopNum -1); i>=0; i--) {									
                current = jsonData["items"][i];			   
				if (featureVideoID == null) {		
					 featureVideoID = current.id; //The first video will be in the player  	  
				}
				//Create playList
				ulPlayList += (i % 2 == 0) ? '<li class="odd">' : '<li class="even">';
				// create li note with title date link and short description
				ulPlayList += '<a href="JavaScript:showVideoPlayer(' + current.id + ',' + i + ')" >';
				if (typeof current.thumbnailURL == 'string' && current.thumbnailURL != null && !current.thumbnailURL.isEmpty()) {
					ulPlayList += '<img class="floatLeft" src="' + current.thumbnailURL + '" alt="' + current.name + ' (thumbnail image)' + '" />';
				} else {
					ulPlayList += '<img class="floatLeft" src="' + MISSING_IMAGE + '" alt="' + current.name + ' (thumbnail missing)' + '" />';
				}
				ulPlayList += '<span class="title">' + current.name + '</span><span class="date">' + getMediaDate(current) + '</span>';
				if (typeof current.longDescription == 'string' && current.longDescription != null && !current.longDescription.isEmpty()) 
					ulPlayList += '<p>' + current.longDescription.replaceURL() + '</p>';
				ulPlayList += '</a></li>';
	        } // end loop through items
	    } 		
		// close our tags we opened
		ulPlayList += '</ul></div><!--end viewport--></div><!--end overview--></div><!--end scrollthis--></div><!-- closing div -->';
		ulPlayList += '<div class="pages_btns">' + pagesBtns + '</div>';
	}

	if (featureVideoID != null) { // there is a video to show 
		//load first video in playlist once
		if (loadingFeature) {
			// show feature in player and load the playlist
			showVideoPlayer(featureVideoID);
			loadingFeature = false;
			searchByKeyword();
		}		
		// load playlist        
		pl.innerHTML = ulPlayList;
		// re-init the scrollbar to get the new length. 
		$('.scrollthis').tinyscrollbar();		
	} else {
		//alert('Sorry, there are no matching videos in the playlist request.');
		$('#topVideos').remove();  
		pl.innerHTML = '<div class="sorry"><p>' + NO_RESULTS_TEXT + '</p></div>';
	}
}
function showVideoPlayer(videoId, liIndex) {
	
	$('#brightcoveList li').removeClass('current');
	var selector;
	if (typeof(liIndex) != 'undefined' && !isNaN(Number(liIndex))) {
		selector = '#brightcoveList li:nth-child(' + (liIndex+1) + ')';
		$(selector).addClass('current');
	} else {
		$('#brightcoveList li a:focus').parent().addClass('current');
	}
	
	var playerName = 'avp'
	
	var params = {};
	if (mode == MODE_AUDIO) {
		//load audio player
		params.playerID = PLAYER_ID_AUDIO;
		params.height = PLAYER_HEIGHT_AUDIO;
		params.width = PLAYER_WIDTH_AUDIO;
		params.bgcolor = PLAYER_BGCOLOR_AUDIO;
	} else {
		//load video player
		params.playerID = PLAYER_ID_VIDEO;
		params.height = PLAYER_HEIGHT_VIDEO;
		params.width = PLAYER_WIDTH_VIDEO;
		params.bgcolor = PLAYER_BGCOLOR_VIDEO;
	}
	params.videoID = videoId;
	//params.@videoPlayer = "66288396001";
	params.autoStart = "false";
	params.isVid = "true";
	params.isUI = "true";
	params.dynamicStreaming = "true";
	

	var player = brightcove.createElement("object");
	player.id = playerName;
	
	var parameter;
	for (var i in params) {
		 parameter = brightcove.createElement("param");
		 parameter.name = i;
		 parameter.value = params[i];
		 player.appendChild(parameter);
	}
	
	var playerContainer = document.getElementById("brightcoveVideo");
	
	document.getElementById("brightcoveVideo").innerHTML = '';
	brightcove.createExperience(player, playerContainer, true);
	//onTemplateLoaded(bcname);
	
}
function useThisFunctionOnce(){
    // overwrite this function, so it will be executed only once
    useThisFunctionOnce = Function("");
    // real code below
    document.getElementsByTagName('body')[0].className+=' tabactivated'
}
//KEYBOARD ACCESSIBILITY
//KEYBOARD ACCESSIBILITY
//KEYBOARD ACCESSIBILITY
//simulate clicks when enter key is pressed http://www.dotnetcurry.com/ShowArticle.aspx?ID=538 
$(function() {
	$(this).focus();
	var $inp = $(this);
	$inp.bind('keydown', function(e) {                
		var key = e.which;
		if (key == 13 ) {	
			if (e.target.id == 'query') {
				// user pressed enter while in the search keyword entry input box
				$("#go").click();
			} else {
				$("#brightcoveList a:focus").click();
			}
		}
		
		if (key == 9) {	
			//add a class to the body the first time the tab key is pressed		
			useThisFunctionOnce();    			
		}
		if (key == 37) {	
			// back cat tab
			$('.backward').click();             				
		}
		if (key == 39) {	
			// next cat tab
			$('.forward').click();             				
		}
	});
		 
   $('#setfocus').focus(function(){
	   //tabs into the flash object
   		//////////////////tabIn();
   });
   
   function tabIn(){
	   alert('Tabbing into flash video.');
   		$('#avp').focus();
   }
   function tabOut(){
	   alert('Tabbing out of flash video.');
	   $('#avp').blur();
   		$('.backward').focus();
   }
});

// NEXT/BACK TAB BEHAVIORS
// NEXT/BACK TAB BEHAVIORS
// NEXT/BACK TAB BEHAVIORS
$(function() {
	//hide search tab after init so that rounder corner work in IE6-8
	$('#bcv_search').css('margin-top', '-5000px').css('margin-left', '-5000px');
	// resets the tabs after tabbing
	$('#playlist.playlisttabs li:first a').focus();
	
	//figure width of tabs so if the tab text length changes everything still works
	$.fn.sumOuterWidth = function(useMargins) {
	  var sum = 0;
	  this.each(function() { 
		sum += $(this).outerWidth(useMargins);
	  });
	  return sum;
	};
	function getTabsWidth() {		
	var tabsTotalWidth = $('#playlist.playlisttabs li').sumOuterWidth(true); 
	var tabsTh = $('#tabSlider').sumOuterWidth(true); 
	tabsWidth = (tabsTh - tabsTotalWidth) - 2;
	};
	//next button
	
	$('.forward').click(function() {
		////$('#playlist.playlisttabs li:first a').focus();
		//$('.playlisttabs .current').parent().next().find('a').click();
		getTabsWidth();
		$('#playlist.playlisttabs').animate({		
		marginLeft: (tabsWidth + 'px')	
	  }, 1000, function() {
		///// tighten all this up with toggles and chaining for delivery
		$('#tabSlider').css('border-right', '0px').css('border-left', '1px solid #ccc');	
		$('.forward').css('color', '#5c665d').removeClass('current').removeAttr('title');
		$('.backward').css('color', '#111').addClass('current').attr('title','More...');				
	  });
	});
	//back button
	$('.backward').click(function() {
		$('#playlist.playlisttabs li:first a').focus();
		//$('.playlisttabs .current').parent().prev().find('a').click();
		getTabsWidth();		
		$('#playlist.playlisttabs').animate({ 
		marginLeft: '0'
	  }, 1000, function() {
		///// tighten all this up with toggles and chaining for delivery
		$('#tabSlider').css('border-right', '1px solid #ccc').css('border-left', '0px');
		$('.backward').css('color', '#5c665d').removeClass('current').removeAttr('title');
		$('.forward').css('color', '#111').addClass('current').attr('title','More...');
	  });
	});
});

// MAIN TAB BEHAVIORS
// MAIN TAB BEHAVIORS
// MAIN TAB BEHAVIORS
$(function() {
	// handle active tab click
	$('#playlist.playlisttabs li a').click(function() {
		$('#playlist.playlisttabs li a').removeClass('current');
		$(this).addClass('current');			
	});
	// set correct audio video mode
	$('.maintabs li:eq(0) a').click(function(){
		mode = MODE_VIDEO;
		$('#query').attr('value','Search all videos');
		loadingFeature = true;
		$('.maintabs .playlisttabs li a').removeClass('current');
		$(this).addClass('current');
		$('.backward').click();
		$('#playlist.playlisttabs li:first a').click();
	});
	$('.maintabs li:eq(1) a').click(function(){
		mode = MODE_AUDIO;
		$('#query').attr('value','Search all audio');
		loadingFeature = true;
		$('.maintabs .playlisttabs li a').removeClass('current');
		$(this).addClass('current');
		$('.backward').click();
		$('#playlist.playlisttabs li:first a').click();		
	});
});
  
// SEARCH BEHAVIORS
// SEARCH BEHAVIORS
// SEARCH BEHAVIORS
function getSearchQuery() {
	var currentText = $('#query').val();
	return currentText == SEARCH_TEXT ? '' : currentText;
}
$(function() {
	//search input and buttons
	$('#go').click(function(){
		// bring button back (could not use display block because IE can handle rounded corner redraw)
 		$('#bcv_search').css('margin-top', '0px').css('margin-left', '0px');
		searchByKeyword($('#query').val());
		$('.forward').click();
		$('#playlist.playlisttabs li a').removeClass('current');
		$('#bcv_search').addClass('current');	
		$('#bcv_search').click(); // 	
   });
   $('#go').focus(function() {
		$(this).addClass('active');
	});
	$('#go').blur(function() {
		$(this).removeClass('active');
	});
	//autofill
   var bctextField = document.getElementById('query')
	$('#query').focus(function() {
		if (this.value === SEARCH_TEXT) this.value = '';
		$('#query').addClass('active');
	});
	$('#query').blur(function() {
		if (this.value === '') this.value = SEARCH_TEXT;
		$('#query').removeClass('active');
	});
});

//Start BC Player Init
//Start BC Player Init
//Start BC Player Init
$(function() {
	// load all featured videos at startup
	loadingFeature = true; 
	searchByCategory('featured');	
});
