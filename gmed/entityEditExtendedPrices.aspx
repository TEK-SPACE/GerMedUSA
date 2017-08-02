<%@ Page language="c#" Inherits="AspDotNetStorefrontAdmin.entityEditExtendedPrices" CodeFile="entityEditExtendedPrices.aspx.cs" %>
<html>
    <head>
        <title>Extended Price</title>
          <link href="skins/Skin_1/style.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="jscripts/formValidate.js"></script>
    </head>
    
    <script type="text/javascript" type="text/javascript" >
    function Form_Validator(theForm)
    {
    submitonce(theForm);
    return (true);
    }
    </script>

    <body>
        <asp:Literal ID="ltContent" runat="server"></asp:Literal>
    </body>
</html>