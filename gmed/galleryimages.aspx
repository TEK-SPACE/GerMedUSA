<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.galleryimages" CodeFile="galleryimages.aspx.cs" Theme="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ OutputCache  Duration="1"  Location="none" %>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Gallery Images</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <form id="frmGalleryImages" runat="server">   
    <asp:Literal ID="ltScript" runat="server"></asp:Literal> 
    <asp:Literal ID="ltValid" runat="server"></asp:Literal>
    <div id="help">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="toppage">
                  <tr>
                    <td align="left" valign="middle">
	                        <table border="0" cellspacing="0" cellpadding="5">
                                <tr>
                                    <td align="left" valign="middle"><b>Now In:</b></td>
                                    <td align="left" valign="middle"><a href="gallery.aspx">Manage Galleries</a> - Manage Gallery Images
                                    </td>
                                    <td align="left" valign="middle"><b>View:</b></td>
                                    <td align="left" valign="middle"><a href="splash.aspx">Home</a></td>
                                </tr>
                            </table>
	                </td>
                  </tr>
            </table>
            <div style="margin-bottom: 5px; margin-top: 5px;">
            <asp:Literal ID="Literal1" runat="server"></asp:Literal>
            </div>
    </div>    
    <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable">
            <tr>
                <td>
                    <div class="wrapper">
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Upload A New Image (JPG FORMAT ONLY):</font>                                
                                    <asp:FileUpload ID="fuMain" runat="Server" CssClass="fileUpload"  />
                                </td>
                                <td class="contentTable" style="padding-left:20px;">
                                    <asp:Button ID="btnUpload" runat="server" Text="Submit" OnClick="btnUpload_Click" CssClass="normalButtons" />
                                </td>                            
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <div style="margin-top: 5px; margin-bottom: 5px;"></div>
    </div>
    
   <div id="container">
        <table border="0" cellpadding="1" cellspacing="0" class="outerTable" width="100%">
            <tr>
                <td>
                    <div class="wrapper">                 
                        <table border="0" cellpadding="0" cellspacing="0" class="innerTable" width="100%">
                            <tr>
                                <td class="titleTable">
                                    <font class="subTitle">Gallery Images:</font>
                                </td>
                            </tr>
                            <tr>
                                <td class="contentTable" valign="top" width="100%">
                                    <div class="wrapperTop">
                                        <asp:Literal ID="ltContent" runat="server"></asp:Literal>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <asp:Literal ID="ltScript2" runat="server"></asp:Literal>
    </form>
</body>
</html>