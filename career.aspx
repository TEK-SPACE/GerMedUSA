<%@ Page Language="C#" CodeFile="career.aspx.cs" Inherits="AspDotNetStorefront.career" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Apply for Job at GerMedUSA</title>
    <style>
    #CareerApply li{ list-style:none;}
    #CareerApply li span{ float:left; width: 100px;}
     #CareerApply li input{ width:200px;}
       #btnSubmit {
            margin-left: 100px;
            width:auto !important;
        }
       .rgxExpress{float: none !important; width: auto !important;
padding-left: 10px;}
</style>
</head>
<body>
    <form id="formApply" runat="server">
    <div>
        <h1>Submit your resume</h1>
    <h4>Please provide below required information to process your review your resume.</h4>
    <hr />
        <asp:Label ID="lblMessage" runat="server" Text=""></asp:Label>

    <ol id="CareerApply">
        <li>
            <asp:Label ID="lblName" runat="server" Text="Name" ></asp:Label>
            <asp:TextBox ID="txtName" runat="server" required="required"></asp:TextBox></li>
        <li>  <asp:Label ID="lblEmail" runat="server" Text="Email"></asp:Label>
            <asp:TextBox ID="txtEmail" runat="server" AutoCompleteType="Email"  required="required"></asp:TextBox>
              <asp:RegularExpressionValidator ID="rgxValidateEmail" runat="server" CssClass="rgxExpress" ControlToValidate="txtEmail" Display="Dynamic" ErrorMessage="*" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*">Invalid</asp:RegularExpressionValidator>
        </li>
         <li>  <asp:Label ID="lblTelephone" runat="server" Text="Telephone"></asp:Label>
            <asp:TextBox ID="txtTelephone" runat="server" required="required"></asp:TextBox>
             <asp:RegularExpressionValidator ID="rgxValidateTelephone" runat="server" CssClass="rgxExpress" ControlToValidate="txtTelephone" Display="Dynamic" ErrorMessage="*" ValidationExpression="((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}">Invalid</asp:RegularExpressionValidator>
        </li>
        <li><asp:Label ID="lblResume" runat="server" Text="Resume"></asp:Label>
            <asp:FileUpload ID="flUpload" runat="server" required="required" />
        </li>
        <li>
            <asp:Button ID="btnSubmit"  runat="server" Text="Button" OnClick="btnSubmit_Click" />
        </li>
    </ol>
    </div>
    </form>
</body>
</html>

