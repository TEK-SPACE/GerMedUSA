<%@ Page Language="C#" AutoEventWireup="true" CodeFile="buysafereg2.aspx.cs" Inherits="AspDotNetStorefrontAdmin.buysafereg2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>BuySafe Registration</title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:Label ID="Label_Status" runat="server" Visible="False"></asp:Label>&nbsp;<br />
        <br />
        <asp:HiddenField ID="pfNamePrefix" runat="server" />
        <asp:HiddenField ID="pfFirstName" runat="server" />
        <asp:HiddenField ID="pfMiddleInitial" runat="server" />        
        <asp:HiddenField ID="pfLastName" runat="server" />
        <asp:HiddenField ID="pfNameSuffix" runat="server" />
        <asp:HiddenField ID="pfNameFull" runat="server" />
        <asp:HiddenField ID="pfInvitationCode" runat="server" />
        <asp:HiddenField ID="pfMspId" runat="server" />
        <asp:HiddenField ID="pfCompanyName" runat="server" />
        <asp:HiddenField ID="pfStoreName" runat="server" />
        <asp:HiddenField ID="pfStoreUrl" runat="server" />
        <asp:HiddenField ID="pfEmail" runat="server" />
        <asp:HiddenField ID="pfPhoneHFull" runat="server" />
        <asp:HiddenField ID="pfPhoneHArea" runat="server" />
        <asp:HiddenField ID="pfPhoneHRegion" runat="server" />
        <asp:HiddenField ID="pfPhoneHNumber" runat="server" />
        <asp:HiddenField ID="pfPhoneWFull" runat="server" />
        <asp:HiddenField ID="pfPhoneWArea" runat="server" />
        <asp:HiddenField ID="pfPhoneWRegion" runat="server" />
        <asp:HiddenField ID="pfPhoneWNumber" runat="server" />
        <asp:HiddenField ID="pfFaxFull" runat="server" />
        <asp:HiddenField ID="pfAddressW1" runat="server" />
        <asp:HiddenField ID="pfAddressW2" runat="server" />
        <asp:HiddenField ID="pfWCity" runat="server" />
        <asp:HiddenField ID="pfWState" runat="server" />
        <asp:HiddenField ID="pfWStateFull" runat="server" />
        <asp:HiddenField ID="pfWZip" runat="server" />
        <asp:HiddenField ID="pfWCountryCode" runat="server" />
        <asp:HiddenField ID="pfWCountry" runat="server" />
        <asp:HiddenField ID="pfHandlerURL" runat="server" />
        <asp:HiddenField ID="pfReturnPassCode" runat="server" />
    </form>
    
</body>
</html>
