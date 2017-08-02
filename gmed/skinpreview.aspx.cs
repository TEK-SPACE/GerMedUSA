// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for skinpreview
    /// </summary>
    public partial class skinpreview : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");


            if (CommonLogic.QueryStringCanBeDangerousContent("DeleteID").Length != 0)
            {
                DB.ExecuteSQL("delete from SkinPreview where SkinPreviewID=" + CommonLogic.QueryStringCanBeDangerousContent("DeleteID"));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("DefaultSkinID").Length != 0)
            {
                AppLogic.SetAppConfig("DefaultSkinID", CommonLogic.QueryStringCanBeDangerousContent("DefaultSkinID"));
            }
            
            SectionTitle = "Manage SkinPreview Parameters";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            String SearchFor = CommonLogic.QueryStringCanBeDangerousContent("SearchFor").TrimStart().TrimEnd();
            String GroupName = CommonLogic.QueryStringCanBeDangerousContent("GroupName");
            writer.Write("<form id=\"SkinPreviewForm\" name=\"SkinPreviewForm\" method=\"GET\" action=\"skinpreview.aspx\">");

            writer.Write("Config Group: <select onChange=\"document.SkinPreviewForm.submit()\" size=\"1\" name=\"GroupName\">\n");
            writer.Write("<OPTION VALUE=\"0\">ALL GROUPS</option>\n");
            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS("select distinct groupname from SkinPreview   with (NOLOCK)  where groupname is not null order by groupname", con))
                {
                    while (rs.Read())
                    {
                        writer.Write("<option value=\"" + DB.RSField(rs, "GroupName") + "\"");
                        if (DB.RSField(rs, "GroupName") == GroupName)
                        {
                            writer.Write(" selected");
                        }
                        writer.Write(">" + DB.RSField(rs, "GroupName") + "</option>");
                    }
                }
            }
            writer.Write("</select>&nbsp;&nbsp;&nbsp;");
	

            String BeginsWith = CommonLogic.IIF(CommonLogic.QueryStringCanBeDangerousContent("BeginsWith").Length == 0, "%", CommonLogic.QueryStringCanBeDangerousContent("BeginsWith"));
            String alpha = "%#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (int i = 1; i <= alpha.Length; i++)
            {
                if (BeginsWith.Substring(0, 1) == alpha.Substring(i - 1, 1))
                {
                    writer.Write(alpha.Substring(i - 1, 1) + "&nbsp;");
                }
                else
                {
                    writer.Write("<a href=\"skinpreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&BeginsWith=" + Server.UrlEncode("" + alpha.Substring(i - 1, 1)) + "\">" + alpha.Substring(i - 1, 1) + "</a>&nbsp;");
                }
            }
            writer.Write("&nbsp;&nbsp;Search For: <input type=\"text\" name=\"SearchFor\" value=\"" + SearchFor + "\">&nbsp;<input class=\"normalButtons\" type=\"submit\" name=\"search\" value=\"submit\">");
            writer.Write("</form>");

            String sql = String.Empty;
            if (SearchFor.Length != 0)
            {
                sql = "select * from SkinPreview   with (NOLOCK)  where " + " name like " + DB.SQuote("%" + SearchFor + "%") + " order by skinid,name";
            }
            else
            {
                sql = "select * from SkinPreview   with (NOLOCK)  where " + " name like " + DB.SQuote(BeginsWith + "%") + " order by skinid,name";
            }
            if (GroupName.Length != 0 && GroupName != "0")
            {
                sql = "select * from SkinPreview   with (NOLOCK)  where " + " groupname=" + DB.SQuote(GroupName) + " order by skinid,name";
            }
            
            writer.Write("<form method=\"POST\" action=\"skinpreview.aspx\">\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");
            writer.Write("  <table border=\"0\" cellpadding=\"0\" border=\"0\" cellspacing=\"o\" width=\"100%\">\n");
            writer.Write("    <tr>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\" height=\"25px\"><input type=\"button\" class=\"normalButtons\" value=\"Add New SkinPreview\" name=\"AddNew\" onClick=\"self.location='editSkinPreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "';\"></td>\n");
            writer.Write("      <td colspan=\"6\"></td>\n");
            writer.Write("    </tr>\n");
            writer.Write("    <tr class=\"tablenormal\">\n");
            writer.Write("      <td width=\"10%\" align=\"left\" valign=\"middle\">Skin ID</td>\n");
            writer.Write("      <td width=\"20%\" align=\"left\" valign=\"middle\">Name</td>\n");
            writer.Write("      <td width=\"30%\" align=\"left\" valign=\"middle\">Thumbnail</td>\n");
            writer.Write("      <td width=\"10%\" align=\"left\" valign=\"middle\">Edit</td>\n");
            writer.Write("      <td width=\"10%\" align=\"left\" valign=\"middle\">Set As Default</td>\n");
            writer.Write("      <td width=\"10%\" align=\"left\" valign=\"middle\">Delete</td>\n");
            writer.Write("    </tr>\n");

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS(sql, con))
                {
                    while (rs.Read())
                    {
                        bool okToShow = true;
                        if (DB.RSField(rs, "Name").Equals("ADMIN_SUPERUSER", StringComparison.InvariantCultureIgnoreCase) &&
                            !ThisCustomer.IsAdminSuperUser)
                        {
                            okToShow = false;
                        }
                        if (okToShow)
                        {
                            writer.Write("    <tr bgcolor=\"" + AppLogic.AppConfig("LightCellColor") + "\">\n");
                            writer.Write("      <td valign=\"top\" align=\"left\">");

                            if (AppLogic.AppConfigUSInt("DefaultSkinID") == DB.RSFieldInt(rs, "SkinPreviewID"))
                            {
                                writer.Write("<b>*" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "</b>");
                            }
                            else
                            {
                                writer.Write(DB.RSFieldInt(rs, "SkinPreviewID").ToString());
                            }
                            writer.Write("</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\"><a href=\"editSkinPreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "&SkinPreviewID=" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "\">" + DB.RSField(rs, "Name") + "</a></td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\">");
                            String Image1URL = AppLogic.LookupImage("SkinPreviews", DB.RSFieldInt(rs, "SkinPreviewID"), "icon", SkinID, ThisCustomer.LocaleSetting);

                            String MediumPic = AppLogic.LookupImage("SkinPreviews", DB.RSFieldInt(rs, "SkinPreviewID"), "medium", SkinID, ThisCustomer.LocaleSetting);
                            bool HasMediumPic = (MediumPic.Length != 0);
                            writer.Write("<a href=\"editSkinPreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "&SkinPreviewID=" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "\">");
                            writer.Write("<img src=\"" + Image1URL + "\" border=\"0\" align=\"absmiddle\">");
                            writer.Write("</a>&nbsp;\n");
                            if (HasMediumPic)
                            {
                                writer.Write("<br/><img src=\"images/spacer.gif\" width=\"1\" height=\"4\"><br/>");
                                writer.Write("<div><a href=\"" + MediumPic + "\" target=\"_blank\">(view larger thumbnail)</a></div><br/>");
                            }
                            writer.Write("</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\"><input type=\"button\" value=\"Edit\" name=\"Edit_" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "\" onClick=\"self.location='editSkinPreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "&SkinPreviewID=" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "'\"></td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\">");
                            writer.Write("<input type=\"button\" value=\"Set As Default Store Skin\" name=\"SetAsDefault_" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "\" onClick=\"SetAsDefaultSkin(" + DB.RSFieldInt(rs, "SkinID").ToString() + ")\">");

                            writer.Write("<br/><img src=\"images/spacer.gif\" width=\"1\" height=\"4\"><br/>");
                            writer.Write("<div><a href=\"" + AppLogic.GetStoreHTTPLocation(true) + "default.aspx?skinid=" + DB.RSFieldInt(rs, "SkinID").ToString() + "\" target=\"_blank\">(open store in this skin)</a></div><br/>");

                            writer.Write("</td>\n");
                            writer.Write("      <td align=\"left\" valign=\"middle\" height=\"25px\"><input type=\"button\" class=\"normalButtons\" value=\"Delete\" name=\"Delete_" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + "\" onClick=\"DeleteSkinPreview(" + DB.RSFieldInt(rs, "SkinPreviewID").ToString() + ")\"></td>\n");
                            writer.Write("    </tr>\n");
                        }
                    }
                }
            }

            writer.Write("    <tr>\n");
            writer.Write("      <td align=\"left\" valign=\"middle\"  height=\"25px\"><input type=\"button\" class=\"normalButtons\" value=\"Add New Skin Preview\" name=\"AddNew\" onClick=\"self.location='editSkinPreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "';\"></td>\n");
            writer.Write("      <td colspan=\"6\"></td>\n");
            writer.Write("    </tr>\n");
            writer.Write("  </table>\n");
            writer.Write("</form>\n");

            writer.Write("</center></b>\n");

            writer.Write("<script type=\"text/javascript\">\n");

            writer.Write("function DeleteSkinPreview(id)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to delete Skin Preview: ' + id + '.\\n\\nNOTE: THIS DOES NOT DELETE ANY SKINS OR SKIN FILES!!! ONLY THE PREVIEW IS DELETED!'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'skinpreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "&deleteid=' + id;\n");
            writer.Write("}\n");
            writer.Write("}\n");

            writer.Write("function SetAsDefaultSkin(skinid)\n");
            writer.Write("{\n");
            writer.Write("if(confirm('Are you sure you want to make skin: ' + skinid + ' the active default skin for your storefront?'))\n");
            writer.Write("{\n");
            writer.Write("self.location = 'skinpreview.aspx?GroupName=" + Server.UrlEncode(GroupName) + "&beginsWith=" + Server.UrlEncode(BeginsWith) + "&searchfor=" + Server.UrlEncode(SearchFor) + "&defaultskinid=' + skinid;\n");
            writer.Write("}\n");
            writer.Write("}\n");

            writer.Write("</SCRIPT>\n");

        }

    }
}
