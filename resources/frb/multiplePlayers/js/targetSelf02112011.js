//THIS ENTIRE SCRIPT IS JUST TO ENABLE LINKS TO BE CLICKED AND OPENED IN A NEW WINDOW.  
//IF A PAGE HAS A BRIGHTCOVE VIDEO IT WILL ENABLE A target="_self" EMULATION.
//IF A PAGE HAS NO VIDEOS... IT CHECKS... THEN DOES NOTHING.
//ONLY ADDS LISTENERS TO THE FLASH PLAYER... IT DOES NO DOM MANIPULATION.

var bcplayer = 'avp'

function onTemplateLoaded(bcplayer) {	
	var bcExp;
	var modVP;
	var modExp;
    bcExp = brightcove.getExperience(bcplayer);
    modVP = bcExp.getModule(APIModules.VIDEO_PLAYER);
    modExp = bcExp.getModule(APIModules.EXPERIENCE);
	
	modExp.addEventListener(BCExperienceEvent.TEMPLATE_READY, 
	
		function onTemplateReady() {
					
			var currentVideo = modVP.getCurrentVideo();	
				
			//transcript
			var tlink = modExp.getElementByID("transcriptLink");
			if (tlink) {
				var Turl = currentVideo.customFields["transcriptlinkurl"];
				tlink.addEventListener("elementClick", 
					function onLinkClick(evt) {
						if (evt.elementID == "transcriptLink"){
							 window.location.href = Turl;
						}
					}//END onLinkClick
				);//END addEventListener			
			}//END if	
			
			//relatedlink1 (NOT CUSTOM FIELD)
			var r1link = modExp.getElementByID("relatedLink");	
			if (r1link) {
				var R1url = currentVideo.linkURL;	
				r1link.addEventListener("elementClick", 
					function onLinkClick(evt) {
						if (evt.elementID == "relatedLink"){
							 window.location.href = R1url;
						}
					}//END onLinkClick
				);//END addEventListener		
			}//END if
						
			//relatedlink2	
			var r2link = modExp.getElementByID("relatedLink2");
			if (r2link) {
				var R2url = currentVideo.customFields["relatedlink2url"];	
				r2link.addEventListener("elementClick", 
					function onLinkClick(evt) {
						if (evt.elementID == "relatedLink2"){
							 window.location.href = R2url;
						}
					}//END onLinkClick
				);//END addEventListener		
			}//END if
				
			//relatedlink3
			var r3link = modExp.getElementByID("relatedLink3");
			if (r3link) {
				var R3url = currentVideo.customFields["relatedlink3url"];
				r3link.addEventListener("elementClick", 
					function onLinkClick(evt) {
						if (evt.elementID == "relatedLink3"){
							 window.location.href = R3url;
						}
					}//END onLinkClick
				) //END addEventListener					
			}//END if	
			
			//allVidLink (NOT CUSTOM FIELD, JUST BANNER LINK)
			var avlink = modExp.getElementByID("allVidLink");	
			if (avlink) {
				var allVidurl = "http://www.federalreserve.gov/mediacenter/media.htm";	
				avlink.addEventListener("elementClick", 
					function onLinkClick(evt) {
						if (evt.elementID == "allVidLink"){
							 window.location.href = allVidurl;
						}
					}//END onLinkClick
				);//END addEventListener		
			}//END if
			
		}//END onTemplateReady 
		
	);//END modExp.addEventListener
	
}//END onTemplateLoaded