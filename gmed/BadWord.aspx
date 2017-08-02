<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.BadWord" CodeFile="BadWord.aspx.cs" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>BadWord</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmBadWord" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <asp:Literal ID="ltError" runat="server"></asp:Literal>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Enter Bad Word Below:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapperTop">
                                        <asp:TextBox runat="Server" ID="txtWord" CssClass="default" Height="41px" Width="400px"></asp:TextBox>
                                        <br />
                                        <asp:Button runat="server" ID="btnSubmit" Text="Submit" CssClass="normalButtons" OnClick="btnSubmit_Click" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <asp:CheckBox ID="chkBoxNewComments" runat="server" Text="Only for New Comments" Checked="True" /></td>
            </tr>
        </table>
    </div>
    
    </form>
</body>
</html>
