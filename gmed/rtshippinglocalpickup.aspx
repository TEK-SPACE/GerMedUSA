<%@ Page Language="C#" AutoEventWireup="true" CodeFile="rtshippinglocalpickup.aspx.cs"
    Inherits="_RTShippingLocalPickup" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>RTShipping Local Pickup</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />

    <asp:Literal runat="server" ID="literalSelfReloadScript"></asp:Literal> 

    <script runat="server">

    void rblRestrictionType_SelectedIndexChanged(object sender, EventArgs e)
    {
        switch (rblRestrictionType.SelectedItem.Value)
        {
            case "1":
                pnlStateSelect.Visible = false;
                pnlZipSelect.Visible = false;
                pnlZoneSelect.Visible = false;
                break;
            case "2":
                pnlStateSelect.Visible = true;
                pnlZipSelect.Visible = false;
                pnlZoneSelect.Visible = false;
                break;
            case "3":
                pnlStateSelect.Visible = false;
                pnlZipSelect.Visible = true;
                pnlZoneSelect.Visible = false;
                break;
            case "4":
                pnlStateSelect.Visible = false;
                pnlZipSelect.Visible = false;
                pnlZoneSelect.Visible = true;
                break;
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
                            <td align="left" valign="middle">
                                <b>Now In:</b>
                            </td>
                            <td align="left" valign="middle">
                                <asp:Label ID="lblrtshippinglocalpickupbreadcrumb" runat="server" />
                            </td>
                            <td align="left" valign="middle">
                                <b>View:</b>
                            </td>
                            <td align="left" valign="middle">
                                <a href="splash.aspx">Home</a>
                            </td>
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
                <td class="titleTable" style="width: 130%">
                    <span class="subTitle">
                        <asp:Label ID="lblrtshippinglocalpickupheader" runat="server" /></span>
                </td>
            </tr>
        </table>
    </div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td align="left" valign="top" width="10%">
            </td>
            <td align="left" valign="top">
                <table cellpadding="0" cellspacing="0" border="0" width="90%">
                    <tr>
                        <td id="tdLocale" runat="server" align="right" height="35px" valign="middle">
                            <span class="subTitle">Locale:</span>
                            <asp:DropDownList ID="ddlLocale" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlLocale_SelectedIndexChanged">
                            </asp:DropDownList>
                        </td>
                        <td id="Td1" runat="server" align="right" height="35px" valign="middle">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Literal ID="ltError" runat="server"></asp:Literal>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25px" valign="middle">
                            <b>
                                <asp:Label ID="lblTitle" runat="server" Text="Label"></asp:Label></b>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25px" valign="middle">
                            <asp:CheckBox ID="cbxAllowLocalPickup" runat="server" />
                            <img id="imgAllowLocalPickup" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="LocalPickupMethodName">
                                <table>
                                    <tr>
                                        <td align="left" valign="middle">
                                            <asp:Label ID="lblRTShippingLocalPickupMethodNameLabel" runat="server" Text="Name of local pickup shipping mehtod"></asp:Label>
                                            &nbsp;
                                        </td>
                                        <td align="left" valign="middle">
                                            <asp:TextBox ID="txtRTShippingLocalPickupMethodName" runat="server"></asp:TextBox>
                                            <img id="imgRTShippingLocalPickupMethodNameImage" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="LocalPickupHandlingFee">
                                <table>
                                    <tr>
                                        <td align="left" valign="middle">
                                            <asp:Label ID="lblRTShippingLocalPickupHandlingFee" runat="server" Text="Handling fee for local pickup"></asp:Label>
                                            &nbsp;
                                        </td>
                                        <td align="left" valign="middle">
                                            <asp:TextBox ID="txtRTShippingLocalPickupHandlingFee" runat="server"></asp:TextBox>
                                            <img id="imgRTShippingLocalPickupHandlingFee" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <hr style="width: 80%; float: left;" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25px" valign="middle">
                            <b>
                                <asp:Label ID="lblRestrictionsTitle" runat="server" Text="Label"></asp:Label></b>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <asp:Label ID="lblrestrictiontype" runat="server" />
                            <img id="imgRestrictionType" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:RadioButtonList ID="rblRestrictionType" runat="server" OnSelectedIndexChanged="rblRestrictionType_SelectedIndexChanged" AutoPostBack="true">
                                <asp:ListItem ID="liUnrestricted" runat="server" Value="1" Text="Unrestricted"></asp:ListItem>
                                <asp:ListItem ID="liState" runat="server" Value="2" Text="State"></asp:ListItem>
                                <asp:ListItem ID="liZip" runat="server" Value="3" Text="Zip"></asp:ListItem>
                                <asp:ListItem ID="liZone" runat="server" Value="4" Text="Zone"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Panel ID="pnlStateSelect" Visible="false" runat="server">
                            <asp:Label ID="lblRestrictionAllowedStates" runat="server"></asp:Label>
                            <img id="imgRestrictionAllowedStates" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                            <br />
                            </asp:Panel>
                            <asp:Panel ID="pnlZipSelect" Visible="false" runat="server">
                            <asp:Label ID="lblRestrictionAllowedZips" runat="server"></asp:Label>
                            <asp:TextBox ID="txtRestrictionAllowedZips" runat="server"></asp:TextBox>
                            <img id="imgRestrictionAllowedZips" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                            <br />
                            </asp:Panel>
                            <asp:Panel ID="pnlZoneSelect" Visible="false" runat="server">
                            <asp:Label ID="lblRestrictionAllowedZones" runat="server"></asp:Label>
                            <img id="imgRestrictionAllowedZones" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                            <br />
                            </asp:Panel>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <hr style="width: 80%; float: left;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25px" valign="middle">
                            <asp:Button ID="btnUpdate" runat="server" OnClick="btnUpdate_Click" CssClass="normalButtons" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>
