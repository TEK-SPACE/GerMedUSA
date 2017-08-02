// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Globalization;
using System.Collections;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontWSI;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for showproduct.
    /// </summary>
    public partial class showproduct : SkinBase
    {
        int ProductID;
        bool IsAKit;
        bool IsAPack;
        bool RequiresReg;
        String ProductName;
        private String m_XmlPackage;

        String CategoryName;
        String SectionName;
        String ManufacturerName;
        String DistributorName;
        String GenreName;
        String VectorName;

        int CategoryID;
        int SectionID;
        int ManufacturerID;
        int DistributorID;
        int GenreID;
        int VectorID;

        EntityHelper CategoryHelper;
        EntityHelper SectionHelper;
        EntityHelper ManufacturerHelper;
        EntityHelper DistributorHelper;
        EntityHelper GenreHelper;
        EntityHelper VectorHelper;

        string SourceEntity = "Category";
        int SourceEntityID = 0;

        private string m_PageOutput = string.Empty;

        protected void Page_Load(object sender, System.EventArgs e)
        {

            if (AppLogic.AppConfigBool("GoNonSecureAgain"))
            {
                SkinBase.GoNonSecureAgain();
            }

            ProductID = CommonLogic.QueryStringUSInt("ProductID");
            CategoryID = CommonLogic.QueryStringUSInt("CategoryID");
            SectionID = CommonLogic.QueryStringUSInt("SectionID");
            ManufacturerID = CommonLogic.QueryStringUSInt("ManufacturerID");
            DistributorID = CommonLogic.QueryStringUSInt("DistributorID");
            GenreID = CommonLogic.QueryStringUSInt("GenreID");
            VectorID = CommonLogic.QueryStringUSInt("VectorID");

            String ActualSEName = string.Empty;

            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("select * from Product  with (NOLOCK)  where Deleted=0 and ProductID=" + ProductID.ToString(), dbconn))
                {
                    if (!rs.Read())
                    {
                        Response.Redirect(SE.MakeDriverLink("ProductNotFound"));
                    }
                    else
                    {
                        bool a = DB.RSFieldBool(rs, "Published");
                        if (!a)
                        {
                            Response.Redirect(SE.MakeDriverLink("ProductNotFound"));
                        }
                    }

                    String SENameINURL = CommonLogic.QueryStringCanBeDangerousContent("SEName");
                    ActualSEName = SE.MungeName(DB.RSField(rs, "SEName"));
                    if (ActualSEName != SENameINURL)
                    {
                        String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);

                        string QStr = "?";
                        for (int i = 0; i < Request.QueryString.Count; i++)
                        {
                            string key = Request.QueryString.GetKey(i);
                            if ((key.Equals("productid", StringComparison.InvariantCultureIgnoreCase)) == false && (key.Equals("sename", StringComparison.InvariantCultureIgnoreCase)) == false)
                            {
                                QStr += key + "=" + Request.QueryString[i] + "&";
                            }
                        }
                        if (QStr.Length > 1)
                        {
                            NewURL += QStr;
                        }

                        HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                        Response.Status = "301 Moved Permanently";
                        Response.AddHeader("Location", NewURL);
                        HttpContext.Current.Response.End();
                    }

                    if (CommonLogic.FormCanBeDangerousContent("IsKitSubmit") == "true")
                    {
                        ThisCustomer.RequireCustomerRecord();
                        AppLogic.ProcessKitForm(ThisCustomer, ProductID);
                        if (CommonLogic.FormUSInt("CartRecID") > 0)
                        {
                            switch (ShoppingCart.CartTypeFromRecID(CommonLogic.FormUSInt("CartRecID")))
                            {
                                case CartTypeEnum.GiftRegistryCart:
                                    Response.Redirect("giftregistry.aspx");
                                    break;
                                case CartTypeEnum.ShoppingCart:
                                    Response.Redirect("shoppingcart.aspx");
                                    break;
                                case CartTypeEnum.WishCart:
                                    Response.Redirect("wishlist.aspx");
                                    break;
                            }
                        }
                    }
                    m_XmlPackage = DB.RSField(rs, "XmlPackage").ToLowerInvariant();
                    IsAKit = DB.RSFieldBool(rs, "IsAKit");
                    IsAPack = DB.RSFieldBool(rs, "IsAPack");
                    if (m_XmlPackage.Length == 0)
                    {
                        if (IsAKit)
                        {
                            m_XmlPackage = AppLogic.ro_DefaultProductKitXmlPackage; // provide a default
                        }
                        else if (IsAPack)
                        {
                            m_XmlPackage = AppLogic.ro_DefaultProductPackXmlPackage; // provide a default
                        }
                        else
                        {
                            m_XmlPackage = AppLogic.ro_DefaultProductXmlPackage; // provide a default
                        }
                    }
                    RequiresReg = DB.RSFieldBool(rs, "RequiresRegistration");
                    ProductName = DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting);

                    CategoryHelper = AppLogic.LookupHelper("Category");
                    SectionHelper = AppLogic.LookupHelper("Section");
                    ManufacturerHelper = AppLogic.LookupHelper("Manufacturer");
                    DistributorHelper = AppLogic.LookupHelper("Distributor");
                    GenreHelper = AppLogic.LookupHelper("Genre");
                    VectorHelper = AppLogic.LookupHelper("Vector");

                    String SEName = String.Empty;
                    if (DB.RSFieldByLocale(rs, "SETitle", ThisCustomer.LocaleSetting).Length == 0)
                    {
                        SETitle = Security.HtmlEncode(AppLogic.AppConfig("StoreName") + " - " + ProductName);
                    }
                    else
                    {
                        SETitle = DB.RSFieldByLocale(rs, "SETitle", ThisCustomer.LocaleSetting);
                    }
                    if (DB.RSFieldByLocale(rs, "SEDescription", ThisCustomer.LocaleSetting).Length == 0)
                    {
                        SEDescription = Security.HtmlEncode(ProductName);
                    }
                    else
                    {
                        SEDescription = DB.RSFieldByLocale(rs, "SEDescription", ThisCustomer.LocaleSetting);
                    }
                    if (DB.RSFieldByLocale(rs, "SEKeywords", ThisCustomer.LocaleSetting).Length == 0)
                    {
                        SEKeywords = Security.HtmlEncode(ProductName);
                    }
                    else
                    {
                        SEKeywords = DB.RSFieldByLocale(rs, "SEKeywords", ThisCustomer.LocaleSetting);
                    }
                    SENoScript = DB.RSFieldByLocale(rs, "SENoScript", ThisCustomer.LocaleSetting);
                }
            }

            //Log all views of unknown and registered customer
            if (!AppLogic.ProductIsMLExpress() && (AppLogic.AppConfigBool("DynamicRelatedProducts.Enabled") || AppLogic.AppConfigBool("RecentlyViewedProducts.Enabled")))
            {                
                ThisCustomer.LogProductView(ProductID);
            }

            CategoryName = CategoryHelper.GetEntityName(CategoryID, ThisCustomer.LocaleSetting);
            SectionName = SectionHelper.GetEntityName(SectionID, ThisCustomer.LocaleSetting);
            ManufacturerName = ManufacturerHelper.GetEntityName(ManufacturerID, ThisCustomer.LocaleSetting);
            DistributorName = DistributorHelper.GetEntityName(DistributorID, ThisCustomer.LocaleSetting);
            GenreName = GenreHelper.GetEntityName(GenreID, ThisCustomer.LocaleSetting);
            VectorName = VectorHelper.GetEntityName(VectorID, ThisCustomer.LocaleSetting);

            String SourceEntityInstanceName = String.Empty;

            if (ManufacturerID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", ManufacturerID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", ManufacturerName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }
            else if (DistributorID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_DistributorEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", DistributorID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", DistributorName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }
            else if (GenreID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_GenreEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", GenreID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", GenreName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }
            else if (VectorID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_VectorEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", VectorID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", VectorName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }
            else if (CategoryID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", CategoryID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", CategoryName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }
            else if (SectionID != 0)
            {
                AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_SectionEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceID", SectionID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                AppLogic.SetCookie("LastViewedEntityInstanceName", SectionName, new TimeSpan(1, 0, 0, 0, 0));
                String NewURL = AppLogic.GetStoreHTTPLocation(false) + SE.MakeProductLink(ProductID, ActualSEName);
                HttpContext.Current.Response.Write("<html><head><title>Object Moved</title></head><body><b>Object moved to <a href=\"" + NewURL + "\">HERE</a></b></body></html>");
                Response.Status = "301 Moved Permanently";
                Response.AddHeader("Location", NewURL);
                HttpContext.Current.Response.End();
            }

            SourceEntity = CommonLogic.CookieCanBeDangerousContent("LastViewedEntityName", true);
            SourceEntityInstanceName = CommonLogic.CookieCanBeDangerousContent("LastViewedEntityInstanceName", true);
            SourceEntityID = CommonLogic.CookieUSInt("LastViewedEntityInstanceID");

            // validate that source entity id is actually valid for this product:
            if (SourceEntityID != 0)
            {
                String sqlx = "select count(*) as N from dbo.productentity with (NOLOCK) where ProductID=" + ProductID.ToString() + " and EntityID=" + SourceEntityID.ToString() + " and EntityType = " + DB.SQuote(SourceEntity);
                if (DB.GetSqlN(sqlx) == 0)
                {
                    SourceEntityID = 0;
                }
            }

            // we had no entity context coming in, try to find a category context for this product, so they have some context if possible:
            if (SourceEntityID == 0)
            {
                SourceEntityID = EntityHelper.GetProductsFirstEntity(ProductID, EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName);
                if (SourceEntityID > 0)
                {
                    CategoryID = SourceEntityID;
                    CategoryName = CategoryHelper.GetEntityName(CategoryID, ThisCustomer.LocaleSetting);
                    AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceID", CategoryID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceName", CategoryName, new TimeSpan(1, 0, 0, 0, 0));
                    SourceEntity = EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName;
                    SourceEntityInstanceName = CategoryName;
                }
            }

            // we had no entity context coming in, try to find a section context for this product, so they have some context if possible:
            if (SourceEntityID == 0)
            {
                SourceEntityID = EntityHelper.GetProductsFirstEntity(ProductID, EntityDefinitions.readonly_SectionEntitySpecs.m_EntityName);
                if (SourceEntityID > 0)
                {
                    SectionID = SourceEntityID;
                    SectionName = CategoryHelper.GetEntityName(SectionID, ThisCustomer.LocaleSetting);
                    AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_SectionEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceID", SectionID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceName", SectionName, new TimeSpan(1, 0, 0, 0, 0));
                    SourceEntity = EntityDefinitions.readonly_SectionEntitySpecs.m_EntityName;
                    SourceEntityInstanceName = SectionName;
                }
            }

            // we had no entity context coming in, try to find a Manufacturer context for this product, so they have some context if possible:
            if (SourceEntityID == 0)
            {
                SourceEntityID = EntityHelper.GetProductsFirstEntity(ProductID, EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName);
                if (SourceEntityID > 0)
                {
                    ManufacturerID = SourceEntityID;
                    ManufacturerName = CategoryHelper.GetEntityName(ManufacturerID, ThisCustomer.LocaleSetting);
                    AppLogic.SetCookie("LastViewedEntityName", EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName, new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceID", ManufacturerID.ToString(), new TimeSpan(1, 0, 0, 0, 0));
                    AppLogic.SetCookie("LastViewedEntityInstanceName", ManufacturerName, new TimeSpan(1, 0, 0, 0, 0));
                    SourceEntity = EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName;
                    SourceEntityInstanceName = ManufacturerName;
                }
            }

            // build up breadcrumb if we need:
            SectionTitle = Breadcrumb.GetProductBreadcrumb(ProductID, ProductName, SourceEntity, SourceEntityID, ThisCustomer);

            if (IsAPack && CommonLogic.QueryStringCanBeDangerousContent("cartrecid") == "")
            {
                // Do this so that any preset items are in the CustomCart before the XML used in the package transform is generated.
                decimal PresetPackPrice = System.Decimal.Zero;
                string PresetPackProducts = String.Empty;
                AppLogic.PresetPack(ThisCustomer, ProductID, CartTypeEnum.ShoppingCart, out PresetPackPrice, out PresetPackProducts);
            }

            if (RequiresReg && !ThisCustomer.IsRegistered)
            {
                m_PageOutput += "<br/><br/><br/><br/><b>" + AppLogic.GetString("showproduct.aspx.1", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/><br/><a href=\"signin.aspx?returnurl=showproduct.aspx?" + Security.HtmlEncode(Security.UrlEncode(CommonLogic.ServerVariables("QUERY_STRING"))) + "\">" + AppLogic.GetString("showproduct.aspx.2", SkinID, ThisCustomer.LocaleSetting) + "</a> " + AppLogic.GetString("showproduct.aspx.3", SkinID, ThisCustomer.LocaleSetting);
            }
            else
            {
                DB.ExecuteSQL("update product set Looks=Looks+1 where ProductID=" + ProductID.ToString());
                m_PageOutput = "<!-- XmlPackage: " + m_XmlPackage + " -->\n";
                if (m_XmlPackage.Length == 0)
                {
                    m_PageOutput += "<p><b><font color=red>XmlPackage format was chosen, but no XmlPackage was specified!</font></b></p>";
                }
                else
                {
                    using (XmlPackage2 p = new XmlPackage2(m_XmlPackage, ThisCustomer, SkinID, "", "EntityName=" + SourceEntity + "&EntityID=" + SourceEntityID.ToString() + CommonLogic.IIF(CommonLogic.ServerVariables("QUERY_STRING").IndexOf("cartrecid") != -1, "&cartrecid=" + CommonLogic.QueryStringUSInt("cartrecid").ToString(), "&showproduct=1"), String.Empty, true))
                    {
                        m_PageOutput += AppLogic.RunXmlPackage(p, base.GetParser, ThisCustomer, SkinID, true, true);
                        if (p.SectionTitle != "")
                        {
                            SectionTitle = p.SectionTitle;
                        }
                        if (p.SETitle != "")
                        {
                            SETitle = p.SETitle;
                        }
                        if (p.SEDescription != "")
                        {
                            SEDescription = p.SEDescription;
                        }
                        if (p.SEKeywords != "")
                        {
                            SEKeywords = p.SEKeywords;
                        }
                        if (p.SENoScript != "")
                        {
                            SENoScript = p.SENoScript;
                        }
                    }
                }
            }
            AppLogic.eventHandler("ViewProductPage").CallEvent("&ViewProductPage=true");
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {

            writer.Write(m_PageOutput);
        }

        override protected void OnPreInit(EventArgs e)
        {
            if (AppLogic.AppConfigBool("TemplateSwitching.Enabled") && AppLogic.ProductIsMLExpress() == false)
            {
                String HT = String.Empty;
                if (CommonLogic.QueryStringUSInt("CategoryID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName);
                }
                else if (CommonLogic.QueryStringUSInt("SectionID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_SectionEntitySpecs.m_EntityName);
                }
                else if (CommonLogic.QueryStringUSInt("ManufacturerID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_ManufacturerEntitySpecs.m_EntityName);
                }
                else if (CommonLogic.QueryStringUSInt("DistributorID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_DistributorEntitySpecs.m_EntityName);
                }
                else if (CommonLogic.QueryStringUSInt("GenreID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_GenreEntitySpecs.m_EntityName);
                }
                else if (CommonLogic.QueryStringUSInt("VectorID") != 0)
                {
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_VectorEntitySpecs.m_EntityName);
                }
                else
                {
                    // try to pull from cookie
                    String TemplateSourceEntity = CommonLogic.CookieCanBeDangerousContent("LastViewedEntityName", true);
                    int TemplateSourceEntityID = CommonLogic.CookieUSInt("LastViewedEntityInstanceID");
                    if (TemplateSourceEntity.Length != 0 && TemplateSourceEntityID > 0)
                    {
                        HT = AppLogic.GetCurrentEntityTemplateName(TemplateSourceEntity, TemplateSourceEntityID);
                    }
                }

                if (HT.Length == 0)
                {
                    int FirstCategoryID = AppLogic.GetFirstProductEntityID(AppLogic.LookupHelper("Category"), CommonLogic.QueryStringUSInt("ProductID"), false);
                    HT = AppLogic.GetCurrentEntityTemplateName(EntityDefinitions.readonly_CategoryEntitySpecs.m_EntityName, FirstCategoryID);
                }
                SetTemplate(HT);
            }
            base.OnPreInit(e);
        }

    }
}
