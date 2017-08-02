<%@ Page Language="C#" AutoEventWireup="true" CodeFile="rpt_custom.aspx.cs" Inherits="AspDotNetStorefrontAdmin.rpt_custom" Theme="default" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Run Custom Report</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<script type="JavaScript">
    function getDelete()
    {
        return 'Confirm Delete';
    }
</script>
<body>
    <form id="frmRptCustom" runat="server">
    <div id="help">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px">
	                    <table border="0" cellspacing="0" cellpadding="5" class="breadCrumb3">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Custom Report</td>
                                <td align="left" valign="middle"><b>View:</b></td>
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
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable" width="130">
                                    <font class="subTitle">Reports:</font></td>
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="titleTable">
                                    <font class="subTitle">Report Settings:</font></td>
                            </tr>
                            <tr>
                                <td class="contentTableNP" valign="top" width="130">
                                     <asp:DropDownList runat="server" ID="ddReports" AutoPostBack="true" OnSelectedIndexChanged="ddReports_SelectedIndexChanged">
                                                    </asp:DropDownList>                                                    
                                <td style="width: 5px;" />
                                <td style="width: 1px; background-color: #a2a2a2;" />
                                <td style="width: 5px;" />
                                <td class="contentTable" valign="top" width="*">
                                    <div class="wrapperLeft">
                                        &nbsp;
                                        <asp:Panel ID="Panel1" runat="server" Height="50px" Width="125px">
                                        </asp:Panel>
                                        &nbsp;</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
        <asp:Panel ID="ResultsPanel" runat="server" Height="100%" Visible="False" Width="100%">
            <asp:GridView ID="ResultsGrid" runat="server">
            </asp:GridView>
        </asp:Panel>
    </form>
</body>
</html>
