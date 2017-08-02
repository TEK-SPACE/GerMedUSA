<%@ Control Language="c#" AutoEventWireup="false" Inherits="AspDotNetStorefront.TemplateBase" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<html>
<head>
<title>(!SITENAME!) - Site Administration</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="skins/Skin_(!SKINID!)/style.css" type="text/css">
</head>
<body rightmargin="4" leftmargin="4" topmargin="4" marginwidth="4" marginheight="4" bgcolor="#ffffff">
<!-- PAGE INVOCATION: '(!INVOCATION!)' -->
<!-- PAGE REFERRER: '(!REFERRER!)' -->
<!-- CUSTOMER ID: '(!CUSTOMERID!)' -->
<!-- STORE LOCALE: '(!STORELOCALE!)' -->
<!-- CUSTOMER LOCALE: '(!CUSTOMERLOCALE!)' -->
<script type="text/javascript" src="jscripts/formValidate.js"></script>
<table class="toppage" width="100%" cellspacing="0" cellpadding="0" border="0">
<tbody>
<tr>
<td valign="middle" align="left" style="height: 36px;">
<table class="breadCrumb3" cellspacing="0" cellpadding="5" border="0">
<tbody>
<tr>
<td valign="middle" align="left">Now In:</td>
<td valign="middle" align="left">(!SECTION_TITLE!)</td>
<td valign="middle" align="left">View:</td>
<td valign="middle" align="left"><a href="sitemap2.aspx">Site Map</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<asp:placeholder id="PageContent" runat="server"></asp:placeholder>
</body>
</html>
