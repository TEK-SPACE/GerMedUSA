<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InventoryControl.aspx.cs" Inherits="_InventoryControl" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Inventory</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
    
    
    <asp:Literal runat="server" ID="literalSelfReloadScript"></asp:Literal> 
         
    <script type="text/javascript">
    
        var _displayStockElements = new Array();
        var _hideStockElements = new Array();
    
        function toggleMode(mode) {
            switch(mode) {
                case 'disable':
                    enableElements(_displayStockElements, false);
                    enableElements(_hideStockElements, false);
                    break;
                case 'hide':
                    enableElements(_displayStockElements, false);
                    enableElements(_hideStockElements, true);
                    break;
                case 'display':
                    enableElements(_displayStockElements, true);
                    enableElements(_hideStockElements, false);
                    break;
            }
        }
        
        function enableElements(elements, enabled) {
            for(var ctr=0; ctr<elements.length; ctr++) {
                var element = elements[ctr];
              
                if (element.id.indexOf("Validator") != -1)
                {
                    element.enabled = enabled;
                }
                else
                {
                    element.disabled = !enabled;
                    if (element.parentNode &&
                        element.parentNode.tagName.toLowerCase() == 'span' &&
                        element.parentNode.attributes['disabled']) {
                        
                        element.parentNode.removeAttribute('disabled');

                    } 
                }
            }
        }
   
    </script>
    
</head>
<body>
    <form id="form1" runat="server">
    <div id="help">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Manage Inventory Control</td>
                                <td align="left" valign="middle"><b>View:</b></td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
    </div>
    <div style="margin-bottom: 5px; margin-top: 5px;">
    </div>
   
   
    <div id="container">
      <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
       <tr>
          <td class="titleTable" style="width:130%">
             <span class="subTitle">Inventory Control:</span>
          </td>
        </tr>
       </table>
    </div>
       
     
     <table cellpadding="0" cellspacing="0" border="0"  width="100%">
           <tr>
              <td align="left" valign="top" width="10%" >
              </td>
              <td align="left" valign="top">
         <table cellpadding="0" cellspacing="0" border="0" width="90%">
             <tr>
               <td id = "tdLocale" runat = "server" align="right" height="35px" valign="middle">
                <span class="subTitle">Locale:</span> <asp:DropDownList ID="ddlLocale" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlLocale_SelectedIndexChanged"></asp:DropDownList>
               </td>
                <td runat = "server" align="right" height="35px" valign="middle">
               </td>
            </tr>
            
            <tr>
               <td align="left" height="25px" valign="middle">
                 <b>
                     <asp:Label ID="lblTitle" runat="server" Text="Label"></asp:Label></b></td>
            </tr>
            
            <tr>
               <td align="left" height="25px" valign="middle">
                 <asp:CheckBox ID="cbxLimitCartInQuantityInHand" runat="server" Text="LimitCartInQuantityInHand" />
                 <img id="imgLimitCartToQuantityOnHand" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
               </td>
            </tr>
            
            <tr>
               <td align="left" height="25px" valign="middle">
                 <asp:CheckBox ID="cbxShowInventoryTable" runat="server" Text="ShowInventoryTable" />
                 <img id="imgShowInventoryTable" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
              </td>
            </tr>
            
            <tr>
              <td>
                 <hr style="width: 80%; float:left;"/>
              </td>
            </tr>
             
             <tr>
               <td align="left" height="25px" valign="middle">
                 <asp:RadioButton ID="rbnDisable" runat="server" GroupName="rbnAppconfig" />
               </td>
            </tr>
            
            <tr>
              <td align="left" valign="middle" style="height: 25px">
                 <asp:RadioButton ID="rbnHide" runat="server"  GroupName="rbnAppconfig" onclick ="tt()"/>
                 <asp:TextBox ID="txtHideValue" runat="server" Width="32px" MaxLength="4" Enabled="False"></asp:TextBox>
                 <img id="imgHide" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                 &nbsp;
                  <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="txtHideValue"
                      ErrorMessage="Please input number greater than 0 to enable this appconfig" MaximumValue="9999" MinimumValue="1" CultureInvariantValues="True" Display="Dynamic" Enabled="False"></asp:RangeValidator>
                  <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Display="Dynamic"
                      Enabled="False" ErrorMessage="Please input number greater than 0 to enable this appconfig" ControlToValidate="txtHideValue"></asp:RequiredFieldValidator></td>
            </tr>
            
            <tr>
              <td align="left" height="25px" valign="middle">
                <asp:RadioButton ID="rbnDisplay" runat="server"  GroupName="rbnAppconfig"/>
                <img id="imgDisplayOutOfStockProducts" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
              </td>
            </tr>
            
            <tr>
                <td >
                    <div class="DisplayOutOfStockGroup" >
                        <table>
                            <tr>
                                 <td align="left" valign="middle">
                                    <asp:Label ID="lblOutOfStockThreshold" runat="server" Text="Label"></asp:Label></td>
                                 <td align="left" valign="middle">
                                    <asp:TextBox ID="txtOutOfStockThreshold" runat="server" Width="32px" MaxLength="4" Enabled="False"></asp:TextBox>
                                   <img id="imgOutOfStockThreshold" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                         <asp:RangeValidator ID="RangeValidator2" runat="server" ControlToValidate="txtOutOfStockThreshold"
                                         CultureInvariantValues="True"
                                         ErrorMessage="Please input number" MaximumValue="9999" MinimumValue="0" Display="Dynamic" Enabled="False"></asp:RangeValidator>
                                     <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" Display="Dynamic"
                                         Enabled="False" ErrorMessage="Please input number" ControlToValidate="txtOutOfStockThreshold"></asp:RequiredFieldValidator></td>
                             </tr>

                             <tr>
                                <td>
                                   <asp:Label ID="lblOutOfStockProduct" runat="server" Text='Display "Out of stock " message on products pages'></asp:Label>                               
                                </td>
                                <td align="left" valign="middle">
                                    <asp:TextBox ID="txtOutOfStockProduct" runat="server" Enabled="False"></asp:TextBox> 
                                    <img id="imgDisplayOFSOnProductPage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                             </tr>
                             
                              <tr>
                                 <td align="left" valign="middle">
                                   <asp:Label ID="lblOutOfStockEntity" runat="server" Text='Display "Out of stock " message on entiy pages'></asp:Label> &nbsp;                               
                                 </td>
                                 <td align="left" valign="middle">
                                    <asp:TextBox ID="txtOutOfStockEntity" runat="server" Enabled="False"></asp:TextBox>
                                    <img id="imgDisplayOFSOnEntityPage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                              </tr>

                              <tr>
                                 <td align="left" valign="middle">
                                    <asp:Label ID="lblInStockProduct" runat="server" Text='Display "In stock" on product page'></asp:Label> &nbsp;                                
                                 </td>
                                 <td align="left" valign="middle">
                                    <asp:TextBox ID="txtInStockProduct" runat="server" Enabled="False"></asp:TextBox>
                                    <img id="imgDisplayISOnEntityPage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                              </tr>

                              <tr>
                                 <td align="left" valign="middle">
                                    <asp:Label ID="lblInStockEntity" runat="server" Text='Display "In stock" on entiy page'></asp:Label> &nbsp;                                
                                </td>
                                <td align="left" valign="middle">
                                    <asp:TextBox ID="txtInStockEntity" runat="server" Enabled="False"></asp:TextBox>
                                    <img id="imgDisplayISOnProductPage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                             </tr>

                              <tr>
                                 <td align="left" valign="middle">
                                    <asp:CheckBox ID="cbxProductPages" runat="server" Text="Show in product pages" Enabled="False" />
                                    <img id="imgDisplayOutOfStockOnProductPages" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                </td>
                                <td align="left" valign="middle">
                                </td>
                              </tr>

                               <tr>
                                  <td align="left" valign="middle">
                                     <asp:CheckBox ID="cbxEntityPages" runat="server" Text="Show in Entity pages" Enabled="False" />
                                     <img id="imgDisplayOutOfStockOnEntityPages" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                 </td>
                                 <td align="left" valign="middle">
                                </td>
                               </tr>
                        </table>
                    </div>
                </td>
            </tr>

               <tr>
                   <td>
                      <hr style="width: 80%; float:left;"/>
                   </td>
              </tr>

               <tr>
                  <td align="left" height="25px" valign="middle">
                     <asp:Button ID="btnUpdate" runat="server" onclick="btnUpdate_Click" cssclass="normalButtons"/>
                  </td>
               </tr>
                </table>
             </td>
            </tr>
        </table>
    </form>
</body>
</html>
