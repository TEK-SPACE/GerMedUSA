<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PackageValidation.aspx.cs" Inherits="PackageValidation" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Locale Settings</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmLocaleSettings" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px" class="breadCrumb3">
	                    <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="left" valign="middle">Now In:</td>
                                <td align="left" valign="middle">
                                    &nbsp;XmlPackage Validator |&nbsp;</td>
                                <td align="left" valign="middle">View: |&nbsp;</td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;">
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
                                    <font class="subTitle">Validation:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <table width="100%" cellpadding="1" cellspacing="0" border="0">
                                            <tr>
                                                <td align="left" valign="middle" width="165">
                                                    <font class="subTitleSmall">Select Your XmlPackage File:</font>
                                                </td>
                                                <td align="left" valign="middle">
                                                    <asp:FileUpload CssClass="fileUpload" ID="xmlpackage" runat="server" Width="400px" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" colspan="2">
                                                    <div style="margin-top: 15px; margin-bottom: 15px;">
                                                        <b>- OR -</b>
                                                    </div>
                                                    <font class="subTitleSmall">Paste your XmlPackage document here:</font><br/>
                                                    <asp:TextBox ID="xmltext" runat="server" TextMode="MultiLine" Columns="80" Rows="20" Wrap="false" CssClass="default"></asp:TextBox>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <asp:button runat="server" id="validatepackage" CssClass="normalButtons" text="Validate" OnClick="validatepackage_Click" />
                                                </td>
                                            </tr>
                                        </table>
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
