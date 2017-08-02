<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.recurringgatewaydetails" CodeFile="recurringgatewaydetails.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Recurring Subscription Gateway Details</title>
</head>

<body>
    <form id="frmRecurringDetails" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <div id="help">
        <div style="margin-bottom: 5px; margin-top: 5px;">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div id="content" style="margin-left: 5px">
        <asp:Panel ID="pnlInput" runat="server" Width="100%">
            Original Order Number
                <asp:TextBox ID="txtOrderNumber" runat="server"></asp:TextBox>
                <asp:Button ID="btnOrderNumber" runat="server" Text="Submit" OnClick="btnOrderNumber_Click" /><br />
            <br />
            Subscription ID
                <asp:TextBox ID="txtSubscriptionID" runat="server"></asp:TextBox>
                <asp:Button ID="btnSubscriptionID" runat="server" Text="Submit" OnClick="btnSubscriptionID_Click" /><br />
        </asp:Panel>
        <asp:Panel ID="pnlResults" runat="server" Width="100%">
            <br />
            <asp:Literal ID="ltResults" runat="server"></asp:Literal>
         </asp:Panel>
    </div>
    </form>
</body>
</html>