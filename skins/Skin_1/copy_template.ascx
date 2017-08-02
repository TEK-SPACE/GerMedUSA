<%@ Control Language="c#" AutoEventWireup="false" Inherits="AspDotNetStorefront.TemplateBase" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>(!METATITLE!)</title>
(!CURRENCY_LOCALE_ROBOTS_TAG!)
<meta name="description" content="(!METADESCRIPTION!)">
<meta name="keywords" content="(!METAKEYWORDS!)">
<link rel="stylesheet" href="skins/Skin_(!SKINID!)/style.css" type="text/css">
<script type="text/javascript" src="jscripts/formValidate.js"></script>
<script language="javascript" type="text/javascript">
function showHide(shID) {
   if (document.getElementById(shID)) {
      if (document.getElementById(shID+'-show').style.display != 'none') {
         document.getElementById(shID+'-show').style.display = 'none';
         document.getElementById(shID).style.display = 'block';
      }
      else {
         document.getElementById(shID+'-show').style.display = 'inline';
         document.getElementById(shID).style.display = 'none';
      }
   }
}
</script>
(!BUYSAFEJSURL!)
<link rel="shortcut icon" href ="images/favicon.ico" /> 

<link rel="stylesheet" type="text/css" href="ddsmoothmenu.css" />
<link rel="stylesheet" type="text/css" href="ddsmoothmenu-v.css" />


<script type="text/javascript" src="ddsmoothmenu.js">

/***********************************************
* Thi Website Developed and Maintained by RedandBlueGraphics
* This notice MUST stay intact for legal use
* Visit us at http://www.RedandBlueGraphics.com/ for more freelancer works
***********************************************/

</script>
<link href="magiczoom.css" rel="stylesheet" type="text/css" media="screen"/>
<script src="magiczoom.js" type="text/javascript"></script>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
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
       <!-- <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="907" height="150">
  <param name="movie" value="banner.swf" />
  <param name="quality" value="high" />
  <param name="allowScriptAccess" value="always" />
  <param name="wmode" value="transparent">
     <embed src="skins/skin_1/images/flash/banner.swf"
      quality="high"
      type="application/x-shockwave-flash"
      WMODE="transparent"
      width="907"
      height="150"
      pluginspage="http://www.macromedia.com/go/getflashplayer"
      allowScriptAccess="always" />
</object>-->
         <!--   <a id="logo" href="default.aspx" title="www.GerMedUSA.com"><b>www.GerMedUSA.com</b></a>-->
            <div id="nnmenu">
            <a class="nmenu" href="account.aspx">Account</a>
            <a class="nmenu" href="wishlist.aspx">Wishlist</a> 
            <a class="nmenu" href="shoppingcart.aspx">Cart ((!NUM_CART_ITEMS!))</a> 
           
<!--            <a class="contact" href="t-contact.aspx">Contact Us</a> -->
</div>
        </div>
        <div id="horizNav">
            <!-- TOP MENU -->                        
            <ComponentArt:Menu id="PageMenu" 
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
            </ComponentArt:Menu>            
            <!-- END TOP MENU -->
        </div>
        <div id="horizNav2">
              
        <!-- http://www.RedandBlueGraphics.com Tracking Code -->
        <div id="livezilla_tracking" style="display:none"></div><script type="text/javascript">var script = document.createElement("script");script.type="text/javascript";var src = "http://germedusa.com/rbgxLiveChat/server.php?request=track&output=jcrpt&nse="+Math.random();setTimeout("script.src=src;document.getElementById('livezilla_tracking').appendChild(script)",1);</script>
        <!-- http://www.RedandBlueGraphics.com Tracking Code -->
        
        
        
        
        
           
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
                <li><span>1-800-330-1322</span></li>
            </ul>
        </div>
        <div id="bodyWrapper">
            <!-- <div id="miniCart">You have (!NUM_CART_ITEMS!) item(s) in your <a class="username" href="shoppingcart.aspx">
                    (!CARTPROMPT!)</a></div>
            <div id="ML">
                <div style="visibility: (!COUNTRYDIVVISIBILITY!); display: (!COUNTRYDIVDISPLAY!);">Language: (!COUNTRYSELECTLIST!)</div>
                <div style="visibility: (!CURRENCYDIVVISIBILITY!); display: (!CURRENCYDIVDISPLAY!);">Currency: (!CURRENCYSELECTLIST!)</div>
                <div style="visibility: (!VATDIVVISIBILITY!); display: (!VATDIVDISPLAY!);">VAT Mode: (!VATSELECTLIST!)</div>
            </div> -->
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
     <!--             <ul class="tameHoriz">
                  <li><a href="t-affiliate.aspx">Affiliates</a> |</li>
                    <li><a href="giftregistry.aspx">Gift Registry</a> |</li>
                    <li><a href="wishlist.aspx">Wishlist</a> |</li>
                    <li><a href="sitemap2.aspx">Site Map</a> |</li>
                    <li><a href="t-privacy.aspx">Privacy Policy</a> |</li>
                    <li><a href="t-security.aspx">Security</a></li>
                </ul>-->
                <br />
            <img src="/images/Gcards.png" height="40" alt="We Accept" longdesc="http://www.RedandBlueGraphics.com"><br /><br />
                <ul class="tame">
                    <li>&copy; www.GerMedUSA.com 2005-2010. All Rights Reserved.</li>
                </ul>
          </div>
<div class="faddress">
                2417 Jericho Turnpike, #333, Garden City Park, NY 11040 (USA) <br />
Tel: 800-330-1322 - 516-358-2180 Fax: 800-260-7177 - 516-358-2182 E-Mail: <a href="mailto:sales@germedusa.com">sales@GerMedUSA.com</a>
</div>
<div id="rbgxf">
        <a href="https://www.redandbluegraphics.com" target="_blank"><img src="/images/redandblue.jpg" alt="Red and Blue Graphics" border="0" longdesc="http://redandbluegraphics.com"></a><br />
       <a href="http://www.redandbluegraphics.com" title="RedandBlue Graphics" target="_blank">RedandBlue Graphics</a>
</div>

</div> <!--Footer-->
    </div><!--BodyWrapper-->
    
    
<table border="0" width="100%"><tr><td align="center" width="100%">(!BUYSAFESEAL!)</td></tr></table>
    <noscript>Powered by <a href="http://www.RedandBlueGraphics.com" target="_blank">E-Commerce Solutions</a></noscript>
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

</script>
        
</body>
</html>
