<%@ Page Language="C#" AutoEventWireup="true" CodeFile="buysafereg.aspx.cs" Inherits="AspDotNetStorefrontAdmin.buysafereg" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>BuySafe registration</title>
    <script type="text/javascript" language="JavaScript">
    function popWindow()
    {    
        features = 'width=800,height=600,toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes';
        window.open('buysafereg2.aspx',"_blank",features);    
    }
    </script>

    <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
</head>
<body>

<form id="form1" runat="server" >
    <asp:Literal ID="Literal1" runat="server"></asp:Literal><br />
    <br />
    <div align="center">
        <input id="Button1" type="button" value="Register" onclick="popWindow()" class="normalButtons"/>    
    </div>
    <br />
</form>

</body>
</html>
