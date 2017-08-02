using System;
using System.Web;
using System.Data;
using System.Globalization;
using AspDotNetStorefrontCore;

public partial class Admin_adhocchargecomplete : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
        Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
        
        //This wil update and refresh the parent window 
        Response.Write("<script type=\"text/javascript\">\n");
        Response.Write("opener.window.location.reload();");
        Response.Write("</script>\n");
        
        Response.Write("<link rel=\"stylesheet\" href=\"skins/Skin_" + ThisCustomer.SkinID.ToString() + "/style.css\" type=\"text/css\">\n");
        Response.Write("<p><b><font color=blue>" + AppLogic.GetString("adhoccharge.aspx.2", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + CommonLogic.QueryStringCanBeDangerousContent("ordernumber") + "</font></b></p>");
        Response.Write("<p><a href=\"javascript:self.close();\">" + AppLogic.GetString("admin.common.Close", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</a></p>");
    }
}
