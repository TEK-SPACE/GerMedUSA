<%@ Control Language="c#" AutoEventWireup="false" Inherits="AspDotNetStorefront.TemplateBase" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>(!METATITLE!)</title>
(!CURRENCY_LOCALE_ROBOTS_TAG!)
<meta name="description" content="(!METADESCRIPTION!)">
<meta name="keywords" content="(!METAKEYWORDS!)">
<link rel="stylesheet" href="skins/Skin_(!SKINID!)/style.css" type="text/css">
<script language="JavaScript" src="dMenu.js" type="text/javascript"></script>
<script type="text/javascript" src="jscripts/formValidate.js"></script>

(!BUYSAFEJSURL!)
<link rel="shortcut icon" href ="images/favicon.ico" /> 
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>


<script language="javascript" type="text/javascript">
//<![CDATA[
var tl_loc0=(window.location.protocol == "https:")? "https://secure.comodo.net/trustlogo/javascript/trustlogo.js" :
"http://www.trustlogo.com/trustlogo/javascript/trustlogo.js";
document.writeln('<scr' + 'ipt language="JavaScript" src="'+tl_loc0+'" type="text\/javascript">' + '<\/scr' + 'ipt>');
//]]>
</script>

<link rel="stylesheet" href="f_links/f_css/style.css" type="text/css" charset="utf-8"/>
</head>
<body>
(!XmlPackage Name="skin.adminalert.xml.config"!)
(!PAGEINFO!)

    <div id="wrapper">
    <br /> <br />
  <a id="logo" href="default.aspx" title="www.GerMedUSA.com"><b>www.GerMedUSA.com</b></a>
   
        <div id="login">
            <span id="userName">(!USERNAME!)</span><span id="loginText"><a href="(!SIGNINOUT_LINK!)">(!SIGNINOUT_TEXT!)</a></span>
        </div>
        
        <div id="header">
      
            <div id="nnmenu">
            <a class="nmenu" href="account.aspx">Account</a>
            <a class="nmenu" href="wishlist.aspx">Wishlist</a> 
            <a class="nmenu" href="shoppingcart.aspx">Cart ((!NUM_CART_ITEMS!))</a> 
</div>
        </div>
        <div id="horizNavnew">
            <!-- TOP MENU -->                        
            <!--<ComponentArt:Menu id="PageMenu" 
                    ClientScriptLocation="skins/componentart_webui_client/"
                  ImagesBaseUrl="skins/skin_1/images/"
                  ScrollingEnabled="true"
                  ScrollUpLookId="ScrollUpItemLook"
                  ScrollDownLookId="ScrollDownItemLook"
                  Orientation="horizontal"
                  CssClass="TopMenuGroup"
                  DefaultGroupCssClass="MenuGroup"
                  DefaultItemLookID="DefaultItemLook"
                  DefaultGroupItemSpacing="1"
                  ExpandDelay="0"
                  ExpandDuration="0"
                  ExpandSlide="None"
                  ExpandTransition="None"
                  CascadeCollapse="false"
                  CollapseDelay="0"
                  CollapseSlide="None"
                  CollapseTransition="None"
                  EnableViewState="false"
                  runat="server"
                   ExpandOnClick="true">
                    <ItemLooks>
                          <ComponentArt:ItemLook LookId="DefaultItemLook" HoverCssClass="MenuItemHover" LabelPaddingTop="2px" ActiveCssClass="MenuItemDown" LabelPaddingRight="15px" LabelPaddingBottom="2px" ExpandedCssClass="MenuItemDown" LabelPaddingLeft="5px" CssClass="MenuItem" />
                          <ComponentArt:ItemLook LookId="TopItemLook" CssClass="TopMenuItem" HoverCssClass="TopMenuItemHover" LabelPaddingLeft="4" LabelPaddingRight="4" LabelPaddingTop="2" LabelPaddingBottom="2" />
                          <ComponentArt:ItemLook LookID="ScrollUpItemLook" ImageUrl="scroll_up.gif" ImageWidth="15" ImageHeight="13" CssClass="ScrollItem" HoverCssClass="ScrollItemH" ActiveCssClass="ScrollItemA" />
                          <ComponentArt:ItemLook LookID="ScrollDownItemLook" ImageUrl="scroll_down.gif" ImageWidth="15" ImageHeight="13" CssClass="ScrollItem" HoverCssClass="ScrollItemH" ActiveCssClass="ScrollItemA" />
                          <ComponentArt:ItemLook LookID="BreakItem" ImageUrl="break.gif" ImageHeight="1" ImageWidth="100%" />
                    </ItemLooks>
            </ComponentArt:Menu>            -->
            
 <ul id="sddm">
    <li>    <a href="/default.aspx">Home</a>    </li>
    <li><a href="/t-faq.aspx"  onmouseover="mopen('m2')"  onmouseout="mclosetime()">Customer Service</a>
        <div id="m2"  onmouseover="mcancelclosetime()"  onmouseout="mclosetime()">
        <a href="/signin.aspx?returnurl=account.aspx%3f">Your Account</a>
        <a href="/signin.aspx?returnurl=account.aspx%3f">Order History</a>
        <a href="/t-faq.aspx">FAQ's</a>
        <a href="/t-Cleaningmaintenance.aspx">Cleaning & Maintanance</a>
        <a href="/t-shipping.aspx">Shipping Info</a>

       </div>
    </li>
     <li><a href="t-about.aspx" onMouseOver="mopen('m1')" onMouseOut="mclosetime()">GerMedUSA</a>
		<div id="m1" onMouseOver="mcancelclosetime()" onMouseOut="mclosetime()">
        <a href="t-about.aspx">About us</a>
        <a href="t-mission.aspx">Our Mission</a>
        <a href="t-returns.aspx">Warranty</a>
        <a href="/t-Repairs.aspx">Repairs</a>
        <a href="/download/DealerApplication.pdf">New Account</a>
        <a href="/requestcatalog.aspx">Request Catalog</a>
        <a href="/t-contact.aspx">Contact us</a>
       
        </div>
    </li>
    <li><a href="t-spanishabout.aspx" onMouseOver="mopen('m3')" onMouseOut="mclosetime()">Servicio al cliente</a>
		<div id="m3" onMouseOver="mcancelclosetime()" onMouseOut="mclosetime()">
        <a href="/signin.aspx?returnurl=account.aspx%3f">Informacion de Cuenta</a>
        <a href="/t-spanishabout.aspx">Estatus de Orden/Historia</a>
        <a href="/t-spanishabout.aspx">Sobre Nosotros</a>
        <a href="/t-spanishfaq.aspx">Preguntas Frecuentemente Pedidas</a>
        <a href="/t-spanishclean.aspx">Limpieza y Mantenimiento de los Instrumentos</a>
         <a href="/t-spanishrepairs.aspx">Reparacion</a>
           <a href="/t-spanishwarranty.aspx">Garantía</a>
             <a href="/t-contact.aspx">Contactarnos</a>
        
        
        
        </div>
    </li>
     <li><a href="/t-download.aspx" title=" Click here to Download the Catalogs" class=" ">Downloads</a></li>
    <li><a href="/t-TradeShows.aspx" title="Trade Shows" class=" ">Trade Shows</a></li>
    <li><a href="/t-PRelease.aspx" title="Press Relases" class=" ">Press Releases</a></li>
    <li><a  href="/t-contact.aspx" title="" class=" ">Contact us</a></li>
</ul>
            
            <!-- END TOP MENU -->
        </div>
        <div id="horizNav2">
            <form name="topsearchform" method="get" action="search.aspx">
                <fieldset>
                    <label>Search:</label>
                    <input type="text" size="15" name="SearchTerm" class="searchBox" id="searchBox" autocomplete="off" onFocus="javascript:this.style.background='#ffffff';" onBlur="javascript:this.style.background='#dddddd';" />
                    <input type="button" onClick="document.topsearchform.submit()" title="Click Go to Submit" id="Go" class="submit" value="Go" /><br />
                </fieldset>
            </form>
            <ul class="tameHoriz">
                <li><a href="account.aspx">Track Your Order</a><span class="pipe">|</span></li>
                <li><a href="t-returns.aspx">Returns</a><span class="pipe">|</span></li>
                <li><a href="t-shipping.aspx">Shipping Policy</a><span class="pipe">|</span></li>
                <li><a href="t-faq.aspx">FAQ</a><span class="pipe">|</span></li>
                <li>1-800-330-1322</li>
                
            </ul>
        </div>
       
        <div id="bodyWrapper">
      
            <div id="breadcrumb">Now In: (!SECTION_TITLE!)</div>
            <div id="leftWrap">
             <!--   <div class="navHeader">Browse (!StringResource Name="AppConfig.ManufacturerPromptPlural"!)</div>
               <div class="leftNav" id="manufacturers">(!XmlPackage Name="rev.manufacturers"!)</div>-->
                <div class="navHeader">Browse (!StringResource Name="AppConfig.CategoryPromptPlural"!)</div>
                <!--<div class="leftNav" id="categories">(!XmlPackage Name="rev.categories"!)</div>-->
            <!--    <div id="smoothmenu2" class="ddsmoothmenu-v">(!XmlPackage Name="rev.categories"!)</div>-->
            <div id="smoothmenu2" class="blueblock">(!XmlPackage Name="rev.categories"!)</div>
                
                <div class="navHeader">Browse (!StringResource Name="AppConfig.SectionPromptPlural"!)</div>
               <!-- <div class="leftNav" id="departments">(!XmlPackage Name="rev.departments"!)</div>-->
                <div class="blueblock">(!XmlPackage Name="rev.departments"!)</div>
                <div class="navHeader">Help &amp; Info</div>
                <!--<div class="leftNav" id="helpbox">(!Topic Name="helpbox"!)</div>-->
                <div class="blueblock">(!Topic Name="helpbox"!)</div>
            </div>
            <div id="content">
                <!-- CONTENTS START -->
                <asp:PlaceHolder ID="PageContent" runat="server"></asp:PlaceHolder>
                <!-- CONTENTS END -->
            </div>
        
        <div id="footer">
            <div id="footerWrap">
                <ul class="footerh">
                    <li><a href="t-about.aspx">About US</a> |</li>
                    <li><a href="t-returns.aspx">Returns</a> |</li>
                    <li><a href="t-faq.aspx">FAQ</a> |</li>
                   
                     <li><a href="wishlist.aspx">Wishlist</a> |</li>
                    <li><a href="sitemap2.aspx">Site Map</a> |</li>
                    <li><a href="t-privacy.aspx">Privacy Policy</a> |</li>
                    <li><a href="t-security.aspx">Security</a> |</li>
                     <li><a href="t-contact.aspx">Contact Us</a></li>
                </ul>
   
                <br />
            <img src="/images/Gcards.png" height="40" alt="We Accept" longdesc="">
            <!--
TrustLogo Html Builder Code:
Shows the logo at URL http://www.germedusa.com/skins/Skin_1/images/tl_white.gif
Logo type is  ("SC4")
Not Floating
//-->
<a href="http://www.instantssl.com" id="comodoTL">SSL</a>
<script type="text/javascript">TrustLogo("https://www.germedusa.com/skins/Skin_1/images/tl_whiteb.gif", "SC4", "none");</script><br /><br />
                <ul class="tame">
                    <li>&copy; www.GerMedUSA.com 2005-2014. All Rights Reserved.</li>
                </ul>
                
          </div>
<div class="faddress">
                2417 Jericho Turnpike, #333, Garden City Park, NY 11040 (USA) <br />
Tel: 800-330-1322 - 516-358-2180 Fax: 800-260-7177 - 516-358-2182 E-Mail: <a href="mailto:sales@germedusa.com">sales@GerMedUSA.com</a>
</div>


</div> <!--Footer-->
    </div><!--BodyWrapper-->
    
    
<table border="0" width="100%"><tr><td align="center" width="100%">(!BUYSAFESEAL!)</td></tr></table>
    <noscript>E-Commerce Solutions</noscript>
        </div><!--Wrapper-->
        
        <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-6979673-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function () {
    $("div:contains('UNLICENSED')").hide();
});
</script>
       <%-- (!GOOGLE_ECOM_TRACKING_V2!) --%>
</body>
</html>
