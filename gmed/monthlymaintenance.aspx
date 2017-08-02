<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.monthlymaintenance" CodeFile="monthlymaintenance.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Monthly Maintenance</title>
    
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
    <script type="text/javascript" language="Javascript">
        $window_addLoad(function() { { new ToolTip('imgClearAllShoppingCarts', 'AdminSiteTooltip', '<font class=\"exampleText\">If activated, all shopping cart items will be cleared that are older than the # of days specified (wish lists, and gift registries, and recurring orders not affected by this checkbox). If you wish to set the aging # days for all shopping carts, See AppConfig:AgeCartDays storewide parameter.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgClearAllWishLists', 'AdminSiteTooltip', '<font class=\"exampleText\">If activated, all wishlist items will be cleared that are older than the # of days specified.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgClearAllGiftRegistries', 'AdminSiteTooltip', '<font class=\"exampleText\">If activated, all gift registry items will be cleared that are older than the # of days specified.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgEraseOrderCreditCards', 'AdminSiteTooltip', '<font class=\"exampleText\">Since order records contain a complete snapshot of all customer data, this option allows you to remove the customer credit card information (which are encrypted) from the order records which are older than the # of days specified. The credit card information is almost never needed after an order has been successfully processed and shipped and then nothing has been heard back from the customer for 30 days. This does NOT affect the customer\'s main account record, and their credit card information remains in that account record, intact, in an encrypted state (if you have your storefront set to store credit card info by setting AppConfig:StoreCCInDB=true).</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgEraseSQLLog', 'AdminSiteTooltip', '<font class=\"exampleText\">Since the storefront can log all SQL statements done by admin users, this can help keep the sql log table size to a minimum. The SQL Log records are not needed by the storefront site to operate. They are simply an audit capability if required.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgClearProductViewsOlderThan', 'AdminSiteTooltip', '<font class=\"exampleText\">Since the storefront can log list of products that were viewed by the current & previous customer, this can help the customer determine those products he already been viewed for the current session. This will also log the most common products viewed by previous customer and w/c are also being viewed currently by another customer.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgInvalidateUserLogins', 'AdminSiteTooltip', '<font class=\"exampleText\">If checked, all user Cookies are invalidated. You can use this if you want to force all users to re-login to the store (or admin) site the next time. NO OTHER customer information is affected (billing, shipping, shopping carts, wishlists, etc...).</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgPurgeAnonUsers', 'AdminSiteTooltip', '<font class=\"exampleText\">f checked, the store will delete all customer records that belong to \'Anon\' customers. Anon customers are those who have added something to their cart (or take an action on the store site which requires them to have a record in the db customer table) but they have never registered, checked out, etc. So these are dead records that can be safely deleted. If that customer returns to the storefront later, they will simply get a new customer record automatically created for them.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgEraseAddressCreditCards', 'AdminSiteTooltip', '<font class=\"exampleText\">Since order records contain a complete snapshot of all customer data, this option allows you to remove the customer credit card information (which are encrypted) from the order records which are older than the # of days specified. The credit card information is almost never needed after an order has been successfully processed and shipped and then nothing has been heard back from the customer for 30 days. This does NOT affect the customer\'s main account record, and their credit card information remains in that account record, intact, in an encrypted state (if you have your storefront set to store credit card info by setting AppConfig:StoreCCInDB=true).</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgPurgeDeletedRecords', 'AdminSiteTooltip', '<font class=\"exampleText\">This will permanently delete all products, entities, topics, ShippingZones, SalesPrompts, Polls, Coupons, Affiliates, Customers, or Addreses</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgTuneIndexes', 'AdminSiteTooltip', '<font class=\"exampleText\">Select this option to tune the table indexes.Periodically, they can require some reorganization for maximum performance. If you select this option, your database may be locked for several minutes while the indexes are tuned.</font>'); } })
        $window_addLoad(function() { { new ToolTip('imgSaveSettings', 'AdminSiteTooltip', '<font class=\"exampleText\">Select this option if you want to save your settings for next time.</font>'); } })
    </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmWizard" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" class="breadCrumb3">
	                    <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">Monthly Maintenance |&nbsp;
                                </td>
                                <td align="left" valign="middle">
                                    View :
                                </td>
                                <td align="left" valign="middle">
                                    &nbsp;<a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;" class="breadCrumb3">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Maintenance:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        This page helps you perform recommended monthly maintenance on your storefront database. You should run this late at night, probably on weekends, when site activity is minimal, as the store database could be locked for several minutes during these operations. It is recommended that you do this maintenance monthly.
                                        <br /><br />
                                        <div id="divMain" runat="server">
                                            <table cellpadding="1" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Clear All Shopping Carts:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:DropDownList ID="ClearAllShoppingCarts" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="30">&gt;30 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgClearAllShoppingCarts" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr> 
                                                <tr runat="server" id="trWishList">
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Clear All Wish Lists: 
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:DropDownList ID="ClearAllWishLists" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>
                                                            <asp:ListItem Value="30">&gt;30 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgClearAllWishLists" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr> 
                                                <tr runat="server" id="trGR">
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Clear All Gift Registries: 
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:DropDownList ID="ClearAllGiftRegistries" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>
                                                            <asp:ListItem Value="30">&gt;30 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgClearAllGiftRegistries" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr> 
                                                <tr id="trEraseCC" runat="server">
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Erase Credit Cards/eCheck from Order records:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:DropDownList ID="EraseOrderCreditCards" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="30">&gt;30 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgEraseOrderCreditCards" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                        </td>
                                                </tr> 
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Erase SQL Log:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:DropDownList ID="EraseSQLLog" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="30">&gt;30 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgEraseSQLLog" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>    
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class ="subTitleSmall">
                                                            Clear Product Views Older Than
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                          <asp:DropDownList ID="ClearProductViewsOlderThan" CssClass="default" runat="server">
                                                            <asp:ListItem Value="0">Leave Unchanged</asp:ListItem>
                                                            <asp:ListItem Value="-1">Clear All Regardless of Date</asp:ListItem>                                                            
                                                            <asp:ListItem Value="60">&gt;60 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="90">&gt;90 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="120">&gt;120 Days Old</asp:ListItem>
                                                            <asp:ListItem Value="150">&gt;150 Days Old</asp:ListItem>
                                                            <asp:ListItem Selected="True" Value="180">&gt;180 Days Old</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <img id="imgClearProductViewsOlderThan" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td> 
                                                 </tr>   
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Invalidate All User Logins:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="InvalidateUserLogins" runat="server" />
                                                        <img id="imgInvalidateUserLogins" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>   
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Purge Anon Customers:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="PurgeAnonUsers" runat="server" Checked="True" />
                                                        <img id="imgPurgeAnonUsers" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr> 
                                                <tr id="trEraseCC2" runat="server">
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Erase Credit Card/eCheck info from Address records:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="EraseAddressCreditCards" runat="server" Checked="True" />
                                                        <img id="imgEraseAddressCreditCards" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>                                                       
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Purge all records that are marked as Deleted:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="PurgeDeletedRecords" runat="server" Checked="False" />
                                                        <img id="imgPurgeDeletedRecords" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>                                                       
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Tune Indexes:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="TuneIndexes" runat="server" Checked="True" />
                                                        <img id="imgTuneIndexes" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>          
                                                <tr>
                                                    <td align="right" style="width: 300px">
                                                        <font class="subTitleSmall">
                                                            Save Settings:
                                                        </font>
                                                    </td>
                                                    <td align="left">
                                                        <asp:CheckBox ID="SaveSettings" runat="server" Checked="True" />
                                                        <img id="imgSaveSettings" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    </td>
                                                </tr>                                           
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align="left" style="padding-top: 5px;">
                                                        (Please be patient, depending on the options selected, and the size of your database,
                                                        this operation could take minutes to complete!)<br /><br />
                                                        <asp:Label ID="lblNotice" runat="server" Font-Bold="true" ForeColor="Red" Text="Running this maintenance process will log out all users from the admin site, including the user running the maintenance"></asp:Label>
                                                        <br />
                                                        <asp:Button ID="GOButton" runat="server" CssClass="normalButtons" Text="GO" OnClick="GOButton_Click" />
                                                        
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="wrapper">
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Other Required Maintenance:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        Along with using this page to perform monthly maintenance operations on your storefront, you, or your hosting provider (whoever manages your server) should also be performing weekly full backups, daily incremental backups, virus monitoring, applying the latest security and service patches, and generally watching over the health of your database server. Those functions are not provided by our technical support team, as they are in the operations area of managing your business. You can contact your hosting provider for more information also on their policies and procedures.
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
