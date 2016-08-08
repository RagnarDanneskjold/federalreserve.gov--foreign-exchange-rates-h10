// Return the string that can uniquely identify the column header having focus
function GetFocusElementUniqueName(href, innerHTML) {
    var strResult = innerHTML + GetPartialParentViewName(href, "$");
    return strResult;
}

// Return the parent view partial name from the specified string separated by the token
function GetPartialParentViewName(str, token) {
    var strResult = "";
    var strTokens = str.split(token);
    for (var i = 0; i < strTokens.length; ++i) {
        if (strTokens[i].toLowerCase().indexOf("detail") >= 0) {
            strResult = strTokens[i].toLowerCase();
            break;
        }
    }
    return strResult;
}

// Shift-tab from the Home link. Need to tab back to the last pager item if any.
function homeKeyDown() {
    if (event.keyCode == 9 && event.shiftKey) {
        var divPager = $("table.rgMasterTable>tfoot div.rgWrap.rgAdvPart"); // See if the main pager exists or not
        if (divPager != null && divPager.length > 0) {
            divPager.focus();
                return false;
        }
        else { // no main table paging. See whether there's any last internal paging
            divPager = $("table.rgMasterTable>tbody>tr:last tfoot div.rgWrap.rgAdvPart");
            if (divPager != null && divPager.length > 0) {
                divPager[0].focus();
                return false;
            }
        }
    }
}

// Function to handle the tabbing when the tab key is pressed.
function handleTab(e, active, tagName) {
    var lastColMain = $("table.rgMasterTable>thead th:last.rgHeader a");
    if (lastColMain != null && lastColMain.length > 0 && active == lastColMain[0]) { // Last col of the main table, always tab to next expand button
        var btn = $("table.rgMasterTable>tbody>tr:first input");
        if (btn != null && btn.length > 0) {
            btn[0].focus();
            e.preventDefault();
        }
    }
    else { // If the last column of one of the detailed tables
        if ($(active).parent().hasClass("rgHeader")) {
            if ($(active).parent().parent().find("th:last")[0] == $(active).parent()[0]) { 
                var table = $(active).closest("table.rgDetailTable");
                var pager = table.find("tfoot div.RadComboBox.RadComboBox_CRASkin table");
                if (pager.length > 0) { // has paging items, need to tab to first PDF link if any.
                    var pdf = table.find('tbody a[href$="pdf"]:first');
                    if (pdf.length > 0) {
                        pdf[0].focus();
                        e.preventDefault();
                    }
                    else { // no pdf link, tab to first paging field
                        var firstPager = table.find("tfoot div.rgWrap.rgArrPart1 input.rgPageFirst");
                        if (firstPager.length > 0) {
                            firstPager[0].focus();
                            e.preventDefault();
                        }
                    }
                }
            }
        }
        else { // non header items            
            var parentTR = $(active).closest("tr");
            var mainTable = $("table.rgMasterTable");
            var detailTable = $(active).closest("table.rgDetailTable");
            // is last unexpanded button
            if (active.type == "button" && $(active).hasClass("rgExpand") && parentTR.next().length == 0) {
                if (parentTR.find('a[href$="pdf"]:first').length == 0) { // no pdf link. Tab to main table pager if any
                    var firstPager = $("table.rgMasterTable>tfoot div.rgWrap.rgArrPart1 input.rgPageFirst");
                    if (firstPager.length > 0) {
                        firstPager[0].focus();
                        e.preventDefault();
                    }
                }
            }
            // if last anchor
            else if (tagName.toLowerCase() == "a") {
                var lastPDF = $(mainTable).find('a[href$="pdf"]:last');
                if (lastPDF.length > 0 && lastPDF[0] == active)
                    if (detailTable.length == 0) {
                        var nextTR = $(active).closest("tr").next();
                        if (nextTR.length == 0) // there's no next expand button row
                            focusFirstPagerMain(e);
                    }
                    else {
                        var nextTR = $(detailTable).closest("tr").next();
                        if (nextTR.length == 0) {  // there's no next detail view, tab to first paging item if any or the main paging if any
                            if (!focusFirstPagerDetail(detailTable, e)) {
                                focusFirstPagerMain(e);
                            }
                        }
                    }
                else {
                    if (detailTable.length > 0) {
                        lastPDF = $(detailTable).find('a[href$="pdf"]:last');
                        if (lastPDF.length > 0 && lastPDF[0] == active) {
                            focusFirstPagerDetail(detailTable, e);
                        }
                    }
                }
            }
            // if last pager item
            else {
                var tfoot = $(active).closest("tfoot");
                if (tfoot.length > 0) {
                    if (tagName == "input" && $(active).hasClass("rcbInput")) {
                        if (detailTable.length > 0) { // Last paging ele from a detail table
                            var nextTR = $(detailTable).closest("tr").next();
                            if (nextTR.length > 0) {  // If there's next detail view, tab to next expand button
                                var bt = $(nextTR).find("input");
                                if (bt.length > 0) {
                                    bt[0].focus();
                                    e.preventDefault();
                                }
                            }
                            else if (!focusFirstPagerMain(e)) { // Otherwise, tab to main paging if any
                                focusHomeAnchor(e);     // Otherwise, tab to Home link
                            }
                        }
                        else { // Last paging ele from the main table
                            focusHomeAnchor(e);
                        }
                    }
                }
            }
        }
    }
}

// Make the focus to the Home anchor
function focusHomeAnchor(e) {
    var home = $("#homeAnchor");
    if (home.length > 0) {
        home[0].focus();
        e.preventDefault();
    }
}

// Make the focus to the first pager item of the specified detail table
function focusFirstPagerDetail(detailTable, e) {
    var bFocused = false;
    var firstPager = detailTable.find("tfoot div.rgWrap.rgArrPart1 input.rgPageFirst");
    if (firstPager.length > 0) {
        firstPager[0].focus();
        e.preventDefault();
        bFocused = true;
    }
    return bFocused;
}

// Make the focus to the first pager item of the main table
function focusFirstPagerMain(e) {
    var bFocused = false;
    var firstPager = $("table.rgMasterTable>tfoot div.rgWrap.rgArrPart1 input.rgPageFirst");
    if (firstPager.length > 0) {
        firstPager[0].focus();
        e.preventDefault();
        bFocused = true;
    }
    return bFocused;
}

// Function to handle the shift tab key down. Need to traverse backward.
function handleShiftTab(e, active, tagName) {
    var firstPager = $("table.rgMasterTable>tfoot div.rgWrap.rgArrPart1 input.rgPageFirst");
    if (firstPager != null && firstPager.length > 0 && active == firstPager[0]) {
        // Active item is the first pager item of the main pager bar, need to tab back to last item of the last detail table.
        if ($("table.rgMasterTable>tbody>tr:last").hasClass("rgRow") || $("table.rgMasterTable>tbody>tr:last").hasClass("rgAltRow")) { // last detail table not expanded.
            var lastItem = $("table.rgMasterTable>tbody>tr:last td a");
            if (lastItem != null && lastItem.length > 0) { // Tab to pdf link if there is one
                lastItem[0].focus();
                e.preventDefault();
            }
            else {
                lastItem = $("table.rgMasterTable>tbody>tr:last>td.rgExpandCol>input");
                if (lastItem != null && lastItem.length > 0) { // Tab to the expand button if there is one
                    lastItem[0].focus();
                    e.preventDefault();
                }
            }
        }
        else { // last detail table expanded.
            lastItem = $("table.rgMasterTable>tbody>tr:last table.rgDetailTable>tfoot div.RadComboBox.RadComboBox_CRASkin table");
            if (lastItem != null && lastItem.length > 0) { // Tab to the pager if any
                $(lastItem).addClass("rcbFocused");
                var input = $(lastItem).find("input");
                if (input != null && input.length > 0) {
                    input.focus();
                    e.preventDefault();
                }
            }
            else {
                lastItem = $("table.rgMasterTable>tbody>tr:last table.rgDetailTable tbody a:last");
                if (lastItem != null && lastItem.length > 0) { // Tab to pdf link if there is one
                    lastItem[0].focus();
                    e.preventDefault();
                }
                else {
                    lastItem = $("table.rgMasterTable>tbody>tr:last table.rgDetailTable th:last.rgHeader a");
                    if (lastItem != null && lastItem.length > 0) { // tab to the header
                        lastItem[0].focus();
                        e.preventDefault();
                    }
                }
            }
        }
    }
    else { // Active item is the first pager item of a detail table pager, tab to previous pdf if any
        if ($(active).hasClass("rgPageFirst")) {
            var detailTable = $(active).parents("table.rgDetailTable");
            if (detailTable != null && detailTable.length > 0) {
                var lastItem = $(detailTable).find('tbody a[href$="pdf"]:last');
                if (lastItem != null && lastItem.length > 0) {
                    lastItem[0].focus();
                    e.preventDefault();
                }
                else {
                    lastItem = $(detailTable).find('tbody a[href$="PDF"]:last');
                    if (lastItem != null && lastItem.length > 0) {
                        lastItem[0].focus();
                        e.preventDefault();
                    }
                }
            }
        }
        else {
            var btn = $("table.rgMasterTable>tbody>tr:first input")
            if (btn.length > 0 && btn[0] == active) { // Focused is the first expand button, tab to last col of main header
                var header = $("table.rgMasterTable>thead th:last.rgHeader a");
                if (header.length > 0) {
                    header.focus();
                    e.preventDefault();
                }
            }
            else {
                if ($(active).hasClass("rgCollapse") || $(active).hasClass("rgExpand")) { // is the expand btn of a detailed view. Need to tab to prev pager if any.
                    var preTR = $(active).closest("tr").prev();
                    if (preTR != null && preTR.length > 0) {
                        if (!($(preTR).hasClass("rgRow") || $(preTR).hasClass("rgAltRow"))) { // Prev detailed view is also expanded.
                            var lastItem = $(preTR).find("table.rgDetailTable>tfoot div.RadComboBox.RadComboBox_CRASkin table");
                            if (lastItem != null && lastItem.length > 0) { // Tab to the pager if any
                                $(lastItem).addClass("rcbFocused");
                                var input = $(lastItem).find("input");
                                if (input != null && input.length > 0) {
                                    input.focus();
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
                else { // if the first pdf link, tab back to the last col of header
                    if ($(active).is("a") && active.href.indexOf("pdf") != -1) { // is an anchor
                        var prev = $(active).closest("tr").prev();
                        if (prev != null && prev.length == 0) { // no previous row
                            var table = $(active).closest("table.rgDetailTable");
                            var pager = table.find("tfoot div.RadComboBox.RadComboBox_CRASkin table");
                            if (pager.length > 0) {
                                var header = table.find("thead th:last.rgHeader a");
                                if (header.length > 0) {
                                    header.focus();
                                    e.preventDefault();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}