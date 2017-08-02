<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileUpload.aspx.cs" Inherits="FileUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <style type="text/css">
        .style1
        {
            width: 100%;
            background-color: #00FFFF;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="style1">
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server" 
                        Text="Please Select the File you Would like to Upload!"></asp:Label>
                </td>
                <td>
                    <asp:FileUpload ID="FileUpload1" runat="server" />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Button ID="Button1" runat="server" onclick="Button1_Click" 
                        Text="Upload Now!" />
                </td>
                <td>&nbsp;
                    </td>
            </tr>
        </table>
    
    </div>
    <asp:Label ID="Label2" runat="server"></asp:Label>
    </form>
    
    <script type="text/javascript">
<!--
var sendspace_dropbox = '3ZKUZ3D43ZRY601OZY9SDZQANMH95OQZ';
-->
</script>
<script type="text/javascript" src="http://dropbox.sendspace.com/jsc/dropbox.js"></script>
            
</body>
</html>
