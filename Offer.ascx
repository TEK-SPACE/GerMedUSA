<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Offer.ascx.cs" Inherits="Offer" %>
<style type="text/css">
    .style1
    {
        width: 100%;
        float: left;
        border: 1px solid #c0c0c0;
        background-color: #b0e0e4;
    }
    .style2
    {
        width: 500px;
        height: 174px;
    }
    .style3
    {
        width: 32px;
    }
    .tdpadding
    {
        padding: [6][6][6][6];
    }
    .style4
    {
        width: 250px;
        height: 25px;
    }
</style>

<table cellpadding="0" cellspacing="0" class="style1">
    <tr>
        <td class="style3" rowspan="6">
            <img alt="Enter to Win" class="style2" longdesc="Monthly Luck Draw" 
                src="images/ETW.jpg" height="174px" width="450px" /></td>
        <td align="center" class="tdpadding" colspan="2">
            <img alt="Join to Win" class="style4" height="25px" 
                longdesc="Join to Win - GerMedUSA Contest" src="images/jtw.jpg" /></td>
    </tr>
    <tr>
        <td align="right" class="tdpadding">
            <asp:Label ID="lblFirstName" runat="server" Text="First Name :"></asp:Label>
        </td>
        <td height="30px" class="tdpadding">
            <asp:TextBox ID="txtFirstName" runat="server" Width="180px"></asp:TextBox>
            <asp:RequiredFieldValidator ID="rfvName" runat="server" 
                ControlToValidate="txtFirstName" ErrorMessage="Name is Required" 
                SetFocusOnError="True">*</asp:RequiredFieldValidator>
        </td>
    </tr>
    <tr>
        <td align="right" class="tdpadding">
            <asp:Label ID="lblLastName" runat="server" Text="Last Name :"></asp:Label>
        </td>
        <td height="30px" class="tdpadding">
            <asp:TextBox ID="txtLastName" runat="server" Width="180px"></asp:TextBox>
        </td>
    </tr>
    <tr>
        <td align="right" class="tdpadding">
            <asp:Label ID="lblEmail" runat="server" Text="Email :"></asp:Label>
        </td>
        <td height="30px" class="tdpadding">
            <asp:TextBox ID="txtEmail" runat="server" Width="180px"></asp:TextBox>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" 
                ControlToValidate="txtEmail" ErrorMessage="Email is Mandatory" 
                SetFocusOnError="True" 
                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" 
                Display="Dynamic">*</asp:RegularExpressionValidator>
            <asp:RequiredFieldValidator ID="rfvEmail" runat="server" 
                ErrorMessage="Email is Required" ControlToValidate="txtEmail" 
                Display="Dynamic">*</asp:RequiredFieldValidator>
            <asp:Label ID="lblEmailExists" runat="server" Font-Bold="True" 
                Font-Underline="False" ForeColor="Red"></asp:Label>
        </td>
    </tr>
    <tr>
        <td align="right" class="tdpadding">
            <asp:Label ID="lblInterestedIn" runat="server" Text="Interested In :"></asp:Label>
        </td>
        <td height="30px" class="tdpadding">
            <asp:DropDownList ID="ddCategory" runat="server" Width="189px">
            </asp:DropDownList>
        </td>
    </tr>
    <tr>
        <td class="tdpadding">
            &nbsp;</td>
        <td height="30px" class="tdpadding">
            <asp:Button ID="btnSubmit" runat="server" onclick="btnSubmit_Click" 
                Text="Submit" />
            <asp:Label ID="lblSucess" runat="server" Font-Bold="True" ForeColor="#003399"></asp:Label>
        </td>
    </tr>
    <tr>
    <td colspan='3' align="right">
<asp:Label ID="lblError" runat="server" Font-Bold="True" ForeColor="#CC0000"></asp:Label>

        </td>
    </tr>
</table>


