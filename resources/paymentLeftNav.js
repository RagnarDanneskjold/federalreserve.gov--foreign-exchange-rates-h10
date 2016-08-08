

/*
This file is designed to build/write the left-side navigational menu for any section of federalreserve.gov
9.18.2006 - Mag.P.
*/
/* In the event of any JavaScript error, the following runs */
window.onerror = fallout;
function fallout() {
    //document.write("This feature is currently unavailable.<br />");
}
/* The following is a listing of identifiers for the first level headings followed by a list of valued pairs that indicate each menu item.  First level headings have a value of '%FIRSTLEVELHEADING', while links residing in the first level are identified by a dollar sign preceding the URL/HREF like so: '$/folder/file.html'. The dollar sign and percentage sign are necessary. In the event a link ends in default.htm or index.htm or default.cfm or default.aspx, the URL/HREF should end with a / this is a signifier to the javascript to check all the possible file names of this URL/HREF to verify if it is a match with the current page. */
/* linx[ menuItem ] = "URL for menuItem", mHl = menuHeadingLevel */
var mHl = new Array("menuOne", "menuTwo", "menuThr", "menuFou", "menuFiv", "menuSix", "menuSev");
var defPages = new Array("default.htm", "default.cfm", "default.aspx", "default.asp", "", "default.html", "index.htm", "index.html", "index.cfm");
var linx = new Object();
linx["Payment Policies"] = "%FIRSTLEVELHEADING";
linx["Federal Reserve's Key Policies for the Provision of Financial Services"] = "/paymentsystems/pfs_about.htm";
linx["International Standards"] = "/paymentsystems/int_standards.htm";
linx["Overnight Overdrafts"] = "/paymentsystems/oo_about.htm";
linx["Payment System Risk"] = "/paymentsystems/psr_about.htm";
linx["Sponsorship for Priority Telecommunication Services"] = "/paymentsystems/telecomm.htm";
linx["Supervision and Oversight of Financial Market Infrastructures"] = "$/paymentsystems/over_about.htm";
linx["Designated Financial Market Utilities"] = "$/paymentsystems/designated_fmu_about.htm";
linx["Regulations and Statutes"] = "%FIRSTLEVELHEADING";
linx["Reg. CC"] = "/paymentsystems/regcc-about.htm";
linx["Reg. HH"] = "/paymentsystems/reghh-about.htm";
linx["Reg. II"] = "/paymentsystems/regii-about.htm";
linx["Other Regulations and Statutes"] = "/paymentsystems/other-regulations.htm";
linx["Reserve Bank Payment Services"] = "%FIRSTLEVELHEADING";
linx["Automated Clearinghouse Services"] = "/paymentsystems/fedach_about.htm";
linx["Check Services"] = "/paymentsystems/check_about.htm";
linx["Currency and Coin Services"] = "/paymentsystems/coin_about.htm";
linx["Fedwire Funds Services"] = "/paymentsystems/fedfunds_about.htm";
linx["Fedwire Securities Services"] = "/paymentsystems/fedsecs_about.htm";
linx["Fiscal Agency Services"] = "/paymentsystems/fisagy_about.htm";
linx["National Settlement Service"] = "/paymentsystems/natl_about.htm";
linx["Payment Research"] = "$/paymentsystems/payres_about.htm";
linx["Committees and Forums"] = "%FIRSTLEVELHEADING";
linx["Payments System Policy Advisory Committee"] = "/paymentsystems/pspa_committee.htm";
linx["Forums"] = "/paymentsystems/forums.htm";

/* The following function builds and writes the menu.  It selects the type of list and image to write by first looking at the first character of the link.  It then checks whether it should highlight the page it's on in reference to the list of links.  This is accomplished using the next function (menuItemHighlighter()). */
function buildMenu() {
    var theMenu = new String('');
    var firstLevelCounter = new Number(0);
    var firstLevelHighlight = new Boolean(true);
    var closeTag = new Boolean();
    for (var i in linx) {
        switch(linx[i].charAt(0)) {
            case '%':
                if (closeTag == true) { theMenu += '</span></ul>'; };
                theMenu += '<ul><a id="menuFirstLevelHeading" title="Expand ' + i + '" onmouseover="(window.status=' + "'" + i + "'" + '); return true;" onmouseout="(window.status=' + "'" + "'" + '); return true;" href="javascript:void(0)" onclick="toggle(' + "'" + mHl[firstLevelCounter] + "'" + '); return false;"><img src="/gifjpg/menu_closed.gif" alt="Expand ' + i + '" border="0" />' + i + '</a><span id="' + mHl[firstLevelCounter] + '">';
                firstLevelCounter++;
                closeTag = true;
            break;
            case '$':
                if (closeTag == true) { theMenu += '</span></ul>'; };
                if (menuItemHighlighter(linx[i].slice(1))) {
                    theMenu += '<ul id="menuLink"><img src="/gifjpg/menu_link.gif" alt="' + i + '" border="0"><a id="menuHighlight" href="' + linx[i].slice(1) + '">' + i + '</a></ul>';
                    firstLevelHighlight = false;
                } else {
                    theMenu += '<ul id="menuLink"><img src="/gifjpg/menu_link.gif" alt="' + i + '" border="0"><a href="' + linx[i].slice(1) + '">' + i + '</a></ul>';
                }
                closeTag = false;
            break;
            default:
                if (menuItemHighlighter(linx[i])) {
                    theMenu += '<li id="menuHighlight">' + i.link(linx[i]) + '</li>';
                } else {
                    theMenu += '<li>' + i.link(linx[i]) + '</li>';
                }
                closeTag = true;
            break;
        }
    }
        
    if (closeTag == true) { theMenu += '</span></ul>'; };
    document.write(theMenu);
    if (menuItemHighlighter("/reportforms/")) { toggle("menuOne"); };
    if (firstLevelHighlight) { toggle("menuHighlight"); };
}
/* Please view the previous function description for information on this function. 
Compares the link's folders to the URL's folders, if these are the same compares the filenames, if not compares the possible filenames.  If any of the possible 
filenames are found to match either of the them then returns true. */
function menuItemHighlighter(linxURL) {    
    var docURL = document.URL;
    var startPointU = docURL.indexOf(".gov/") + 4;
    var endPointU = docURL.lastIndexOf("/") + 1;
    var endLinx = linxURL.lastIndexOf("/") + 1;
    var uFolder = docURL.substring(startPointU, endPointU).toUpperCase();
    var lFolder = linxURL.substring(0, endLinx).toUpperCase();
    if (uFolder == lFolder) {
        var uFile = docURL.substring(endPointU).toUpperCase();
        var lFile = linxURL.substring(endLinx).toUpperCase();
        if (uFile == lFile) {
            return true;
        } else {
            var isUfileArray = new Boolean();
            var isLfileArray = new Boolean();
            var count = new Number(0);
            while (count < defPages.length) {
                if (uFile == defPages[count]) {
                    isUfileArray = true;
                }
                if (lFile == defPages[count]) {
                    isLfileArray = true;
                }
                count++;
            }
            if (isUfileArray & isLfileArray) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}
/* This function toggles the expanded or collapsed state of the second level menu.  It also changes the link title, the image's alt text, and the image itself as well. */
function toggle(currentMenu) {
    if (currentMenu == "menuHighlight") {
        var checkIt = document.getElementById(currentMenu);
        if (checkIt) { var displayVal = document.getElementById(currentMenu).parentNode;
        } else { return false; };
    } else {
        var displayVal = document.getElementById(currentMenu);
    }
    if (displayVal.style.display == "block") { 
        displayVal.style.display = "none"; 
        var linkTitle = displayVal.parentNode.getElementsByTagName("a")[0].title;
        displayVal.parentNode.getElementsByTagName("a")[0].title = 'Expand ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
        displayVal.parentNode.getElementsByTagName("img")[0].src = '/gifjpg/menu_closed.gif';
        displayVal.parentNode.getElementsByTagName("img")[0].alt = 'Expand ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
      } else { 
        displayVal.style.display = "block";
        var linkTitle = displayVal.parentNode.getElementsByTagName("a")[0].title;
        displayVal.parentNode.getElementsByTagName("a")[0].title = 'Collapse ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
        displayVal.parentNode.getElementsByTagName("img")[0].src = '/gifjpg/menu_open.gif';
        displayVal.parentNode.getElementsByTagName("img")[0].alt = 'Collapse ' + linkTitle.substring(linkTitle.indexOf(" ")+1);
    }
}
