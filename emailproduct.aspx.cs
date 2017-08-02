// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT.
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Data;
using System.Text;
using System.Globalization;
using System.Data.SqlClient;

using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for EMailproduct.
    /// </summary>
    public partial class EMailproduct : SkinBase
    {
        int ProductID;
        String ProductName = string.Empty;
        String VariantName = string.Empty;
        String SEName = string.Empty;
        String ProductDescription = string.Empty;
        bool RequiresReg;

        int CategoryID;
        int SectionID;
        int ManufacturerID;

        String CategoryName;
        String SectionName;
        String ManufacturerName;

        string SourceEntity = "Category";
        int SourceEntityID = 0;

        protected void Page_Load(object sender, EventArgs e)
        {
            ProductID = CommonLogic.QueryStringUSInt("ProductID");
            EntityHelper CategoryHelper = AppLogic.LookupHelper("Category");

            if (AppLogic.AppConfigBool("GoNonSecureAgain"))
            {
                SkinBase.GoNonSecureAgain();
            }
            // DOS attack prevention:
            if (AppLogic.OnLiveServer() && (Request.UrlReferrer == null || Request.UrlReferrer.Authority != Request.Url.Authority))
            {
                Response.Redirect(SE.MakeDriverLink("EmailError")); 
            }
            if (ProductID == 0)
            {
                Response.Redirect("default.aspx");
            }
            if (AppLogic.ProductHasBeenDeleted(ProductID))
            {
                Response.Redirect(SE.MakeDriverLink("ProductNotFound"));
            }

            using (SqlConnection conn = DB.dbConn())
            {
                conn.Open();
                using (IDataReader rs = DB.GetRS("select p.*, pv.name variantname from product p  with (NOLOCK)  join productvariant pv  with (NOLOCK)  on p.ProductID = pv.ProductID and pv.isdefault = 1 where p.ProductID=" + ProductID.ToString(), conn))
                {
                    if (!rs.Read())
                    {
                        Response.Redirect("default.aspx");
                    }
                    SEName = DB.RSField(rs, "SEName");
                    ProductName = DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting);
                    VariantName = DB.RSFieldByLocale(rs, "VariantName", ThisCustomer.LocaleSetting);

                    RequiresReg = DB.RSFieldBool(rs, "RequiresRegistration");
                    ProductDescription = DB.RSFieldByLocale(rs, "Description", ThisCustomer.LocaleSetting); 
                    if (AppLogic.ReplaceImageURLFromAssetMgr)
                    {
                        ProductDescription = ProductDescription.Replace("../images", "images");
                    }
                    String FileDescription = new ProductDescriptionFile(ProductID, ThisCustomer.LocaleSetting, SkinID).Contents;
                    if (FileDescription.Length != 0)
                    {
                        ProductDescription += "<div align=\"left\">" + FileDescription + "</div>";
                    }
                }
            }

            String SourceEntityInstanceName = String.Empty;

            SourceEntity = CommonLogic.CookieCanBeDangerousContent("LastViewedEntityName", true);
            SourceEntityInstanceName = CommonLogic.CookieCanBeDangerousContent("LastViewedEntityInstanceName", true);
            SourceEntityID = CommonLogic.CookieUSInt("LastViewedEntityInstanceID");

            // validate that source entity id is actually valid for this product:
            if (SourceEntityID != 0)
            {
                String sqlx = "select count(*) as N from dbo.productentity  with (NOLOCK)  where ProductID=" + ProductID.ToString() + " and EntityID=" + SourceEntityID.ToString() + " and EntityType = " + DB.SQuote(SourceEntity);
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

            reqToAddress.ErrorMessage = AppLogic.GetString("emailproduct.aspx.13", SkinID, ThisCustomer.LocaleSetting);
            regexToAddress.ErrorMessage = AppLogic.GetString("emailproduct.aspx.14", SkinID, ThisCustomer.LocaleSetting);
            reqFromAddress.ErrorMessage = AppLogic.GetString("emailproduct.aspx.16", SkinID, ThisCustomer.LocaleSetting);
            regexFromAddress.ErrorMessage = AppLogic.GetString("emailproduct.aspx.17", SkinID, ThisCustomer.LocaleSetting);

            if (!this.IsPostBack)
            {
                InitializePageContent();
            }
        }

        private void InitializePageContent()
        {
            pnlRequireReg.Visible = (RequiresReg && !ThisCustomer.IsRegistered);
            this.pnlEmailToFriend.Visible = !(RequiresReg && !ThisCustomer.IsRegistered);

            emailproduct_aspx_1.Text = "<br/><br/><br/><br/><b>" + AppLogic.GetString("emailproduct.aspx.1", SkinID, ThisCustomer.LocaleSetting) + "</b><br/><br/><br/><a href=\"signin.aspx?returnurl=showproduct.aspx?" + Server.HtmlEncode(Server.UrlEncode(CommonLogic.ServerVariables("QUERY_STRING"))) + "\">" + AppLogic.GetString("emailproduct.aspx.2", SkinID, ThisCustomer.LocaleSetting) + "</a> " + AppLogic.GetString("emailproduct.aspx.3", SkinID, ThisCustomer.LocaleSetting);

            String ProdPic = String.Empty;
            bool m_WatermarksEnabled = AppLogic.AppConfigBool("Watermark.Enabled");
            if (m_WatermarksEnabled)
            {
                ProdPic = String.Format("wolthuis.aspx?productid={0}&size=medium", ProductID.ToString());
            }
            else
            {
                ProdPic = AppLogic.LookupImage("Product", ProductID, "medium", SkinID, ThisCustomer.LocaleSetting);
            }
            imgProduct.ImageUrl = ProdPic;
            ProductNavLink.NavigateUrl = SE.MakeProductAndEntityLink(this.SourceEntity, ProductID, SourceEntityID, SEName); 
            ProductNavLink.Text = AppLogic.GetString("emailproduct.aspx.24", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_4.Text = AppLogic.GetString("emailproduct.aspx.4", SkinID, ThisCustomer.LocaleSetting) + " " + ProductName + CommonLogic.IIF(VariantName.Length > 0, " - " + VariantName, "");
            emailproduct_aspx_11.Text = AppLogic.GetString("emailproduct.aspx.11", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_12.Text = AppLogic.GetString("emailproduct.aspx.12", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_22.Text = AppLogic.GetString("emailproduct.aspx.22", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_15.Text = AppLogic.GetString("emailproduct.aspx.15", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_18.Text = AppLogic.GetString("emailproduct.aspx.18", SkinID, ThisCustomer.LocaleSetting);
            emailproduct_aspx_19.Text = AppLogic.GetString("emailproduct.aspx.19", SkinID, ThisCustomer.LocaleSetting);
            txtMessage.Text = AppLogic.GetString("emailproduct.aspx.23", SkinID, ThisCustomer.LocaleSetting);
            btnSubmit.Text = AppLogic.GetString("emailproduct.aspx.20", SkinID, ThisCustomer.LocaleSetting);
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            Page.Validate();
            if (Page.IsValid)
            {
                String FromAddress = txtFromAddress.Text;
                String ToAddress = txtToAddress.Text;
                String BotAddress = AppLogic.AppConfig("ReceiptEMailFrom");
                String Subject = AppLogic.AppConfig("StoreName") + " - " + ProductName;
                StringBuilder Body = new StringBuilder(4096);
                Body.Append(AppLogic.RunXmlPackage("notification.emailproduct.xml.config", null, ThisCustomer, SkinID, "", "Subject=" + Subject, false, false, this.EntityHelpers));
                
                AppLogic.SendMail(Subject, Body.ToString(), true, BotAddress, BotAddress, ToAddress, ToAddress, "", FromAddress, AppLogic.MailServer());
                emailproduct_aspx_8.Text = AppLogic.GetString("emailproduct.aspx.8", SkinID, ThisCustomer.LocaleSetting);
                pnlSuccess.Visible = true;
                pnlRequireReg.Visible = false;
                pnlEmailToFriend.Visible = false;
                ReturnToProduct.Text = AppLogic.GetString("emailproduct.aspx.10", SkinID, ThisCustomer.LocaleSetting);
                ReturnToProduct.NavigateUrl = SE.MakeProductAndEntityLink(this.SourceEntity, ProductID, SourceEntityID,SEName);
            }
            else
            {
                InitializePageContent();
            }
        }

        override protected void OnPreInit(EventArgs e)
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
            SetTemplate(HT);
            base.OnPreInit(e);
        }


    }
}
