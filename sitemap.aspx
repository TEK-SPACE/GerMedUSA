<%@ Page Language="c#" Inherits="AspDotNetStorefront.sitemap" CodeFile="sitemap.aspx.cs" %>
<%@ Register TagPrefix="aspdnsf" TagName="XmlPackage" src="XmlPackageControl.ascx" %>
<html>
<head>
</head>
<body>
    <asp:Panel runat="server" ID="PackagePanel" Visible="True">
        
    </asp:Panel>
    <asp:Panel runat="server" ID="EntityPanel" Visible="False">
        <asp:Literal runat="Server" ID="Literal1" />
    </asp:Panel>
</body>
</html>
