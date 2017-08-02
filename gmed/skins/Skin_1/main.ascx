<%@ Control Language="c#" AutoEventWireup="false" Inherits="AspDotNetStorefront.TemplateBase" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<html>
  <head>
    <title>(!SITE_NAME!) - RBG Admin Section</title>
    <base target="content">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="skins/skin_(!SKINID!)/style.css" type="text/css" rel="stylesheet">
    <link href="skins/skin_(!SKINID!)/menuStyle.css" type="text/css" rel="stylesheet" >
    <script type="text/javascript">
    
     function attachHoverImage(id) {     
        var img = document.getElementById(id);        
        if(img && img.attributes['hover']) {
            var org = img.src;
            var hover = img.attributes['hover'].value;
            img.onmouseover = function(){ img.src = hover;};
            img.onmouseout = function(){ img.src = org; };
        }
     }
     
     function observeWindowLoad(handler) {
        if (window.addEventListener) { 
            window.addEventListener('load',handler,false);
        }
        else if (document.addEventListener) {
            document.addEventListener('load',handler,false);
        }
        else if (window.attachEvent) { 
            window.attachEvent('onload',handler);
        }
        else {
            if (typeof window.onload=='function') {
                var oldload=window.onload;
                window.onload = function(){
                    oldload();
                    handler();
                }
            } 
            else { window.onload=init; }
        }
    }
    </script>
  </head>
  <body>
    <!-- PAGE INVOCATION: '(!INVOCATION!)' -->
    <!-- PAGE REFERRER: '(!REFERRER!)' -->
    <!-- CUSTOMER ID: '(!CUSTOMERID!)' -->
    <!-- STORE LOCALE: '(!STORELOCALE!)' -->
    <!-- CUSTOMER LOCALE: '(!CUSTOMERLOCALE!)' -->
    <!-- header -->
 <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="left" valign="top" class="Top">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="left" valign="bottom" id="Top_Left">
            <table style="width: 550px" border="0">
                <tr>
                    <td style="width : 210px"><br /></td>
                    <td class="adminUserIcon"><a href="(!ADMIN_ICON_LINK!)" target="content" title="Edit Account"><img id="imgUserIcon" src="skins/skin_(!SKINID!)/images/usericon.gif" border="0"/></a></td>       
                    <td class="adminUserName">
                        (!ADMIN_USER_NAME!)
                    </td>                 
                </tr>
            </table>
        </td>
        <td align="left" valign="top" class="Top_Center">&nbsp;</td>
        <td align="right" valign="middle" class="Top_Right">
		    <table width="0" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="57" align="center" valign="middle">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td valign="top">
			  <table width="0" border="0" cellspacing="0" cellpadding="0" id="toplink">
  <tr>
    <td align="center" valign="middle"><a href="../" target="_blank" title="Store Site"><img id="imgShoppingCart" src="skins/skin_(!SKINID!)/images/shoppingcart.png" hover="skins/skin_(!SKINID!)/images/shoppingcart_hover.png" border="0"/></a></td>
    <td align="center" valign="middle"><a href="default.aspx?clearcache=true" target="_top" title="Reset Cache"><img id="imgResetCache" src="skins/skin_(!SKINID!)/images/reset.png" hover="skins/skin_(!SKINID!)/images/reset_hover.png" border="0"/></a></td>
    <td align="center" valign="middle"><a href="(!SIGNINOUT_LINK!)" target="_top" title="Logout"><img id="imgLogout" src="skins/skin_(!SKINID!)/images/logout.png" hover="skins/skin_(!SKINID!)/images/logout_hover.png" border="0"/></a></td>
  </tr>
  <tr>
    <td align="center" valign="middle"><a href="../" target="_blank">(!SITE_NAME!)</a></td>
    <td align="center" valign="middle"><a href="default.aspx?clearcache=true" target="_top">Reset Cache</a></td>
    <td align="center" valign="middle"><a href="(!SIGNINOUT_LINK!)" target="_top">(!SIGNINOUT_TEXT!)</a></td>
  </tr>
</table>			</td>
          </tr>
        </table>			</td>
          </tr>
          <tr>
            <td height="21" align="right" valign="top">
            <form id="SearchFormTop" style="MARGIN: 0px" name="SearchFormTop" action="search.aspx" method="get">
			  <table width="0" height="22" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td width="35" align="right" valign="middle"><img src="skins/skin_(!SKINID!)/images/searchbutton2.png" width="35" height="22" /></td>
            <td valign="middle"><input type="text" id="Text1" class="Search_textbox" size="22" name="SearchTerm" value="Search here" onClick="javascript:this.value=''"/></td>
                    <td width="42" align="left" valign="middle"><img id="imgSearch" src="skins/skin_(!SKINID!)/images/searchbutton.png" hover="skins/skin_(!SKINID!)/images/searchbutton_hover.png" onClick="document.getElementById('SearchFormTop').submit();" border="0"/></td>
          </tr>
        </table>
            </form>
		</td>
          </tr>
        </table>
		</td>
		<td width="10px" class="Top_Center"></td>
      </tr>
    </table>
    </td>
  </tr>
  <tr>
    <td id="menu"><form id="frmMenu" style="MARGIN: 0px" name="frmMenu" action="default.aspx" method="get" runat="server">
    <ComponentArt:Menu id="PageMenu" width="90px"
		
	  ClientScriptLocation="skins/componentart_webui_client/" 
	  ScrollingEnabled="true"
      ScrollUpLookId="ScrollUpItemLook"
      ScrollDownLookId="ScrollDownItemLook"
	  Orientation="horizontal"
      CssClass="TopMenuGroup"
      DefaultGroupCssClass="MenuGroup"
      DefaultItemLookID="DefaultItemLook"
      DefaultGroupItemSpacing="0"
      ExpandDelay="0"
      ExpandDuration="0"
      ExpandSlide="None"
      ExpandTransition="None"
	  CascadeCollapse="false"
	  CollapseDelay="0"
	  CollapseSlide="None"
	  CollapseTransition="None"
	  DefaultTarget="content"
      ImagesBaseUrl="skins/skin_1/images/"
      EnableViewState="false"
      runat="server">
    <ItemLooks>    	  
	      <ComponentArt:ItemLook LookId="TopItemLook" CssClass="TopMenuItem" HoverCssClass="TopMenuItemHover" />
    	  <ComponentArt:ItemLook LookId="DefaultItemLook" CssClass="MenuItem" HoverCssClass="MenuItemHover" LabelPaddingLeft="4" LabelPaddingRight="4" LabelPaddingTop="2" LabelPaddingBottom="2" />
    	  <ComponentArt:ItemLook LookID="ScrollUpItemLook" ImageUrl="scroll_up.gif" ImageWidth="15" ImageHeight="13" CssClass="ScrollItem" HoverCssClass="ScrollItemH" ActiveCssClass="ScrollItemA" />
	      <ComponentArt:ItemLook LookID="ScrollDownItemLook" ImageUrl="scroll_down.gif" ImageWidth="15" ImageHeight="13" CssClass="ScrollItem" HoverCssClass="ScrollItemH" ActiveCssClass="ScrollItemA" />
    </ItemLooks>
    </ComponentArt:Menu>
    </form></td>
  </tr>
  <tr>
    <td align="left" valign="top">
        <iframe name="content" width="100%" 
            height="100%" align="left"
            scrolling="yes" src="splash.aspx" 
            marginwidth="10" marginheight="10" 
            title="MainWindow" target="_self" 
            border="0" frameborder="0">
        </iframe>
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="footer">2005-2014 www.GerMedUSA.com. All rights Reserved.
          </td>
    

    
  </tr>
</table>
    
<!-- pre-attach the hover image -->
<script type="text/javascript" language="javascript" >
    observeWindowLoad( function(){
        attachHoverImage('imgShoppingCart');
        attachHoverImage('imgLogout');
        attachHoverImage('imgResetCache');
        attachHoverImage('imgSearch');
        
        __domLoaded = true;
    });
</script>

</body>
</html>
