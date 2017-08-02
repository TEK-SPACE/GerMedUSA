<%@ Page Language="C#" AutoEventWireup="true" CodeFile="entityMenu.aspx.cs" Inherits="entityMenu" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ Register TagPrefix="ComponentArt" Namespace="ComponentArt.Web.UI" Assembly="ComponentArt.Web.UI" %>
<%@ OutputCache  Duration="1"  Location="none" %>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Entity Menu</title>
    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="frmEntityMenu" runat="server">
    <div>
        <table>
            <tr>
                <td align="right" class="breadCrumb1" style="width: 50px">
                    View :</td>
                <td class="breadCrumb1">
                <a href="splash.aspx" target="content">Home</a>
                </td>
            </tr>
            <tr>
                <td align="right" class="breadCrumb1" style="width: 50px">
                    Entity :</td>
                <td class="breadCrumb2">
                    <asp:Literal ID="ltEntity" runat="server"></asp:Literal>
                </td>
            </tr>
            <tr>
                <td align="right" class="breadCrumb1" style="height: 10px">
                </td>
                <td class="breadCrumb2">
                </td>
            </tr>
        </table>
        <div>
            <asp:Literal ID="ltError" runat="server"></asp:Literal>
        </div>
    </div>
    <div id="container">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" class="divBox">
                            <tr>
                                <td class="titleTablemenu" colspan="2" align="center">
                                    <div style="width: 95%; text-align: left">
                                        <div style="overflow: visible; text-align: left; width: 220px;">                                        
                                            <div style="float: left">
                                                <asp:Label ID="Label1" runat="server" Text="Select : "></asp:Label>
                                                <asp:DropDownList ID="ddEntity" runat="server" 
                                                    OnSelectedIndexChanged="ddEntity_SelectedIndexChanged" AutoPostBack="True" 
                                                    Width="150px" Font-Bold="False"></asp:DropDownList>
                                            </div>
                                        </div>                                
                                            
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top" colspan="2" >
                                    <div style="white-space: nowrap; overflow: visible;">                                                                            
                                        <div style="margin-top: 5px; margin-bottom: 0px; white-space: nowrap; overflow: visible;" class="treeViewDiv">
                                            <div style="position: relative; white-space: nowrap; overflow: visible; padding-left: 5px; text-align: left;">
                                                <asp:LinkButton ID="btnExpandAll" runat="server" Text="Expand Tree" OnClick="btnExpandAll_Click"></asp:LinkButton>
                                                <asp:LinkButton ID="btnCollapseAll" runat="server" Text="Collapse Tree" OnClick="btnCollapseAll_Click"></asp:LinkButton>
                                            </div>
                                            <div style="position: relative; white-space: nowrap; overflow: visible; padding-left: 5px; padding-right: 5px">
                                            <ComponentArt:TreeView id="PageTree" 
	                                          ClientScriptLocation="skins/componentart_webui_client/"
                                              DragAndDropEnabled="false" 
                                              NodeEditingEnabled="false" 
                                              KeyboardEnabled="true"
                                              CssClass="TreeView2" 
                                              NodeCssClass="TreeNode2" 
                                              HoverNodeCssClass="HoverTreeNode2" 
                                              SelectedNodeCssClass="SelectedTreeNode2" 
                                              NodeEditCssClass="NodeEdit2"                                               
                                              NodeLabelPadding="0"
                                              ItemSpacing="0" 
                                              NodeIndent="0" 
                                              ImagesBaseUrl="image/lines" 
                                              LineImagesFolderUrl="images/lines" 
                                              ShowLines="true" 
                                              ParentNodeImageUrl="" 
                                              LeafNodeImageUrl="" 
                                              EnableViewState="false" 
                                              DefaultTarget="entityBody" 
                                              MarginCssClass="TreeMargin2" NodeRowCssClass="TreeRow2" ExpandNodeOnSelect="false" 
                                              DefaultMarginImageHeight="0"
			                                  runat="server" OnNodeDataBound="PageTree_NodeDataBound">
                                            </ComponentArt:TreeView>
                                            </div>
                                        </div>                                                                            
                                    </div>                                    
                                </td>
                            </tr>
                        </table>
                </td>
            </tr>
        </table>                                    
    </div>
    </form>  
    <asp:Literal ID="ltScript" runat="server"></asp:Literal>    
</body>
</html>