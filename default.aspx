<%@ Page Language="c#" Inherits="AspDotNetStorefront._default" CodeFile="default.aspx.cs" %>
<%@ Register TagPrefix="aspdnsf" TagName="XmlPackage" src="XmlPackageControl.ascx" %>
<%@ Register src="Offer.ascx" tagname="Offer" tagprefix="uc1" %>
<html>
<head>
    <style type="text/css">
        #form1
        {
            height: 206px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <uc1:Offer ID="Offer" runat="server" />
    <br />
    <aspdnsf:XmlPackage id="Package1" PackageName="page.default.xml.config" runat="server" EnforceDisclaimer="true" EnforcePassword="true" EnforceSubscription="True" AllowSEPropogation="True"/>
    
    </form>
</body>
</html>
