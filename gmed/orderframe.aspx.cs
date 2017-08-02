// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Web;
using System.Xml;
using System.Xml.Serialization;
using System.Configuration;
using System.Web.SessionState;
using System.Web.Caching;
using System.Web.Handlers;
using System.Web.Hosting;
using System.Net.Mail;
using System.Web.Security;
using System.Web.UI;
using System.Web.Util;
using System.Data;
using System.Globalization;
using System.Text;
using System.Collections;
using System.ComponentModel;
using System.IO;
using System.Drawing;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontGateways;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for orderframe.
    /// </summary>
    public partial class orderframe : System.Web.UI.Page
    {

        Customer ThisCustomer;
        bool _shipRushEnabledAndConfigured = false;

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            ThisCustomer = ((AspDotNetStorefrontPrincipal)Context.User).ThisCustomer;

            int OrderNumber = CommonLogic.QueryStringUSInt("OrderNumber");
            String SubmitAction = CommonLogic.FormCanBeDangerousContent("SubmitAction").ToUpperInvariant();

            Order ord = new Order(OrderNumber, Localization.GetWebConfigLocale());

            using (SqlConnection dbconn = DB.dbConn())
            {
                dbconn.Open();
                using (IDataReader rs = DB.GetRS("Select * from orders  with (NOLOCK)  where ordernumber=" + OrderNumber.ToString(), dbconn))
                {
                    if (!rs.Read())
                    {  // if order does not exist set to zero
                        OrderNumber = 0;
                    }

                    int SkinID = 1;

                    if (AppLogic.AppConfigBool("ShipRush.Enabled"))
                    {
                        // look for status back from shiprush

                        try 
                        {
                            using (SqlConnection dbconn2 = DB.dbConn())
                            {
                                dbconn2.Open();
                                using (IDataReader rsJobHistory = DB.GetRS("select * from OR_JOBHISTORY where (TrackingNumber IS NOT NULL and TrackingNumber<>'') and JobID in (select 'OrderNumber_' + convert(varchar(10),OrderNumber) as JobID from orders  with (NOLOCK)  where ShippingTrackingNumber=" + DB.SQuote("Pending From ShipRush") + ")", dbconn2))
                                {
                                    //this is just a flag if shiprush table is already configure
                                    _shipRushEnabledAndConfigured = true;
                                    while (rsJobHistory.Read())
                                    {
                                        String TN = DB.RSField(rsJobHistory, "TrackingNumber").Trim();
                                        String TNotes = DB.RSField(rsJobHistory, "Notes").Trim();
                                        String JobID = DB.RSField(rsJobHistory, "JobID").Trim();
                                        String ON = String.Empty;
                                        try
                                        {
                                            ON = JobID.Split('_')[1].Trim();
                                            if (ON.Length != 0)
                                            {
                                                DB.ExecuteSQL("update orders set CarrierReportedRate=" + DB.SQuote(TNotes) + ", ShippingTrackingNumber=" + DB.SQuote(TN) + " where ShippingTrackingNumber=" + DB.SQuote("Pending From ShipRush") + " and OrderNumber=" + ON);
                                            }
                                        }
                                        catch 
                                        { }
                                    }
                                }
                            }
                        }
                        catch 
                        {
                            _shipRushEnabledAndConfigured = false;
                        }
                        
                        
                    }

                    if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                    {
                        // look for status back from shipmanager

                        using (SqlConnection dbconn3 = DB.dbConn())
                        {
                            dbconn3.Open();
                            using (IDataReader rsfedex = DB.GetRS("SELECT * FROM ShippingImportExport WHERE (TrackingNumber IS NOT NULL and TrackingNumber <> '') ", dbconn3))
                            {
                                while (rsfedex.Read())
                                {
                                    string tracking = DB.RSField(rsfedex, "TrackingNumber").Trim();
                                    string shippedVia = CommonLogic.IIF(DB.RSField(rsfedex, "ServiceCarrierCode").Length != 0, DB.RSField(rsfedex, "ServiceCarrierCode"), AppLogic.GetString("order.cs.1", SkinID, ThisCustomer.LocaleSetting));
                                    decimal cost = DB.RSFieldDecimal(rsfedex, "Cost");
                                    decimal weight = DB.RSFieldDecimal(rsfedex, "Weight");
                                    int ordno = DB.RSFieldInt(rsfedex, "OrderNumber");

                                    try
                                    {
                                        //send confirmation before we put the price in shippedVia
                                        Order.MarkOrderAsShipped(ordno, shippedVia, tracking, System.DateTime.Now, false, null, new Parser(null, 1, ThisCustomer), !AppLogic.AppConfigBool("BulkImportSendsShipmentNotifications"));

                                        //Update Orders
                                        DB.ExecuteSQL("UPDATE Orders SET ShippedVia=" + DB.SQuote(shippedVia + "|" + cost) + ", CarrierReportedWeight=" + DB.SQuote(weight.ToString()) + ", CarrierReportedRate=" + DB.SQuote(cost.ToString()) + ", ShippingTrackingNumber=" + DB.SQuote(tracking) + " WHERE OrderNumber=" + ordno);

                                        //Delete from FedEx synch table
                                        DB.ExecuteSQL("DELETE FROM ShippingImportExport WHERE OrderNumber=" + ordno);
                                    }
                                    catch { }
                                }
                            }
                        }
                    }

                    Response.Write("<html>\n");
                    Response.Write("<head>\n");
                    Response.Write("<title>AspDotNetStorefront Order Detail</title>\n");
                    Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n");
                    Response.Write("<link rel=\"stylesheet\" href=\"skins/Skin_" + SkinID.ToString() + "/style.css\" type=\"text/css\">\n");
                    Response.Write("</head>\n");
                    String bgcolor = "FFFFFF";
                    String LastIPAddress = String.Empty;
                    if (OrderNumber != 0)
                    {
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateFraud)
                        {
                            bgcolor = "ffbcbc";
                        }
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateVoided)
                        {
                            bgcolor = "ebebeb";
                        }
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateForceVoided)
                        {
                            bgcolor = "ebebeb";
                        }
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateRefunded)
                        {
                            bgcolor = "fffcd0";
                        }
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateAuthorized)
                        {
                            bgcolor = "C2DAFC";
                        }
                        if (DB.RSField(rs, "TransactionState") == AppLogic.ro_TXStateCaptured)
                        {
                            bgcolor = "C2DAFC";
                        }
                        LastIPAddress = DB.RSField(rs, "LastIPAddress");
                    }
                    Response.Write("<body bgcolor=\"#" + bgcolor + "\" topmargin=\"0\" marginheight=\"0\" bottommargin=\"0\" marginwidth=\"0\" rightmargin=\"0\">\n");
                    Response.Write("<script type=\"text/javascript\" src=\"jscripts/formValidate.js\"></script>\n");

                    String InitialTab = CommonLogic.QueryStringCanBeDangerousContent("InitialTab");
                    if (InitialTab.Length == 0)
                    {
                        InitialTab = "General";
                    }
                    EntityHelper AffiliateHelper = new EntityHelper(EntityDefinitions.LookupSpecs("Affiliate"));

                    if (!ThisCustomer.IsAdminUser)
                    {
                        Response.Write("<p><b>INSUFFICIENT PERMISSIONS</b></p>");
                    }
                    else
                    {
                        String Status = String.Empty;

                        if (SubmitAction.Length != 0)
                        {
                            if (SubmitAction == "GETMAXMIND")
                            {
                                // get MaxMind info if not already done (e.g. PayPal or Google checkout, etc)
                                try
                                {
                                    if (ord.OrderNumber != 0 && ord.MaxMindFraudScore == -1 && AppLogic.AppConfigBool("MaxMind.Enabled"))
                                    {
                                        String FraudDetails = String.Empty;
                                        Address BA = new Address();
                                        BA.LoadByCustomer(ord.CustomerID, AddressTypes.Billing);
                                        Address SA = new Address();
                                        SA.LoadByCustomer(ord.CustomerID, AddressTypes.Shipping);
                                        Customer c = new Customer(ord.CustomerID, true);
                                        Decimal FraudScore = Gateway.MaxMindFraudCheck(ord.OrderNumber, c, BA, SA, out FraudDetails);
                                        DB.ExecuteSQL(String.Format("update orders set MaxMindFraudScore={0}, MaxMindDetails={1} where OrderNumber={2}", Localization.DecimalStringForDB(FraudScore), DB.SQuote(FraudDetails), ord.OrderNumber.ToString()));
                                    }
                                }
                                catch (Exception ex)
                                {
                                    DB.ExecuteSQL(String.Format("update orders set MaxMindFraudScore={0}, MaxMindDetails={1} where OrderNumber={2}", -1.0M, DB.SQuote(ex.Message), ord.OrderNumber.ToString()));
                                }
                            }

                            if (SubmitAction == "UPDATENOTES")
                            {
                                Status = Gateway.OrderManagement_SetPrivateNotes(ord, ThisCustomer.LocaleSetting, CommonLogic.FormCanBeDangerousContent("Notes"));
                                Status = Gateway.OrderManagement_SetCustomerServiceNotes(ord, ThisCustomer.LocaleSetting, CommonLogic.FormCanBeDangerousContent("CustomerServiceNotes"));
                                InitialTab = "Notes";
                            }

                            if (SubmitAction == "CLEARNEW")
                            {
                                Status = Gateway.OrderManagement_ClearNewStatus(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "MARKREADYTOSHIP")
                            {
                                Status = Gateway.OrderManagement_MarkAsReadyToShip(ord, ThisCustomer.LocaleSetting);
                                InitialTab = "General";
                            }

                            if (SubmitAction == "CLEARREADYTOSHIP")
                            {
                                Status = Gateway.OrderManagement_ClearReadyToShip(ord, ThisCustomer.LocaleSetting);
                                InitialTab = "General";
                            }

                            if (SubmitAction == "ADJUSTORDERWEIGHT")
                            {
                                Status = Gateway.OrderManagement_SetOrderWeight(ord, ThisCustomer.LocaleSetting, CommonLogic.FormNativeDecimal("OrderWeight"));
                                InitialTab = "General";
                            }

                            if (SubmitAction == "MARKASPRINTED")
                            {
                                Status = Gateway.OrderManagement_MarkAsPrinted(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "SENDTRACKING")
                            {
                                String ShippedVIA = DB.RSField(rs, "ShippedVIA");
                                String ShippingTrackingNumber = DB.RSField(rs, "ShippingTrackingNumber");
                                if (CommonLogic.FormCanBeDangerousContent("ShippedVIA").Trim().Length != 0)
                                {
                                    ShippedVIA = CommonLogic.FormCanBeDangerousContent("ShippedVIA").Trim(", ".ToCharArray());
                                }

                                if (CommonLogic.FormCanBeDangerousContent("ShippingTrackingNumber").Trim().Length != 0)
                                {
                                    ShippingTrackingNumber = CommonLogic.FormCanBeDangerousContent("ShippingTrackingNumber").Trim(",".ToCharArray());
                                }
                                Status = Gateway.OrderManagement_SetTracking(ord, ThisCustomer.LocaleSetting, ShippedVIA, ShippingTrackingNumber);
                            }

                            if (SubmitAction == "MARKASSHIPPED")
                            {
                                AppLogic.eventHandler("OrderShipped").CallEvent("&OrderShipped=true&OrderNumber=" + OrderNumber.ToString());

                                String ShippedVIA = DB.RSField(rs, "ShippedVIA");
                                String ShippingTrackingNumber = DB.RSField(rs, "ShippingTrackingNumber");
                                if (CommonLogic.FormCanBeDangerousContent("ShippedVIA").Trim().Length != 0)
                                {
                                    ShippedVIA = CommonLogic.FormCanBeDangerousContent("ShippedVIA").Trim(", ".ToCharArray());
                                }

                                if (CommonLogic.FormCanBeDangerousContent("ShippingTrackingNumber").Trim().Length != 0)
                                {
                                    ShippingTrackingNumber = CommonLogic.FormCanBeDangerousContent("ShippingTrackingNumber").Trim(",".ToCharArray());
                                }
                                String ShippedOnString = CommonLogic.FormCanBeDangerousContent("ShippedOn").Trim(",".ToCharArray());
                                DateTime ShippedOn = System.DateTime.Now;
                                if (ShippedOnString.Length != 0)
                                {
                                    ShippedOn = Localization.ParseNativeDateTime(ShippedOnString);
                                }
                                if (ShippedOn == System.DateTime.MinValue)
                                {
                                    ShippedOn = System.DateTime.Now;
                                }
                                Status = Gateway.OrderManagement_MarkAsShipped(ord, ThisCustomer.LocaleSetting, ShippedVIA, ShippingTrackingNumber, ShippedOn);
                                InitialTab = "Shipping";
                            }

                            if (SubmitAction == "CHANGEORDEREMAIL")
                            {
                                String NewEMail = CommonLogic.FormCanBeDangerousContent("NewEMail").Trim().ToLowerInvariant();
                                Status = Gateway.OrderManagement_ChangeOrderEMail(ord, ThisCustomer.LocaleSetting, NewEMail);
                                InitialTab = "Customer";
                            }

                            if (SubmitAction == "MARKASFRAUD")
                            {
                                Status = Gateway.OrderManagement_MarkAsFraud(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "CLEARASFRAUD")
                            {
                                Status = Gateway.OrderManagement_ClearFraud(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "BLOCKIP")
                            {
                                Status = Gateway.OrderManagement_BlockIP(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "ALLOWIP")
                            {
                                Status = Gateway.OrderManagement_AllowIP(ord, ThisCustomer.LocaleSetting);
                            }

                            if (_shipRushEnabledAndConfigured)
                            {
                                if (SubmitAction == "SHIPRUSH")
                                {
                                    Status = Gateway.OrderManagement_SendToShipRush(ord, ThisCustomer.LocaleSetting, ThisCustomer);
                                }
                            }

                            if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                            {
                                if (SubmitAction == "FEDEXSHIPMANAGER")
                                {
                                    Status = Gateway.OrderManagement_SendToFedexShippingMgr(ord, ThisCustomer.LocaleSetting);
                                }
                            }

                            if (SubmitAction == "FORCEREFUND")
                            {
                                Status = Gateway.OrderManagement_DoForceFullRefund(ord, ThisCustomer.LocaleSetting);
                            }

                            if (SubmitAction == "SENDRECEIPTEMAIL")
                            {
                                Status = Gateway.OrderManagement_SendReceipt(ord, ThisCustomer.LocaleSetting);
                                InitialTab = "General";
                            }

                            if (SubmitAction == "SENDDOWNLOADEMAIL")
                            {
                                Status = Gateway.OrderManagement_SendDownloadNotification(ord, ThisCustomer.LocaleSetting);
                                InitialTab = "General";
                            }

                            // DROP SHIPPING ML ONLY FEATURE
                            if (!AppLogic.m_ProductIsML())
                            {
                            }
                            else
                            {
                                if (SubmitAction == "SENDDISTRIBUTOREMAIL")
                                {
                                    Status = Gateway.OrderManagement_SendDistributorNotification(ord, ThisCustomer.LocaleSetting);
                                    if (Status != AppLogic.ro_OK)
                                    {
                                        Response.Write("<p><b>");
                                        Response.Write(Status);
                                        Response.Write("<p></b>");
                                    }
                                    InitialTab = "General";
                                }

                            }
                        }

                        if (SubmitAction.Length != 0)
                        {
                            // reload order to get latest state after submit actions could have changed it
                            ord = new Order(OrderNumber, Localization.GetWebConfigLocale());
                        }

                        if (ord.OrderNumber == 0 || ord.IsEmpty)
                        {
                            Response.Write("<p><b>ORDER NOT FOUND or ORDER HAS BEEN DELETED</b></p>");
                        }
                        else
                        {

                            Response.Write("  <!-- calendar stylesheet -->\n");
                            Response.Write("  <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"jscalendar/calendar-win2k-cold-1.css\" title=\"win2k-cold-1\" />\n");
                            Response.Write("\n");
                            Response.Write("  <!-- main calendar program -->\n");
                            Response.Write("  <script type=\"text/javascript\" src=\"jscalendar/calendar.js\"></script>\n");
                            Response.Write("\n");
                            Response.Write("  <!-- language for the calendar -->\n");
                            Response.Write("  <script type=\"text/javascript\" src=\"jscalendar/lang/" + Localization.JSCalendarLanguageFile() + "\"></script>\n");
                            Response.Write("\n");
                            Response.Write("  <!-- the following script defines the Calendar.setup helper function, which makes\n");
                            Response.Write("       adding a calendar a matter of 1 or 2 lines of code. -->\n");
                            Response.Write("  <script type=\"text/javascript\" src=\"jscalendar/calendar-setup.js\"></script>\n");

                            // Close and re-read Order data since we probably modified it above. 

                            String GW;
                            String PM;
                            bool IsPayPal;
                            String ShippingStatus = String.Empty;

                            using (SqlConnection dbconn4 = DB.dbConn())
                            {
                                dbconn4.Open();
                                using (IDataReader rs2 = DB.GetRS("Select * from orders  with (NOLOCK)  where ordernumber=" + OrderNumber.ToString(), dbconn4))
                                {
                                    rs2.Read();

                                    String TransactionState = DB.RSField( rs2, "TransactionState").Trim().ToUpper(CultureInfo.InvariantCulture);
                                    AppLogic.TransactionTypeEnum TransactionType = (AppLogic.TransactionTypeEnum)DB.RSFieldInt( rs2, "TransactionType");
                                    DateTime AuthorizedOn = DB.RSFieldDateTime( rs2, "AuthorizedOn");
                                    DateTime CapturedOn = DB.RSFieldDateTime( rs2, "CapturedOn");
                                    DateTime VoidedOn = DB.RSFieldDateTime( rs2, "VoidedOn");
                                    DateTime FraudedOn = DB.RSFieldDateTime( rs2, "FraudedOn");
                                    DateTime RefundedOn = DB.RSFieldDateTime( rs2, "RefundedOn");
                                    bool IsNew = DB.RSFieldBool( rs2, "IsNew");
                                    bool HasShippableComponents = AppLogic.OrderHasShippableComponents(DB.RSFieldInt( rs2, "OrderNumber"));
                                    GW = AppLogic.CleanPaymentGateway(DB.RSField(rs2, "PaymentGateway"));
                                    PM = AppLogic.CleanPaymentMethod(DB.RSField(rs2, "PaymentMethod"));
                                    
                                    bool IsCard = (PM == AppLogic.ro_PMCreditCard);
                                    bool IsCheck = (PM == AppLogic.ro_PMCheckByMail || PM.IndexOf(AppLogic.ro_PMCOD) != -1);
                                    bool IsEcheck = (PM == AppLogic.ro_PMECheck);
                                    bool IsMicroPay = (PM == AppLogic.ro_PMMicropay);
                                    IsPayPal = (PM == AppLogic.ro_PMPayPal || PM == AppLogic.ro_PMPayPalExpress || GW == Gateway.ro_GWPAYPALPRO);
                                    
                                    bool IsCOD = (PM == AppLogic.ro_PMCOD || PM == AppLogic.ro_PMCODCompanyCheck || PM == AppLogic.ro_PMCODMoneyOrder || PM == AppLogic.ro_PMCODNet30);
                                    Customer OrderCustomer = new Customer(ord.CustomerID);

                                    String ShipAddr = String.Empty;

                                    if (AppLogic.AppConfigBool("AllowMultipleShippingAddressPerOrder") && ord.HasMultipleShippingAddresses())
                                    {
                                        ShipAddr = AppLogic.GetString("checkoutreview.aspx.25", ThisCustomer.SkinID, ThisCustomer.LocaleSetting);
                                    }
                                    else
                                    {
                                        ShipAddr = (ord.ShippingAddress.m_FirstName + " " + ord.ShippingAddress.m_LastName).Trim();
                                    
                                        if (!string.IsNullOrEmpty(ord.ShippingAddress.m_Company))
                                        {
                                            ShipAddr += "<br />" + ord.ShippingAddress.m_Company;
                                        }

                                        ShipAddr += "<br />" + ord.ShippingAddress.m_Address1;
                                        if (ord.ShippingAddress.m_Address2.Length != 0)
                                        {
                                            ShipAddr += "<br/>" + ord.ShippingAddress.m_Address2;
                                        }
                                        if (ord.ShippingAddress.m_Suite.Length != 0)
                                        {
                                            ShipAddr += ", " + ord.ShippingAddress.m_Suite;
                                        }
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_City + ", " + ord.ShippingAddress.m_State + " " + ord.ShippingAddress.m_Zip;
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_Country.ToUpperInvariant();
                                        ShipAddr += "<br/>" + ord.ShippingAddress.m_Phone;
                                    }

                                    String BillAddr = (ord.BillingAddress.m_FirstName + " " + ord.BillingAddress.m_LastName).Trim();
                                    if (!string.IsNullOrEmpty(ord.BillingAddress.m_Company))
                                    {
                                        BillAddr += "<br />" + ord.BillingAddress.m_Company;
                                    }
                                    BillAddr += "<br />" + ord.BillingAddress.m_Address1;
                                    if (ord.BillingAddress.m_Address2.Length != 0)
                                    {
                                        BillAddr += "<br/>" + ord.BillingAddress.m_Address2;
                                    }
                                    if (ord.BillingAddress.m_Suite.Length != 0)
                                    {
                                        BillAddr += ", " + ord.BillingAddress.m_Suite;
                                    }
                                    BillAddr += "<br/>" + ord.BillingAddress.m_City + ", " + ord.BillingAddress.m_State + " " + ord.BillingAddress.m_Zip;
                                    BillAddr += "<br/>" + ord.BillingAddress.m_Country.ToUpperInvariant();
                                    BillAddr += "<br/>" + ord.BillingAddress.m_Phone;

                                    String ReceiptURLPrintable = "../receipt.aspx?ordernumber=" + DB.RSFieldInt(rs2, "OrderNumber").ToString() + "&customerid=" + DB.RSFieldInt(rs2, "CustomerID").ToString();

                                    Response.Write("<b>Order # " + OrderNumber.ToString());
                                    if (IsNew)
                                    {
                                        Response.Write("&nbsp;<img style=\"cursor:hand;cursor:pointer;\" alt=\"Clear IsNew Flag\" onClick=\"ClearNew(OrderDetailForm," + OrderNumber.ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\" src=\"" + AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/new.gif") + "\" align=\"absmiddle\" border=\"0\"></a>");
                                    }

                                    if (!ord.HasBeenEdited && (TransactionState != AppLogic.ro_TXStateFraud && TransactionType == AppLogic.TransactionTypeEnum.CHARGE))
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" " + CommonLogic.IIF(Customer.StaticIsAdminSuperUser(ord.CustomerID), " disabled ", "") + " type=\"button\" value=\"Mark As Fraud\" name=\"Fraud" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"MarkAsFraudOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateFraud && TransactionType == AppLogic.TransactionTypeEnum.CHARGE))
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Clear Fraud Flag\" name=\"ClearFraud" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ClearAsFraudOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }

                                    Customer TargetCustomer = new Customer(ord.CustomerID, true);

                                    if (ord.HasBeenEdited)
                                    {
                                        // disallow the gateways that are not real time also
                                        bool GWCanDoEdits = true;
                                        if (GW == Gateway.ro_GW2CHECKOUT || GW == Gateway.ro_GWEWAY || GW == Gateway.ro_GWGOOGLECHECKOUT || GW == Gateway.ro_GWIATS || GW == Gateway.ro_GWPAYPAL || GW == Gateway.ro_GWSKIPJACK || GW == Gateway.ro_GWVIAKLIX || GW == Gateway.ro_GWWORLDPAY || GW == Gateway.ro_GWWORLDPAYJUNIOR)
                                        {
                                            GWCanDoEdits = false;
                                        }
                                        if (GWCanDoEdits)
                                        {
                                            Response.Write("&nbsp;EDITED, See Order #<a href=\"orderframe.aspx?ordernumber=" + ord.RelatedOrderNumber.ToString() + "\">" + ord.RelatedOrderNumber.ToString() + "</a>");
                                        }
                                    }
                                    else if (AppLogic.AppConfigBool("OrderEditingEnabled") && ord.IsEditable() && !TargetCustomer.IsAdminSuperUser && !TargetCustomer.IsAdminUser && !AppLogic.ProductIsMLExpress())
                                    {
                                        Response.Write("&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"  Edit  \" name=\"Edit" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"EditOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    else if (AppLogic.AppConfigBool("OrderEditingEnabled") && ord.IsEditable() && (TargetCustomer.IsAdminSuperUser || TargetCustomer.IsAdminUser))
                                    {
                                        Response.Write("&nbsp;&nbsp;<input disabled  class=\"normalButtons\" type=\"button\" value=\"  Edit  \" name=\"Edit" + DB.RSFieldInt(rs2, "OrderNumber").ToString() + "\" onClick=\"EditOrder(OrderDetailForm," + DB.RSFieldInt(rs2, "OrderNumber").ToString() + ");\">");
                                        Response.Write("<b>Customer is Admin User</b>&nbsp;&nbsp;");
                                    }

                                    Response.Write("&nbsp;&nbsp;<b>Type=" + TransactionType.ToString() + "</b>");
                                    Response.Write("&nbsp;&nbsp;<b>State=" + TransactionState + "</b>");

                                    //This will notify admin to set-up ShipRush server DB tables into the storefront database.
                                    if (AppLogic.AppConfigBool("ShipRush.Enabled") && !_shipRushEnabledAndConfigured)
                                    {
                                        Response.Write("&nbsp;&nbsp;<br><b><Font color= red size = 3>" + AppLogic.GetString("admin.ShipRushWarningMessage", ThisCustomer.SkinID, ThisCustomer.LocaleSetting) + "</Font></b>");
                                    }
                                    
                                    if (TransactionState == AppLogic.ro_TXStateRefunded && ord.RefundTXCommand.IndexOf("FORCED", StringComparison.InvariantCultureIgnoreCase) != -1)                                    
                                    {
                                        Response.Write("&nbsp;(" + ord.RefundTXCommand + ")");
                                    }

                                    // NOTE: if "edited" turn off all orderframe actions. Just allow viewing of the original receipt. and that's it.

                                    Response.Write("<form method=\"POST\" action=\"orderframe.aspx?ordernumber=" + OrderNumber.ToString() + "\" id=\"OrderDetailForm\" name=\"OrderDetailForm\" >");
                                    Response.Write("<input type=\"hidden\" name=\"SubmitAction\" value=\"\">\n");

                                    Response.Write("\n<script type=\"text/javascript\">\n");
                                    Response.Write("function PopupTX(ordernumber)\n");
                                    Response.Write("{\n");
                                    Response.Write("window.open('popuptx.aspx?ordernumber=' + ordernumber,'PopupTX" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                                    Response.Write("return (true);\n");
                                    Response.Write("}\n");
                                    Response.Write("</script>\n");

                                    Response.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                    Response.Write("<tr>\n");
                                    Response.Write("<td id=\"GeneralTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowGeneralDiv_" + OrderNumber.ToString() + "();\" >General</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    Response.Write("<td id=\"BillingTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowBillingDiv_" + OrderNumber.ToString() + "();\" >Billing</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    Response.Write("<td id=\"ShippingTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowShippingDiv_" + OrderNumber.ToString() + "();\" >Shipping</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    Response.Write("<td id=\"CustomerTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowCustomerDiv_" + OrderNumber.ToString() + "();\" >Customer</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    Response.Write("<td id=\"NotesTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowNotesDiv_" + OrderNumber.ToString() + "();\" >Notes</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    Response.Write("<td id=\"ReceiptTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowReceiptDiv_" + OrderNumber.ToString() + "();\" >Receipt</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    if (ThisCustomer.IsAdminSuperUser)
                                    {
                                        Response.Write("<td id=\"XMLTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowXMLDiv_" + OrderNumber.ToString() + "();\" >XML</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                    }
                                    // DROP SHIPPING IS ML FEATURE
                                    if (AppLogic.ProductIsMLExpress() == true || !AppLogic.m_ProductIsML())
                                    {
                                    }
                                    else
                                    {
                                        if (ord.HasDistributorComponents() && TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                        {
                                            Response.Write("<td id=\"DistributorTD_" + OrderNumber.ToString() + "\" width=90 height=22 align=\"center\" valign=\"bottom\"><a href=\"javascript:void(0);\" onClick=\"ShowDistributorDiv_" + OrderNumber.ToString() + "();\" >Distributor</a><br/><img src=\"images/spacer.gif\" height=\"2\" width=\"2\" border=\"0\"></td>\n");
                                        }
                                    }
                                    Response.Write("<td width=\"*\"></td>\n");
                                    Response.Write("</tr>\n");
                                    Response.Write("<td bgcolor=\"#" + bgcolor + "\" colspan=\"" + CommonLogic.IIF(ThisCustomer.IsAdminSuperUser, "7", "6") + "\" align=\"left\" valign=\"top\">\n");


                                    // --------------------------------------------------------------------------------------------------
                                    // GENERAL DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"GeneralDiv_" + OrderNumber.ToString() + "\" name=\"GeneralDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");

                                    if ((ord.ParentOrderNumber == 0 || TransactionType == AppLogic.TransactionTypeEnum.RECURRING_AUTO) && ord.TransactionIsCaptured() && (IsCard || IsMicroPay || IsPayPal) && (GW != Gateway.ro_GWWORLDPAYJUNIOR && GW != Gateway.ro_GWWORLDPAY && GW != Gateway.ro_GW2CHECKOUT && GW != Gateway.ro_GWGOOGLECHECKOUT))
                                    {
                                        Response.Write("<br/>");
                                        if (AppLogic.m_ProductIsML() || AppLogic.ProductIsMLExpress())
                                        {
                                            if (!ord.HasBeenEdited && (TransactionType != AppLogic.TransactionTypeEnum.RECURRING_AUTO || ord.AuthorizationPNREF.Length > 0))
                                            {
                                                Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Create Ad-Hoc Charge/Refund\" name=\"AdHocChargeOrder" + DB.RSFieldInt(rs2, "OrderNumber").ToString() + "\" onClick=\"AdHocChargeOrder(OrderDetailForm," + DB.RSFieldInt(rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                        }
                                        if (!ord.HasBeenEdited && (ord.RecurringSubscriptionID.Length != 0 && ord.AuthorizationPNREF.Length > 0 && ord.RefundedOn == System.DateTime.MinValue))
                                        {
                                            Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Stop Future Billing and Refund\" name=\"CancelRecurringBilling" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"CancelRecurringBilling(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                        Response.Write("<br/>");
                                    }

                                    bool HasDownload = AppLogic.OrderHasDownloadComponents(DB.RSFieldInt( rs2, "OrderNumber"), true);
                                    Response.Write("<table align=\"left\" valign=\"top\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                    Response.Write("<tr><td width=\"150\">&nbsp;</td><td>&nbsp;</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">\n");
                                    Response.Write("Order Number:&nbsp;</td>\n");
                                    Response.Write("<td align=\"left\" valign=\"top\">\n");
                                    Response.Write(OrderNumber.ToString());
                                    if (ord.ParentOrderNumber != 0)
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;Parent Order: <a href=\"orderframe.aspx?ordernumber=" + ord.ParentOrderNumber + "\">" + ord.ParentOrderNumber.ToString() + "</a>&nbsp;&nbsp;");
                                    }
                                    if (ord.ChildOrderNumbers.Length != 0)
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;Related Orders: ");
                                        foreach (String s in ord.ChildOrderNumbers.Split(','))
                                        {
                                            Response.Write("<a href=\"orderframe.aspx?ordernumber=" + s + "\">" + s + "</a>&nbsp;&nbsp;");
                                        }
                                    }
                                    Response.Write("</td>\n");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Order Date:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "OrderDate")) + "</td></tr>\n");
                                    if (AppLogic.AppConfigBool("MaxMind.Enabled"))
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">MaxMind Fraud Score&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.DecimalStringForDB(DB.RSFieldDecimal( rs2, "MaxMindFraudScore")) + " &nbsp;<a href=\"http://www.maxmind.com/app/fraud-detection-manual\" target=\"_blank\">Explanation</a>");
                                        if (ord.MaxMindFraudScore == -1)
                                        {
                                            Response.Write("&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Get MaxMind\" name=\"GetMaxmind" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"GetMaxmind(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                        Response.Write("</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "</td></tr>\n");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">IP Address:&nbsp;</td><td align=\"left\" valign=\"middle\">");
                                    if (AppLogic.IPIsRestricted(LastIPAddress))
                                    {
                                        Response.Write("<font color=\"red\"><b>");
                                        Response.Write(LastIPAddress);
                                        Response.Write("</b></font>");
                                        Response.Write("&nbsp;&nbsp;");
                                        Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Allow This IP\" name=\"AllowIP" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"AllowIP(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    else
                                    {
                                        Response.Write(LastIPAddress);
                                        Response.Write("&nbsp;&nbsp;");
                                        Response.Write("<input  class=\"normalButtons\" " + CommonLogic.IIF(Customer.StaticIsAdminSuperUser(ord.CustomerID), " disabled ", "") + " type=\"button\" value=\"Block This IP\" name=\"BlockIP" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"BlockIP(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    Response.Write("</td></tr>\n");

                                    if (AppLogic.ProductIsMLExpress() == false)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Affiliate ID:&nbsp;</td><td align=\"left\" vali    gn=\"top\">" + DB.RSFieldInt(rs2, "AffiliateID").ToString() + "</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer EMail:&nbsp;</td><td align=\"left\" valign=\"top\"><a href=\"mailto:" + ord.EMail + "?subject=" + "RE: " + AppLogic.AppConfig("StoreName") + " Order " + ord.OrderNumber.ToString() + "\">" + ord.EMail + "</a></td></tr>\n");
                                    int NumOrders = DB.GetSqlN("select count(ordernumber) as N from orders   with (NOLOCK)  where TransactionState in (" + DB.SQuote(AppLogic.ro_TXStateCaptured) + "," + DB.SQuote(AppLogic.ro_TXStateAuthorized) + ") and CustomerID=" + DB.RSFieldInt( rs2, "CustomerID").ToString());
                                    if (NumOrders > 0)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Order History:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                        Response.Write("<a target=\"content\" href=\"cst_history.aspx?customerid=" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "\">");
                                        for (int i = 1; i <= NumOrders; i++)
                                        {
                                            Response.Write("<img src=\"" + AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/smile.gif") + "\" border=\"0\" align=\"absmiddle\">");
                                            if (i % 25 == 0)
                                            {
                                                Response.Write("<br/>");
                                            }
                                        }
                                        Response.Write("</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Order Total:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                    Response.Write(CommonLogic.IIF(DB.RSFieldBool( rs2, "QuoteCheckout"), "REQUEST FOR QUOTE", ThisCustomer.CurrencyString(DB.RSFieldDecimal( rs2, "OrderTotal"))));


                                    if ((IsCard || IsMicroPay || IsPayPal || IsCOD) && (GW != Gateway.ro_GWWORLDPAYJUNIOR && GW != Gateway.ro_GWWORLDPAY && GW != Gateway.ro_GW2CHECKOUT && GW != Gateway.ro_GWGOOGLECHECKOUT))
                                    {
                                        if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized))
                                        {
                                            Response.Write("&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Adjust Order Total\" name=\"AdjustChargeOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"AdjustChargeOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                    }

                                    Response.Write("</td></tr>\n");

                                    if (!AppLogic.ProductIsMLExpress())
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Subscription Added (in Days):&nbsp;</td><td align=\"left\" valign=\"top\">" + ord.SubscriptionTotalDays() + "</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Locale Setting:&nbsp;</td><td align=\"left\" valign=\"top\">" + ord.LocaleSetting + "</td></tr>\n");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Store Version:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "StoreVersion") + "</td></tr>\n");
                                    Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Payment Method:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "PaymentMethod") + "</td></tr>\n");
                                    if (PM == AppLogic.ro_PMCreditCard)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Card Type:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "CardType") + "</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Payment Gateway:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "PaymentGateway") + "</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">AVS Result:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "AVSResult") + "</td></tr>");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Transaction Type:&nbsp;</td><td align=\"left\" valign=\"top\">" + TransactionType.ToString() + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Transaction State:&nbsp;</td><td align=\"left\" valign=\"top\">");

                                    if (!ord.HasBeenEdited)
                                    {
                                        if ((TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStatePending) && TransactionType != AppLogic.TransactionTypeEnum.RECURRING_AUTO)
                                        {
                                            Response.Write(TransactionState);
                                            if (TransactionState == AppLogic.ro_TXStateRefunded && ord.RefundTXCommand.IndexOf("FORCED", StringComparison.InvariantCultureIgnoreCase) != -1)
                                            {
                                                Response.Write("&nbsp;(" + ord.RefundTXCommand + ")");
                                            }
                                            Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Void\" name=\"VoidOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"VoidOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Force Void\" name=\"ForceVoidOrder" + DB.RSFieldInt(rs2, "OrderNumber").ToString() + "\" onClick=\"ForceVoidOrder(OrderDetailForm," + DB.RSFieldInt(rs2, "OrderNumber").ToString() + ");\">");
                                            Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Capture\" name=\"CaptureOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"CaptureOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            if (IsPayPal)
                                            {
                                                Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Reauthorize\" name=\"PayPalReauthOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"PayPalReauthOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                        }
                                        else if (TransactionState == AppLogic.ro_TXStateCaptured && (TransactionType != AppLogic.TransactionTypeEnum.RECURRING_AUTO || ord.AuthorizationPNREF.Length > 0))
                                        {
                                            Response.Write(TransactionState);
                                            // in google, if already captured, you can only refund it (not void it).
                                            if (!DB.RSField( rs2, "PaymentGateway").StartsWith(Gateway.ro_GWGOOGLECHECOUTForDisplay))
                                            {
                                                Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Void\" name=\"VoidOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"VoidOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Force Void\" name=\"ForceVoidOrder" + DB.RSFieldInt(rs2, "OrderNumber").ToString() + "\" onClick=\"ForceVoidOrder(OrderDetailForm," + DB.RSFieldInt(rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                            Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Refund\" name=\"RefundOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"RefundOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            if (PM == AppLogic.ro_PMCreditCard || PM == AppLogic.ro_PMMicropay)
                                            {
                                                Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"ForceRefund\" name=\"ForceRefund" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ForceRefund(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                        }
                                        else
                                        {
                                            Response.Write(TransactionState);
                                            if (TransactionState == AppLogic.ro_TXStateRefunded && ord.RefundTXCommand.IndexOf("FORCED", StringComparison.InvariantCultureIgnoreCase) != -1)
                                            {
                                                Response.Write("&nbsp;(" + ord.RefundTXCommand + ")");
                                            }
                                        }
                                    }
                                    else
                                    {
                                        Response.Write(TransactionState);
                                    }
                                    Response.Write("</td></tr>");

                                    if (PM == AppLogic.ro_PMCreditCard || PM == AppLogic.ro_PMMicropay || IsPayPal || PM == AppLogic.ro_PMCardinalMyECheck)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "AuthorizationPNREF") + "</td></tr>");
                                    }
                                    if (DB.RSField( rs2, "RecurringSubscriptionID").Length != 0 || TransactionType == AppLogic.TransactionTypeEnum.RECURRING_AUTO)
                                    {
                                        if (GW == AspDotNetStorefrontGateways.Gateway.ro_GWVERISIGN || GW == AspDotNetStorefrontGateways.Gateway.ro_GWPAYFLOWPRO)
                                        { // include link to recurringgatewaydetails.aspx for live gateway status 
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Gateway AutoBill Subscription ID: </td><td align=\"left\" valign=\"top\"><a href=\"recurringgatewaydetails.aspx?RecurringSubscriptionID=" + DB.RSField( rs2, "RecurringSubscriptionID") + "\">" + DB.RSField( rs2, "RecurringSubscriptionID") + "</a></td></tr>");
                                        }
                                        else
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Gateway AutoBill Subscription ID: </td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "RecurringSubscriptionID") + "</td></tr>");
                                        }
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Authorized On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(AuthorizedOn) + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Captured On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(CapturedOn) + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Voided On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(VoidedOn) + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Refunded On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(RefundedOn) + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Frauded On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeDateTimeString(FraudedOn) + "</td></tr>");

                                    Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"middle\">Receipt E-Mail Sent On:&nbsp;</td><td align=\"left\" valign=\"middle\">" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "ReceiptEMailSentOn") != System.DateTime.MinValue, Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "ReceiptEMailSentOn")), "Not Sent"));
                                    if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                    {
                                        Response.Write("&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "ReceiptEMailSentOn") != System.DateTime.MinValue, "Re-Send Receipt E-Mail", "Send Receipt E-Mail") + "\" name=\"Clear" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"SendReceiptEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    Response.Write("</td></tr>\n");
                                    Response.Write("</td></tr>\n");
                                    Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");

                                    if (HasShippableComponents && !ord.HasBeenEdited && (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue && DB.RSFieldDateTime( rs2, "DownloadEmailSentOn") == System.DateTime.MinValue && TransactionType == AppLogic.TransactionTypeEnum.CHARGE))
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"middle\">Ready To Ship:&nbsp;</td><td align=\"left\" valign=\"middle\">");
                                        if (DB.RSFieldBool( rs2, "ReadyToShip"))
                                        {
                                            Response.Write("Yes&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Clear Ready To Ship\" name=\"ClearReadyToShip" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ClearReadyToShip(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                        else
                                        {
                                            Response.Write("No&nbsp;");
                                            if ((TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                            {
                                                Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Mark As Ready To Ship\" name=\"MarkReadyToShip" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"MarkReadyToShip(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                        }
                                        Response.Write("</td></tr>\n");
                                        if (!ord.IsAllDownloadComponents() && !ord.IsAllSystemComponents())
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"middle\">Order Weight:&nbsp;</td><td align=\"left\" valign=\"middle\">");
                                            if (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending)
                                            {
                                                if (!ord.HasBeenEdited)
                                                {
                                                    Response.Write("<input type=\"text\" size=\"5\" name=\"OrderWeight\" value=\"" + Localization.CurrencyStringForGatewayWithoutExchangeRate(ord.OrderWeight) + "\">&nbsp;");
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Adjust Weight\" name=\"AdjustOrderWeight" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"AdjustOrderWeight(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write(Localization.CurrencyStringForGatewayWithoutExchangeRate(ord.OrderWeight));
                                            }
                                            Response.Write("</td></tr>\n");
                                        }
                                    }

                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Shipping Method:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(HasShippableComponents, DB.RSFieldByLocale( rs2, "ShippingMethod", ThisCustomer.LocaleSetting), "All Download Items") + "</td></tr>\n");
                                    }
                                    Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");

                                    
                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        if (HasShippableComponents)
                                        {
                                            bool bGCorder = DB.GetSqlS(
                                                "select PaymentGateway S from Orders where OrderNumber = " +
                                                OrderNumber.ToString()).StartsWith(Gateway.ro_GWGOOGLECHECOUTForDisplay);
                                            // for google checkout order we can enter tracking info after it is marked as shipped or ready to ship

                                            if (DB.RSFieldDateTime( rs2, "ShippedOn") != System.DateTime.MinValue)
                                            {
                                                ShippingStatus = "Shipped";
                                                bool bGCprompt = false;
                                                if (DB.RSField( rs2, "ShippedVIA").Length != 0)
                                                {
                                                    ShippingStatus += " via " + DB.RSField( rs2, "ShippedVIA");
                                                }
                                                else if (!ord.HasBeenEdited && bGCorder)
                                                {
                                                    ShippingStatus += "Carrier: <input maxlength=\"50\" size=\"10\" type=\"text\" name=\"ShippedVIA\">&nbsp;&nbsp;";
                                                    bGCprompt = true;
                                                }
                                                ShippingStatus += " on " + Localization.ToNativeShortDateString(DB.RSFieldDateTime( rs2, "ShippedOn")) + ".";
                                                if (DB.RSField( rs2, "ShippingTrackingNumber").Length != 0)
                                                {
                                                    ShippingStatus += " Tracking Number: ";

                                                    String TrackURL = Shipping.GetTrackingURL(DB.RSField( rs2, "ShippingTrackingNumber"));
                                                    if (TrackURL.Length != 0)
                                                    {
                                                        ShippingStatus += "<a href=\"" + TrackURL + "\" target=\"_blank\">" + DB.RSField( rs2, "ShippingTrackingNumber") + "</a>";
                                                    }
                                                    else
                                                    {
                                                        ShippingStatus += DB.RSField( rs2, "ShippingTrackingNumber");
                                                    }
                                                    ShippingStatus += ". ";
                                                }
                                                else if (!ord.HasBeenEdited && bGCorder)
                                                {
                                                    ShippingStatus += "<br/>Tracking #: <input maxlength=\"50\" size=\"10\" type=\"text\" name=\"ShippingTrackingNumber\">&nbsp;&nbsp;";
                                                    bGCprompt = true;
                                                }
                                                if (!ord.HasBeenEdited && bGCprompt)
                                                {
                                                    ShippingStatus += " <input  class=\"normalButtons\" type=\"button\" value=\"Send Tracking Number\" onClick=\"document.OrderDetailForm.SubmitAction.value='SENDTRACKING';document.OrderDetailForm.submit();\"><br/>\n";
                                                }
                                                ShippingStatus += " CarrierReportedRate: " + DB.RSField( rs2, "CarrierReportedRate") + ". ";
                                                ShippingStatus += " CarrierReportedWeight: " + DB.RSField( rs2, "CarrierReportedWeight") + ". ";

                                            }
                                            else if (!AppLogic.AppConfigBool("ShipRush.Enabled") && !AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                                            {
                                                if (DB.RSField( rs2, "ShippedVIA").Length != 0)
                                                {
                                                    ShippingStatus += "Carrier: " + DB.RSField( rs2, "ShippedVIA") + ".";
                                                }
                                                else if (!ord.HasBeenEdited)
                                                {
                                                    ShippingStatus += "Carrier: <input maxlength=\"50\" size=\"10\" type=\"text\" name=\"ShippedVIA\">&nbsp;&nbsp;";
                                                }
                                                if (DB.RSField( rs2, "ShippingTrackingNumber").Length != 0)
                                                {
                                                    ShippingStatus += " Tracking Number: ";

                                                    String TrackURL = Shipping.GetTrackingURL(DB.RSField( rs2, "ShippingTrackingNumber"));
                                                    if (TrackURL.Length != 0)
                                                    {
                                                        ShippingStatus += "<a href=\"" + TrackURL + "\" target=\"_blank\">" + DB.RSField( rs2, "ShippingTrackingNumber") + "</a>";
                                                    }
                                                    else
                                                    {
                                                        ShippingStatus += DB.RSField( rs2, "ShippingTrackingNumber");
                                                    }
                                                    ShippingStatus += ". ";
                                                }
                                                else if (!ord.HasBeenEdited)
                                                {
                                                    ShippingStatus += "<br/>Tracking #: <input maxlength=\"50\" size=\"10\" type=\"text\" name=\"ShippingTrackingNumber\">&nbsp;&nbsp;";
                                                }
                                                if (DB.RSFieldBool( rs2, "ReadyToShip") && bGCorder)
                                                {
                                                    if (!ord.HasBeenEdited && (DB.RSField( rs2, "ShippingTrackingNumber").Length == 0 || DB.RSField( rs2, "ShippedVIA").Length == 0))
                                                    {
                                                        ShippingStatus += " <input  class=\"normalButtons\" type=\"button\" value=\"Send Tracking Number\" onClick=\"document.OrderDetailForm.SubmitAction.value='SENDTRACKING';document.OrderDetailForm.submit();\"><br/>\n";
                                                    }
                                                }
                                                if (!ord.HasBeenEdited)
                                                {
                                                    ShippingStatus += "<br/>Shipped On: <input maxlength=\"15\" size=\"10\" type=\"text\" id=\"ShippedOn\" name=\"ShippedOn\">&nbsp;<img src=\"" + AppLogic.LocateImageURL("../skins/skin_" + SkinID.ToString() + "/images/calendar.gif") + "\" style=\"cursor:hand;cursor:pointer;\" align=\"absmiddle\" id=\"f_trigger_s\">&nbsp;&nbsp;(defaults to today's date)";
                                                    if (ord.TransactionIsCaptured())
                                                    {
                                                        ShippingStatus += "<br/><input  class=\"normalButtons\" type=\"button\" value=\"Mark As Shipped\" onClick=\"document.OrderDetailForm.SubmitAction.value='MARKASSHIPPED';document.OrderDetailForm.submit();\">\n";
                                                    }
                                                    else
                                                    {
                                                        ShippingStatus += "<br/><input  class=\"normalButtons\" type=\"button\" value=\"Mark As Shipped\" onClick=\"if(confirm('Are you sure you want to proceed. The payment for this order has not yet cleared, and this will close the order, and remove the IsNew status from the order!')) {document.OrderDetailForm.SubmitAction.value='MARKASSHIPPED';document.OrderDetailForm.submit();}\">\n";
                                                    }
                                                }
                                            }
                                            Response.Write("<tr><td align=\"right\" width=\"200\" valign=\"top\">Shipping Status:&nbsp;</td><td align=\"left\" valign=\"top\">" + ShippingStatus + "</td></tr>\n");
                                        }
                                    }

                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        Response.Write("<tr><td align=\"right\" width=\"200\" valign=\"top\">Was Printed:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(DB.RSFieldBool( rs2, "IsPrinted"), "yes", "no"));
                                        if (!ord.HasBeenEdited && !DB.RSFieldBool( rs2, "IsPrinted"))
                                        {
                                            Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Mark As Printed\" onClick=\"document.OrderDetailForm.SubmitAction.value='MARKASPRINTED';document.OrderDetailForm.submit();\">");
                                        }
                                        Response.Write("</td></tr>\n");
                                    }

                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                        if (ord.HasDownloadComponents(true) && ord.ThereAreDownloadFilesSpecified())
                                        {
                                            if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Download Items:&nbsp;</td><td align=\"left\" valign=\"top\">Yes</td></tr>\n");
                                            }
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Download E-Mail Sent On:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn") != System.DateTime.MinValue, Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn")), AppLogic.ro_NotApplicable));
                                            if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                            {
                                                Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn") != System.DateTime.MinValue, "Re-Send Download E-Mail", "Send Download E-Mail") + "\" name=\"Download" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"SendDownloadEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                            Response.Write("</td></tr>\n");
                                        }
                                        else
                                        {
                                            if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Download Items:&nbsp;</td><td align=\"left\" valign=\"top\">No</td></tr>\n");
                                            }
                                        }
                                    }
                                    // DROP SHIPPING IS ML FEATURE
                                    if (AppLogic.ProductIsMLExpress() == true || !AppLogic.m_ProductIsML())
                                    {
                                    }
                                    else
                                    {
                                        if (HasShippableComponents && TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                        {
                                            if (ord.HasDistributorComponents())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Distributor Drop-Ship Items:&nbsp;</td><td align=\"left\" valign=\"top\">Yes</td></tr>\n");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Distributor E-Mail Sent On:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn") != System.DateTime.MinValue, Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn")), AppLogic.ro_NotApplicable));
                                                if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn") != System.DateTime.MinValue, "Re-Send Distributor E-Mail(s)", "Send Distributor E-Mail(s)") + "\" name=\"Distributor" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"SendDistributorEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                }
                                                Response.Write("</td></tr>\n");

                                            }
                                            else
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Distributor Items:&nbsp;</td><td align=\"left\" valign=\"top\">No</td></tr>\n");
                                            }
                                        }
                                    }
                                    if (AppLogic.ProductIsMLExpress() == false && TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Has Multiple Shipping Addresses:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(ord.HasMultipleShippingAddresses(), "Yes", "No") + "</td></tr>\n");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Has Gift Registry Items:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(ord.HasGiftRegistryComponents(), "Yes", "No") + "</td></tr>\n");
                                    }
                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        if (_shipRushEnabledAndConfigured)
                                        {
                                            Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">ShipRush:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                            if (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue)
                                            {
                                                if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Send To ShipRush\" name=\"ShipRush" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ShipRushOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write("Sent To ShipRush on " + Localization.ToNativeShortDateString(DB.RSFieldDateTime( rs2, "ShippedOn")));
                                                if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Re-Send To ShipRush\" name=\"ShipRush" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ShipRushOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            Response.Write("</td></tr>");
                                        }
                                        if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                                        {
                                            Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">FedExShipManager:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                            if (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue)
                                            {
                                                if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Send To FedExShipManager\" name=\"FedExShipManager" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"FedExShipManagerOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write("Sent To FedExShipManager on " + Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "ShippedOn")));
                                                if (!ord.HasBeenEdited)
                                                {
                                                    Response.Write("&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Re-Send To FedExShipManager\" name=\"FedExShipManager" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"FedExShipManagerOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            Response.Write("</td></tr>");
                                        }
                                    }

                                    Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Bill To:&nbsp;</td><td align=\"left\" valign=\"top\">" + BillAddr + "</td></tr>\n");
                                    if (HasShippableComponents && !ord.HasMultipleShippingAddresses())
                                    {
                                        Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Ship To:&nbsp;</td><td align=\"left\" valign=\"top\">" + ShipAddr + "</td></tr>\n");
                                    }
                                    Response.Write("</table>\n");
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // BILLING DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"BillingDiv_" + OrderNumber.ToString() + "\" name=\"BillingDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");

                                    Response.Write("<table align=\"left\" valign=\"top\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Order Number:&nbsp;</td><td align=\"left\" valign=\"top\">" + OrderNumber.ToString());
                                    if (ord.ParentOrderNumber != 0)
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;Parent Order: <a href=\"orderframe.aspx?ordernumber=" + ord.ParentOrderNumber + "\">" + ord.ParentOrderNumber.ToString() + "</a>&nbsp;&nbsp;");
                                    }
                                    if (ord.ChildOrderNumbers.Length != 0)
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;Related Orders: ");
                                        foreach (String s in ord.ChildOrderNumbers.Split(','))
                                        {
                                            Response.Write("<a href=\"orderframe.aspx?ordernumber=" + s + "\">" + s + "</a>&nbsp;&nbsp;");
                                        }
                                    }
                                    Response.Write("</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "</td></tr>");
                                    if (AppLogic.ProductIsMLExpress() == false)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Affiliate ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldInt(rs2, "AffiliateID").ToString() + "</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Order Date:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldDateTime( rs2, "OrderDate").ToString() + "</td></tr>");
                                    if (AppLogic.AppConfigBool("MaxMind.Enabled"))
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">MaxMind Fraud Score&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.DecimalStringForDB(DB.RSFieldDecimal( rs2, "MaxMindFraudScore")) + " &nbsp;<a href=\"http://www.maxmind.com/app/fraud-detection-manual\" target=\"_blank\">Explanation</a>");
                                        if (ord.MaxMindFraudScore == -1)
                                        {
                                            Response.Write("&nbsp;&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Get MaxMind\" name=\"GetMaxmind" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"GetMaxmind(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                        Response.Write("</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Order Total:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                    Response.Write(ThisCustomer.CurrencyString(DB.RSFieldDecimal( rs2, "OrderTotal")));

                                    if ((IsCard || IsMicroPay) && (GW != Gateway.ro_GWWORLDPAYJUNIOR && GW != Gateway.ro_GWWORLDPAY && GW != Gateway.ro_GW2CHECKOUT && GW != Gateway.ro_GWGOOGLECHECKOUT))
                                    {
                                        if (!ord.HasBeenEdited && TransactionState == AppLogic.ro_TXStateAuthorized)
                                        {
                                            Response.Write("&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Adjust Order Total\" name=\"AdjustChargeOrder" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"AdjustChargeOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                        }
                                    }

                                    Response.Write("</td></tr>");
                                    if (PM == AppLogic.ro_PMCreditCard)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Card Type:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "CardType") + "</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Payment Gateway:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "PaymentGateway") + "</td></tr>");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction Type:&nbsp;</td><td align=\"left\" valign=\"top\">" + TransactionType.ToString() + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction State:&nbsp;</td><td align=\"left\" valign=\"top\">" + TransactionState + "</td></tr>");
                                    if (PM == AppLogic.ro_PMCreditCard)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">AVS Result:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "AVSResult") + "</td></tr>");
                                    }

                                    String _cardNumber = "";
                                    if (ThisCustomer.AdminCanViewCC)
                                    {
                                        _cardNumber = AppLogic.AdminViewCardNumber(DB.RSField( rs2, "CardNumber"), "Orders", ord.OrderNumber);
                                        if (_cardNumber.Length > 0 && _cardNumber != AppLogic.ro_CCNotStoredString) //log admin viewing card number
                                        {
                                            Security.LogEvent("Viewed Credit Card", "Viewed card number: " + _cardNumber.Substring(_cardNumber.Length - 4).PadLeft(_cardNumber.Length, '*') + " on order number: " + ord.OrderNumber.ToString(), OrderCustomer.CustomerID, ThisCustomer.CustomerID, Convert.ToInt32(ThisCustomer.CurrentSessionID));
                                        }
                                    }
                                    else
                                    {
                                        _cardNumber = "No Permission To View";
                                    }

                                    String _last4 = DB.RSField( rs2, "Last4");
                                    String _cardType = DB.RSField( rs2, "CardType");

                                    if (IsEcheck)
                                    {
                                        string saltKey = Order.StaticGetSaltKey(OrderNumber);

                                        string realECheckABACode = string.Empty;
                                        string realCheckBankAccountNumber = string.Empty;
                                        
                                        string eCheckABACode = DB.RSField(rs, "ECheckBankABACode");
                                        string eCheckABACodeUnMunged = Security.UnmungeString(eCheckABACode, saltKey);

                                        if (eCheckABACodeUnMunged.StartsWith(Security.ro_DecryptFailedPrefix, StringComparison.InvariantCultureIgnoreCase))
                                        {
                                            // Failed decryption, must be clear text
                                            realECheckABACode = eCheckABACode;
                                        }
                                        else
                                        {
                                            // decryption successful, must be already encrypted
                                            realECheckABACode = eCheckABACodeUnMunged;
                                        }

                                        string eCheckBankAccountNumber = DB.RSField(rs, "ECheckBankAccountNumber");
                                        string eCheckBankAccountNumberUnMunged = Security.UnmungeString(eCheckBankAccountNumber, saltKey);

                                        if (eCheckBankAccountNumberUnMunged.StartsWith(Security.ro_DecryptFailedPrefix, StringComparison.InvariantCultureIgnoreCase))
                                        {
                                            // Failed decryption, must be clear text
                                            realCheckBankAccountNumber = eCheckBankAccountNumber;
                                        }
                                        else
                                        {
                                            // decryption successful, must be already encrypted
                                            realCheckBankAccountNumber = eCheckBankAccountNumberUnMunged;
                                        }

                                        // masked the account
                                        if (AppLogic.StoreCCInDB())
                                        {
                                            if (!CommonLogic.IsStringNullOrEmpty(realECheckABACode))
                                            {
                                                realECheckABACode = AppLogic.Mask(realECheckABACode);    
                                            }

                                            if (!CommonLogic.IsStringNullOrEmpty(realCheckBankAccountNumber))
                                            {
                                                realCheckBankAccountNumber = AppLogic.Mask(realCheckBankAccountNumber);
                                            }
                                        }


                                        Response.Write(String.Format("<tr><td align=\"right\" valign=\"top\">ECheck Bank Name:&nbsp;</td><td align=\"left\" valign=\"top\">{0}</td></tr>", DB.RSField( rs2, "ECheckBankName")));
                                        Response.Write(String.Format("<tr><td align=\"right\" valign=\"top\">ECheck ABA:&nbsp;</td><td align=\"left\" valign=\"top\">{0}</td></tr>", realECheckABACode));
                                        Response.Write(String.Format("<tr><td align=\"right\" valign=\"top\">ECheck Account:&nbsp;</td><td align=\"left\" valign=\"top\">{0}</td></tr>", realCheckBankAccountNumber));
                                        Response.Write(String.Format("<tr><td align=\"right\" valign=\"top\">ECheck Account Name:&nbsp;</td><td align=\"left\" valign=\"top\">{0}</td></tr>", DB.RSField( rs2, "ECheckBankAccountName")));
                                        Response.Write(String.Format("<tr><td align=\"right\" valign=\"top\">ECheck Account Type:&nbsp;</td><td align=\"left\" valign=\"top\">{0}</td></tr>", DB.RSField( rs2, "ECheckBankAccountType")));
                                    }
                                    if (IsMicroPay)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">" + AppLogic.GetString("account.aspx.11", 1, ThisCustomer.LocaleSetting) + " Transaction:&nbsp;</td><td align=\"left\" valign=\"top\"></td></tr>");
                                    }
                                    else if (PM == AppLogic.ro_PMCreditCard)
                                    {
                                        if (_cardType.StartsWith(AppLogic.ro_PMPayPal, StringComparison.InvariantCultureIgnoreCase))
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Card Number:&nbsp;</td><td align=\"left\" valign=\"top\">PayPal</td></tr>");
                                        }
                                        else
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Card Number:&nbsp;</td><td align=\"left\" valign=\"top\">" + _cardNumber + "</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Last 4:&nbsp;</td><td align=\"left\" valign=\"top\">" + _last4 + "</td></tr>");
                                        }
                                        if (_cardNumber.Length == 0 || _cardNumber == AppLogic.ro_CCNotStoredString)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Card Expiration:&nbsp;</td><td align=\"left\" valign=\"top\">Not Stored</td></tr>");
                                        }
                                        else
                                        {
                                            if (_cardType.StartsWith(AppLogic.ro_PMPayPal, StringComparison.InvariantCultureIgnoreCase))
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Card Expiration:&nbsp;</td><td align=\"left\" valign=\"top\">Not Available</td></tr>");
                                            }
                                            else
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Card Expiration:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "CardExpirationMonth") + "/" + DB.RSField( rs2, "cardExpirationYear") + "</td></tr>");
                                            }
                                        }
                                        if (AppLogic.AppConfigBool("ShowCardStartDateFields"))
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Card Start Date:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "CardStartDate") + "</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Card Issue Number:&nbsp;</td><td align=\"left\" valign=\"top\">" + Security.UnmungeString(DB.RSField( rs2, "CardIssueNumber")) + "</td></tr>");
                                        }
                                    }

                                    if (AppLogic.AppConfigBool("MaxMind.Enabled"))
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">MaxMind Details:&nbsp;<br/><a href=\"http://www.maxmind.com/app/fraud-detection-manual\" target=\"_blank\">Explanation</a></td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "MaxMindDetails") + "</textarea></td></tr>");
                                    }
                                    if (PM == AppLogic.ro_PMCreditCard || PM == AppLogic.ro_PMMicropay || IsPayPal)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "AuthorizationPNREF") + "</td></tr>");
                                        if (DB.RSField( rs2, "RecurringSubscriptionID").Length != 0 || TransactionType == AppLogic.TransactionTypeEnum.RECURRING_AUTO)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Gateway AutoBill Subscription ID: </td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "RecurringSubscriptionID") + "</td></tr>");
                                        }
                                        if (ThisCustomer.AdminCanViewCC)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "TransactionCommand") + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Authorization Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "AuthorizationResult") + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Authorization Code:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "AuthorizationCode") + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Capture TX Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CaptureTXCommand").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CaptureTXCommand")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Capture TX Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CaptureTXResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CaptureTXResult")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Void TX Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "VoidTXCommand").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "VoidTXCommand")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Void TX Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "VoidTXResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "VoidTXResult")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Refund TX Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "RefundTXCommand").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "RefundTXCommand")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Refund TX Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "RefundTXResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "RefundTXResult")) + "</textarea></td></tr>");
                                            if (DB.RSField( rs2, "BuySafeCommand").Length > 0)
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">buySAFE TX Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "BuySafeCommand") + "</textarea></td></tr>");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">buySAFE TX Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField( rs2, "BuySafeResult") + "</textarea></td></tr>");
                                            }
                                            if (AppLogic.ProductIsMLExpress() == false &&
                                                AppLogic.AppConfigBool("CardinalCommerce.Centinel.Enabled"))
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Cardinal Lookup Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalLookupResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalLookupResult")) + "</textarea></td></tr>");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Cardinal Authenticate Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalAuthenticateResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalAuthenticateResult")) + "</textarea></td></tr>");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Cardinal Gateway Parms:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalGatewayParms").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalGatewayParms")) + "</textarea></td></tr>");
                                            }
                                            else if (DB.RSField( rs2, "CardinalLookupResult").Length > 0)
                                            { // else if added 10/31/2006 for Cybersource and future 3D Secure data.
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">3D Secure Lookup Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalLookupResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalLookupResult")) + "</textarea></td></tr>");
                                            }

                                            if (AppLogic.ProductIsMLExpress() == false)
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Recurring Billing Subscription Create Command:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField(rs2, "RecurringSubscriptionCommand") + "</textarea></td></tr>");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Recurring Billing Subscription Create Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + DB.RSField(rs2, "RecurringSubscriptionResult") + "</textarea></td></tr>");
                                            }
                                        }
                                    }
                                    else if (PM == AppLogic.ro_PMCardinalMyECheck)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Transaction ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "AuthorizationPNREF") + "</td></tr>");
                                        if (ThisCustomer.AdminCanViewCC)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Cardinal Lookup Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalLookupResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalLookupResult")) + "</textarea></td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Cardinal Authenticate Result:&nbsp;</td><td align=\"left\" valign=\"top\"><textarea READONLY rows=10 cols=60>" + CommonLogic.IIF(DB.RSField( rs2, "CardinalAuthenticateResult").Length == 0, AppLogic.ro_NotApplicable, DB.RSField( rs2, "CardinalAuthenticateResult")) + "</textarea></td></tr>");
                                        }
                                    }
                                    Response.Write("</table>\n");
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // SHIPPING DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"ShippingDiv_" + OrderNumber.ToString() + "\" name=\"ShippingDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");

                                    if (TransactionType == AppLogic.TransactionTypeEnum.CHARGE)
                                    {
                                        Response.Write("<table align=\"left\" valign=\"top\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Ship To:&nbsp;</td><td align=\"left\" valign=\"top\">" + ShipAddr + "</td></tr>\n");
                                        Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Shipping Method:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(HasShippableComponents, DB.RSFieldByLocale( rs2, "ShippingMethod", ThisCustomer.LocaleSetting), "All Download Items") + "</td></tr>\n");

                                        if (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue && DB.RSFieldDateTime( rs2, "DownloadEmailSentOn") == System.DateTime.MinValue)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"middle\">Ready To Ship:&nbsp;</td><td align=\"left\" valign=\"middle\">");
                                            if (DB.RSFieldBool( rs2, "ReadyToShip"))
                                            {
                                                Response.Write("Yes");
                                                if (!ord.HasBeenEdited)
                                                {
                                                    Response.Write("&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Clear Ready To Ship\" name=\"ClearReadyToShip" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ClearReadyToShip(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write("No");
                                                if (HasShippableComponents && !ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Mark As Ready To Ship\" name=\"MarkReadyToShip" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"MarkReadyToShip(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                }
                                            }
                                            Response.Write("</td></tr>\n");
                                            Response.Write("<tr><td align=\"right\" valign=\"middle\">Order Weight:&nbsp;</td><td align=\"left\" valign=\"middle\">");
                                            Response.Write(Localization.CurrencyStringForGatewayWithoutExchangeRate(ord.OrderWeight));
                                            Response.Write("</td></tr>\n");
                                        }

                                        if (HasShippableComponents)
                                        {
                                            if (ShippingStatus.IndexOf("<input") == -1) // don't show the form again!
                                            {
                                                Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Shipping Status:&nbsp;</td><td align=\"left\" valign=\"top\">" + ShippingStatus + "</td></tr>\n");
                                            }
                                            Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                            if (DB.RSField( rs2, "RTShipRequest").Length != 0)
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">RTShipping:&nbsp;</td><td align=\"left\" valign=\"top\"><a target=\"_blank\" href=\"popuprt.aspx?ordernumber=" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\">RT Shipping Info</a></td></tr>\n");
                                            }
                                        }
                                        if (ord.HasDownloadComponents(true) && ord.ThereAreDownloadFilesSpecified())
                                        {
                                            if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Download Items:&nbsp;</td><td align=\"left\" valign=\"top\">Yes</td></tr>\n");
                                            }
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Download E-Mail Sent On:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn") != System.DateTime.MinValue, Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn")), AppLogic.ro_NotApplicable));
                                            if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                            {
                                                Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DownloadEMailSentOn") != System.DateTime.MinValue, "Re-Send Download E-Mail", "Send Download E-Mail") + "\" name=\"Download" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"SendDownloadEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                            }
                                            Response.Write("</td></tr>\n");

                                        }
                                        else
                                        {
                                            if (!AppLogic.ProductIsMLExpress() && !AppLogic.ProductIsMLX())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Download Items:&nbsp;</td><td align=\"left\" valign=\"top\">No</td></tr>\n");
                                            }
                                        }
                                        // DROP SHIPPING IS ML FEATURE
                                        if (AppLogic.ProductIsMLExpress() == true || !AppLogic.m_ProductIsML())
                                        {
                                        }
                                        else
                                        {
                                            if (ord.HasDistributorComponents())
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Distributor Drop-Ship Items:&nbsp;</td><td align=\"left\" valign=\"top\">Yes</td></tr>\n");
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Distributor E-Mail Sent On:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn") != System.DateTime.MinValue, Localization.ToNativeDateTimeString(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn")), AppLogic.ro_NotApplicable));
                                                if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"" + CommonLogic.IIF(DB.RSFieldDateTime( rs2, "DistributorEMailSentOn") != System.DateTime.MinValue, "Re-Send Distributor E-Mail(s)", "Send Distributor E-Mail(s)") + "\" name=\"Distributor" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"SendDistributorEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                                }
                                                Response.Write("</td></tr>\n");

                                            }
                                            else
                                            {
                                                Response.Write("<tr><td align=\"right\" valign=\"top\">Has Distributor Items:&nbsp;</td><td align=\"left\" valign=\"top\">No</td></tr>\n");
                                            }
                                        }

                                        if (AppLogic.ProductIsMLExpress() == false)
                                        {
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Has Multiple Shipping Addresses:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(ord.HasMultipleShippingAddresses(), "Yes", "No") + "</td></tr>\n");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">Has Gift Registry Items:&nbsp;</td><td align=\"left\" valign=\"top\">" + CommonLogic.IIF(ord.HasGiftRegistryComponents(), "Yes", "No") + "</td></tr>\n");
                                        }
                                        if (_shipRushEnabledAndConfigured)
                                        {
                                            Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">ShipRush:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                            if (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue)
                                            {
                                                if (!ord.HasBeenEdited)
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"ShipRush\" name=\"ShipRush" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ShipRushOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write("Sent To ShipRush on " + Localization.ToNativeShortDateString(DB.RSFieldDateTime( rs2, "ShippedOn")));
                                            }
                                            Response.Write("</td></tr>");
                                        }
                                        if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                                        {
                                            Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                            Response.Write("<tr><td align=\"right\" valign=\"top\">FedExShipManager:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                            if (DB.RSFieldDateTime( rs2, "ShippedOn") == System.DateTime.MinValue)
                                            {
                                           
                                               if (!ord.HasBeenEdited && (TransactionState == AppLogic.ro_TXStateAuthorized || TransactionState == AppLogic.ro_TXStateCaptured || TransactionState == AppLogic.ro_TXStatePending))
                                                {
                                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"FedExShipManager\" name=\"FedExShipManager" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"FedExShipManagerOrder(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "," + CommonLogic.IIF(ord.TransactionIsCaptured(), "1", "0") + ");\">");
                                                }
                                            }
                                            else
                                            {
                                                Response.Write("Sent To FedExShipManager on " + Localization.ToNativeShortDateString(DB.RSFieldDateTime( rs2, "ShippedOn")));
                                            }
                                            Response.Write("</td></tr>");
                                        }

                                        Response.Write("</table>\n");
                                    }
                                    else
                                    {
                                        Response.Write(AppLogic.ro_NotApplicable);
                                    }
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // CUSTOMER DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"CustomerDiv_" + OrderNumber.ToString() + "\" name=\"CustomerDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");

                                    DateTime CustomerCreatedOn = System.DateTime.MinValue;

                                    using (SqlConnection dbconn5 = DB.dbConn())
                                    {
                                        dbconn5.Open();
                                        using (IDataReader rscc = DB.GetRS("Select CreatedOn from Customer with (NOLOCK) where CustomerID=" + DB.RSFieldInt( rs2, "CustomerID").ToString(), dbconn5))
                                        {
                                            if (rscc.Read())
                                            {
                                                CustomerCreatedOn = DB.RSFieldDateTime(rscc, "CreatedOn");
                                            }
                                        }
                                    }

                                    Response.Write("<table align=\"left\" valign=\"top\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "&nbsp;&nbsp;<a href=\"cst_account.aspx?customerid=" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "\" target=\"content\">Edit</a></td></tr>");
                                    if (AppLogic.ProductIsMLExpress() == false)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Affiliate ID:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSFieldInt(rs2, "AffiliateID").ToString() + "</td></tr>\n");
                                    }
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer Name:&nbsp;</td><td align=\"left\" valign=\"top\">" + (DB.RSField( rs2, "FirstName") + " " + DB.RSField( rs2, "LastName")).Trim() + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer Phone:&nbsp;</td><td align=\"left\" valign=\"top\">" + DB.RSField( rs2, "Phone") + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Created On:&nbsp;</td><td align=\"left\" valign=\"top\">" + Localization.ToNativeShortDateString(CustomerCreatedOn) + "</td></tr>");
                                    Response.Write("<tr><td align=\"right\" valign=\"top\">Customer E-Mail:&nbsp;</td><td align=\"left\" valign=\"top\"><a href=\"mailto:" + DB.RSField( rs2, "EMail") + "?subject=" + "RE: " + AppLogic.AppConfig("StoreName") + " Order " + ord.OrderNumber.ToString() + "\">" + DB.RSField( rs2, "EMail") + "</a>");
                                    if (!ord.HasBeenEdited && TransactionState != AppLogic.ro_TXStateFraud)
                                    {
                                        Response.Write("&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"text\" name=\"NewEMail\" size=\"25\" maxlength=\"100\">&nbsp;<input  class=\"normalButtons\" type=\"button\" value=\"Change Order E-Mail\" name=\"ChangeOrderEMail" + DB.RSFieldInt( rs2, "OrderNumber").ToString() + "\" onClick=\"ChangeOrderEMail(OrderDetailForm," + DB.RSFieldInt( rs2, "OrderNumber").ToString() + ");\">");
                                    }
                                    Response.Write("</td></tr>");
                                    if (NumOrders > 1)
                                    {
                                        Response.Write("<tr><td colspan=2>&nbsp;</td></tr>");
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Order History:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                        Response.Write("<a target=\"content\" href=\"cst_history.aspx?customerid=" + DB.RSFieldInt( rs2, "CustomerID").ToString() + "\">");
                                        for (int i = 1; i <= NumOrders; i++)
                                        {
                                            Response.Write("<img src=\"" + AppLogic.LocateImageURL("skins/skin_" + SkinID.ToString() + "/images/smile.gif") + "\" border=\"0\" align=\"absmiddle\">");
                                            if (i % 10 == 0)
                                            {
                                                Response.Write("<br/>");
                                            }
                                        }
                                        Response.Write("</a>");
                                        Response.Write("</td></tr>");
                                    }
                                    if (DB.RSField( rs2, "Referrer").Length != 0)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Referrer:&nbsp;</td><td align=\"left\" valign=\"top\">");
                                        if (DB.RSField( rs2, "Referrer").StartsWith("http://", StringComparison.InvariantCultureIgnoreCase))
                                        {
                                            Response.Write("<a href=\"" + DB.RSField( rs2, "Referrer") + "\" target=\"_blank\">");
                                            Response.Write(DB.RSField( rs2, "Referrer"));
                                            Response.Write("</a>");
                                        }
                                        Response.Write("</td></tr>");
                                    }

                                    if (AppLogic.ProductIsMLExpress() == false)
                                    {
                                        Response.Write("<tr><td align=\"right\" valign=\"top\">Affiliate:&nbsp;</td><td align=\"left\" valign=\"top\">" + AffiliateHelper.GetEntityName(DB.RSFieldInt(rs2, "AffiliateID"), ThisCustomer.LocaleSetting) + "</td></tr>");
                                    }
                                    Response.Write("</table>");
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // NOTES DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"NotesDiv_" + OrderNumber.ToString() + "\" name=\"NotesDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");
                                    Response.Write("<p></p>");

                                    Response.Write("<p><b>FINALIZATION DATA (VISIBLE BY CUSTOMER: NO, EDITABLE HERE: NO)</b></p>");
                                    Response.Write("<textarea readonly rows=\"10\" name=\"FinalizationData\" cols=\"120\">" + XmlCommon.PrettyPrintXml(DB.RSField( rs2, "FinalizationData")) + "</textarea><br/>\n");

                                    Response.Write("<p><b>ORDER NOTES AS ENTERED BY CUSTOMER (VISIBLE BY CUSTOMER: YES, EDITABLE HERE: NO)</b></p>");
                                    Response.Write("<textarea readonly rows=\"10\" name=\"OrderNotes\" cols=\"120\">" + Server.HtmlEncode(DB.RSField( rs2, "OrderNotes")) + "</textarea><br/>\n");
                                    Response.Write("<p></p>");

                                    Response.Write("<p><b>PRIVATE NOTES (VISIBLE BY CUSTOMER: NO, MIGRATED FROM CUSTOMER RECORD ON ORDER CREATION, EDITABLE HERE: YES)</b></p>");
                                    Response.Write("<textarea rows=\"10\" name=\"Notes\" cols=\"120\">" + Server.HtmlEncode(DB.RSField( rs2, "Notes")) + "</textarea><br/>\n");
                                    Response.Write("<p></p>");

                                    Response.Write("<p><b>CUSTOMER SERVICE NOTES (VISIBLE BY CUSTOMER: " + CommonLogic.IIF(AppLogic.AppConfigBool("ShowCustomerServiceNotesInReceipts"), "YES", "NO") + ", EDITABLE HERE: YES)</b></p>");
                                    Response.Write("<textarea rows=\"20\" name=\"CustomerServiceNotes\" cols=\"120\">" + DB.RSField( rs2, "CustomerServiceNotes") + "</textarea><br/>\n");

                                    Response.Write("<input  class=\"normalButtons\" type=\"button\" value=\"Submit\" onClick=\"document.OrderDetailForm.SubmitAction.value='UPDATENOTES';document.OrderDetailForm.submit();\">\n");

                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // RECEIPT DIV
                                    // --------------------------------------------------------------------------------------------------
                                    Response.Write("<div id=\"ReceiptDiv_" + OrderNumber.ToString() + "\" name=\"ReceiptDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");
                                    Response.Write("<p><b><a href=\"javascript:window.print();\">Print Receipt</a>&nbsp;&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"" + ReceiptURLPrintable + "\" target=\"_blank\">Open New Receipt Window Here</a></b></p>");
                                    Response.Write(CommonLogic.ExtractBody(ord.Receipt(ThisCustomer)));
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // XML DIV
                                    // --------------------------------------------------------------------------------------------------
                                    // We write an empty div even if not a SuperUser so that all the javascript references to the XMLDiv don't fail.
                                    Response.Write("<div id=\"XMLDiv_" + OrderNumber.ToString() + "\" name=\"XMLDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");
                                    if (ThisCustomer.IsAdminSuperUser)
                                    {
                                       
                                        String OrderXml = AppLogic.RunXmlPackage("DumpOrder", null, ThisCustomer, ThisCustomer.SkinID,"" , "OrderNumber=" + OrderNumber.ToString(), false, true);
                                     
                                        Response.Write("<textarea READONLY rows=50 cols=120>" + XmlCommon.PrettyPrintXml(OrderXml) + "</textarea>");
                                        
                                    }
                                    Response.Write("</div>\n");

                                    // --------------------------------------------------------------------------------------------------
                                    // DISTRIBUTOR DIV
                                    // --------------------------------------------------------------------------------------------------
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("<div id=\"DistributorDiv_" + OrderNumber.ToString() + "\" name=\"DistributorDiv_" + OrderNumber.ToString() + "\" style=\"width: 100%; display:none;\">\n");
                                        // DROP SHIPPING IS ML FEATURE
                                        if (!AppLogic.m_ProductIsML())
                                        {
                                        }
                                        else
                                        {
                                            Response.Write(AppLogic.GetAllDistributorNotifications(ord));
                                        }
                                        Response.Write("</div>\n");
                                    }

                                    Response.Write("</td></tr>\n");
                                    Response.Write("</table>\n");


                                    Response.Write("<script type=\"text/javascript\">\n");

                                    Response.Write("function ShowDiv_" + OrderNumber.ToString() + "(name)\n");
                                    Response.Write("{\n");
                                    Response.Write("	document.getElementById(name + 'Div_" + OrderNumber.ToString() + "').style.display='block';\n");
                                    Response.Write("	document.getElementById(name + 'TD_" + OrderNumber.ToString() + "').className = 'LightTab';\n");
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function HideDiv_" + OrderNumber.ToString() + "(name)\n");
                                    Response.Write("{\n");
                                    Response.Write("	document.getElementById(name + 'Div_" + OrderNumber.ToString() + "').style.display='none';\n");
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");


                                    Response.Write("function ShowGeneralDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function ShowBillingDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function ShowShippingDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function ShowCustomerDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function ShowNotesDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    Response.Write("function ShowReceiptDiv_" + OrderNumber.ToString() + "()\n");
                                    Response.Write("{\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                    Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                    Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                    }
                                    Response.Write("	return (true);\n");
                                    Response.Write("}\n");

                                    if (ThisCustomer.IsAdminSuperUser)
                                    {
                                        Response.Write("function ShowXMLDiv_" + OrderNumber.ToString() + "()\n");
                                        Response.Write("{\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                        Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('XML');\n");
                                        if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                        {
                                            Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                        }
                                        Response.Write("	return (true);\n");
                                        Response.Write("}\n");
                                    }

                                    if (AppLogic.ProductIsMLExpress() == false && ord.HasDistributorComponents())
                                    {
                                        Response.Write("function ShowDistributorDiv_" + OrderNumber.ToString() + "()\n");
                                        Response.Write("{\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('General');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Billing');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Shipping');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Customer');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Notes');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('Receipt');\n");
                                        Response.Write("	HideDiv_" + OrderNumber.ToString() + "('XML');\n");
                                        Response.Write("	ShowDiv_" + OrderNumber.ToString() + "('Distributor');\n");
                                        Response.Write("	return (true);\n");
                                        Response.Write("}\n");
                                    }

                                    Response.Write("Show" + InitialTab + "Div_" + OrderNumber.ToString() + "();\n");

                                    Response.Write("</script>\n");
                                }
                            }                            
                            
                            ord = null;

                            Response.Write("<script type=\"text/javascript\">\n");

                            if (IsPayPal)
                            {
                                Response.Write("function PayPalReauthOrder(theForm,id)\n");
                                Response.Write("{\n");
                                Response.Write("window.open('paypalreauthorder.aspx?ordernumber=' + id,'PayPalReauthOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                                Response.Write("}\n");
                            }

                            Response.Write("function MarkAsShipped(theForm,id,transactioniscaptured)\n");
                            Response.Write("{\n");
                            Response.Write("var oktoproceed = true;\n");
                            Response.Write("if(transactioniscaptured == 0)\n");
                            Response.Write("{\n");
                            Response.Write("oktoproceed = confirm('Are you sure you want to proceed. The order transaction state is not currently set to CAPTURED, and this will close the order, and remove the IsNew status from the order!');\n");
                            Response.Write("}\n");
                            Response.Write("if(oktoproceed)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'MARKASSHIPPED';\n");
                            Response.Write("theForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function MarkAsPrinted(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'MARKASPRINTED';\n");
                            Response.Write("theForm.submit();\n");
                            Response.Write("}\n");

                            Response.Write("function MarkReadyToShip(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'MARKREADYTOSHIP';\n");
                            Response.Write("theForm.submit();\n");
                            Response.Write("}\n");

                            Response.Write("function ClearReadyToShip(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'CLEARREADYTOSHIP';\n");
                            Response.Write("theForm.submit();\n");
                            Response.Write("}\n");

                            Response.Write("function ClearNew(theForm,id,transactioniscaptured)\n");
                            Response.Write("{\n");
                            Response.Write("var oktoproceed = true;\n");
                            Response.Write("if(transactioniscaptured == 0)\n");
                            Response.Write("{\n");
                            Response.Write("oktoproceed = confirm('Are you sure you want to proceed. The order transaction state is not currently set to CAPTURED, and this will remove the IsNew status from the order!');\n");
                            Response.Write("}\n");
                            Response.Write("if(oktoproceed)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'CLEARNEW';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function RefundOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('refundorder.aspx?ordernumber=' + id,'RefundOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function CaptureOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('captureorder.aspx?ordernumber=' + id,'CaptureOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function VoidOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('voidorder.aspx?ordernumber=' + id,'VoidOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function ForceVoidOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('voidorder.aspx?ordernumber=' + id + '&ForceVoid=1','ForceVoidOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function AdHocChargeOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('adhoccharge.aspx?ordernumber=' + id,'AdHocOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=650,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function CancelRecurringBilling(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('recurringrefundcancel.aspx?ordernumber=' + id,'CancelRecurringBilling" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=650,left=0,top=0');\n");
                            Response.Write("}\n");

                            Response.Write("function AdjustChargeOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('adjustcharge.aspx?ordernumber=' + id,'AdjustChargeOrder" + CommonLogic.GetRandomNumber(1, 100000).ToString() + "','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=600,height=500,left=0,top=0');\n");
                            Response.Write("}\n");

                            if (_shipRushEnabledAndConfigured)
                            {

                                Response.Write("function ShipRushOrder(theForm,id,transactioniscaptured)\n");
                                Response.Write("{\n");
                                Response.Write("var oktoproceed = true;\n");
                                Response.Write("if(transactioniscaptured == 0)\n");
                                Response.Write("{\n");
                                Response.Write("oktoproceed = confirm('Are you sure you want to proceed. The order transaction state is not yet CAPTURED, and this will close the order, and remove the IsNew status from the order!');\n");
                                Response.Write("}\n");
                                Response.Write("if(oktoproceed)\n");
                                Response.Write("{\n");
                                Response.Write("document.OrderDetailForm.SubmitAction.value = 'SHIPRUSH';\n");
                                Response.Write("theForm.submit();\n");
                                Response.Write("}\n");
                                Response.Write("}\n");
                            }
                            if (AppLogic.ProductIsMLExpress() == false && AppLogic.AppConfigBool("FedExShipManager.Enabled"))
                            {

                                Response.Write("function FedExShipManagerOrder(theForm,id,transactioniscaptured)\n");
                                Response.Write("{\n");
                                Response.Write("var oktoproceed = true;\n");
                                Response.Write("if(transactioniscaptured == 0)\n");
                                Response.Write("{\n");
                                Response.Write("oktoproceed = confirm('Are you sure you want to proceed. The order transaction state is not yet CAPTURED, and this will close the order, and remove the IsNew status from the order!');\n");
                                Response.Write("}\n");
                                Response.Write("if(oktoproceed)\n");
                                Response.Write("{\n");
                                Response.Write("document.OrderDetailForm.SubmitAction.value = 'FEDEXSHIPMANAGER';\n");
                                Response.Write("theForm.submit();\n");
                                Response.Write("}\n");
                                Response.Write("}\n");
                            }

                            if (ShippingStatus.IndexOf("Shipped On: <input") != -1)
                            {
                                Response.Write("    Calendar.setup({\n");
                                Response.Write("        inputField     :    \"ShippedOn\",      // id of the input field\n");
                                Response.Write("        ifFormat       :    \"" + Localization.JSCalendarDateFormatSpec() + "\",       // format of the input field\n");
                                Response.Write("        showsTime      :    false,            // will display a time selector\n");
                                Response.Write("        button         :    \"f_trigger_s\",   // trigger for the calendar (button ID)\n");
                                Response.Write("        singleClick    :    true            // Single-click mode\n");
                                Response.Write("    });\n");
                            }

                            Response.Write("function EditOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to edit order: ' + id + '.'))\n");
                            Response.Write("{\n");
                            Response.Write("parent.location='phoneorder.aspx?ordernumber=' + id");
                            
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function MarkAsFraudOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to mark order: ' + id + ' as fraud.'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'MARKASFRAUD';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function ClearAsFraudOrder(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to removem the Fraud status from order: ' + id + '.'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'CLEARASFRAUD';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function BlockIP(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to block this IP Address?'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'BLOCKIP';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function GetMaxmind(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'GETMAXMIND';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");

                            Response.Write("function AllowIP(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to unblock this IP Address?'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'ALLOWIP';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function ChangeOrderEMail(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to change the e-mail address on order: ' + id + '. This action cannot be undone, and the order record will be permanently updated!'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'CHANGEORDEREMAIL';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function AdjustOrderWeight(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'ADJUSTORDERWEIGHT';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");

                            Response.Write("function ForceRefund(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('This will force order ' + id + ' to be marked as refunded. This WILL NOT perform any refund monetary transaction, it JUST updates the transaction state, so you should have prior refunded the customers money using other means before performing this action. This action cannot be undone. The customer will not be e-mailed any receipt.'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'FORCEREFUND';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function SendDownloadEMail(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to send the download e-mail for order: ' + id + '. This action will send an e-mail with download instructions to the customer, so make sure you have cleared the order payment first!'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'SENDDOWNLOADEMAIL';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            if (AppLogic.ProductIsMLExpress() == false)
                            {
                                Response.Write("function SendDistributorEMail(theForm,id)\n");
                                Response.Write("{\n");
                                Response.Write("if(confirm('Are you sure you want to send the distributor drop-ship e-mails for order: ' + id + '. This action will most likely cause the distributor to ship the items to the customer, so make sure you have cleared the order payment first!'))\n");
                                Response.Write("{\n");
                                Response.Write("document.OrderDetailForm.SubmitAction.value = 'SENDDISTRIBUTOREMAIL';\n");
                                Response.Write("document.OrderDetailForm.submit();\n");
                                Response.Write("}\n");
                                Response.Write("}\n");
                            }
                            Response.Write("function SendReceiptEMail(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("if(confirm('Are you sure you want to send the receipt e-mail for order: ' + id + '. This action will send an e-mail with to the customer, so make sure you have cleared the order payment first!'))\n");
                            Response.Write("{\n");
                            Response.Write("document.OrderDetailForm.SubmitAction.value = 'SENDRECEIPTEMAIL';\n");
                            Response.Write("document.OrderDetailForm.submit();\n");
                            Response.Write("}\n");
                            Response.Write("}\n");

                            Response.Write("function SetOrderNotes(theForm,id)\n");
                            Response.Write("{\n");
                            Response.Write("window.open('editordernotes.aspx?OrderNumber=' + id,\"AspDotNetStorefront_ML" + CommonLogic.GetRandomNumber(1, 10000).ToString() + "\",\"height=300,width=630,top=10,left=20,status=no,toolbar=no,menubar=no,scrollbars=yes,location=no\")\n");
                            Response.Write("}\n");

                            Response.Write("</SCRIPT>\n");
                        }
                    }
                }
            }
            
            

            Response.Write("</body></html>");
        }

    }
}
