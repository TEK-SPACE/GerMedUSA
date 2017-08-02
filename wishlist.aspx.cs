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
using AspDotNetStorefrontCore;

namespace AspDotNetStorefront
{
    /// <summary>
    /// Summary description for wishlist.
    /// </summary>
    public partial class wishlist : SkinBase
    {
        ShoppingCart cart;
        String BACKURL = String.Empty;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            this.RequireCustomerRecord();
            SectionTitle = AppLogic.GetString("wishlist.aspx.1", SkinID, ThisCustomer.LocaleSetting);

            // make sure we don't have "JUST" deleted or unpublished items hanging around
            ShoppingCart.ClearDeletedAndUnPublishedProducts(ThisCustomer.CustomerID);

            int MoveToCartID = CommonLogic.QueryStringUSInt("MoveToCartID");
            if (MoveToCartID != 0)
            {
                int productId = 0;                
                int quantity = 0;
                bool isAKit = false;
                bool existing = false;

                using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                {
                    dbconn.Open();
                    using (IDataReader reader = DB.GetRS(string.Format("SELECT ProductID, IsAKit, Quantity FROM ShoppingCart WHERE ShoppingCartRecID = {0}", MoveToCartID),dbconn))
                    {
                        existing = reader.Read();
                        if (existing)
                        {
                            productId = DB.RSFieldInt(reader, "ProductID");
                            isAKit = DB.RSFieldBool(reader, "IsAKit");
                            quantity = DB.RSFieldInt(reader, "Quantity");
                        }
                    }
                
                }
             
                if(isAKit)
                {
                    cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.ShoppingCart, 0, false);

                    KitComposition wishCartItemComposition = KitComposition.FromCart(ThisCustomer, CartTypeEnum.WishCart, MoveToCartID);

                    bool cartItemWithSameCompositionFound = false;

                    foreach(CartItem thisCartItem in cart.CartItems)
                    {
                        if(thisCartItem.m_IsAKit)
                        {
                            KitComposition cartItemCompositionToMatchWith = KitComposition.FromCart(ThisCustomer, CartTypeEnum.ShoppingCart, thisCartItem.m_ShoppingCartRecordID);

                            if(wishCartItemComposition.Matches(cartItemCompositionToMatchWith))
                            {
                                cartItemWithSameCompositionFound = true;
                                thisCartItem.IncrementQuantity(quantity);

                                DB.ExecuteSQL(string.Format("DELETE KitCart WHERE ShoppingCartRecID = {0}", MoveToCartID));
                                DB.ExecuteSQL(string.Format("DELETE ShoppingCart WHERE ShoppingCartRecID = {0}", MoveToCartID));
                                break;
                            }
                        }
                    }

                    // wish cart item composition doesn't match with any Shopping Cart Item..
                    if(!cartItemWithSameCompositionFound)
                    {
                        DB.ExecuteSQL(string.Format("UPDATE ShoppingCart SET CartType = {0} WHERE ShoppingCartRecID = {1}", (int)CartTypeEnum.ShoppingCart, MoveToCartID));
                    }
                }
                else
                {
                    DB.ExecuteSQL("dbo.aspdnsf_MoveToShoppingCart " + MoveToCartID.ToString() + ", " + ((int)CartTypeEnum.WishCart).ToString());
                }
                
                Response.Redirect("ShoppingCart.aspx");
            }

            string[] formkeys = Request.Form.AllKeys;
            foreach (String s in formkeys)
            {
                if (s == "bt_Delete")
                {
                    UpdateWishList();
                    cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.WishCart, 0, false);
                    InitializePageContent();
                }
            }
            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.WishCart, 0, false);
            if (!IsPostBack)
            {
                string ReturnURL = CommonLogic.QueryStringCanBeDangerousContent("ReturnUrl");
                AppLogic.CheckForScriptTag(ReturnURL);
                ViewState["ReturnURL"] = ReturnURL;
                InitializePageContent();
            }
        }

        public void btnUpdateWishList1_Click(object sender, EventArgs e)
        {
            UpdateWishList();
            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.WishCart, 0, false);
            InitializePageContent();
        }

        public void btnUpdateWishList2_Click(object sender, EventArgs e)
        {
            UpdateWishList();
            cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.WishCart, 0, false);
            InitializePageContent();
        }

        protected void btnContinueShopping1_Click(object sender, EventArgs e)
        {
            if (ViewState["ReturnURL"].ToString() == "")
            {
                Response.Redirect(AppLogic.GetCartContinueShoppingURL(SkinID, ThisCustomer.LocaleSetting));
            }
            else
            {
                Response.Redirect(ViewState["ReturnURL"].ToString());
            }
        }
        protected void btnContinueShopping2_Click(object sender, EventArgs e)
        {
            if (ViewState["ReturnURL"].ToString() == "")
            {
                Response.Redirect(AppLogic.GetCartContinueShoppingURL(SkinID, ThisCustomer.LocaleSetting));
            }
            else
            {
                Response.Redirect(ViewState["ReturnURL"].ToString());
            }
        }

        private void InitializePageContent()
        {
            if (cart == null)
            {
                cart = new ShoppingCart(SkinID, ThisCustomer, CartTypeEnum.WishCart, 0, false);
            }

            String XmlPackageName = AppLogic.AppConfig("XmlPackage.WishListPageHeader");
            if (XmlPackageName.Length != 0)
            {
                XmlPackage_WishListPageHeader.Text = AppLogic.RunXmlPackage(XmlPackageName, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true, this.EntityHelpers);
            }

            String CartTopControlLinesXmlPackage = AppLogic.AppConfig("XmlPackage.WishListPageTopControlLines");
            if (CartTopControlLinesXmlPackage.Length != 0)
            {
                XmlPackage_WishListPageTopControlLines.Text = AppLogic.RunXmlPackage(CartTopControlLinesXmlPackage, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
                XmlPackage_WishListPageTopControlLines.Visible = true;
            }
            else
            {
                pnlTopControlLines.Visible = true;
                btnContinueShopping1.Text = AppLogic.GetString("shoppingcart.cs.62",ThisCustomer.SkinID,ThisCustomer.LocaleSetting);
                btnContinueShopping1.Attributes.Add("onclick", "self.location='" + BACKURL + "'");
                if (!cart.IsEmpty())
                {
                    btnUpdateWishList1.Text = AppLogic.GetString("shoppingcart.cs.108", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                }
                else
                {
                    btnUpdateWishList1.Visible = false;
                }
            }

            tblWishList.Attributes.Add("style", "border-style: solid; border-width: 0px; border-color: #" + AppLogic.AppConfig("HeaderBGColor"));
            tblWishListBox.Attributes.Add("style", AppLogic.AppConfig("BoxFrameStyle"));
            wishlist_gif.ImageUrl = AppLogic.LocateImageURL("skins/Skin_" + SkinID.ToString() + "/images/wishlist.gif");

            String CartItemsXmlPackage = AppLogic.AppConfig("XmlPackage.WishListPageItems");
            if (CartItemsXmlPackage.Length != 0)
            {
                CartItems.Text = AppLogic.RunXmlPackage(CartItemsXmlPackage, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
            }
            else
            {
                CartItems.Text = cart.DisplayItems(false, ThisCustomer, true) + "<br/>";

                int ItemsInWishListNow = ShoppingCart.NumItems(ThisCustomer.CustomerID, CartTypeEnum.WishCart);
                if (cart.CartType == CartTypeEnum.WishCart)
                {
                    if (ThisCustomer != null && !ThisCustomer.IsRegistered && !AppLogic.AppConfigBool("DisallowAnonCustomerToCreateWishlist") && ItemsInWishListNow > 0)
                    {
                        lblWishlistMessage.Text = AppLogic.GetString("wishlist.aspx.4", SkinID, ThisCustomer.LocaleSetting);
                    }
                    else
                    {
                        lblWishlistMessage.Visible = false;
                    }
                }
            }

            String CartBottomControlLinesXmlPackage = AppLogic.AppConfig("XmlPackage.WishListPageBottomControlLines");
            if (CartBottomControlLinesXmlPackage.Length != 0)
            {
                Xml_WishListPageBottomControlLines.Text = AppLogic.RunXmlPackage(CartBottomControlLinesXmlPackage, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
                Xml_WishListPageBottomControlLines.Visible = true;
            }
            else
            {
                pnlBottomControlLines.Visible = true;
                btnContinueShopping2.Text = AppLogic.GetString("shoppingcart.cs.62", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                btnContinueShopping2.Attributes.Add("onclick", "self.location='" + BACKURL + "'");
                if (!cart.IsEmpty())
                {
                    btnUpdateWishList2.Text = AppLogic.GetString("shoppingcart.cs.108", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) ;
                }
                else
                {
                    btnUpdateWishList2.Visible = false;
                }
            }

            String XmlPackageName2 = AppLogic.AppConfig("XmlPackage.WishListPageFooter");
            if (XmlPackageName2.Length != 0)
            {
                Xml_WishListPageFooter.Text = AppLogic.RunXmlPackage(XmlPackageName2, base.GetParser, ThisCustomer, SkinID, String.Empty, String.Empty, true, true);
            }

            GetJSFunctions();
        }

        private void UpdateWishList()
        {
            for (int i = 0; i <= Request.Form.Count - 1; i++)
            {
                String fld = Request.Form.Keys[i];
                String fldval = Request.Form[Request.Form.Keys[i]];
                int recID;
                String quantity;
                if (fld.StartsWith("quantity", StringComparison.InvariantCultureIgnoreCase))
                {
                    recID = Localization.ParseUSInt(fld.Substring("Quantity".Length + 1));
                    quantity = fldval;
                    int iquan = 0;
                    try
                    {
                        iquan = Localization.ParseUSInt(quantity);
                    }
                    catch
                    {
                        iquan = 0;
                    }
                    if (iquan < 0)
                    {
                        iquan = 0;
                    }
                    if (iquan == 0)
                    {
                        DB.ExecuteSQL("delete from ShoppingCart where CartType=" + ((int)CartTypeEnum.WishCart).ToString() + " and ShoppingCartRecID=" + recID.ToString() + " and CustomerID=" + ThisCustomer.CustomerID.ToString());
                    }
                    else
                    {
                        DB.ExecuteSQL("update ShoppingCart set Quantity=" + iquan.ToString() + " where CartType=" + ((int)CartTypeEnum.WishCart).ToString() + " and ShoppingCartRecID=" + recID.ToString() + " and CustomerID=" + ThisCustomer.CustomerID.ToString());
                    }
                }
            }
            InitializePageContent();
        }

        private void GetJSFunctions()
        {
            StringBuilder s = new StringBuilder("<script type=\"text/javascript\">");
            s.Append("function " + "FormValidator(theForm){\n");
            String cartJS = CommonLogic.ReadFile("jscripts/shoppingcart.js", true);
            int TotalQ = 0;
            foreach (CartItem c in cart.CartItems)
            {
                s.Append(cartJS.Replace("%SKU%", c.m_ShoppingCartRecordID.ToString()));
                TotalQ += c.m_Quantity;
            }

            s.Append("return(true);\n");
            s.Append("}\n");
            s.Append("</script>\n");
            ClientScript.RegisterClientScriptBlock(this.GetType(), Guid.NewGuid().ToString(), s.ToString());
        }
}
}
