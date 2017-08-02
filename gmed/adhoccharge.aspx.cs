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
using System.Globalization;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontGateways;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for adhoccharge.
    /// </summary>
    public partial class adhoccharge : System.Web.UI.Page
    {
        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            /****************************************************************************/
            // * WARNING TO DEVELOPERS
            // * The redirect below is a SAFETY feature.  Removing the redirect will not
            // * enable ML-only features on a lower version of AspDotNetStorefront.
            // * Attempting to do so can very easily result in a partially implemented
            // * feature, invalid or incomplete data in your DB, and other serious 
            // * conditions that will cause your store to be non-functional.
            // *
            // * If you break your store attempting to enable ML-only features in PRO or
            // * Standard, our staff cannot help you fix it, and it will also invalidate
            // * your AspDotNetStorefront License.
            /***************************************************************************/

            if (!AppLogic.m_ProductIsML() && !AppLogic.ProductIsMLExpress())
            {
                Response.Redirect("restrictedfeature.aspx");
            }

            int ONX = CommonLogic.QueryStringUSInt("OrderNumber");

            Customer ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;
            int OrderCustomerID = 0;
            String OriginalTransactionID = String.Empty;
            String PM = String.Empty;

            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS(String.Format("select CustomerID,AuthorizationPNREF,PaymentMethod from Orders with (NOLOCK) where OrderNumber={0}", ONX.ToString()), dbconn))
                {
                    if (rs.Read())
                    {
                        OrderCustomerID = DB.RSFieldInt(rs, "CustomerID");
                        OriginalTransactionID = DB.RSField(rs, "AuthorizationPNREF");
                        PM = AppLogic.CleanPaymentMethod(DB.RSField(rs, "PaymentMethod"));
                    }
                }
            }
         
            Customer OrderCustomer = new Customer(OrderCustomerID, true);

            String GW = AppLogic.ActivePaymentGatewayCleaned();

            if (PM == AppLogic.ro_PMPayPal || PM == AppLogic.ro_PMPayPalExpress)
            {
                GW = Gateway.ro_GWPAYPAL;
            }

            bool GatewayRequiresCC = false;
            foreach (String s in Gateway.ro_GatewaysWhichRequireCreditCardNumberForVoidCaptureRefund)
            {
                if (GW == s)
                {
                    GatewayRequiresCC = true;
                    break;
                }
            }

            Response.Write("<html>\n");
            Response.Write("<head>\n");
            Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
            Response.Write("<title>" + AppLogic.GetString("admin.common.AdHocChargeRefund", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</title>\n");
            Response.Write("<link rel=\"stylesheet\" href=\"skins/Skin_" + ThisCustomer.SkinID.ToString() + "/style.css\" type=\"text/css\">\n");
            Response.Write("<script type=\"text/javascript\" src=\"jscripts/formValidate.js\"></script>\n");
            Response.Write("</head>\n");
            Response.Write("<body style=\"margin: 0px;\" bottommargin=\"0\" leftmargin=\"0\" marginheight=\"0\" marginwidth=\"0\" rightmargin=\"0\" topmargin=\"0\" bgcolor=\"#FFFFFF\" onLoad=\"self.focus()\">\n");
            Response.Write("<div style=\"margin-left: 10px;\" align=\"left\">");

            if (!ThisCustomer.IsAdminUser)
            {
                Response.Write("<b><font color=red>" + AppLogic.GetString("admin.common.PermissionDeniedUC", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</b></font>");
            }
            else
            {
                if (ONX == 0 || OrderCustomerID == 0)
                {
                    Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.1", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                    Response.Write("<p><a href=\"javascript:self.close();\">" + AppLogic.GetString("admin.common.Close", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</a></p>");
                }
                else
                {

                    Address BillingAddress = new Address();
                    BillingAddress.LoadFromDB(OrderCustomer.PrimaryBillingAddressID);

                    if (CommonLogic.FormBool("IsSubmit"))
                    {
                        if (CommonLogic.FormCanBeDangerousContent("OrderTotal").Trim().Length != 0)
                        {
                            Decimal OrderTotal = CommonLogic.FormNativeDecimal("OrderTotal");
                            String OrderDescription = CommonLogic.FormCanBeDangerousContent("Description");
                            AppLogic.TransactionTypeEnum OrderType = (AppLogic.TransactionTypeEnum)Enum.Parse(typeof(AppLogic.TransactionTypeEnum), CommonLogic.FormCanBeDangerousContent("OrderType"), true);
                            int NewOrderNumber = 0;
                            if (OrderType == AppLogic.TransactionTypeEnum.CHARGE)
                            {
                                if (CommonLogic.FormCanBeDangerousContent("CardNumber").Length < 4)
                                {
                                    Security.LogEvent("Viewed Credit Card", "Viewed card number: " + CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Substring(CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Length).PadLeft(CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Length, '*') + " while making adhoc charge from order: " + ONX.ToString(), OrderCustomer.CustomerID, ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));                                    
                                }
                                else 
                                {
                                    Security.LogEvent("Viewed Credit Card", "Viewed card number: " + CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Substring(CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Length - 4).PadLeft(CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "").Length, '*') + " while making adhoc charge from order: " + ONX.ToString(), OrderCustomer.CustomerID, ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
                                }                                
                            }
                            // use the billing info in the form, as the store admin may have overridden what was in the db
                            // NOTE: we are NOT going to save this new updated billing info however, it is really up to the customer
                            //       to change their billing info, or the store admin should edit their billing address in the customers account page area
                            BillingAddress.CardName = CommonLogic.FormCanBeDangerousContent("CardName");
                            // NOTE, this could be last4 at this point!! not a full CC #! that is ok, as this address will never be stored to the db anyway!
                            BillingAddress.CardNumber = CommonLogic.FormCanBeDangerousContent("CardNumber").Replace("*", "");
                            BillingAddress.CardType = CommonLogic.FormCanBeDangerousContent("CardType");
                            BillingAddress.CardExpirationMonth = CommonLogic.FormCanBeDangerousContent("CardExpirationMonth");
                            BillingAddress.CardExpirationYear = CommonLogic.FormCanBeDangerousContent("CardExpirationYear");
                            BillingAddress.CardStartDate = CommonLogic.FormCanBeDangerousContent("CardStartDate").Trim().Replace(" ", "").Replace("/", "").Replace("\\", "");
                            BillingAddress.CardIssueNumber = CommonLogic.FormCanBeDangerousContent("CardIssueNumber");
                            String CardExtraCode = CommonLogic.FormCanBeDangerousContent("CardExtraCode");

                            String Status = Gateway.MakeAdHocOrder(AppLogic.ActivePaymentGatewayCleaned(), ONX, OriginalTransactionID, OrderCustomer, BillingAddress, CardExtraCode, OrderTotal, OrderType, OrderDescription, out NewOrderNumber);

                            //PABP Required cleanup of in-memory objects
                            CardExtraCode = "11111";
                            CardExtraCode = "00000";
                            CardExtraCode = "11111";
                            CardExtraCode = String.Empty;
                            
                            if (Status == AppLogic.ro_OK)
                            {
                                DB.ExecuteSQL("update orders set IsNew=0 where ParentOrderNumber IS NOT NULL"); // any "ad hoc" orders should not be new. so this is a safety check to force that.

                                Response.Redirect("adhocchargecomplete.aspx?ordernumber=" + NewOrderNumber.ToString());
                            }
                            else
                            {
                                Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.3", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "<br/>" + Status + "</font></b></p>");
                            }
                            Response.Write("<p><a href=\"javascript:self.close();\">" + AppLogic.GetString("admin.common.Close", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</a></p>");
                        }
                    }
                    else
                    {
                        Response.Write("<script type=\"text/javascript\">\n");
                        Response.Write("var GatewayRequiresCC=" + CommonLogic.IIF(GatewayRequiresCC, "1", "0") + ";\n");


                        Response.Write("function getSelectedRadio(buttonGroup) {\n");
                        Response.Write("   // returns the array number of the selected radio button or -1 if no button is selected\n");
                        Response.Write("   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)\n");
                        Response.Write("      for (var i=0; i<buttonGroup.length; i++) {\n");
                        Response.Write("         if (buttonGroup[i].checked) {\n");
                        Response.Write("            return i\n");
                        Response.Write("         }\n");
                        Response.Write("      }\n");
                        Response.Write("   } else {\n");
                        Response.Write("      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero\n");
                        Response.Write("   }\n");
                        Response.Write("   // if we get to this point, no radio button is selected\n");
                        Response.Write("   return -1;\n");
                        Response.Write("}");
                        Response.Write("\n");
                        Response.Write("function getSelectedRadioValue(buttonGroup) {\n");
                        Response.Write("   // returns the value of the selected radio button or '' if no button is selected\n");
                        Response.Write("   var i = getSelectedRadio(buttonGroup);\n");
                        Response.Write("   if (i == -1) {\n");
                        Response.Write("      return '';\n");
                        Response.Write("   } else {\n");
                        Response.Write("      if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)\n");
                        Response.Write("         return buttonGroup[i].value;\n");
                        Response.Write("      } else { // The button group is just the one button, and it is checked\n");
                        Response.Write("         return buttonGroup.value;\n");
                        Response.Write("      }\n");
                        Response.Write("   }\n");
                        Response.Write("}");
                        Response.Write("\n");
                        Response.Write("function getSelectedCheckbox(buttonGroup) {\n");
                        Response.Write("   // Go through all the check boxes. return an array of all the ones\n");
                        Response.Write("   // that are selected (their position numbers). if no boxes were checked,\n");
                        Response.Write("   // returned array will be empty (length will be zero)\n");
                        Response.Write("   var retArr = new Array();\n");
                        Response.Write("   var lastElement = 0;\n");
                        Response.Write("   if (buttonGroup[0]) { // if the button group is an array (one check box is not an array)\n");
                        Response.Write("      for (var i=0; i<buttonGroup.length; i++) {\n");
                        Response.Write("         if (buttonGroup[i].checked) {\n");
                        Response.Write("            retArr.length = lastElement;\n");
                        Response.Write("            retArr[lastElement] = i;\n");
                        Response.Write("            lastElement++;\n");
                        Response.Write("         }\n");
                        Response.Write("      }\n");
                        Response.Write("   } else { // There is only one check box (it's not an array)\n");
                        Response.Write("      if (buttonGroup.checked) { // if the one check box is checked\n");
                        Response.Write("         retArr.length = lastElement;\n");
                        Response.Write("         retArr[lastElement] = 0; // return zero as the only array value\n");
                        Response.Write("      }\n");
                        Response.Write("   }\n");
                        Response.Write("   return retArr;\n");
                        Response.Write("}");
                        Response.Write("\n");
                        Response.Write("function getSelectedCheckboxValue(buttonGroup) {\n");
                        Response.Write("   // return an array of values selected in the check box group. if no boxes\n");
                        Response.Write("   // were checked, returned array will be empty (length will be zero)\n");
                        Response.Write("   var retArr = new Array(); // set up empty array for the return values\n");
                        Response.Write("   var selectedItems = getSelectedCheckbox(buttonGroup);\n");
                        Response.Write("   if (selectedItems.length != 0) { // if there was something selected\n");
                        Response.Write("      retArr.length = selectedItems.length;\n");
                        Response.Write("      for (var i=0; i<selectedItems.length; i++) {\n");
                        Response.Write("         if (buttonGroup[selectedItems[i]]) { // Make sure it's an array\n");
                        Response.Write("            retArr[i] = buttonGroup[selectedItems[i]].value;\n");
                        Response.Write("         } else { // It's not an array (there's just one check box and it's selected)\n");
                        Response.Write("            retArr[i] = buttonGroup.value;// return that value\n");
                        Response.Write("         }\n");
                        Response.Write("      }\n");
                        Response.Write("   }\n");
                        Response.Write("   return retArr;\n");
                        Response.Write("}");

                        Response.Write("function AdHocOrderTypeChanged(theForm)\n");
                        Response.Write("{\n");
                        Response.Write("	if(GatewayRequiresCC == 1 || getSelectedRadioValue(theForm.OrderType) == '" + AppLogic.TransactionTypeEnum.CHARGE.ToString() + "')\n");
                        Response.Write("    {\n");
                        Response.Write("        CCDiv.style.display = 'block';\n");
                        Response.Write("    }\n");
                        Response.Write("    else\n");
                        Response.Write("    {\n");
                        Response.Write("        CCDiv.style.display = 'none';\n");
                        Response.Write("    }\n");
                        Response.Write("}\n");


                        Response.Write("function AdHocChargeOrRefundForm_Validator(theForm)\n");
                        Response.Write("{\n");

                        Response.Write("	submitonce(theForm);\n");
                        Response.Write("	if(theForm.Description.value == '')\n");
                        Response.Write("	{\n");
                        Response.Write("		alert('" + AppLogic.GetString("adhoccharge.aspx.4", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "');\n");
                        Response.Write("		theForm.Description.focus();\n");
                        Response.Write("		submitenabled(theForm);\n");
                        Response.Write("		return (false);\n");
                        Response.Write("	}\n");
                        Response.Write("	if((getSelectedRadioValue(theForm.OrderType) == '" + AppLogic.TransactionTypeEnum.CHARGE.ToString() + "') || (GatewayRequiresCC == 1 && getSelectedRadioValue(theForm.OrderType) == '" + AppLogic.TransactionTypeEnum.CREDIT.ToString() + "'))\n");
                        Response.Write("    {\n");
                        Response.Write("        if(theForm.CardName.value == '')\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + String.Format(AppLogic.GetString("adhoccharge.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), "Name On Card") + "');\n");
                        Response.Write("		    theForm.CardName.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("        if(theForm.CardNumber.value == '')\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + String.Format(AppLogic.GetString("adhoccharge.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), "Card Number") + "');\n");
                        Response.Write("		    theForm.CardNumber.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                       
                        Response.Write("        if(isNaN(theForm.CardNumber.value))\n"); 
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + AppLogic.GetString("adhoccharge.aspx.28", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "');\n");
                        Response.Write("		    theForm.CardNumber.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("        if(document.getElementById(\"CardNumber\").value.length <15)\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + AppLogic.GetString("adhoccharge.aspx.29", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "');\n");
                        Response.Write("		    theForm.CardNumber.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("        if(theForm.CardExpirationMonth.value == '')\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + String.Format(AppLogic.GetString("adhoccharge.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), "Card Expiration Month") + "');\n");
                        Response.Write("		    theForm.CardExpirationMonth.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("        if(theForm.CardExpirationYear.value == '')\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + String.Format(AppLogic.GetString("adhoccharge.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), "Card Expiration Year") + "');\n");
                        Response.Write("		    theForm.CardExpirationYear.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("        if(theForm.CardType.selectedIndex < 1)\n");
                        Response.Write("	    {\n");
                        Response.Write("		    alert('" + String.Format(AppLogic.GetString("adhoccharge.aspx.22", ThisCustomer.SkinID, ThisCustomer.LocaleSetting),"Card Type") + "');\n");
                        Response.Write("		    theForm.CardType.focus();\n");
                        Response.Write("		    submitenabled(theForm);\n");
                        Response.Write("		    return (false);\n");
                        Response.Write("	    }\n");
                        Response.Write("	}\n");
                        Response.Write("	submitenabled(theForm);\n");
                        Response.Write("	return (true);\n");
                        Response.Write("}\n");
                        Response.Write("</script>\n");

                        Response.Write(String.Format(AppLogic.GetString("adhoccharge.aspx.5", ThisCustomer.SkinID, ThisCustomer.LocaleSetting), ONX.ToString()));

                        Response.Write("<p>" + AppLogic.GetString("adhoccharge.aspx.6", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</p>");

                        String CNM = BillingAddress.CardName;
                        String CN = BillingAddress.CardNumber;
                        String Last4 = String.Empty;
                        String CExpMonth = BillingAddress.CardExpirationMonth;
                        String CExpYear = BillingAddress.CardExpirationYear;
                        String CardType = BillingAddress.CardType;
                        if (CN.Length == 0)
                        {
                            // try to pull it from order record:
                            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                            { 
                                dbconn.Open();
                                using( IDataReader rs2 = DB.GetRS("select * from Orders  with (NOLOCK)  where OrderNumber=" + ONX.ToString(),dbconn))
                                {
                                    if (rs2.Read())
                                    {
                                        CN = DB.RSField(rs2, "CardNumber");
                                        CNM = DB.RSField(rs2, "CardName");
                                        Last4 = DB.RSField(rs2, "Last4");
                                        CExpMonth = DB.RSField(rs2, "CardExpirationMonth");
                                        CExpYear = DB.RSField(rs2, "CardExpirationYear");
                                        CN = DB.RSField(rs2, "CardNumber");
                                        CN = Security.UnmungeString(CN, DB.RSField(rs2, AppLogic.AppConfig("OrdersCCSaltField")));
                                        if (CN.StartsWith(Security.ro_DecryptFailedPrefix, StringComparison.InvariantCultureIgnoreCase))
                                        {
                                            CN = DB.RSField(rs2, "CardNumber");
                                        }
                                        CardType = DB.RSField(rs2, "CardType");
                                    }
                                }
                            
                            }
                         
                        }


                        if (AppLogic.ProductIsMLExpress() ==  false)
                        {
                            if (AppLogic.AppConfigBool("StoreCCInDB") && OrderCustomer.StoreCCInDB && CN.Length > 0)
                            {
                                Security.LogEvent("Viewed Credit Card", "Viewed card number: " + CN.Replace("*", "").Substring(CN.Replace("*", "").Length - 4).PadLeft(CN.Replace("*", "").Length, '*') + " while making adhoc charge from order: " + ONX.ToString(), OrderCustomer.CustomerID, ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
                            }
                        }

                        if (GatewayRequiresCC)
                        {
                            Response.Write("<p><b><font color=blue>" + AppLogic.GetString("adhoccharge.aspx.11",ThisCustomer.SkinID,ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }
                        else
                        {
                            Response.Write("<p><b><font color=blue>" + AppLogic.GetString("adhoccharge.aspx.12", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }

                        if (!OrderCustomer.StoreCCInDB)
                        {
                            Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.13", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }

                        if (CN.Length == 0 || CN == AppLogic.ro_CCNotStoredString)
                        {
                            Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.14", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }

                        if (OrderCustomer.PrimaryBillingAddressID == 0)
                        {
                            Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.7", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }
                        else if (CN.Length == 0 && Last4.Length == 0 && GW != Gateway.ro_GWPAYPAL)
                        {
                            Response.Write("<p><b><font color=red>" + AppLogic.GetString("adhoccharge.aspx.8", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</font></b></p>");
                        }
                        else
                        {
                            Response.Write("<form id=\"AdHocChargeOrRefundForm\" name=\"AdHocChargeOrRefundForm\" method=\"POST\" action=\"adhoccharge.aspx?OrderNumber=" + ONX.ToString() + "\" onsubmit=\"return (validateForm(this) && AdHocChargeOrRefundForm_Validator(this))\" >");
                            Response.Write("<input type=\"hidden\" name=\"IsSubmit\" value=\"true\">\n");

                            Response.Write("<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\">");
                            Response.Write("<tr><td width=\"40%\" valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.9", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td>" + OriginalTransactionID.ToString() + "</td></tr>");
                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("admin.label.CustomerID", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td>" + OrderCustomer.CustomerID.ToString() + "</td></tr>");
                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("admin.label.CustomerName", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td>" + OrderCustomer.FullName() + "</td></tr>");
                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.27", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td>" + BillingAddress.Phone + "</td></tr>");

                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.16", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td>");
                            Response.Write("<input onClick=\"AdHocOrderTypeChanged(AdHocChargeOrRefundForm)\" type=\"radio\" value=\"" + AppLogic.TransactionTypeEnum.CHARGE.ToString() + "\" id=\"ChargeOrderType\" name=\"OrderType\">" + AppLogic.GetString("adhoccharge.aspx.17", ThisCustomer.SkinID, ThisCustomer.LocaleSetting));
                            Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;");
                            Response.Write("<input onClick=\"AdHocOrderTypeChanged(AdHocChargeOrRefundForm)\" type=\"radio\" value=\"" + AppLogic.TransactionTypeEnum.CREDIT.ToString() + "\" id=\"RefundOrderType\" name=\"OrderType\" checked>" + AppLogic.GetString("adhoccharge.aspx.18", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td></tr>");

                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.19", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input type=\"text\" name=\"OrderTotal\" size=\"7\"><input type=\"hidden\" name=\"OrderTotal_vldt\" value=\"[req][number][blankalert=" + AppLogic.GetString("adhoccharge.aspx.26", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "][invalidalert=" + AppLogic.GetString("admin.common.ValidDollarAmountPrompt", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "]\"> (xx.xx format)</td></tr>");
                            
                            Response.Write("<tr><td colspan=\"2\">");
                            Response.Write("<div id=\"CCDiv\" name=\"CCDiv\" style=\"display:" + CommonLogic.IIF(GatewayRequiresCC, "block", "none") + ";\">");
                            Response.Write("<table cellpadding=\"2\" cellspacing=\"0\" border=\"0\" width=\"100%\">");

                            Response.Write("<tr>");
                            Response.Write("<td width=\"40%\" align=\"right\" valign=\"middle\">" + AppLogic.GetString("address.cs.31", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td>");
                            Response.Write("<td align=\"left\" valign=\"middle\">\n");
                            Response.Write("<select size=\"1\" name=\"CardType\" id=\"CardType\">");
                            Response.Write("<option value=\"\">" + AppLogic.GetString("address.cs.32", ThisCustomer.SkinID, ThisCustomer.LocaleSetting));

                            using (SqlConnection dbconn = new SqlConnection(DB.GetDBConn()))
                            {
                                dbconn.Open();
                                using( IDataReader rsCard = DB.GetRS("select * from creditcardtype  with (NOLOCK)  where Accepted=1 order by CardType",dbconn))
                                {
                                    while (rsCard.Read())
                                    {
                                        Response.Write("<option value=\"" + DB.RSField(rsCard, "CardType") + "\" " + CommonLogic.IIF(CardType == DB.RSField(rsCard, "CardType"), " selected ", "") + ">" + DB.RSField(rsCard, "CardType") + "</option>\n");
                                    }
                                
                                }
                            
                            }
                            Response.Write("</select>\n");
                            Response.Write("</td>");
                            Response.Write("</tr>");


                            Response.Write("<tr><td width=\"40%\" valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.10", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input size=\"20\" maxlength=\"100\" type=\"text\" name=\"CardName\" id=\"CardName\" value=\"" + CNM + "\"></td></tr>");
                            //Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.24", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input size=\"20\" maxlength=\"16\" type=\"text\" name=\"CardNumber\" id=\"CardNumber\" value=\"" + CN + "\">&nbsp;(Original Order Last4: " + Last4 + ")</td></tr>");
                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.24", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input size=\"20\" maxlength=\"16\" type=\"text\" name=\"CardNumber\" id=\"CardNumber\" value=\"" + CN + "\">&nbsp;(Original Order Last4: " + Last4 + ")</td></tr>");
                            Response.Write("<tr><td valign =\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.15", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input size=\"4\" maxlength=\"4\" type=\"text\" name=\"CardExtraCode\" id=\"CardExtraCode\">");
                            Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("adhoccharge.aspx.25", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </td><td><input type=\"text\" size=\"2\" maxlength=\"2\" name=\"CardExpirationMonth\" id=\"CardExpirationMonth\" value=\"" + CExpMonth + "\"> / <input size=\"4\" maxlength=\"4\" type=\"text\" name=\"CardExpirationYear\" id=\"CardExpirationYear\" value=\"" + CExpYear + "\"> (MM/YYYY)</td></tr>");

                            if (AppLogic.AppConfigBool("ShowCardStartDateFields"))
                            {
                                Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("address.cs.59", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td><td><input type=\"text\" autocomplete=\"off\" name=\"CardStartDate\" id=\"CardStartDate\" size=\"5\" maxlength=\"20\"> " + AppLogic.GetString("address.cs.64", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td></tr>");
                                Response.Write("<tr><td valign=\"middle\" align=\"right\">" + AppLogic.GetString("address.cs.61", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td><td><input type=\"text\" autocomplete=\"off\" name=\"CardIssueNumber\" id=\"CardIssueNumber\" size=\"2\" maxlength=\"2\"> " + AppLogic.GetString("address.cs.63", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</td></tr>");
                            }
                            Response.Write("</table>");
                            Response.Write("</div>");
                            Response.Write("</td></tr>");
                            Response.Write("</table>");

                            Response.Write("	<p>" + AppLogic.GetString("adhoccharge.aspx.20", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + " </p>");
                            Response.Write("	<p><textarea rows=\"8\" id=\"Description\" name=\"Description\" style=\"width: 90%\"></textarea></p>");
                            Response.Write("	<p align=\"center\"><input type=\"submit\" value=\"" + AppLogic.GetString("adhoccharge.aspx.21", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\" name=\"B1\" class=\"normalButtons\">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"" + AppLogic.GetString("admin.common.Cancel", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "\" name=\"B2\" onClick=\"javascript:self.close()\" class=\"normalButtons\"></p>");
                            Response.Write("</form>");
                        }
                    }
                }
            }

            Response.Write("</div>");

            Response.Write("</body>\n");
            Response.Write("</html>\n");
        }

    }
}
