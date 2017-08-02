<%@ Page Language="C#" ClientTarget="UpLevel" CodeFile="FreeTrial.aspx.cs" Inherits="AspDotNetStorefront.FreeTrail" %>

<%@ Register assembly="TimePicker" namespace="MKB.TimePicker" tagprefix="MKB" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .style1
        {
            width: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h4>Please provide below required information to process your Free Trial.</h4>
    <hr />
        <table class="style1" cellpadding="3">
            <tr>
                <td align="right">
                    First
                    Name:</td>
                <td>
                    <asp:TextBox ID="txtFirstName" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvFirstName" runat="server" 
                        ControlToValidate="txtFirstName" Display="Dynamic" ErrorMessage="Required"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Last Name:</td>
                <td>
                    <asp:TextBox ID="txtLastName" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvLastName" runat="server" 
                        ControlToValidate="txtLastName" Display="Dynamic" ErrorMessage="Required"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Address:</td>
                <td>
                    <asp:TextBox ID="txtAddress" runat="server" TextMode="MultiLine"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Email:</td>
                <td>
                    <asp:TextBox ID="txtEmail" runat="server"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="revEmail" runat="server" 
                        ControlToValidate="txtEmail" Display="Dynamic" 
                        ErrorMessage="Invalid Email" 
                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                    <asp:RequiredFieldValidator ID="rfvEmail" runat="server" 
                        ControlToValidate="txtEmail" Display="Dynamic" ErrorMessage="Email Required"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Contact Number:</td>
                <td>
                    
                    <asp:TextBox ID="txtPhone" runat="server"></asp:TextBox><asp:Label ID="Label1" 
                        runat="server" Text="  xxx-xxx-xxxx   " ForeColor="#999999"></asp:Label>
                    <asp:RegularExpressionValidator ID="revPhone" runat="server" 
                        ControlToValidate="txtPhone" Display="Dynamic" 
                        ErrorMessage="Invalid Phone" 
                        ValidationExpression="((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}"></asp:RegularExpressionValidator>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Best Time to Reach:</td>
                <td>
                    <%--<asp:TextBox ID="txtTimeToReach0" runat="server" Visible="False"></asp:TextBox>--%>
                    <asp:ScriptManager ID="ScriptManager1" runat="server">
                    </asp:ScriptManager>
                    <MKB:TimeSelector ID="txtTimeToReach" runat="server">
                    </MKB:TimeSelector>
                </td>
            </tr>
            <tr>
                <td align="right">
                    Comments:</td>
                <td>
                    <asp:TextBox ID="txtComments" runat="server" TextMode="MultiLine"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td align="right">
                    &nbsp;</td>
                <td>
                    <asp:Button ID="btnSubmit" runat="server" onclick="btnSubmit_Click" 
                        Text="Submit" />
                    <asp:Label ID="lblMessage" runat="server" Font-Bold="True" ForeColor="#99CC00"></asp:Label>
                </td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
