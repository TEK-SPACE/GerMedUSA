<%@ Page Language="C#" AutoEventWireup="true" CodeFile="editfeed.aspx.cs" Inherits="editfeed" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Create/Edit Feed</title>
    <script type="text/javascript" language="Javascript" src="jscripts/tooltip.js" ></script>
      <script type="text/javascript" language="Javascript">
          $window_addLoad(function() { { new ToolTip('imgFtpPwd', 'AdminSiteTooltip', '<font class=\"exampleText\">Leave blank only if the ftp server allows anonymous login</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgFtpUserName', 'AdminSiteTooltip', '<font class=\"exampleText\">Leave blank only if the ftp server allows anonymous login</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgFtpServer', 'AdminSiteTooltip', '<font class=\"exampleText\">e.g. ftp.feedsrus.com</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgFtpPort', 'AdminSiteTooltip', '<font class=\"exampleText\">The default FTP port is 21</font>'); } })
          $window_addLoad(function() { { new ToolTip('imgFtpFileName', 'AdminSiteTooltip', '<font class=\"exampleText\">Include full remote path here if required, as specified by your feed provider manual, e.g. /uploaddirectory/myaccount/feedfilename.txt</font>'); } })
  </script>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
        <div id="">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
                  <tr>
                    <td align="left" valign="middle" style="height: 36px">
	                        <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                                <tr>
                                    <td align="left" valign="middle">Now In:</td>
                                    <td align="left" valign="middle">Create / Edit Product Feed</td>
                                    <td align="left" valign="middle">View:</td>
                                    <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                                </tr>
                            </table>
	                </td>
                  </tr>
            </table>
            <div style="margin-bottom: 5px; margin-top: 5px;">
                <asp:Literal ID="ltError" runat="server"></asp:Literal>
            </div>
        </div>        
        <p>
            <b>Please refer to your feed provider manual for the correct values for all fields entered.<br />Fields marked with an "*" are required.</b>
        </p>        
        <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Product Feeds:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapperLeft">
                                        <table>
                                            <tr>
                                                <td><asp:Label ID="Label1" Font-Bold="true" Text="Editing Feed:" runat="server"></asp:Label>&nbsp;<asp:Label ID="pageheading" Font-Bold="true" ForeColor="blue" runat="server"></asp:Label></td>
                                            </tr>
                                        </table>
                                        <br />
                                        <table>
                                            <tr>
                                                <td><font class="subTitleSmall">*Feed Name:</font></td>
                                                <td>
                                                    <asp:TextBox ID="txtFeedName" Columns="30" MaxLength="100" runat="server" CausesValidation="true"></asp:TextBox>
                                                    <asp:RequiredFieldValidator ID="reqFeedName" ControlToValidate="txtFeedName" Display="Dynamic" EnableClientScript="true" ErrorMessage="Please enter the feed name" runat="server">!!</asp:RequiredFieldValidator>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">*XmlPackage:</font></td>
                                                <td>
                                                    <asp:DropDownList ID="XmlPackage" runat="server" CausesValidation="true"><asp:ListItem Text="Select a package" Value="" Selected="True"></asp:ListItem></asp:DropDownList>
                                                    <asp:CustomValidator ID="reqXmlPackage" runat="server" Display="Dynamic" OnServerValidate="ValidateXmlPackage" ErrorMessage="Please select an XmlPackage"></asp:CustomValidator>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">Auto FTP:</font></td>
                                                <td><asp:RadioButtonList ID="CanAutoFtp" runat="server" RepeatDirection="Horizontal"><asp:ListItem Text="Yes" Value="1" Selected="True"></asp:ListItem><asp:ListItem Text="No" Value="0"></asp:ListItem></asp:RadioButtonList></td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">FTP Username:</font></td>
                                                <td><asp:TextBox ID="txtFtpUserName" Columns="30" MaxLength="100" runat="server"></asp:TextBox>
                                                    <img id="imgFtpUserName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" /></td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">FTP Password:</font></td>
                                                <td><asp:TextBox ID="txtFtpPwd" Columns="30" MaxLength="100" runat="server"></asp:TextBox>
                                                    <img id="imgFtpPwd" src="skins/skin_1/images/info.gif" border="0" href="javascript:void(0);" style="cursor: normal;" /></td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">FTP Server:</font></td>
                                                <td>
                                                    <asp:TextBox ID="txtFtpServer" Columns="30" MaxLength="100" runat="server" CausesValidation="true"></asp:TextBox> 
                                                    <img id="imgFtpServer" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">FTP Port:</font></td>
                                                <td><asp:TextBox ID="txtFtpPort" Columns="30" MaxLength="5" Text="21" runat="server"></asp:TextBox>                                                    
                                                    <img id="imgFtpPort" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                    <asp:CustomValidator ID="PortIsNumber" Display="Dynamic" OnServerValidate="ValidatePort" runat="server" ErrorMessage="The port number must be a value between 1 and 65535"></asp:CustomValidator>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><font class="subTitleSmall">FTP Filename:</font></td>
                                                <td>
                                                    <asp:TextBox ID="txtFtpFileName" Columns="30" MaxLength="1000" runat="server" CausesValidation="true"></asp:TextBox> 
                                                    <img id="imgFtpFileName" src="skins/skin_1/images/info.gif" border="0"  href="javascript:void(0);" style="cursor: normal;" />
                                                </td>
                                            </tr>
                                        </table>
                                        <br /><br />
                                        <asp:Button ID="btnSubmit" runat="server" Text="Create Feed" CssClass="normalButtons" OnClick="btnSubmit_OnClick" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <asp:Button ID="btnExecFeed" runat="server" Text="Execute Feed" CssClass="normalButtons" OnClick="btnExecFeed_OnClick" /><br /><br />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
