<%@ Page Language="C#" AutoEventWireup="false" %>
<%
    Response.Clear();
    Response.ClearHeaders();
    Response.ContentType = "text/xml";

    AspDotNetStorefrontCore.Customer cust = new AspDotNetStorefrontCore.Customer(true);
    
    string sql = "SELECT P.ProductID,P.Name FROM Product P, ";
    string entity = AspDotNetStorefrontCore.CommonLogic.QueryStringCanBeDangerousContent("entityName").ToUpperInvariant();
    int eID = AspDotNetStorefrontCore.CommonLogic.QueryStringNativeInt("entityid");
    switch (entity)
    {
        case "SECTION":
            entity = "Section";
            break;
        case "MANUFACTURER":
            entity = "Manufacturer";
            break;
        case "DISTRIBUTOR":
            entity = "Distributor";
            break;
        case "GENRE":
            entity = "Genre";
            break;
        case "VECTOR":
            entity = "Vector";
            break;
        case "LIBRARY":
            entity = "Category";
            break;
        default:
            entity = "Category";
            break;
    }
    sql += "Product" + entity + " X WHERE X." + entity + "ID=" + eID + " AND X.ProductID=P.ProductID and P.Deleted = 0 ORDER BY X.DisplayOrder, P.Name";

    ComponentArt.Web.UI.TreeView TreeView1 = new ComponentArt.Web.UI.TreeView();

    using (System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(AspDotNetStorefrontCore.DB.GetDBConn()))
    {
        con.Open();
        using (System.Data.IDataReader dr = AspDotNetStorefrontCore.DB.GetRS(sql, con))
        {
            while (dr.Read())
            {
                ComponentArt.Web.UI.TreeViewNode node = new ComponentArt.Web.UI.TreeViewNode();
                node.Text = "<font color=\"green\">" + AspDotNetStorefrontCore.DB.RSFieldByLocale(dr, "Name", cust.LocaleSetting) + "</font>";
                node.ContentCallbackUrl = "XmlEntityProductVariants.aspx?pID=" + AspDotNetStorefrontCore.DB.RSFieldInt(dr, "ProductID") + "&entityName=" + entity + "&entityID=" + eID; ;
                node.NavigateUrl = "entityEditProducts.aspx?iden=" + AspDotNetStorefrontCore.DB.RSFieldInt(dr, "ProductID") + "&entityName=" + entity + "&entityFilterID=" + eID;
                node.Target = "entityBody";
                TreeView1.Nodes.Add(node);
            }
        }
    }

    ComponentArt.Web.UI.TreeViewNode nodeAdd = new ComponentArt.Web.UI.TreeViewNode();
    nodeAdd.Text = "<font color=\"red\">Add Product</font>";
    nodeAdd.NavigateUrl = "entityEditProducts.aspx?iden=0&entityName=" + entity + "&entityFilterID=" + eID;
    nodeAdd.Target = "entityBody";
    TreeView1.Nodes.Add(nodeAdd);

    Response.Write(TreeView1.GetXml());
    Response.End();
 %>