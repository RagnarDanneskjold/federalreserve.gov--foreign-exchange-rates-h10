
//--Beloe Redirection related only
var thisHost = (location.host.indexOf('federalreserve.gov')!=-1)?'http://www.federalreserve.gov':'http://mpstage.frb.gov';
    //alert(thisHost);
letsGo = function (url) {
    //alert(document.FEDS_dropdown.feds_select.selectedIndex);
    var validURL = (url.indexOf('http://')!=-1)?url:thisHost + url;
    //alert(validURL);
    location.replace(validURL);
    //location.href=validURL;
}
//--Above Redirection related only
var BeigeYear;
var ArchiveYear;
var monthly = new Object();
var yearly= new Object();
monthly["BeigeYear"] = new Object();
yearly["BeigeYear"] = new Object();

    monthly["1995"] = new Object();   
    yearly["1995"] = new Object();  

    monthly["1996"] = new Object();   
    yearly["1996"] = new Object();  

    monthly["1997"] = new Object();   
    yearly["1997"] = new Object();  

    monthly["1998"] = new Object();   
    yearly["1998"] = new Object();  

    monthly["1999"] = new Object();   
    yearly["1999"] = new Object();  

    monthly["2000"] = new Object();   
    yearly["2000"] = new Object();  

    monthly["2001"] = new Object();   
    yearly["2001"] = new Object();  

    monthly["2002"] = new Object();   
    yearly["2002"] = new Object();  

    monthly["2003"] = new Object();   
    yearly["2003"] = new Object();  

    monthly["2004"] = new Object();   
    yearly["2004"] = new Object();  

    monthly["2005"] = new Object();   
    yearly["2005"] = new Object();  

    monthly["2006"] = new Object();   
    yearly["2006"] = new Object();  

    monthly["2007"] = new Object();   
    yearly["2007"] = new Object();  

    monthly["2008"] = new Object();   
    yearly["2008"] = new Object();  

    monthly["2009"] = new Object();   
    yearly["2009"] = new Object();  

    monthly["2010"] = new Object();   
    yearly["2010"] = new Object();  

    monthly["2011"] = new Object();   
    yearly["2011"] = new Object();  

    monthly["2012"] = new Object();   
    yearly["2012"] = new Object();  

    monthly["2013"] = new Object();   
    yearly["2013"] = new Object();  

    monthly["2014"] = new Object();   
    yearly["2014"] = new Object();  

    monthly["2015"] = new Object();   
    yearly["2015"] = new Object();  

    monthly["2016"] = new Object();   
    yearly["2016"] = new Object();  

BeigeYear = "2016";


monthly["2016"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201607.htm","date":"13","pdf":"/monetarypolicy/beigebook/files/Beigebook_20160713.pdf"};

monthly["2016"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201606.htm","date":"01","pdf":"/monetarypolicy/beigebook/files/Beigebook_20160601.pdf"};

monthly["2016"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201604.htm","date":"13","pdf":"/monetarypolicy/beigebook/files/Beigebook_20160413.pdf"};

monthly["2016"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook201603.htm","date":"02","pdf":"/monetarypolicy/beigebook/files/Beigebook_20160302.pdf"};

monthly["2016"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201601.htm","date":"13","pdf":"/monetarypolicy/beigebook/files/Beigebook_20160113.pdf"};

monthly["2015"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook201512.htm","date":"02","pdf":"/monetarypolicy/beigebook/files/Beigebook_20151202.pdf"};

monthly["2015"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201510.htm","date":"14","pdf":"/monetarypolicy/beigebook/files/Beigebook_20151014.pdf"};

monthly["2015"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook201509.htm","date":"02","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150902.pdf"};

monthly["2015"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201507.htm","date":"15","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150715.pdf"};

monthly["2015"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201506.htm","date":"03","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150603.pdf"};

monthly["2015"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201504.htm","date":"15","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150415.pdf"};

monthly["2015"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook20150304.htm","date":"04","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150304.pdf"};

monthly["2015"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201501.htm","date":"14","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20150114.pdf"};

monthly["2014"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook201412.htm","date":"03","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20141203.pdf"};

monthly["2014"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201410.htm","date":"15","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20141015.pdf"};

monthly["2014"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook201409.htm","date":"03","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20140903.pdf"};

monthly["2014"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201407.htm","date":"16","pdf":"/monetarypolicy/beigebook/files/Beigebook_20140716.pdf"};

monthly["2014"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201406.htm","date":"04","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20140604.pdf"};

monthly["2014"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201404.htm","date":"16","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20140416.pdf"};

monthly["2014"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook201403.htm","date":"05","pdf":"/monetarypolicy/beigebook/files/Beigebook_20140305.pdf"};

monthly["2014"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201401.htm","date":"15","pdf":"/monetarypolicy/beigebook/files/Beigebook_20140115.pdf"};

monthly["2013"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook201312.htm","date":"04","pdf":"/monetarypolicy/beigebook/files/Beigebook_20131204.pdf"};

monthly["2013"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201310.htm","date":"16","pdf":"/monetarypolicy/beigebook/files/BeigeBook_20131016.pdf"};

monthly["2013"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook201309.htm","date":"04","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130904.pdf"};

monthly["2013"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201307.htm","date":"17","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130717.pdf"};

monthly["2013"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201306.htm","date":"05","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130605.pdf"};

monthly["2013"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201304.htm","date":"17","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130417.pdf"};

monthly["2013"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook201303.htm","date":"06","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130306.pdf"};

monthly["2013"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201301.htm","date":"16","pdf":"/monetarypolicy/beigebook/files/Beigebook_20130116.pdf"};

monthly["2012"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook201211.htm","date":"28","pdf":"/monetarypolicy/beigebook/files/Beigebook_20121128.pdf"};

monthly["2012"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201210.htm","date":"10","pdf":"/monetarypolicy/beigebook/files/Beigebook_20121010.pdf"};

monthly["2012"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook201208.htm","date":"29","pdf":"/monetarypolicy/beigebook/files/Beigebook_20120829.pdf"};

monthly["2012"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201207.htm","date":"18","pdf":"/monetarypolicy/beigebook/files/Beigebook_20120718.pdf"};

monthly["2012"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201206.htm","date":"06","pdf":"/monetarypolicy/beigebook/files/Beigebook_20120606.pdf"};

monthly["2012"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201204.htm","date":"11","pdf":"/monetarypolicy/beigebook/files/fullreport20120411.pdf"};

monthly["2012"]["feb"] = {"url":"/monetarypolicy/beigebook/beigebook201202.htm","date":"29","pdf":"/monetarypolicy/beigebook/files/fullreport20120229.pdf"};

monthly["2012"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201201.htm","date":"11","pdf":"/monetarypolicy/beigebook/files/fullreport20120111.pdf"};

monthly["2011"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook201111.htm","date":"30","pdf":"/monetarypolicy/beigebook/files/fullreport20111130.pdf"};

monthly["2011"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201110.htm","date":"19","pdf":"/monetarypolicy/beigebook/files/fullreport20111019.pdf"};

monthly["2011"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook201109.htm","date":"07","pdf":"/monetarypolicy/beigebook/files/fullreport20110907.pdf"};

monthly["2011"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201107.htm","date":"27","pdf":"/monetarypolicy/beigebook/files/fullreport20110727.pdf"};

monthly["2011"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201106.htm","date":"08","pdf":"/monetarypolicy/beigebook/files/fullreport20110608.pdf"};

monthly["2011"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201104.htm","date":"13","pdf":"/monetarypolicy/beigebook/files/fullreport20110413.pdf"};

monthly["2011"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook20110302.htm","date":"02","pdf":"/monetarypolicy/beigebook/files/fullreport20110302.pdf"};

monthly["2011"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201101.htm","date":"12","pdf":"/monetarypolicy/beigebook/files/fullreport20110112.pdf"};

monthly["2010"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook201012.htm","date":"01","pdf":"/fomc/beigebook/2010/20101201/fullreport20101201.pdf"};

monthly["2010"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook201010.htm","date":"20","pdf":"/fomc/beigebook/2010/20101020/fullreport20101020.pdf"};

monthly["2010"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook201009.htm","date":"08","pdf":"/fomc/beigebook/2010/20100908/fullreport20100908.pdf"};

monthly["2010"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook201007.htm","date":"28","pdf":"/fomc/beigebook/2010/20100728/fullreport20100728.pdf"};

monthly["2010"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook201006.htm","date":"09","pdf":"/fomc/beigebook/2010/20100609/fullreport20100609.pdf"};

monthly["2010"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook201004.htm","date":"14","pdf":"/fomc/beigebook/2010/20100414/fullreport20100414.pdf"};

monthly["2010"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook201003.htm","date":"03","pdf":"/fomc/beigebook/2010/20100303/fullreport20100303.pdf"};

monthly["2010"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook201001.htm","date":"13","pdf":"/fomc/beigebook/2010/20100113/fullreport20100113.pdf"};

monthly["2009"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook200912.htm","date":"02","pdf":"/fomc/beigebook/2009/20091202/fullreport20091202.pdf"};

monthly["2009"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200910.htm","date":"21","pdf":"/fomc/beigebook/2009/20091021/fullreport20091021.pdf"};

monthly["2009"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200909.htm","date":"09","pdf":"/fomc/beigebook/2009/20090909/fullreport20090909.pdf"};

monthly["2009"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200907.htm","date":"29","pdf":"/fomc/beigebook/2009/20090729/fullreport20090729.pdf"};

monthly["2009"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200906.htm","date":"10","pdf":"/fomc/beigebook/2009/20090610/fullreport20090610.pdf"};

monthly["2009"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200904.htm","date":"15","pdf":"/fomc/beigebook/2009/20090415/fullreport20090415.pdf"};

monthly["2009"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200903.htm","date":"04","pdf":"/fomc/beigebook/2009/20090304/fullreport20090304.pdf"};

monthly["2009"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200901.htm","date":"14","pdf":"/fomc/beigebook/2009/20090114/fullreport20090114.pdf"};

monthly["2008"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook200812.htm","date":"03","pdf":"/fomc/beigebook/2008/20081203/fullreport20081203.pdf"};

monthly["2008"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200810.htm","date":"15","pdf":"/fomc/beigebook/2008/20081015/fullreport20081015.pdf"};

monthly["2008"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200809.htm","date":"03","pdf":"/fomc/beigebook/2008/20080903/fullreport20080903.pdf"};

monthly["2008"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200807.htm","date":"23","pdf":"/fomc/beigebook/2008/20080723/fullreport20080723.pdf"};

monthly["2008"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200806.htm","date":"11","pdf":"/fomc/beigebook/2008/20080611/fullreport20080611.pdf"};

monthly["2008"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200804.htm","date":"16","pdf":"/fomc/beigebook/2008/20080416/fullreport20080416.pdf"};

monthly["2008"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200803.htm","date":"05","pdf":"/fomc/beigebook/2008/20080305/fullreport20080305.pdf"};

monthly["2008"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200801.htm","date":"16","pdf":""};

monthly["2007"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200711.htm","date":"28","pdf":""};

monthly["2007"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200710.htm","date":"17","pdf":""};

monthly["2007"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200709.htm","date":"05","pdf":""};

monthly["2007"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200707.htm","date":"25","pdf":""};

monthly["2007"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200706.htm","date":"13","pdf":""};

monthly["2007"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200704.htm","date":"25","pdf":""};

monthly["2007"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200703.htm","date":"07","pdf":""};

monthly["2007"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200701.htm","date":"17","pdf":""};

monthly["2006"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200611.htm","date":"29","pdf":""};

monthly["2006"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200610.htm","date":"12","pdf":""};

monthly["2006"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200609.htm","date":"06","pdf":""};

monthly["2006"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200607.htm","date":"26","pdf":""};

monthly["2006"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200606.htm","date":"14","pdf":""};

monthly["2006"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200604.htm","date":"26","pdf":""};

monthly["2006"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200603.htm","date":"15","pdf":""};

monthly["2006"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200601.htm","date":"18","pdf":""};

monthly["2005"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200511.htm","date":"30","pdf":""};

monthly["2005"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200510.htm","date":"19","pdf":""};

monthly["2005"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200509.htm","date":"07","pdf":""};

monthly["2005"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200507.htm","date":"27","pdf":""};

monthly["2005"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200506.htm","date":"15","pdf":""};

monthly["2005"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200504.htm","date":"20","pdf":""};

monthly["2005"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200503.htm","date":"09","pdf":""};

monthly["2005"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200501.htm","date":"19","pdf":""};

monthly["2004"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook200412.htm","date":"01","pdf":""};

monthly["2004"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200410.htm","date":"27","pdf":""};

monthly["2004"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200409.htm","date":"08","pdf":""};

monthly["2004"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200407.htm","date":"28","pdf":""};

monthly["2004"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200406.htm","date":"16","pdf":""};

monthly["2004"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200404.htm","date":"21","pdf":""};

monthly["2004"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200403.htm","date":"03","pdf":""};

monthly["2004"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200401.htm","date":"14","pdf":""};

monthly["2003"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200311.htm","date":"26","pdf":""};

monthly["2003"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200310.htm","date":"15","pdf":""};

monthly["2003"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200307.htm","date":"30","pdf":""};

monthly["2003"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200306.htm","date":"11","pdf":""};

monthly["2003"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200304.htm","date":"23","pdf":""};

monthly["2003"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200303.htm","date":"05","pdf":""};

monthly["2003"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200301.htm","date":"15","pdf":""};

monthly["2002"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200211.htm","date":"27","pdf":"/monetarypolicy/files/fomc20021210beige20021127.pdf"};

monthly["2002"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200210.htm","date":"23","pdf":"/monetarypolicy/files/fomc20021106beige20021023.pdf"};

monthly["2002"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200211.htm","date":"11","pdf":"/monetarypolicy/files/fomc20020924beige20020911.pdf"};

monthly["2002"]["jul"] = {"url":"/monetarypolicy/beigebook/beigebook200207.htm","date":"31","pdf":"/monetarypolicy/files/fomc20020813beige20020731.pdf"};

monthly["2002"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200206.htm","date":"12","pdf":"/monetarypolicy/files/fomc20020626beige20020612.pdf"};

monthly["2002"]["apr"] = {"url":"/monetarypolicy/beigebook/beigebook200204.htm","date":"24","pdf":"/monetarypolicy/files/fomc20020507beige20020424.pdf"};

monthly["2002"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200203.htm","date":"06","pdf":"/monetarypolicy/files/fomc20020319beige20020306.pdf"};

monthly["2002"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200201.htm","date":"16","pdf":"/monetarypolicy/files/fomc20020130beige20020116.pdf"};

monthly["2001"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200111.htm","date":"28","pdf":"/monetarypolicy/files/fomc20011211beige20011128.pdf"};

monthly["2001"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook200110.htm","date":"24","pdf":"/monetarypolicy/files/fomc20011106beige20011024.pdf"};

monthly["2001"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200109.htm","date":"19","pdf":"/monetarypolicy/files/fomc20011002beige20010919.pdf"};

monthly["2001"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook200108.htm","date":"08","pdf":"/monetarypolicy/files/fomc20010821beige20010808.pdf"};

monthly["2001"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200106.htm","date":"13","pdf":"/monetarypolicy/files/fomc20010627beige20010613.pdf"};

monthly["2001"]["may"] = {"url":"/monetarypolicy/beigebook/beigebook200105.htm","date":"02","pdf":"/monetarypolicy/files/fomc20010515beige20010502.pdf"};

monthly["2001"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200103.htm","date":"07","pdf":"/monetarypolicy/files/fomc20010320beige20010307.pdf"};

monthly["2001"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200101.htm","date":"17","pdf":"/monetarypolicy/files/fomc20010131beige20010117.pdf"};

monthly["2000"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook200012.htm","date":"06","pdf":"/monetarypolicy/files/fomc20001219beige20001206.pdf"};

monthly["2000"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook200011.htm","date":"01","pdf":"/monetarypolicy/files/fomc20001115beige20001101.pdf"};

monthly["2000"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook200009.htm","date":"20","pdf":"/monetarypolicy/files/fomc20001003beige20000920.pdf"};

monthly["2000"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook200008.htm","date":"09","pdf":"/monetarypolicy/files/fomc20000822beige20000809.pdf"};

monthly["2000"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook200006.htm","date":"14","pdf":"/monetarypolicy/files/fomc20000628beige20000614.pdf"};

monthly["2000"]["may"] = {"url":"/monetarypolicy/beigebook/beigebook200005.htm","date":"03","pdf":"/monetarypolicy/files/fomc20000516beige20000503.pdf"};

monthly["2000"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook200003.htm","date":"08","pdf":"/monetarypolicy/files/fomc20000321beige20000308.pdf"};

monthly["2000"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook200001.htm","date":"19","pdf":"/monetarypolicy/files/fomc20000202beige20000119.pdf"};

monthly["1999"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook199912.htm","date":"08","pdf":"/monetarypolicy/files/fomc19991221beige19991208.pdf"};

monthly["1999"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook199911.htm","date":"03","pdf":"/monetarypolicy/files/fomc19991116beige19991103.pdf"};

monthly["1999"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook199909.htm","date":"22","pdf":"/monetarypolicy/files/fomc19991005beige19990922.pdf"};

monthly["1999"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook199908.htm","date":"11","pdf":"/monetarypolicy/files/fomc19990824beige19990811.pdf"};

monthly["1999"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook199906.htm","date":"16","pdf":"/monetarypolicy/files/fomc19990630beige19990616.pdf"};

monthly["1999"]["may"] = {"url":"/monetarypolicy/beigebook/beigebook199905.htm","date":"05","pdf":"/monetarypolicy/files/fomc19990518beige19990505.pdf"};

monthly["1999"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook199903.htm","date":"17","pdf":"/monetarypolicy/files/fomc19990330beige19990317.pdf"};

monthly["1999"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook199901.htm","date":"20","pdf":"/monetarypolicy/files/fomc19990203beige19990120.pdf"};

monthly["1998"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook199812.htm","date":"09","pdf":"/monetarypolicy/files/fomc19981222beige19981209.pdf"};

monthly["1998"]["nov"] = {"url":"/monetarypolicy/beigebook/beigebook199811.htm","date":"04","pdf":"/monetarypolicy/files/fomc19981117beige19981104.pdf"};

monthly["1998"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook199809.htm","date":"16","pdf":"/monetarypolicy/files/fomc19980929beige19980916.pdf"};

monthly["1998"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook199808.htm","date":"05","pdf":"/monetarypolicy/files/fomc19980818beige19980805.pdf"};

monthly["1998"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook199806.htm","date":"17","pdf":"/monetarypolicy/files/fomc19980701beige19980617.pdf"};

monthly["1998"]["may"] = {"url":"/monetarypolicy/beigebook/beigebook199805.htm","date":"06","pdf":"/monetarypolicy/files/fomc19980519beige19980506.pdf"};

monthly["1998"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook199803.htm","date":"18","pdf":"/monetarypolicy/files/fomc19980331beige19980318.pdf"};

monthly["1998"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook199801.htm","date":"21","pdf":"/monetarypolicy/files/fomc19980204beige19980121.pdf"};

monthly["1997"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook199712.htm","date":"03","pdf":"/monetarypolicy/files/fomc19971216beige19971203.pdf"};

monthly["1997"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook199710.htm","date":"29","pdf":"/monetarypolicy/files/fomc19971112beige19971029.pdf"};

monthly["1997"]["sep"] = {"url":"/monetarypolicy/beigebook/beigebook199709.htm","date":"17","pdf":"/monetarypolicy/files/fomc19970930beige19970917.pdf"};

monthly["1997"]["aug"] = {"url":"/monetarypolicy/beigebook/beigebook199708.htm","date":"06","pdf":"/monetarypolicy/files/fomc19970819beige19970806.pdf"};

monthly["1997"]["jun"] = {"url":"/monetarypolicy/beigebook/beigebook199706.htm","date":"18","pdf":"/monetarypolicy/files/fomc19970702beige19970618.pdf"};

monthly["1997"]["may"] = {"url":"/monetarypolicy/beigebook/beigebook199705.htm","date":"07","pdf":"/monetarypolicy/files/fomc19970520beige19970507.pdf"};

monthly["1997"]["mar"] = {"url":"/monetarypolicy/beigebook/beigebook199703.htm","date":"12","pdf":"/monetarypolicy/files/fomc19970325beige19970312.pdf"};

monthly["1997"]["jan"] = {"url":"/monetarypolicy/beigebook/beigebook199701.htm","date":"22","pdf":"/monetarypolicy/files/fomc19970205beige19970122.pdf"};

monthly["1996"]["dec"] = {"url":"/monetarypolicy/beigebook/beigebook199612.htm","date":"04","pdf":"/monetarypolicy/files/fomc19961217beige19961204.pdf"};

monthly["1996"]["oct"] = {"url":"/monetarypolicy/beigebook/beigebook199610.htm","date":"30","pdf":"/monetarypolicy/files/fomc19961113beige19961030.pdf"};


//alert(monthly["2012"]["jan"]["url"]);


yearly["2016"] = {"url":"/monetarypolicy/beigebook/beigebook2016.htm"};


yearly["2015"] = {"url":"/monetarypolicy/beigebook/beigebook2015.htm"};


yearly["2014"] = {"url":"/monetarypolicy/beigebook/beigebook2014.htm"};


yearly["2013"] = {"url":"/monetarypolicy/beigebook/beigebook2013.htm"};


yearly["2012"] = {"url":"/monetarypolicy/beigebook/beigebook2012.htm"};


yearly["2011"] = {"url":"/monetarypolicy/beigebook/beigebook2011.htm"};


yearly["2010"] = {"url":"/monetarypolicy/beigebook/beigebook2010.htm"};


yearly["2009"] = {"url":"/monetarypolicy/beigebook/beigebook2009.htm"};


yearly["2008"] = {"url":"/monetarypolicy/beigebook/beigebook2008.htm"};


yearly["2007"] = {"url":"/monetarypolicy/beigebook/beigebook2007.htm"};


yearly["2006"] = {"url":"/monetarypolicy/beigebook/beigebook2006.htm"};


yearly["2005"] = {"url":"/monetarypolicy/beigebook/beigebook2005.htm"};


yearly["2004"] = {"url":"/monetarypolicy/beigebook/beigebook2004.htm"};


yearly["2003"] = {"url":"/monetarypolicy/beigebook/beigebook2003.htm"};


yearly["2002"] = {"url":"/monetarypolicy/beigebook/beigebook2002.htm"};


yearly["2001"] = {"url":"/monetarypolicy/beigebook/beigebook2001.htm"};


yearly["2000"] = {"url":"/monetarypolicy/beigebook/beigebook2000.htm"};


yearly["1999"] = {"url":"/monetarypolicy/beigebook/beigebook1999.htm"};


yearly["1998"] = {"url":"/monetarypolicy/beigebook/beigebook1998.htm"};


yearly["1997"] = {"url":"/monetarypolicy/beigebook/beigebook1997.htm"};


yearly["1996"] = {"url":"/monetarypolicy/beigebook/beigebook1996.htm"};

if(yearly["2016"]["url"]==""||yearly["2016"]["url"]=="undefined"){
    BeigeYear = 2016 -1;
}
//alert(yearly["2016"]["url"]);
//alert("2016");
ArchiveYear = BeigeYear - 1;
monthly["BeigeYear"] = monthly[BeigeYear];

if(typeof monthly[BeigeYear]["jan"]==="undefined") monthly["BeigeYear"]["jan"] = {"url":"","date":"13","pdf":""};
if(typeof monthly[BeigeYear]["mar"]==="undefined") monthly["BeigeYear"]["mar"] = {"url":"","date":"02","pdf":""};
if(typeof monthly[BeigeYear]["apr"]==="undefined") monthly["BeigeYear"]["apr"] = {"url":"","date":"13","pdf":""};
if(typeof monthly[BeigeYear]["jun"]==="undefined") monthly["BeigeYear"]["jun"] = {"url":"","date":"01","pdf":""};
if(typeof monthly[BeigeYear]["jul"]==="undefined") monthly["BeigeYear"]["jul"] = {"url":"","date":"13","pdf":""};
if(typeof monthly[BeigeYear]["sep"]==="undefined") monthly["BeigeYear"]["sep"] = {"url":"","date":"07","pdf":""};
if(typeof monthly[BeigeYear]["oct"]==="undefined") monthly["BeigeYear"]["oct"] = {"url":"","date":"19","pdf":""};
if(typeof monthly[BeigeYear]["dec"]==="undefined") monthly["BeigeYear"]["nov"] = {"url":"","date":"30","pdf":""};

yearly["BeigeYear"] = yearly[BeigeYear];
//alert('monthly["2012"]["jan"]["url"] = ' + monthly["2012"]["jan"]["url"]);
//alert('yearly["2012"]["url"] = ' + yearly["2012"]["url"]);
goToArchive = function(){
    location.href = yearly[ArchiveYear]["url"];
}  
goToDefault = function(){
    location.href = "/monetarypolicy/beigebook/default.htm";
}
goToHtml = function(x, y){
    //location.href=monthly[x][y]["url"];
    location.replace(monthly[x][y]["url"]);
}
goToPDF = function(x, y){

    //location.href=monthly[x][y]["pdf"];
    location.replace(monthly[x][y]["pdf"]);
        
}
writeDate = function(x, y){
    document.getElementById(y+"_date").innerHTML = (monthly[x][y]["date"]);
}
validateRows = function(x){
if(typeof monthly[x]["jan"]==="undefined")document.getElementById('month_jan').parentElement.removeChild(document.getElementById('month_jan')); 
else{
    if(typeof monthly[x]["jan"]["pdf"]==="undefined"||monthly[x]["jan"]["pdf"]==""){
            document.getElementById("jan_pdf").style.display="none"; 
            document.getElementById("jan_pipe").style.display="none"; 
        }    
    if(typeof monthly[x]["jan"]["url"]==="undefined"||monthly[x]["jan"]["url"]==""){
            document.getElementById("jan_html").style.display="none"; 
        }    
}
if(typeof monthly[x]["feb"]==="undefined")document.getElementById('month_feb').parentElement.removeChild(document.getElementById('month_feb'));
else{
    if(typeof monthly[x]["feb"]["pdf"]==="undefined"||monthly[x]["feb"]["pdf"]==""){
            document.getElementById("feb_pdf").style.display="none"; 
            document.getElementById("feb_pipe").style.display="none";             
        }
    if(typeof monthly[x]["feb"]["url"]==="undefined"||monthly[x]["feb"]["url"]==""){
            document.getElementById("feb_html").style.display="none";          
        }
} 
if(typeof monthly[x]["mar"]==="undefined")document.getElementById('month_mar').parentElement.removeChild(document.getElementById('month_mar')); 
else{
    if(typeof monthly[x]["mar"]["pdf"]==="undefined"||monthly[x]["mar"]["pdf"]==""){
            document.getElementById("mar_pdf").style.display="none"; 
            document.getElementById("mar_pipe").style.display="none";             
        }
    if(typeof monthly[x]["mar"]["url"]==="undefined"||monthly[x]["mar"]["url"]==""){
            document.getElementById("mar_html").style.display="none";        
        }        
}
if(typeof monthly[x]["apr"]==="undefined")document.getElementById('month_apr').parentElement.removeChild(document.getElementById('month_apr')); 
else{
    if(typeof monthly[x]["apr"]["pdf"]==="undefined"||monthly[x]["apr"]["pdf"]==""){
            document.getElementById("apr_pdf").style.display="none";
            document.getElementById("apr_pipe").style.display="none";          
        }
    if(typeof monthly[x]["apr"]["url"]==="undefined"||monthly[x]["apr"]["url"]==""){
            document.getElementById("apr_html").style.display="none";   
        }
}
if(typeof monthly[x]["may"]==="undefined")document.getElementById('month_may').parentElement.removeChild(document.getElementById('month_may')); 
else{
    if(typeof monthly[x]["may"]["pdf"]==="undefined"||monthly[x]["may"]["pdf"]==""){
            document.getElementById("may_pdf").style.display="none"; 
            document.getElementById("may_pipe").style.display="none";            
        }
    if(typeof monthly[x]["may"]["url"]==="undefined"||monthly[x]["may"]["url"]==""){
            document.getElementById("may_html").style.display="none";        
        }
}
if(typeof monthly[x]["jun"]==="undefined")document.getElementById('month_jun').parentElement.removeChild(document.getElementById('month_jun')); 
else{
    if(typeof monthly[x]["jun"]["pdf"]==="undefined"||monthly[x]["jun"]["pdf"]==""){
            document.getElementById("jun_pdf").style.display="none"; 
            document.getElementById("jun_pipe").style.display="none";         
        }
    if(typeof monthly[x]["jun"]["url"]==="undefined"||monthly[x]["jun"]["url"]==""){
            document.getElementById("jun_html").style.display="none";     
        }
}
if(typeof monthly[x]["jul"]==="undefined")document.getElementById('month_jul').parentElement.removeChild(document.getElementById('month_jul')); 
else{
    if(typeof monthly[x]["jul"]["pdf"]==="undefined"||monthly[x]["jul"]["pdf"]==""){
            document.getElementById("jul_pdf").style.display="none"; 
            document.getElementById("jul_pipe").style.display="none";         
        }
    if(typeof monthly[x]["jul"]["url"]==="undefined"||monthly[x]["jul"]["url"]==""){
            document.getElementById("jul_html").style.display="none";         
        }
}
if(typeof monthly[x]["aug"]==="undefined")document.getElementById('month_aug').parentElement.removeChild(document.getElementById('month_aug'));
else{
    if(typeof monthly[x]["aug"]["pdf"]==="undefined"||monthly[x]["aug"]["pdf"]==""){
            document.getElementById("aug_pdf").style.display="none";
            document.getElementById("aug_pipe").style.display="none";         
        }  
    if(typeof monthly[x]["aug"]["url"]==="undefined"||monthly[x]["aug"]["url"]==""){
            document.getElementById("aug_html").style.display="none";     
        }  
} 
if(typeof monthly[x]["sep"]==="undefined")document.getElementById('month_sep').parentElement.removeChild(document.getElementById('month_sep')); 
else{
    if(typeof monthly[x]["sep"]["pdf"]==="undefined"||monthly[x]["sep"]["pdf"]==""){
            document.getElementById("sep_pdf").style.display="none"; 
            document.getElementById("sep_pipe").style.display="none";         
        }
    if(typeof monthly[x]["sep"]["url"]==="undefined"||monthly[x]["sep"]["url"]==""){
            document.getElementById("sep_html").style.display="none";      
        }
}
if(typeof monthly[x]["oct"]==="undefined")document.getElementById('month_oct').parentElement.removeChild(document.getElementById('month_oct')); 
else{
    if(typeof monthly[x]["oct"]["pdf"]==="undefined"||monthly[x]["oct"]["pdf"]==""){
            document.getElementById("oct_pdf").style.display="none";
            document.getElementById("oct_pipe").style.display="none";         
        } 
    if(typeof monthly[x]["oct"]["url"]==="undefined"||monthly[x]["oct"]["url"]==""){
            document.getElementById("oct_html").style.display="none";    
        } 
}
if(typeof monthly[x]["nov"]==="undefined")document.getElementById('month_nov').parentElement.removeChild(document.getElementById('month_nov')); 
else{
    if(typeof monthly[x]["nov"]["pdf"]==="undefined"||monthly[x]["nov"]["pdf"]==""){
            document.getElementById("nov_pdf").style.display="none";
            document.getElementById("nov_pipe").style.display="none";         
        } 
    if(typeof monthly[x]["nov"]["url"]==="undefined"||monthly[x]["nov"]["url"]==""){
            document.getElementById("nov_html").style.display="none";     
        } 
}
if(typeof monthly[x]["dec"]==="undefined")document.getElementById('month_dec').parentElement.removeChild(document.getElementById('month_dec'));
else{
    if(typeof monthly[x]["dec"]["pdf"]==="undefined"||monthly[x]["dec"]["pdf"]==""){
            document.getElementById("dec_pdf").style.display="none";
            document.getElementById("dec_pipe").style.display="none";         
        } 
    if(typeof monthly[x]["dec"]["url"]==="undefined"||monthly[x]["dec"]["url"]==""){
            document.getElementById("dec_html").style.display="none";     
        } 
}
if(!(typeof monthly[x]["jan"]==="undefined"))writeDate(x, "jan");
if(!(typeof monthly[x]["feb"]==="undefined"))writeDate(x, "feb");
if(!(typeof monthly[x]["mar"]==="undefined"))writeDate(x, "mar");
if(!(typeof monthly[x]["apr"]==="undefined"))writeDate(x, "apr");
if(!(typeof monthly[x]["may"]==="undefined"))writeDate(x, "may");
if(!(typeof monthly[x]["jun"]==="undefined"))writeDate(x, "jun");
if(!(typeof monthly[x]["jul"]==="undefined"))writeDate(x, "jul");
if(!(typeof monthly[x]["aug"]==="undefined"))writeDate(x, "aug");
if(!(typeof monthly[x]["sep"]==="undefined"))writeDate(x, "sep");
if(!(typeof monthly[x]["oct"]==="undefined"))writeDate(x, "oct");
if(!(typeof monthly[x]["nov"]==="undefined"))writeDate(x, "nov");
if(!(typeof monthly[x]["dec"]==="undefined"))writeDate(x, "dec");
}

 