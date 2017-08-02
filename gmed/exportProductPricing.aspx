<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.exportProductPricing" CodeFile="exportProductPricing.aspx.cs" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Export Product Pricing</title>
   
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmExportProductPricing" runat="server" enctype="multipart/form-data" method="post">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">
                                    <asp:Label ID="lblBreadcumb" runat="server" Text="(!admin.common.ExportProductPricing!)"></asp:Label></td>
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
                                    <font class="subTitle">Export Prices:</font>
                                </td>
                            </tr>
                        
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapper">
                                        <div id="divMain" runat="server">
                                            <span class="subTitleSmall">Filter by Category:</span>
                                            <br /><asp:DropDownList ID="ddCategory" runat="server"></asp:DropDownList>
                                            <br />
                                            <span class="subTitleSmall">
                                                <br />
                                                Filter by Section:</span>
                                            <br /><asp:DropDownList ID="ddSection" runat="server"></asp:DropDownList>
                                            <br />
                                            <span class="subTitleSmall">
                                                <br />
                                                Filter by Manufacturer:</span>
                                            <br /><asp:DropDownList ID="ddManufacturer" runat="server"></asp:DropDownList>
                                            <div id="divDistributor" runat="server">
                                                <span class="subTitleSmall">
                                                    <br />
                                                    Filter by Distributor:</span>
                                                <br /><asp:DropDownList ID="ddDistributor" runat="server"></asp:DropDownList>
                                            </div>
                                            <div id="divGenre" runat="server">
                                                <span class="subTitleSmall">
                                                    <br />
                                                    Filter by Genre:</span>
                                                <br /><asp:DropDownList ID="ddGenre" runat="server"></asp:DropDownList>
                                            </div>
                                            <div id="divVector" runat="server">
                                                <span class="subTitleSmall">
                                                    <br />
                                                    Filter by Vector:</span>
                                                <br /><asp:DropDownList ID="ddVector" runat="server"></asp:DropDownList>
                                            </div>
                                            <br />
                                            <br />
                                            <span class="subTitleSmall">Select Export Format:</span>
                                            <br />
                                            <asp:RadioButtonList ID="rblExport" runat="server">
                                                <asp:ListItem Value="xls" Text="Excel (xls)" Selected="true"></asp:ListItem>
                                                <asp:ListItem Value="xml" Text="XML"></asp:ListItem>
                                                <asp:ListItem Value="csv" Text="Comma Delimited (csv)"></asp:ListItem>
                                            </asp:RadioButtonList>
                                            <br />
                                            <br />
                                            <asp:Button ID="btnUpload" runat="server" CssClass="normalButtons" Text="Submit" OnClick="btnUpload_Click" />
                                        </div>
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
