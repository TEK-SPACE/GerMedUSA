<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.uploadImages" CodeFile="uploadImages.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Upload Images</title>
    
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<asp:Literal ID="ltStyles" runat="server"></asp:Literal>
    <form id="frmUploadImages" runat="server" enctype="multipart/form-data" method="post">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
       <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
              <tr>
                <td align="left" valign="middle" style="height: 36px" class="breadCrumb3">
	                    <table border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td align="left" valign="middle"><b>Now In:</b></td>
                                <td align="left" valign="middle">Manage Image Uploads</td>
                                <td align="left" valign="middle"><b>View:</b></td>
                                <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                            </tr>
                        </table>
	            </td>
              </tr>
        </table>
        <div style="margin-bottom: 5px; margin-top: 5px;" class="breadCrumb3">
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div>
        <table border="0" cellpadding="1" cellspacing="0" class="">
            <tr>
                <td>
                    <div class="">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="">
                            <tr>
                                <td>
                                   <b>Upload Image:</b>
                                </td>
                                <td class="contentTable" valign="top">
                                    <asp:FileUpload ID="fuMain" runat="server" CssClass="fileUpload"  />
                                    <asp:Button ID="btnUpload" runat="server" Text="Upload" CssClass="normalButtons" OnClick="btnUpload_Click" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div style="margin-bottom: 5px; margin-top: 5px;">
       
    </div>
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="" width="100%">
            <tr>
                <td>
                    <div class="">                       
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Images:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="divBox" width="100%" align="center" valign="middle">
                                    <div style="width: 99%; padding-bottom: 10px; padding-top: 10px;">
                                        <asp:GridView Width="100%" ID="gMain" runat="server" PagerStyle-HorizontalAlign="left" PagerSettings-Position="TopAndBottom" AutoGenerateColumns="False" AllowPaging="True" PageSize="15" AllowSorting="True" CssClass="tableoverallGrid" HorizontalAlign="Left" OnRowCommand="gMain_RowCommand" OnRowDataBound="gMain_RowDataBound" OnPageIndexChanging="gMain_PageIndexChanging" CellPadding="0" GridLines="None" ShowFooter="True">
                                            <Columns>
                                                <asp:BoundField DataField="Path" Visible="False" ReadOnly="True" />
                                                <asp:BoundField DataField="FileName" HeaderText="File Name" ReadOnly="True" >
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="SRC" HeaderText="IMG Tag src" ReadOnly="True" >
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Dimensions" HeaderText="Dimensions" ReadOnly="True" >
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Size" HeaderText="Size (KB)" ReadOnly="True" >
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:BoundField>
                                                <asp:TemplateField HeaderText="Image" >
                                                    <ItemTemplate>
                                                        <asp:Literal ID="ltImage" runat="server" Text='<%# Eval("Image") %>'></asp:Literal>
                                                    </ItemTemplate>
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:TemplateField>
                                                <asp:TemplateField>
                                                    <ItemTemplate>
                                                        <asp:ImageButton ID="imgDelete" CommandName="DeleteItem" CommandArgument='<%# Eval("Path") %>' runat="Server" AlternateText="Delete" ImageUrl="skins/Skin_1/images/delete2.gif" />                                                        
                                                    </ItemTemplate>
                                                    <ItemStyle CssClass="selectData" Width="25px" />
                                                </asp:TemplateField>
                                            </Columns>
                                            <PagerSettings FirstPageText="&amp;lt;&amp;lt;First Page" LastPageText="Last Page&amp;gt;&amp;gt;"
                                                Mode="NumericFirstLast" PageButtonCount="15" Position="TopAndBottom" />
                                            <FooterStyle CssClass="gridFooter" />
                                            <RowStyle CssClass="tableDataCellGrid" />
                                            <EditRowStyle CssClass="DataCellGridEdit" />
                                            <PagerStyle CssClass="gridPager" HorizontalAlign="Left" />
                                            <HeaderStyle CssClass="gridHeader" />
                                            <AlternatingRowStyle CssClass="tableDataCellGridAlt" />
                                        </asp:GridView>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <asp:Literal id="ltScript1" runat="server"></asp:Literal>
                                        
    </form>
</body>
</html>
