<%@ Page Language="C#" AutoEventWireup="true" CodeFile="splash.aspx.cs" Inherits="AspDotNetStorefrontAdmin.splash" MaintainScrollPositionOnPostback="true" %>


<%@ Register Assembly="ASPDNSFRadWrapper" Namespace="ASPDNSF_RadWrapper" TagPrefix="rcw" %>
<%@ Register Assembly="ASPDNSFRadWrapper" Namespace="Telerik.Charting" TagPrefix="rcw" %>


<%@ Register TagPrefix="aspdnsf" TagName="XmlPackage" src="XmlPackageControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" issticky="true">
<head id="Head1" runat="server">
    <title>Home Page</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" language="javascript" src="jscripts/splash.js"></script>
</head>
<body>
    <form id="frmSplash" runat="server">
        <div>
           <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
            <tr>
                <td id="colLeft" align="center" valign="top" class="splash_LeftPaneBgColor" runat="server">
                
                <input type="hidden" runat="server" id="colLeft_Visible" name="colLeft_Visible" value="1" />
                    
                    <%-- BREADCRUMB --%>                    
                    
                            
                    <div class=" splash_Breadcrumb">
                        <img  id="imgHideLeftPanel"  runat="server"
                            style="float:right;padding-right:10px;" 
                            src="skins/skin_1/images/splash_hideLeft.jpg" 
                            hover="skins/skin_1/images/splash_hideLeft_hover.jpg" 
                            class="splash_ImageButton" />
                            
                        Now in : HOME | View : <a href="sitemap2.aspx" style="color: #5AD3FF">Site Map</a>                                          
                    </div>  
                    
                    <div class="splash_Breadcrumb" id="divLtError" runat="server" visible = "false">
                        <asp:Literal ID="ltError" runat="server"></asp:Literal>
                    </div>
                    
                    <%-- END BREADCRUMB --%>
                    
                    
                    
                    <%-- LEFT MENU SPACER--%>          
                    <div class="splash_LeftMenuSpacer"></div> 
                    <%-- END LEFT MENU SPACER--%>
                    
                    
                    <%-- COMMONLINKS --%>
                    <asp:Panel ID="pnlCommonLinks" runat="server">                
                        <div id="" class="splash_GroupHeader">
                            <table style="width: 100%; height:100%; border: 0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <%--<td style="width:10px; padding-left: 10px"></td>--%>
                                    <td style="width: 330px; text-align: center">Common Links</td>
                                </tr>                                       
                            </table>
                        </div>
                        <div class="splash_commonLinksBody">
                                <table style="width:100%" >
                                    <tr>
                                        <td >
                                            <ul id="splash_linksMenu">
                                                <li runat="server" id="ChangeEncryptKeyReminder" visible="false"><a href="changeencryptkey.aspx"><font color="red"><b>Time To Change Your Encrypt Key!</b></font></a></li>
                                                <li runat="server" id="WizardPrompt"><a href="wizard.aspx">Run Configuration Wizard</a></li>
                                                <li runat="server" id="MonthlyMaintenancePrompt" visible="true"><a href="monthlymaintenance.aspx">Run Monthly Maintenance</a></li>
                                                <li><a href="orders.aspx">View/Manage Orders</a></li>
                                                <li><a href="entityframe.aspx">View/Manage Products</a></li>
                                                <li><a href="customers.aspx">View/Manage Customers</a></li>
                                                <li><a href="appconfig.aspx">View/Edit AppConfigs</a></li>
                                                <li><a href="appconfig.aspx?searchfor=mail">E-Mail Settings</a></li>
                                                <li><asp:HyperLink ID="lnkGateway" runat="server" Text="Gateway Settings"></asp:HyperLink><asp:LinkButton ID="lnkSSL" runat="Server" OnClick="lnkSSL_Click" Enabled="false" Visible="false"/></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>                    
                             </div>
                    </asp:Panel>
                    <%-- END COMMONLINKS --%>
                    
                    
                    
                    <%-- LEFT MENU SPACER--%>                     
                    <div class="splash_LeftMenuSpacer"></div> 
                    <%-- END LEFT MENU SPACER--%>
                    
                    
                    <%-- SYSTEM INFORMATION --%>
                    <div> 
                        <div class="splash_GroupHeader">
                            <table style="width: 100%; height:100%; border: 0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <%--<td style="width:10px; padding-left: 10px"></td>--%>
                                    <td style="width: 330px; text-align: center">System Information</td>
                                </tr>                                       
                            </table>
                        </div>
                        <div class="splash_sysInfoBody">
                            <table width="100%" cellpadding="1" cellspacing="1" border="0">
                                <tr><td width="180" align="right" valign="top"><font class="subTitleSmall">Version (Code/DB):</font></td><td valign="top"><asp:Literal ID="ltStoreVersion" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right"><font class="subTitleSmall">Current Server Date/Time:</font></td><td><asp:Literal ID="ltDateTime" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Execution Mode:</font></td><td><asp:Literal ID="ltExecutionMode" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">
                                UseSSL:</font></td><td><asp:Literal ID="ltUseSSL" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">On Live Server:</font></td><td><asp:Literal ID="ltOnLiveServer" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Is Secure Connection:</font></td><td><asp:Literal ID="ltServerPortSecure" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Caching Is:</font></td><td>
                                    <asp:LinkButton ID="lnkCacheSwitch" runat="server" 
                                        onclick="lnkCacheSwitch_Click">LinkButton</asp:LinkButton></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Primary Store Locale Setting:</font></td><td><asp:Literal ID="ltWebConfigLocaleSetting" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">SQL Locale Setting:</font></td><td><asp:Literal ID="ltSQLLocaleSetting" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Customer Locale Setting:</font></td><td><asp:Literal ID="ltCustomerLocaleSetting" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Primary Store Currency:</font></td><td><asp:Literal ID="PrimaryCurrency" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Payment Gateway:</font></td><td><asp:Literal ID="ltPaymentGateway" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Gateway Mode:</font></td><td><asp:Literal ID="ltUseLiveTransactions" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Transaction Mode:</font></td><td><asp:Literal ID="ltTransactionMode" runat="server"></asp:Literal></td></tr>
                                <tr><td align="right" style="white-space:nowrap" valign="top"><font class="subTitleSmall">Payment Methods:</font></td><td><asp:Literal ID="ltPaymentMethods" runat="server"></asp:Literal></td></tr>
                                <tr id="trMicropay" runat="server"><td align="right" style="white-space:nowrap"><font class="subTitleSmall">MicroPay Enabled:</font></td><td><asp:Literal ID="ltMicroPayEnabled" runat="server"></asp:Literal></td></tr>
                                <tr id="trCardinal" runat="server"><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Cardinal Enabled:</font></td><td><asp:Literal ID="CardinalEnabled" runat="server"></asp:Literal></td></tr>
                                <tr id="trStoreCC" runat="server"><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Store Credit Cards:</font></td><td><asp:Literal ID="StoreCC" runat="server"></asp:Literal></td></tr>
                                <tr id="trGatewayRec" runat="server"><td align="right" style="white-space:nowrap"><font class="subTitleSmall">Using Gateway Recurring Billing:</font></td><td><asp:Literal ID="GatewayRecurringBilling" runat="server"></asp:Literal></td></tr>
                            </table>                    
                         </div>
                    </div>
                    <%-- END SYSTEM INFORMATION --%>
                    
                    
                    
                    <%-- LEFT MENU SPACER--%>                    
                    <div class="splash_LeftMenuSpacer"></div> 
                    <%-- END LEFT MENU SPACER--%> 
                    

                     <%-- SECURITY ALERT --%>
                        <div id="Div1" class="splash_GroupHeader" runat="server">
                            <table style="width: 100%; height:100%; border: 0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <%--<td style="width:10px; padding-left: 10px"></td>--%>
                                    <td style="width: 330px; text-align: center">Security Alert</td>
                                </tr>                                       
                            </table>
                        </div>                           
                        <div id="divSecurityAlert"  class="splash_securityAlert" runat="server" >                           
                            <asp:Panel ID="pnlSecurityFeed" runat="server" Visible="true">   
                                <aspdnsf:XmlPackage id="SecurityFeed" runat="server" PackageName="rss.aspdnsfrssconsumer.xml.config" RunTimeParams="channel=security&height=400&width=330"/>
                            </asp:Panel>                                     
                        </div>                                                               
                    <%-- END SECURITY ALERT --%>
                    
                    
                    
                </td>
                <td id="colMain" valign="top" class="splash_RightPaneBgColor">
                
                    <div id="pnlShowLeftPanel" runat="server" style="float:left;display:none;">
                        <img id="imgShowLeftPanel"  runat="server"
                            src="skins/skin_1/images/splash_showLeft.jpg" 
                            hover="skins/skin_1/images/splash_showLeft_hover.jpg" 
                            class="splash_ImageButton" />
                    </div>
                    
                    <%--SECURITY AUDIT RESULTS--%>
                    <div id="divSecurityAudit" runat="server">
                        <div style="padding-left: 30px; padding-top : 20px">
                            <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="splash_securityAuditTitleHeadIcon"></td>
                                    <td>
                                        <div style="height: 10px"></div>
                                        <div style="float: left; width : 24px; height: 24px;">
                                        <img id="imgMinimize_SecurityAudit" runat="server"  class="splash_ImageButton"
                                                src="skins/skin_1/images/icon_minimize.jpg" 
                                                min="skins/skin_1/images/icon_minimize.jpg" 
                                                min_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                                restore="skins/skin_1/images/icon_restore.jpg"
                                                restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                        </div>
                                        <div class="splash_groupsTitleHead">                                                                                        
                                            Security Audit
                                        </div>    
                                    </td>                               
                                </tr>
                            </table>
                        </div>
                        
                        <input type="hidden" runat="server" id="divSecurityAudit_Content_Visible" name="divSecurityAudit_Content_Visible" value="1" />
                        
                        <div id="divSecurityAudit_Content" class="splash_divSecurityAudit" runat="server" >                    
                            <asp:Panel ID="pnlAudit" runat="server">                        
                                <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                                    <tr>
                                        <td class="splash_contentSecurityaudit">                                           
                                            <asp:Literal ID="ltAuditResults" runat="server"></asp:Literal>&nbsp;<br />                                                        
                                        </td>
                                    </tr>
                                </table>                                                        
                            </asp:Panel>                    
                        </div>                    
                    </div>
                    
                    <%--END SECURITY AUDIT RESULTS--%>
                    
                    <%-- STATISTICS --%>
                    <div id="divStats" runat="server" style="padding-left: 30px; padding-top : 20px">
                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="splash_StatisticsTitleHeadIcon"></td>
                                <td>
                                    <div style="height: 10px"></div>
                                    <div style="float: left; width : 24px; height: 24px">
                                        <img id="imgMinimize_Statistics" runat="server"  class="splash_ImageButton"
                                            src="skins/skin_1/images/icon_minimize.jpg" 
                                            min="skins/skin_1/images/icon_minimize.jpg" 
                                            min_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                            restore="skins/skin_1/images/icon_restore.jpg"
                                            restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                    </div>
                                    <div class="splash_groupsTitleHead">                                                                                
                                        Statistics
                                    </div>                                  
                                </td>
                            </tr>
                        </table>
                        
                        <input type="hidden" runat="server" id="divStatistics_Content_Visible" name="divStatistics_Content_Visible" value="1" />
                        <div id="divStatistics_Content" runat="server" >
                        
                        <table id="chartsHead" class="" border="0" cellpadding="1" cellspacing="0" width="100%" runat="server"><%--outerTable--%>
                            <tr> 
                                <td style="padding-left: 50px; padding-right: 60px">
                                    <asp:LinkButton CssClass="splash_SwitchButton" ID="linkbtnSwitchView" 
                                        runat="server" OnClick="linkbtnSwitchView_Click" Font-Underline="True">LinkButton</asp:LinkButton>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 5px">
                                    </td>
                            </tr>
                        </table>
                        <table id="StatsTable" runat="server" border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">                        
                            <tr>
                                <td style="padding-left: 50px; padding-right: 60px">
                                  <%--  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td class="contentTable" width="100%">--%>
                                                <div style="margin-bottom: 0px; text-align:left; margin-right: 2px;">
                                                    <table style="width: 100%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="width: 100%">
                                    <asp:GridView ID="gridCustomerStats" runat="server" AutoGenerateColumns="False" Width="100%" GridLines="None" ShowFooter="True" CellPadding="0">
                            <Columns>
                                <asp:TemplateField>
                                    <HeaderStyle Width="1%" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Customer Statistic">
                                    <ItemTemplate>                                                            
                                        <%# DataBinder.Eval(Container.DataItem, "CustomerType") %>                                                                                                                  
                                    </ItemTemplate>
                                    <HeaderStyle Width="23%" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Today">
                                    <ItemTemplate>
                                       <%# DataBinder.Eval(Container.DataItem, "Today") %>
                                    </ItemTemplate>
                                    <ItemStyle HorizontalAlign="Right" />
                                    <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="This Week">
                                 <ItemTemplate>
                                       <%# DataBinder.Eval(Container.DataItem, "ThisWeek") %>
                                    </ItemTemplate>
                                    <ItemStyle HorizontalAlign="Right" />
                                    <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False" />
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="This Month">
                                 <ItemTemplate>
                                       <%# DataBinder.Eval(Container.DataItem, "ThisMonth") %>
                                    </ItemTemplate>
                                    <ItemStyle HorizontalAlign="Right" />
                                    <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                </asp:TemplateField>
                                
                                <asp:TemplateField HeaderText="This Year">
                                 <ItemTemplate>
                                       <%# DataBinder.Eval(Container.DataItem, "ThisYear") %>
                                    </ItemTemplate>
                                    <ItemStyle HorizontalAlign="Right" />
                                    <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="All Time">
                                 <ItemTemplate>
                                       <%# DataBinder.Eval(Container.DataItem, "AllTime") %>
                                    </ItemTemplate>
                                    <ItemStyle HorizontalAlign="Right" />
                                    <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                </asp:TemplateField>
                                <asp:TemplateField>
                                    <HeaderStyle Width="1%" />
                                </asp:TemplateField>
                            </Columns>
                            <FooterStyle CssClass="gridFooter" />
                            <RowStyle CssClass="gridRow" />
                            <HeaderStyle CssClass="gridHeader" />
                            <AlternatingRowStyle CssClass="gridAlternatingRow" />
                        </asp:GridView>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; height: 21px;">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                    <asp:GridView ID="gridAuthorized" runat="server" AutoGenerateColumns="False" Width="100%" GridLines="None" ShowFooter="True" CellPadding="0">
                                                                <Columns>
                                                                    <asp:TemplateField>
                                                                        <HeaderStyle Width="1%" />
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="Orders : AUTHORIZED State">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "OrderSummaryName")%>
                                                                        </ItemTemplate>
                                                                        <HeaderStyle Width="23%" />
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="Today">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "Today") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Week">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisWeek") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Month">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisMonth") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Year">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisYear") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="All Time">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "AllTime") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField>
                                                                        <HeaderStyle Width="1%" />
                                                                    </asp:TemplateField>
                                                                </Columns>
                                                                <RowStyle CssClass="gridRow" />
                                                                <HeaderStyle CssClass="gridHeader" />
                                                                <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                                                <FooterStyle CssClass="gridFooter" />
                                                            </asp:GridView>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="height: 21px">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:GridView ID="gridCaptured" runat="server" AutoGenerateColumns="False" Width="100%" GridLines="None" ShowFooter="True" CellPadding="0">
                                                                    <Columns>
                                                                    <asp:TemplateField>
                                                                        <HeaderStyle Width="1%" />
                                                                    </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="Orders : CAPTURED State">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "OrderSummaryName")%>
                                                                            </ItemTemplate>
                                                                            <HeaderStyle Width="23%" />
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="Today">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "Today") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                            <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Week">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisWeek") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                            <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Month">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisMonth") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                            <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Year">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisYear") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                            <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="All Time">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "AllTime") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                            <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField>
                                                                            <HeaderStyle Width="1%" />
                                                                        </asp:TemplateField>
                                                                    </Columns>
                                                                    <RowStyle CssClass="gridRow" />
                                                                    <HeaderStyle CssClass="gridHeader" />
                                                                    <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                                                    <FooterStyle CssClass="gridFooter" />
                                                                </asp:GridView>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="height: 21px">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:GridView ID="gridVoided" runat="server" AutoGenerateColumns="False" Width="100%" GridLines="None" ShowFooter="True" CellPadding="0">
                                                                    <Columns>
                                                                        <asp:TemplateField>
                                                                            <HeaderStyle Width="1%" />
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="VOIDED">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "OrderSummaryName")%>
                                                                            </ItemTemplate>
                                                                            <HeaderStyle Width="23%" />
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="Today">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "Today") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Week">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisWeek") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Month">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisMonth") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="This Year">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "ThisYear") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField HeaderText="All Time">
                                                                        <ItemTemplate>
                                                                            <%# DataBinder.Eval(Container.DataItem, "AllTime") %>
                                                                        </ItemTemplate>
                                                                        <ItemStyle HorizontalAlign="Right" />
                                                                        <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                    </asp:TemplateField>
                                                                    <asp:TemplateField>
                                                                        <HeaderStyle Width="1%" />
                                                                    </asp:TemplateField>
                                                                    </Columns>
                                                                    <RowStyle CssClass="gridRow" />
                                                                    <HeaderStyle CssClass="gridHeader" />
                                                                    <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                                                    <FooterStyle CssClass="gridFooter" />
                                                                </asp:GridView>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="height: 15px">
                                                            </td>
                                                        </tr>                                                    
                                                    </table>
                                                </div>
                                        <%--    </td>
                                        </tr>                                    
                                    </table>--%>
                                                                <asp:GridView ID="gridRefunded" runat="server" AutoGenerateColumns="False" Width="100%" GridLines="None" ShowFooter="True" CellPadding="0">
                                                                    <Columns>
                                                                    <asp:TemplateField>
                                                                        <HeaderStyle Width="1%" />
                                                                    </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="Orders : REFUNDED State">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "OrderSummaryName")%>
                                                                            </ItemTemplate>
                                                                            <HeaderStyle Width="23%" />
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="Today">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "Today") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Week">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisWeek") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Month">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisMonth") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="This Year">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "ThisYear") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="All Time">
                                                                            <ItemTemplate>
                                                                                <%# DataBinder.Eval(Container.DataItem, "AllTime") %>
                                                                            </ItemTemplate>
                                                                            <ItemStyle HorizontalAlign="Right" />
                                                                <HeaderStyle HorizontalAlign="Right" Width="15%" Font-Bold="False"/>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField>
                                                                            <HeaderStyle Width="1%" />
                                                                        </asp:TemplateField>
                                                                    </Columns>
                                                                    <RowStyle CssClass="gridRow" />
                                                                    <HeaderStyle CssClass="gridHeader" />
                                                                    <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                                                    <FooterStyle CssClass="gridFooter" />
                                                                </asp:GridView>
                                    &nbsp;
                                </td>
                            </tr>
                        </table>
                               
                        <rcw:AjaxPanel ID="RadAjaxPanel1" runat="server" Width="100%" HorizontalAlign="NotSet" LoadingPanelID="AjaxLoadingPanel1" ScrollBars="None"> 
                         <table id="chartTable" style="width: 100%" runat="server" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                <td>    
                                   <%--<rad:RadAjaxPanel ID="RadAjaxPanel1" runat="server" Width="100%">--%>
                                        <table id="Table1" style="width: 100%" runat="server" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                            <td align="left" valign="middle" 
                                                        style="padding-top:0px; padding-left:10px; height: 43px;">                                
                                                <%--first rad ajax panel--%>
                                                <%--<rad:RadAjaxPanel ID="RadAjaxChartView" runat="server" Width= "100%">--%>
                                                    <div style="float: left; padding-top: 1px; padding-left : 30px">                                                  
                                                    <asp:RadioButtonList ID="rblStats" runat="server" AutoPostBack="True" RepeatDirection="Horizontal" OnSelectedIndexChanged="rblStats_SelectedIndexChanged" >
                                                        <asp:ListItem Selected="True">(!admin.charts.rbl.ViewStats!)</asp:ListItem>
                                                        <asp:ListItem>(!admin.charts.rbl.CompareStats!)</asp:ListItem>
                                                    </asp:RadioButtonList>
                                                    
                                                    </div>
                                               
                                                    <div id="divCompareStats" runat="server" style="float: left; padding-top: 5px">  
                                                    &nbsp; By :
                                                        <asp:DropDownList ID="ddCompareDateRange" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddCompareDateRange_SelectedIndexChanged">
                                                            <asp:ListItem Value="Year">(!admin.charts.compare.dateRange1!)</asp:ListItem>
                                                            <asp:ListItem Value="Month">(!admin.charts.compare.dateRange2!)</asp:ListItem>
                                                            <asp:ListItem Value="Week">(!admin.charts.compare.dateRange3!)</asp:ListItem>
                                                        </asp:DropDownList>
                                                    </div> 
                                                    <div style=" padding-top: 5px; padding-right:20px; text-align: right;">
                                                        <asp:Label ID="lblchartsType" runat="server" Text="(!admin.charts.chartType.Label!)"></asp:Label>
                                                        <asp:DropDownList ID="ddChartType" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddChartType_SelectedIndexChanged">
                                                            <asp:ListItem Value="Bar Graph">(!admin.charts.chartType.Bar!)</asp:ListItem>
                                                            <asp:ListItem Value="Line Graph">(!admin.charts.chartType.Line!)</asp:ListItem>
                                                        </asp:DropDownList></div>
                                                <%--</rad:RadAjaxPanel>--%>
                                                <%--end first rad ajax panel--%>
                                            </td>
                                        </tr>
                                                <tr id="divViewStats" runat="server">
                                                    <td align="left" valign="middle" 
                                                        style="padding-top: 10px; padding-bottom:10px; padding-left: 50px">                                
                                                            <asp:Label ID="lblDateRangeOption" runat="server" Text="(!admin.charts.dateRange.optionText!)"></asp:Label>
                                                            <asp:DropDownList ID="ddOrdersDateRange" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddOrdersDateRange_SelectedIndexChanged">
                                                                <asp:ListItem Value="Today">(!admin.charts.dateRange.Today!)</asp:ListItem>
                                                                <asp:ListItem Value="Yesterday">(!admin.charts.dateRange.Yesterday!)</asp:ListItem>
                                                                <asp:ListItem Value="ThisWeek">(!admin.charts.dateRange.ThisWeek!)</asp:ListItem>
                                                                <asp:ListItem Value="LastWeek">(!admin.charts.dateRange.LastWeek!)</asp:ListItem>
                                                                <asp:ListItem Value="ThisMonth">(!admin.charts.dateRange.ThisMonth!)</asp:ListItem>
                                                                <asp:ListItem Value="LastMonth">(!admin.charts.dateRange.LastMonth!)</asp:ListItem>
                                                                <asp:ListItem Value="ThisYear">(!admin.charts.dateRange.ThisYear!)</asp:ListItem>
                                                                <asp:ListItem Value="LastYear">(!admin.charts.dateRange.LastYear!)</asp:ListItem>
                                                                <asp:ListItem Value="AllTime">(!admin.charts.dateRange.AllTime!)</asp:ListItem>
                                                            </asp:DropDownList>
                                                    </td>
                                                </tr>                       
                                                <tr id="PanelCompareMonth" runat="server">
                                                    <td align="left" valign="middle" 
                                                        style="padding-top: 10px; padding-bottom:10px; padding-left: 50px">
                                                            <asp:DropDownList ID="ddMonthCompareM" runat="server">
                                                            </asp:DropDownList>
                                                            <asp:DropDownList ID="ddMonthCompareY" runat="server">
                                                            </asp:DropDownList>
                                                        <asp:Label ID="lblComparedTo1" runat="server" Text="(!admin.charts.compareTo!)"></asp:Label>
                                                            <asp:DropDownList ID="ddMonthCompareM2" runat="server">
                                                            </asp:DropDownList>
                                                            <asp:DropDownList ID="ddMonthCompareY2" runat="server">
                                                            </asp:DropDownList>
                                                    </td>
                                                </tr>
                                                <tr id="PanelCompareYear" runat="server" style="padding-top: 10px; padding-bottom:10px; padding-left: 15px">
                                                    <td align="left" valign="middle" 
                                                        style="padding-top: 10px; padding-bottom:10px; padding-left: 50px">                                                
                                                            <asp:DropDownList ID="ddYearCompareY" runat="server">
                                                            </asp:DropDownList>
                                                            <asp:Label ID="lblComparedTo2" runat="server" Text="(!admin.charts.compareTo!)"></asp:Label>
                                                            <asp:DropDownList ID="ddYearCompareY2" runat="server">
                                                            </asp:DropDownList>
                                                    </td>
                                                </tr>
                                                <tr id="PanelCompareWeek" runat="server">
                                                    <td align="left" valign="middle" 
                                                        style="padding-top: 10px; padding-bottom:10px; padding-left: 50px">
                                                            <asp:DropDownList ID="ddWeekCompareM" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddWeekCompareM_SelectedIndexChanged">
                                                            </asp:DropDownList>
                                                            <asp:DropDownList ID="ddWeekCompareW" runat="server">
                                                            </asp:DropDownList>&nbsp;<asp:DropDownList ID="ddWeekCompareY" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddWeekCompareY_SelectedIndexChanged">
                                                            </asp:DropDownList>
                                                            <asp:Label ID="lblComparedTo3" runat="server" Text="(!admin.charts.compareTo!)"></asp:Label>&nbsp;<asp:DropDownList ID="ddWeekCompareM2" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddWeekCompareM2_SelectedIndexChanged">
                                                            </asp:DropDownList>
                                                            <asp:DropDownList ID="ddWeekCompareW2" runat="server">
                                                            </asp:DropDownList>
                                                            <asp:DropDownList ID="ddWeekCompareY2" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddWeekCompareY2_SelectedIndexChanged">
                                                            </asp:DropDownList>
                                                    </td>
                                                </tr>    
                                            </table>  
                                    <%--</rad:RadAjaxPanel>--%>
                                </td>
                             </tr>
                            
                            <tr>
                                <td style="width: 100%;" align="center">
                                        <div class=""><%--divBox--%>
                                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="left" class="splash_statsTitle" valign="middle">
                                                    <img id="imgOrderStatistics"
                                                        src="skins/skin_1/images/ordersStats.jpg" />
                                                    <asp:Label ID="lblOrderHeader" runat="server"></asp:Label>
                                                </td>
                                            </tr>                                                               
                                            <tr>
                                                <td align="left" valign="middle" 
                                                    style="padding-top: 10px; padding-bottom:5px; padding-left: 60px">
                                                    <asp:Panel ID="PanelCompare" runat="server">                                
                                                        <asp:DropDownList ID="ddComparedTransactionType" runat="server">
                                                            <asp:ListItem Value="Authorized">(!admin.charts.compare.transactionType1!)</asp:ListItem>
                                                            <asp:ListItem Value="Captured">(!admin.charts.compare.transactionType2!)</asp:ListItem>
                                                            <asp:ListItem Value="Voided">(!admin.charts.compare.transactionType3!)</asp:ListItem>
                                                            <asp:ListItem Value="Refunded">(!admin.charts.compare.transactionType4!)</asp:ListItem>
                                                        </asp:DropDownList>
                                                        <asp:Button ID="btnCompare" runat="server" OnClick="btnCompare_Click1" Text="(!admin.charts.compare!)" />
                                                    </asp:Panel>
                                                </td>
                                            </tr>
                                            <tr id="trCompareError" runat="server">
                                                <td align="left" valign="middle">
                                                    <div style="padding-left:30px; padding-top: 20px; color: Red">
                                                        <asp:Literal ID="ltCompareError" runat="server"></asp:Literal>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <div style="padding-bottom : 20px">                                                                        
                                            <rcw:RadChartWrapper  ID="OrdersChart" runat="server" ChartImageFormat="Jpeg"
                                                Skin="Default" Width="900px" Height="500px" SeriesOrientation="Vertical" OnItemDataBound="OrdersChart_ItemDataBound" OnPrePaint="OrdersChart_PrePaint">
                                                <ChartTitle>
                                                    <Appearance Dimensions-Margins="10px, 10px, 10px, 7%">
                                                    </Appearance>
                                                </ChartTitle>
                                                <PlotArea>
                                                
                                                    <YAxis>
                                                        <Appearance CustomFormat="c" MajorTick-Length="15">
                                                            <MajorGridLines Color="Silver" />
                                                            <MinorGridLines Color="224, 224, 224" />
                                                            <TextAppearance Dimensions-Margins="1px, 10px, 1px, 0px" MaxLength="50" Position-AlignedPosition="Right">
                                                                <FillStyle MainColor="Transparent">
                                                                </FillStyle>
                                                                <Border Color="Transparent" />
                                                            </TextAppearance>
                                                            <LabelAppearance Position-AlignedPosition="Right">
                                                            </LabelAppearance>
                                                        </Appearance>
                                                        <AxisLabel>
                                                            <Appearance CompositionType="RowTextImage" Position-AlignedPosition="Left">
                                                                <FillStyle MainColor="Transparent">
                                                                </FillStyle>
                                                                <Border Color="Transparent" />
                                                            </Appearance>
                                                        </AxisLabel>
                                                    </YAxis>
                                                    <XAxis>
                                                        <Appearance MajorTick-Length="10">
                                                            <MajorGridLines Color="224, 224, 224" />
                                                            <LabelAppearance Dimensions-Margins="10px, 1px, 10px, 1px" Position-AlignedPosition="Center">
                                                            </LabelAppearance>
                                                        </Appearance>
                                                        <AxisLabel>
                                                        <Appearance Dimensions-Margins="1px, 1px, 15px, 1px" Position-AlignedPosition="Left">
                                                        </Appearance>
                                                        </AxisLabel>
                                                    </XAxis>
                                                    <Appearance Dimensions-Margins="70px, 17%, 175px, 130px">
                                                        <FillStyle MainColor="White" SecondColor="White">
                                                        </FillStyle>
                                                        <Border Color="Transparent" Width="0" />
                                                    </Appearance>
                                                </PlotArea>
                                                
                                                <Legend>
                                                    <Appearance>
                                                        <ItemMarkerAppearance Figure="Rectangle">
                                                        </ItemMarkerAppearance>
                                                    </Appearance>
                                                    <TextBlock Visible="True">
                                                    </TextBlock>
                                                </Legend>
                                                
                                                <Appearance>
                                                    <Border Color="Transparent" />
                                                </Appearance>
                                                
                                                <Series>
                                                    <rcw:ChartSeries Name="Series 1">
                                                            <Appearance>
                                                                <Border Color="Transparent" />
                                                            </Appearance>
                                                    </rcw:ChartSeries>
                                                    <rcw:ChartSeries  Name="Series 2">
                                                        <Appearance>
                                                            <Border Color="Transparent" />
                                                        </Appearance>
                                                    </rcw:ChartSeries>
                                                </Series>
                                            </rcw:RadChartWrapper>
                                        </div>                                
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 10px">
                                </td>
                            </tr>
                            <tr>
                                <td align="left" class="splash_statsTitle">
                                <img id="img1" src="skins/skin_1/images/customerStats.jpg" />
                                    <asp:Label ID="lblCustomerHeader" runat="server"></asp:Label></td>
                            </tr>
                            
                            <tr>
                                <td align="center">
                                        <div class="" style="padding-bottom:20px"><%--divBox--%>
                                            <asp:Panel ID="PanelCompareCust" runat="server">                                    
                                                <div style="width: 100%; padding-bottom: 10px; padding-top: 10px; padding-left: 60px; text-align: left;">
                                                    <asp:DropDownList ID="ddComparedCustomer" runat="server">
                                                <asp:ListItem Value="Anonymous">(!admin.charts.compare.transactionType1!)</asp:ListItem>
                                                <asp:ListItem Value="Registered">(!admin.charts.compare.transactionType2!)</asp:ListItem>                                    
                                                </asp:DropDownList>&nbsp;
                    <asp:Button ID="btnCompareCustomer" runat="server" OnClick="btnCompareCustomer_Click" Text="(!admin.charts.compare!)" />
                                                </div>
                                            </asp:Panel>
                                            <rcw:RadChartWrapper  ID="chartCustomerStats" runat="server" ChartImageFormat="Jpeg"
                                                                                        Skin="Default" Width="900px" Height="500px" SeriesOrientation="Vertical" OnItemDataBound="chartCustomerStats_ItemDataBound" OnPrePaint="chartCustomerStats_PrePaint">
                                                                                        <ChartTitle>
                                                                                            <Appearance Dimensions-Margins="10px, 10px, 10px, 7%">
                                                                                            </Appearance>
                                                                                        </ChartTitle>
                                                                                        <PlotArea>
                                                                                            <YAxis>
                                                                                                <Appearance MajorTick-Length="15">
                                                                                                    <MajorGridLines Color="Silver" />
                                                                                                    <MinorGridLines Color="224, 224, 224" />
                                                                                                    <TextAppearance Dimensions-Margins="1px, 10px, 1px, 0px" MaxLength="50" Position-AlignedPosition="Right">
                                                                                                        <FillStyle MainColor="Transparent">
                                                                                                        </FillStyle>
                                                                                                        <Border Color="Transparent" />
                                                                                                    </TextAppearance>
                                                                                                    <LabelAppearance Position-AlignedPosition="Right">
                                                                                                    </LabelAppearance>
                                                                                                </Appearance>
                                                                                                <AxisLabel>
                                                                                                    <Appearance CompositionType="RowTextImage" Position-AlignedPosition="Left">
                                                                                                        <FillStyle MainColor="Transparent">
                                                                                                        </FillStyle>
                                                                                                        <Border Color="Transparent" />
                                                                                                    </Appearance>
                                                                                                </AxisLabel>
                                                                                            </YAxis>
                                                                                            <XAxis>
                                                                                                <Appearance MajorTick-Length="10">
                                                                                                    <MajorGridLines Color="224, 224, 224" />
                                                                                                    <LabelAppearance Dimensions-Margins="10px, 1px, 10px, 1px" Position-AlignedPosition="Center">
                                                                                                    </LabelAppearance>
                                                                                                </Appearance>
                <AxisLabel>
                    <Appearance Dimensions-Margins="1px, 1px, 15px, 1px" Position-AlignedPosition="Left">
                    </Appearance>
                </AxisLabel>
                                                                                            </XAxis>
                                                                                            <Appearance Dimensions-Margins="70px, 17%, 175px, 130px">
                                                                                                <FillStyle MainColor="White" SecondColor="White">
                                                                                                </FillStyle>
                                                                                                <Border Color="Transparent" Width="0" />
                                                                                            </Appearance>
                                                                                        </PlotArea>
                                                                                        <Legend>
                                                                                            <Appearance>
                                                                                                <ItemMarkerAppearance Figure="Rectangle">
                                                                                                </ItemMarkerAppearance>
                                                                                            </Appearance>
                <TextBlock Visible="True">
                </TextBlock>
                                                                                        </Legend>
                                                                                        <Appearance>
                                                                                            <Border Color="Transparent" />
                                                                                        </Appearance>
                <Series>
               <rcw:ChartSeries Name="Series 1">
                        <Appearance>
                            <Border Color="Transparent" />
                        </Appearance>
                        </rcw:ChartSeries>
            <rcw:ChartSeries  Name="Series 2">
                        <Appearance>
                            <Border Color="Transparent" />
                        </Appearance>
                        </rcw:ChartSeries>
                </Series>
                </rcw:RadChartWrapper>        
                                        </div>
                                </td>
                            </tr>
                            <%--<tr>
                                <td align="center" colspan="2" style="height: 10px">
                                </td>
                            </tr>
                           
                            <tr>
                                <td colspan="2" style="height: 10px">
                                </td>
                            </tr>                        
                            <tr>
                                <td align="left" colspan="2" style="height: 10px">
                                </td>
                            </tr>--%>
                        </table>
                        </rcw:AjaxPanel>
                        
                        <rcw:LoadingPanel ID="AjaxLoadingPanel1" runat="server" Height="50px" Width="154px" BackColor="White" Transparency="20">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <asp:Image ID="Image1" runat="server" AlternateText="Loading..." ImageUrl="images/ajax-loader.gif" />
                            <br />
                            <asp:Label ID="lblLoading" runat="server" Font-Size="Large" ForeColor="#404040" Text="(!admin.charts.loading!)"></asp:Label>
                        </rcw:LoadingPanel>
                        
                        </div>
                        
                    </div>
                    <%-- END STATISTICS --%>
                    
                    <%--FEEDS--%>
                    <div id="divFeeds" runat="server" style="padding-left: 30px; padding-top : 20px">
                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="splash_NewsTitleHeadIcon"></td>
                                <td>
                                    <div style="height: 10px"></div>
                                    <div style="float: left; width : 24px; height: 24px">
                                        <img id="imgMinimize_Feeds" runat="server"  class="splash_ImageButton"
                                            src="skins/skin_1/images/icon_minimize.jpg" 
                                            min="skins/skin_1/images/icon_minimize.jpg" 
                                            min_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                            restore="skins/skin_1/images/icon_restore.jpg"
                                            restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                    </div>
                                    <div class="splash_groupsTitleHead">                                                                                
                                        News
                                    </div>     
                                          
                                    <input type="hidden" runat="server" id="divFeeds_Content_Visible" name="divFeeds_Content_Visible" value="1" />
                                    
                                    <div id="divFeeds_Content" runat="server">
                                        <asp:Panel ID="pnlNewsFeed" runat="server" Visible="true" Width="100%">   
                                        <aspdnsf:XmlPackage id="NewsFeed" runat="server" PackageName="rss.aspdnsfrssconsumer.xml.config" RunTimeParams="channel=news&height=350&width=800"/>
                                        </asp:Panel>
                                                                            
                                        <asp:Panel ID="pnlSponsorFeed" runat="server" Visible="true">   
                                        <aspdnsf:XmlPackage id="SponsorFeed" runat="server" PackageName="rss.aspdnsfrssconsumer.xml.config" RunTimeParams="channel=sponsors&height=330&width=830"/>
                                        </asp:Panel>
                                    </div>
                                  
                                </td>
                            </tr>
                        </table>
                    </div>                               
                    
                    <%--END FEEDS--%>
                    
                     <%-- Security Alert --%>
                     
                     <%--<div style="padding-left: 30px; padding-top : 20px">
                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="splash_NewsTitleHeadIcon"></td>
                                <td>
                                    <div style="height: 10px"></div>
                                    <div style="float: left; width : 24px; height: 24px">
                                        <img id="imgMinimize_SecurityAlert" runat="server"  class="splash_ImageButton"
                                            src="skins/skin_1/images/icon_minimize.jpg" 
                                            src_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                            restore="skins/skin_1/images/icon_restore.jpg"
                                            restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                    </div>
                                    <div class="splash_groupsTitleHead">                                                                                
                                        Security Alert
                                    </div>     
                                          
                                    <div id="divSecurityAlert_Contents" runat="server">
                                        <asp:Panel ID="pnlSecurityFeed" runat="server" Visible="true" Width="348px" BorderColor="#b7ccfb" >   
                                        <aspdnsf:XmlPackage id="SecurityFeed" runat="server" PackageName="rss.aspdnsfrssconsumer.xml.config" RunTimeParams="channel=security"/>
                                    </asp:Panel>                                     
                                    </div>
                                  
                                </td>
                            </tr>
                        </table>
                    </div>--%>                       
                   
                    <%-- End Security Alert --%>
                    
                    
                    <%-- LATEST ORDERS --%>
                    <div style="padding-left: 30px; padding-top : 20px">                                        
                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="splash_latestOrdersTitleHeadIcon"></td>
                                <td>
                                    <div style="height: 10px"></div>
                                    <div style="float: left; width : 24px; height: 24px">
                                        <img id="imgMinimize_LatestOrders" runat="server"  class="splash_ImageButton"
                                            src="skins/skin_1/images/icon_minimize.jpg" 
                                            min="skins/skin_1/images/icon_minimize.jpg" 
                                            min_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                            restore="skins/skin_1/images/icon_restore.jpg"
                                            restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                    </div>
                                    <div class="splash_groupsTitleHead">                                                                                
                                        Latest Orders
                                    </div>     
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <input type="hidden" runat="server" id="divLatestOrders_Content_Visible" name="divLatestOrders_Content_Visible" value="1" />
                    <div id="divLatestOrders_Content" runat="server" >
                        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                            <tr>
                                <td class="splash_divLatestOrders"> 
                                     <a href="orders.aspx">View Orders</a>
                                     &nbsp;<a href="orderReports.aspx">Order Reports</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="splash_divLatestOrders">
                                    <asp:GridView ID="gOrders" AutoGenerateColumns="False" ShowFooter="True" runat="server" OnRowDataBound="gOrders_RowDataBound" Width="100%" GridLines="None" CellPadding="0">
                                                            <FooterStyle CssClass="gridFooter" />
                                                            <RowStyle CssClass="gridRow" />
                                                            <EditRowStyle CssClass="DataCellGridEdit" />
                                                            <PagerStyle CssClass="pagerGrid" />
                                                            <HeaderStyle CssClass="gridHeader" />
                                                            <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                                            <Columns>
                                                                <asp:TemplateField HeaderText="Order">
                                                                    <ItemTemplate> 
                                                                        <%# "<a href=\"orders.aspx?ordernumber=" + DataBinder.Eval(Container.DataItem, "OrderNumber") + "\">" + DataBinder.Eval(Container.DataItem, "OrderNumber") + "</a>" %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="lighterData" width="60px" />
                                                                </asp:TemplateField>
                                                                <asp:TemplateField HeaderText="Date">
                                                                    <ItemTemplate> 
                                                                        <%# DataBinder.Eval(Container.DataItem, "OrderDate") %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="lightData" width="150px" />
                                                                </asp:TemplateField>
                                                                <asp:TemplateField HeaderText="Customer">
                                                                    <ItemTemplate> 
                                                                        <%# (DataBinder.Eval(Container.DataItem, "FirstName") + " " + DataBinder.Eval(Container.DataItem, "LastName")).Trim() %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="normalData"  width="160px"/>
                                                                </asp:TemplateField>
                                                                <asp:TemplateField HeaderText="Shipping">
                                                                    <ItemTemplate> 
                                                                        <%# DataBinder.Eval(Container.DataItem, "ShippingMethod") %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="normalData"  width="400px" />
                                                                </asp:TemplateField>
                                                                <asp:TemplateField HeaderText="Total">
                                                                    <ItemTemplate> 
                                                                        <%# AspDotNetStorefrontCore.Localization.CurrencyStringForDisplayWithoutExchangeRate((decimal)DataBinder.Eval(Container.DataItem, "OrderTotal"),false) %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="normalData" width="80px" />
                                                                </asp:TemplateField> 
                                                                <asp:TemplateField HeaderText="MaxMind">
                                                                    <ItemTemplate> 
                                                                        <%# AspDotNetStorefrontCore.Localization.DecimalStringForDB((decimal)DataBinder.Eval(Container.DataItem, "MaxMindFraudScore")) %>
                                                                    </ItemTemplate>
                                                                    <ItemStyle CssClass="normalData" HorizontalAlign="Right"  width="50px" />
                                                                    <HeaderStyle HorizontalAlign="Right" />
                                                                </asp:TemplateField>
                                                            </Columns>
                                                        </asp:GridView>
                                </td>
                            </tr>
                        </table>                    
                    </div>
                    <%-- END LATEST ORDERS --%>
                    
                    
                    <%-- LATEST REGISTERED CUSTOMERS --%>
                    <div style="padding-left: 30px; padding-top : 20px">                                        
                        <table style="width: 100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="splash_latestRegisteredTCustomersTitleHeadIcon"></td>
                                <td>
                                    <div style="height: 10px"></div>
                                    <div style="float: left; width : 24px; height: 24px">
                                        <img id="imgMinimize_LatestRegisteredCustomers" runat="server"  class="splash_ImageButton"
                                            src="skins/skin_1/images/icon_minimize.jpg" 
                                            min="skins/skin_1/images/icon_minimize.jpg" 
                                            min_hover="skins/skin_1/images/icon_minimize_hover.jpg"
                                            restore="skins/skin_1/images/icon_restore.jpg"
                                            restore_hover="skins/skin_1/images/icon_restore_hover.jpg"/>
                                    </div>
                                    <div class="splash_groupsTitleHead">                                                                                
                                        Latest Registered Customers
                                    </div>     
                                </td>
                            </tr>                        
                        </table>
                    </div>
                    
                    <input type="hidden" runat="server" id="divLatestRegisteredCustomers_Content_Visible" name="divLatestRegisteredCustomers_Content_Visible" value="1" />
                    
                    <div id="divLatestRegisteredCustomers_Content" runat="server" >
                        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
                            <tr>
                                <td class="splash_divLatestCustomers"> 
                                    <a href="customers.aspx">View Customers</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="splash_divLatestCustomers">
                                    <asp:GridView ID="gCustomers" AutoGenerateColumns="false" ShowHeader="true" ShowFooter="True" runat="server" AllowPaging="false" AllowSorting="false" Width="100%" GridLines="None" CellPadding="0">
                                        <FooterStyle CssClass="gridFooter" />
                                        <RowStyle CssClass="gridRow" />
                                        <EditRowStyle CssClass="DataCellGridEdit" />
                                        <PagerStyle CssClass="pagerGrid" />
                                        <HeaderStyle CssClass="gridHeader" />
                                        <AlternatingRowStyle CssClass="gridAlternatingRow" />
                                        <Columns>
                                            <asp:TemplateField HeaderText="CustomerID">
                                                <ItemTemplate> 
                                                    <%# DataBinder.Eval(Container.DataItem, "CustomerID") %>
                                                </ItemTemplate>
                                                <ItemStyle CssClass="lighterData" />
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Date">
                                                <ItemTemplate> 
                                                    <%# DataBinder.Eval(Container.DataItem, "RegisterDate") %>
                                                </ItemTemplate>
                                                <ItemStyle CssClass="lightData" />
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Customer">
                                                <ItemTemplate> 
                                                    <%# (DataBinder.Eval(Container.DataItem, "FirstName") + " " + DataBinder.Eval(Container.DataItem, "LastName")).Trim() %>
                                                </ItemTemplate>
                                                <ItemStyle CssClass="normalData" />
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <%-- END LATEST REGISTERED CUSTOMERS --%>                                                              
                </td>
            </tr>        
            </table>                           
        </div>
    </form>
</body>
</html>
