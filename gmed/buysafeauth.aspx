<%@ Page Language="C#" AutoEventWireup="true" CodeFile="buysafeauth.aspx.cs" Inherits="AspDotNetStorefrontAdmin.buysafeauth" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- COMPUNIX -->

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>buySAFE Authentication</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>

<form id="form1" runat="server" >

    <table border="0" width="100%" align="center" cellpadding="0" cellspacing="0">
      <tr  class="tablenormal">
       <td align="left" valign="middle">        
        <strong>buySAFE Authentication</strong><br />
        </td>
        </tr>
        <tr>
        <td   bgcolor="#eeeeee">
       <table border="0" width="100%" cellpadding="5" cellspacing="0">
            <tr>
                <td style="width:20%"><strong>Store Name:</strong></td>
                <td><asp:TextBox ID="txtStoreName" runat="server" Width="30%" Height="25px" ReadOnly="true"></asp:TextBox></td>
            </tr>
            <tr>
                <td style="width:20%"><strong>Seal Authentication Data:</strong></td>
                <td><asp:TextBox ID="txtSealData" runat="server" Height="40px" Width="95%" TextMode="MultiLine"></asp:TextBox></td>
            </tr>
            <tr>
                <td style="width:20%"><strong>Store Authentication data:</strong></td>
                <td><asp:TextBox ID="txtStoreData" runat="server" Width="60%" Height="25px"></asp:TextBox></td>
            </tr>
            <tr>
                <td colspan="2">
                    <strong>
                buySAFE Connection Status:</strong>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                  <table border="0" cellpadding="0" width="100%">
                    <tr>
                      <td>
                        <asp:Button CssClass="normalButtons" ID="Button1" runat="server" Text="Test authentication" OnClick="Button1_Click" OnClientClick="Button1.disabled=true;Label1.innerHTML='';" UseSubmitBehavior="false" /><br />
                        <br />
                        <table border="0" width="100%">
                          <tr>
                            <td style="width:15%">
                               <span style="color: #7f8689">Authentication status:</span>
                            </td>
                            <td>
                               <asp:Label ID="Label1" runat="server"></asp:Label>
                            </td>
                          </tr>
                        </table>
                        <br />
                        <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="" ForeColor="#C00000" Font-Underline="true">login to buySAFE</asp:HyperLink>
                      </td>
                    </tr>
                  </table>
                </td>
            </tr>
        </table>
        
       </td>
      </tr>
    </table>
    
</form>
    <div runat="server" id="divError" style="text-align:center;">
        <asp:Literal runat="server" ID="ltError" Visible="False"></asp:Literal>
    </div>
</body>
</html>
