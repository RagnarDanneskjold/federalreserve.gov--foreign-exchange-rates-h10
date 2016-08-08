function autorot() {
    showNext();
    //carousel - 1 second roughly corresponds to 1000
    timeout = setTimeout('autorot();', 15000); 
}
function rotateDiv(stor){
  if($('#storyContainer').length !=0 ) {
      var divs = document.getElementById("storyContainer").getElementsByTagName("div");
      for (var i=0; i < divs.length; i++ ) {
        var div = divs[i];
        if ( (div.id != "")) {
        if(i != stor){
                div.style.display = "none";
        }
        else{
            div.style.display = "block";
        }
        }
    }
  
      var ancFeatures = document.getElementById("nav").getElementsByTagName("a");
      for (var i=0; i < ancFeatures.length; i++ ) {
        var a = ancFeatures[i];
        if ( (a.id != "")) {
        if(i != stor){
            //img.src = "gifjpg/circle_light.png";
            a.className = "light";
        }
        else{
            //img.src = "gifjpg/circle_dark.png";
            a.className = "dark";
            //var temp = stor + 1; 
            //document.getElementById('view_num').innerHTML = temp;
        }
        } 
      /*var imgs = document.getElementById("nav").getElementsByTagName("img");
      for (var i=0; i < imgs.length; i++ ) {
        var img = imgs[i];
        if ( (img.id != "")) {
        if(i != stor){
            img.src = "gifjpg/circle_light.png";
        }
        else{
             img.src = "gifjpg/circle_dark.png";
             var temp = stor + 1; 
            document.getElementById('view_num').innerHTML = temp;
        }
        } */
  }
  }
}
function showNext(){
    if(stor < maxstor)
        stor++;
    else
        stor=0;
    rotateDiv(stor);
}
function stoprot() {
    clearTimeout(timeout);
}
function showStory(listCount){
    stor=listCount-1;
    rotateDiv(stor);
}
$(document).ready(function() {
   autorot();
$(function(){
    //Look through all the links in the sidebar
   $(".navigation a").filter(function() {
      //This filter returns true when the link prefix equals the beginning of the page url
      //Take the current URL and split it into chunks at each slash
      var currentURL = window.location.toString().split("/");
      //Pull out the last chunk
      var currentPage = currentURL[currentURL.length-1];
      //Remove any extension from the href in the current navigation link
      var currentHrefParts = $(this).attr("href").split(".");
      var currentHrefPrefix = currentHrefParts[0];
      //Get the part of the current page thats the same length as the href prefix
      var currentPagePrefix = currentPage.substring(0,currentHrefPrefix.length);
      //Return true if the prefix of the href matches the beginning of the page
      return currentPagePrefix == currentHrefPrefix;
    //when the filter function is done, you're left with the links that match.
    }).addClass("selected");
   //Afterwards, look back through the links. If none of them were marked,
   //mark your default one.
   if($(".navigation a").hasClass("selected") == false) {
      $(".navigation h2:nth-child(2) a").addClass("selected");
    }
 });
});