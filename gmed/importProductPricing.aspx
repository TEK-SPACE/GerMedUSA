<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.importProductPricing" CodeFile="importProductPricing.aspx.cs" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Export Product Pricing</title>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmImportProductPricing" runat="server" enctype="multipart/form-data" method="post">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">
                                    <asp:Label ID="lblbreadcrumb" runat="server" Text="Import Product Pricing from Excel/XML"></asp:Label></td>
                                <td align="left" valign="middle"><b>View:</b></td>
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
                                    <font class="subTitle">Import Prices:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <div id="divMain" runat="server">
                                            <span class="subTitleSmall">Select a File to Import:</span>
                                            <br />
                                            <asp:FileUpload CssClass="fileUpload" ID="fuFile" runat="server" />
                                            <br />
                                            <br />
                                            <asp:Button ID="btnUpload" runat="server" Text="Submit" OnClick="btnUpload_Click" CssClass="normalButtons" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr runat="server" id="trResults">
                                <td class="titleTable">
                                    <font class="subTitle">Import Prices Result:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <asp:Literal ID="ltResult" runat="server"></asp:Literal>
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
