<%@ Page language="c#" Inherits="AspDotNetStorefront.rateit" CodeFile="rateit.aspx.cs" %>
<html>
<head>
    <title>Rate Product</title>
    <link id="cssref" runat="server" rel="stylesheet" type="text/css" />
</head>
<body class="rateitBG">
    <form runat="server" onsubmit="return FormValidator(this)">
            <table width="100%" cellpadding="5" cellspacing="0" border="0" class="rateittable">
                <tr>
                    <td align="center" valign="middle">
                        <asp:Label ID="rateit_aspx_3" runat="server" CssClass="rateitlabel"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="middle">
                        <asp:Label ID="rateit_aspx_4" runat="server" CssClass="rateitlabel" Visible="false"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table width="100%" cellpadding="6" cellspacing="0" border="0">
                            <tr>
                                <td width="10%"></td>
                                <td align="center" valign="top" class="rateitproductname"><asp:Label ID="lblProductName" runat="server"></asp:Label></td>
                                <td width="10%"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="middle"><asp:Label ID="rateit_aspx_5" runat="server" CssClass="rateitlabel"></asp:Label><br /></td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table width="100%" cellpadding="10" cellspacing="0" border="0">
                            <tr>
                                <td width="25%">
                                </td>
                                <td align="center" valign="top" class="rateitbox">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" valign="middle"><a href="javascript:void()" onclick="return newRatingEntered(1);"><asp:Image ID="Star1" width="30" height="30" hspace="2" runat="server" /></a></td>
                                            <td align="center" valign="middle"><a href="javascript:void()" onclick="return newRatingEntered(2);"><asp:Image ID="Star2" width="30" height="30" hspace="2" runat="server" /></a></td>
                                            <td align="center" valign="middle"><a href="javascript:void()" onclick="return newRatingEntered(3);"><asp:Image ID="Star3" width="30" height="30" hspace="2" runat="server" /></a></td>
                                            <td align="center" valign="middle"><a href="javascript:void()" onclick="return newRatingEntered(4);"><asp:Image ID="Star4" width="30" height="30" hspace="2" runat="server" /></a></td>
                                            <td align="center" valign="middle"><a href="javascript:void()" onclick="return newRatingEntered(5);"><asp:Image ID="Star5" width="30" height="30" hspace="2" runat="server" /></a></td>
                                        </tr>
                                    </table>
                                    <asp:DropDownList ID="rating" class="rateitddl" runat="server" onchange="newRatingEntered(this.value)"></asp:DropDownList><br />
                                    <asp:Label ID="rateit_aspx_12" runat="server" class="rateittext"></asp:Label>
                                </td>
                                <td width="25%">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="middle"><asp:Label ID="rateit_aspx_13" runat="server" CssClass="rateitlabel"></asp:Label></td>
                </tr>
                <tr>
                    <td align="center" valign="middle"><asp:TextBox ID="Comments" Columns="40" Rows="6" runat="server" TextMode="MultiLine" ></asp:TextBox></td>
                </tr>
                <tr>
                    <td valign="top" align="center"><asp:Button ID="btnSubmit" runat="server" />&nbsp;&nbsp;&nbsp;&nbsp;<asp:Button ID="btnCancel" CssClass="RateItButton" OnClientClick="javascript:self.close();" runat="server" /></td>
                </tr>
            </table>
        
    </form>
</body>
</html>