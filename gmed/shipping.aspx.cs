// ------------------------------------------------------------------------------------------
// Copyright AspDotNetStorefront.com, 1995-2009.  All Rights Reserved.
// http://www.aspdotnetstorefront.com
// For details on this license please visit  the product homepage at the URL above.
// THE ABOVE NOTICE MUST REMAIN INTACT. 
// ------------------------------------------------------------------------------------------
using System;
using System.Data;
using System.Globalization;
using System.Text;
using AspDotNetStorefrontCore;
using System.Data.SqlClient;

namespace AspDotNetStorefrontAdmin
{
    /// <summary>
    /// Summary description for shippingfrm.f
    /// </summary>
    public partial class shippingfrm : AspDotNetStorefront.SkinBase
    {

        protected void Page_Load(object sender, System.EventArgs e)
        {
            Response.CacheControl = "private";
            Response.Expires = 0;
            Response.AddHeader("pragma", "no-cache");

            SectionTitle = "Shipping Tables";
        }

        protected override void RenderContents(System.Web.UI.HtmlTextWriter writer)
        {
            String EditGUID = CommonLogic.FormCanBeDangerousContent("EditGUID");
            if (EditGUID.Length == 0)
            {
                EditGUID = CommonLogic.QueryStringCanBeDangerousContent("EditGUID");
            }

            if (CommonLogic.FormBool("IsSubmitCalculationID"))
            {
                DB.ExecuteSQL("Update ShippingCalculation set Selected=0");
                DB.ExecuteSQL("Update ShippingCalculation set Selected=1 where ShippingCalculationID=" + CommonLogic.FormUSInt("ShippingCalculationID").ToString());
            }

            if (CommonLogic.FormBool("IsSubmitFixedRate"))
            {
                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where name not like " + DB.SQuote("%Real Time%") + " and IsRTShipping=0 order by DisplayOrder", con))
                    {
                        while (rs.Read())
                        {
                            String FieldName = "FixedRate_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString();
                            if (CommonLogic.FormCanBeDangerousContent(FieldName).Length != 0)
                            {
                                DB.ExecuteSQL("Update ShippingMethod set FixedRate=" + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal(FieldName)) + " where ShippingMethodID=" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                            }
                            else
                            {
                                DB.ExecuteSQL("Update ShippingMethod set FixedRate=NULL where ShippingMethodID=" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                            }
                        }
                    }
                }


            }

            if (CommonLogic.FormBool("IsSubmitFixedPercentOfTotal"))
            {
                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                {
                    con.Open();
                    using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where name not like " + DB.SQuote("%Real Time%") + " and IsRTShipping=0 order by DisplayOrder", con))
                    {
                        while (rs.Read())
                        {
                            String FieldName = "FixedPercentOfTotal_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString();
                            if (CommonLogic.FormCanBeDangerousContent(FieldName).Length != 0)
                            {
                                DB.ExecuteSQL("Update ShippingMethod set FixedPercentOfTotal=" + Localization.DecimalStringForDB(CommonLogic.FormUSDecimal(FieldName)) + " where ShippingMethodID=" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                            }
                            else
                            {
                                DB.ExecuteSQL("Update ShippingMethod set FixedPercentOfTotal=NULL where ShippingMethodID=" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                            }
                        }
                    }
                }


            }

            if (CommonLogic.FormBool("IsSubmitByTotal"))
            {
                if (EditGUID.Length != 0)
                {
                    DB.ExecuteSQL("delete from ShippingByTotal where RowGUID=" + DB.SQuote(EditGUID));
                }

                // check for new row addition:
                Decimal Low0 = CommonLogic.FormUSDecimal("Low_0");
                Decimal High0 = CommonLogic.FormUSDecimal("High_0");
                String NewRowGUID = DB.GetNewGUID();

                if (Low0 != System.Decimal.Zero || High0 != System.Decimal.Zero)
                {
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                        {
                            while (rs.Read())
                            {
                                decimal Charge = CommonLogic.FormUSDecimal("Rate_0_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                                DB.ExecuteSQL("insert into ShippingByTotal(RowGUID,LowValue,HighValue,ShippingMethodID,ShippingCharge) values(" + DB.SQuote(NewRowGUID) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Low0) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(High0) + "," + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Charge) + ")");
                            }
                        }
                    }
                }

                // update existing rows:
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    String FieldName = Request.Form.Keys[i];
                    if (FieldName.IndexOf("_0_") == -1 && FieldName != "Low_0" && FieldName != "High_0" && FieldName.IndexOf("_vldt") == -1 && (FieldName.IndexOf("Rate_") != -1 || FieldName.IndexOf("Low_") != -1 || FieldName.IndexOf("High_") != -1))
                    {
                        decimal FieldVal = CommonLogic.FormUSDecimal(FieldName);
                        // this field should be processed
                        String[] Parsed = FieldName.Split('_');
                        if (FieldName.IndexOf("Rate_") != -1)
                        {
                            // update shipping costs:
                            DB.ExecuteSQL("insert into ShippingByTotal(RowGUID,LowValue,HighValue,ShippingMethodID,ShippingCharge) values(" + DB.SQuote(Parsed[1]) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("Low_" + Parsed[1])) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("High_" + Parsed[1])) + "," + Parsed[2] + "," + Localization.CurrencyStringForDBWithoutExchangeRate(FieldVal) + ")");
                        }
                    }
                }
                DB.ExecuteSQL("Update ShippingByTotal set HighValue=99999.99 where HighValue=0.0 and LowValue<>0.0");
            }

            if (CommonLogic.FormBool("IsSubmitByTotalByPercent"))
            {
                if (EditGUID.Length != 0)
                {
                    DB.ExecuteSQL("delete from ShippingByTotalByPercent where RowGUID=" + DB.SQuote(EditGUID));
                }

                // check for new row addition:
                Decimal Low0 = CommonLogic.FormUSDecimal("Low_0");
                Decimal High0 = CommonLogic.FormUSDecimal("High_0");
                Decimal Minimum0 = CommonLogic.FormUSDecimal("Minimum_0");
                Decimal Base0 = CommonLogic.FormUSDecimal("Base_0");
                String NewRowGUID = DB.GetNewGUID();

                if (Low0 != System.Decimal.Zero || High0 != System.Decimal.Zero)
                {
                    // add the new row if necessary:
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                        {
                            while (rs.Read())
                            {
                                decimal PercentOfTotal = CommonLogic.FormUSDecimal("Rate_0_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                                String sql = "insert into ShippingByTotalByPercent(RowGUID,LowValue,HighValue,ShippingMethodID,MinimumCharge,SurCharge,PercentOfTotal) values(" + DB.SQuote(NewRowGUID) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Low0) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(High0) + "," + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Minimum0) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Base0) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(PercentOfTotal) + ")";
                                DB.ExecuteSQL(sql);
                            }
                        }
                    }
                }

                // update existing rows:
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    String FieldName = Request.Form.Keys[i];
                    if (FieldName.IndexOf("_0_") == -1 && FieldName != "Low_0" && FieldName != "High_0" && FieldName.IndexOf("_vldt") == -1 && (FieldName.IndexOf("Rate_") != -1 || FieldName.IndexOf("Low_") != -1 || FieldName.IndexOf("High_") != -1))
                    {
                        decimal FieldVal = CommonLogic.FormUSDecimal(FieldName);
                        // this field should be processed
                        String[] Parsed = FieldName.Split('_');
                        if (FieldName.IndexOf("Rate_") != -1)
                        {
                            // update shipping costs:
                            String sql = "insert into ShippingByTotalByPercent(RowGUID,LowValue,HighValue,ShippingMethodID,MinimumCharge,SurCharge,PercentOfTotal) values(" + DB.SQuote(Parsed[1]) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("Low_" + Parsed[1])) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("High_" + Parsed[1])) + "," + Parsed[2] + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("Minimum_" + Parsed[1])) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("Base_" + Parsed[1])) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(FieldVal) + ")";
                            DB.ExecuteSQL(sql);
                        }
                    }
                }
                DB.ExecuteSQL("Update ShippingByTotalByPercent set HighValue=99999.99 where HighValue=0.0 and LowValue<>0.0");
            }

            if (CommonLogic.FormBool("IsSubmitByWeight"))
            {
                if (EditGUID.Length != 0)
                {
                    DB.ExecuteSQL("delete from ShippingByWeight where RowGUID=" + DB.SQuote(EditGUID));
                }

                // check for new row addition:
                Decimal Low0 = CommonLogic.FormUSDecimal("Low_0");
                Decimal High0 = CommonLogic.FormUSDecimal("High_0");
                String NewRowGUID = DB.GetNewGUID();

                if (Low0 != 0.0M || High0 != 0.0M)
                {
                    // add the new row if necessary:
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                        {
                            while (rs.Read())
                            {
                                decimal Charge = CommonLogic.FormUSDecimal("Rate_0_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString());
                                DB.ExecuteSQL("insert into ShippingByWeight(RowGUID,LowValue,HighValue,ShippingMethodID,ShippingCharge) values(" + DB.SQuote(NewRowGUID) + "," + Localization.DecimalStringForDB(Low0) + "," + Localization.DecimalStringForDB(High0) + "," + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Charge) + ")");
                            }
                        }
                    }


                }

                // update existing rows:
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    String FieldName = Request.Form.Keys[i];
                    if (FieldName.IndexOf("_0_") == -1 && FieldName != "Low_0" && FieldName != "High_0" && FieldName.IndexOf("_vldt") == -1 && (FieldName.IndexOf("Rate_") != -1 || FieldName.IndexOf("Low_") != -1 || FieldName.IndexOf("High_") != -1))
                    {
                        decimal FieldVal = CommonLogic.FormUSDecimal(FieldName);
                        // this field should be processed
                        String[] Parsed = FieldName.Split('_');
                        if (FieldName.IndexOf("Rate_") != -1)
                        {
                            // update shipping costs:
                            DB.ExecuteSQL("insert into ShippingByWeight(RowGUID,LowValue,HighValue,ShippingMethodID,ShippingCharge) values(" + DB.SQuote(Parsed[1]) + "," + Localization.DecimalStringForDB(CommonLogic.FormUSDecimal("Low_" + Parsed[1])) + "," + Localization.DecimalStringForDB(CommonLogic.FormUSDecimal("High_" + Parsed[1])) + "," + Parsed[2] + "," + Localization.CurrencyStringForDBWithoutExchangeRate(FieldVal) + ")");
                        }
                    }
                }
                DB.ExecuteSQL("Update ShippingByWeight set HighValue=99999.99 where HighValue=0.0 and LowValue<>0.0");
            }

            if (CommonLogic.FormBool("IsSubmitWeightByZone"))
            {
                int ShippingMethodID = CommonLogic.FormUSInt("ShippingMethodID");
                if (ShippingMethodID == 0)
                {
                    ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
                }
                if (EditGUID.Length != 0)
                {
                    DB.ExecuteSQL("delete from ShippingWeightByZone where ShippingMethodID=" + ShippingMethodID.ToString() + " and RowGUID=" + DB.SQuote(EditGUID));
                }

                // check for new row addition:
                Decimal Low0 = CommonLogic.FormUSDecimal("Low_0");
                Decimal High0 = CommonLogic.FormUSDecimal("High_0");
                String NewRowGUID = DB.GetNewGUID();

                if (Low0 != 0.0M || High0 != 0.0M)
                {
                    // add the new row if necessary:
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS("select * from ShippingZone  with (NOLOCK)  where Deleted=0 order by DisplayOrder,Name", con))
                        {
                            while (rs.Read())
                            {
                                Decimal Charge = CommonLogic.FormUSDecimal("Rate_0_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString());
                                DB.ExecuteSQL("insert into ShippingWeightByZone(RowGUID,ShippingMethodID,LowValue,HighValue,ShippingZoneID,ShippingCharge) values(" + DB.SQuote(NewRowGUID) + "," + ShippingMethodID.ToString() + "," + Localization.DecimalStringForDB(Low0) + "," + Localization.DecimalStringForDB(High0) + "," + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Charge) + ")");
                            }
                        }
                    }

                }

                // update existing rows:
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    String FieldName = Request.Form.Keys[i];
                    if (FieldName.IndexOf("_0_") == -1 && FieldName != "Low_0" && FieldName != "High_0" && FieldName.IndexOf("_vldt") == -1 && (FieldName.IndexOf("Rate_") != -1 || FieldName.IndexOf("Low_") != -1 || FieldName.IndexOf("High_") != -1))
                    {
                        Decimal FieldVal = CommonLogic.FormUSDecimal(FieldName);
                        // this field should be processed
                        String[] Parsed = FieldName.Split('_');
                        if (FieldName.IndexOf("Rate_") != -1)
                        {
                            // update shipping costs:
                            DB.ExecuteSQL("insert into ShippingWeightByZone(RowGUID,ShippingMethodID,LowValue,HighValue,ShippingZoneID,ShippingCharge) values(" + DB.SQuote(Parsed[1]) + "," + ShippingMethodID.ToString() + "," + Localization.DecimalStringForDB(CommonLogic.FormUSDecimal("Low_" + Parsed[1])) + "," + Localization.DecimalStringForDB(CommonLogic.FormUSDecimal("High_" + Parsed[1])) + "," + Parsed[2] + "," + Localization.CurrencyStringForDBWithoutExchangeRate(FieldVal) + ")");
                        }
                    }
                }
                DB.ExecuteSQL("Update ShippingWeightByZone set HighValue=99999.99 where HighValue=0.0 and LowValue<>0.0");
            }

            if (CommonLogic.FormBool("IsSubmitTotalByZone"))
            {
                int ShippingMethodID = CommonLogic.FormUSInt("ShippingMethodID");
                if (ShippingMethodID == 0)
                {
                    ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
                }
                if (EditGUID.Length != 0)
                {
                    DB.ExecuteSQL("delete from ShippingTotalByZone where ShippingMethodID=" + ShippingMethodID.ToString() + " and RowGUID=" + DB.SQuote(EditGUID));
                }

                // check for new row addition:
                Decimal Low0 = CommonLogic.FormUSDecimal("Low_0");
                Decimal High0 = CommonLogic.FormUSDecimal("High_0");
                String NewRowGUID = DB.GetNewGUID();

                if (Low0 != 0.0M || High0 != 0.0M)
                {
                    // add the new row if necessary:
                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                    {
                        con.Open();
                        using (IDataReader rs = DB.GetRS("select * from ShippingZone  with (NOLOCK)  where Deleted=0 order by DisplayOrder,Name", con))
                        {
                            while (rs.Read())
                            {
                                Decimal Charge = CommonLogic.FormUSDecimal("Rate_0_" + DB.RSFieldInt(rs, "ShippingZoneID").ToString());
                                DB.ExecuteSQL("insert into ShippingTotalByZone(RowGUID,ShippingMethodID,LowValue,HighValue,ShippingZoneID,ShippingCharge) values(" + DB.SQuote(NewRowGUID) + "," + ShippingMethodID.ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Low0) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(High0) + "," + DB.RSFieldInt(rs, "ShippingZoneID").ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(Charge) + ")");
                            }
                        }
                    }


                }

                // update existing rows:
                for (int i = 0; i <= Request.Form.Count - 1; i++)
                {
                    String FieldName = Request.Form.Keys[i];
                    if (FieldName.IndexOf("_0_") == -1 && FieldName != "Low_0" && FieldName != "High_0" && FieldName.IndexOf("_vldt") == -1 && (FieldName.IndexOf("Rate_") != -1 || FieldName.IndexOf("Low_") != -1 || FieldName.IndexOf("High_") != -1))
                    {
                        Decimal FieldVal = CommonLogic.FormUSDecimal(FieldName);
                        // this field should be processed
                        String[] Parsed = FieldName.Split('_');
                        if (FieldName.IndexOf("Rate_") != -1)
                        {
                            // update shipping costs:
                            DB.ExecuteSQL("insert into ShippingTotalByZone(RowGUID,ShippingMethodID,LowValue,HighValue,ShippingZoneID,ShippingCharge) values(" + DB.SQuote(Parsed[1]) + "," + ShippingMethodID.ToString() + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("Low_" + Parsed[1])) + "," + Localization.CurrencyStringForDBWithoutExchangeRate(CommonLogic.FormUSDecimal("High_" + Parsed[1])) + "," + Parsed[2] + "," + Localization.CurrencyStringForDBWithoutExchangeRate(FieldVal) + ")");
                        }
                    }
                }
                DB.ExecuteSQL("Update ShippingTotalByZone set HighValue=99999.99 where HighValue=0.0 and LowValue<>0.0");
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("deletebytotalid").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingByTotal where RowGUID=" + DB.SQuote(CommonLogic.QueryStringCanBeDangerousContent("DeleteByTotalID")));
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("deletebytotalbypercentid").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingByTotalByPercent where RowGUID=" + DB.SQuote(CommonLogic.QueryStringCanBeDangerousContent("DeleteByTotalByPercentID")));
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("deletebyWeightid").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingByWeight where RowGUID=" + DB.SQuote(CommonLogic.QueryStringCanBeDangerousContent("DeleteByWeightID")));
            }
            if (CommonLogic.QueryStringCanBeDangerousContent("deleteWeightByZoneid").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingWeightByZone where ShippingMethodID=" + CommonLogic.QueryStringUSInt("ShippingMethodID").ToString() + " and RowGUID=" + DB.SQuote(CommonLogic.QueryStringCanBeDangerousContent("DeleteWeightByZoneID")));
            }

            if (CommonLogic.QueryStringCanBeDangerousContent("deleteTotalByZoneid").Length != 0)
            {
                DB.ExecuteSQL("delete from ShippingTotalByZone where ShippingMethodID=" + CommonLogic.QueryStringUSInt("ShippingMethodID").ToString() + " and RowGUID=" + DB.SQuote(CommonLogic.QueryStringCanBeDangerousContent("DeleteTotalByZoneID")));
            }

            writer.Write("<script type=\"text/javascript\">\n");
            writer.Write("function ShippingForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function FixedRateForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function FixedPercentOfTotalForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function ByTotalForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function ByTotalByPercentForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function ByWeightForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function WeightByZoneForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("function TotalByZoneForm_Validator(theForm)\n");
            writer.Write("{\n");
            writer.Write("submitonce(theForm);\n");
            writer.Write("return (true);\n");
            writer.Write("}\n");
            writer.Write("</script>\n");

            Shipping.ShippingCalculationEnum ShipCalcID = 0;

            writer.Write("<form action=\"shipping.aspx\" method=\"post\" id=\"ShippingForm\" name=\"ShippingForm\" onsubmit=\"return (validateForm(this) && ShippingForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
            writer.Write("<input type=\"hidden\" name=\"IsSubmitCalculationID\" value=\"true\">\n");

            string query = string.Empty;
            if (AppLogic.ProductIsMLExpress() || AppLogic.ProductIsMLX())
            {
                query = "select * from ShippingCalculation   with (NOLOCK) where Name not in ('Calculate Shipping By Weight & Zone','Calculate Shipping By Total & Zone') order by shippingcalculationid";
            }
            else
            {
                query = "select * from ShippingCalculation   with (NOLOCK)  order by shippingcalculationid";
            }

            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
            {
                con.Open();
                using (IDataReader rs = DB.GetRS(query, con))
                {
                    while (rs.Read())
                    {
                        writer.Write("<p><input type=\"radio\" name=\"ShippingCalculationID\" value=\"" + DB.RSFieldInt(rs, "ShippingCalculationID").ToString() + "\" " + CommonLogic.IIF(DB.RSFieldBool(rs, "Selected"), " checked ", "") + "><b>" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</b></p>\n");
                        if (DB.RSFieldBool(rs, "Selected"))
                        {
                            ShipCalcID = (Shipping.ShippingCalculationEnum)DB.RSFieldInt(rs, "ShippingCalculationID");
                        }
                    }
                }
            }

            writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Set As Active Shipping Calculation Method\" name=\"submit\">\n");
            writer.Write("</form>\n");

            switch (ShipCalcID)
            {
                case Shipping.ShippingCalculationEnum.CalculateShippingByWeight:
                    {
                        writer.Write("<hr size=1>");

                        writer.Write("<p><b>ACTIVE RATE TABLE FOR: CALCULATE SHIPPING BY ORDER WEIGHT:</b></p>\n");

                        writer.Write("<form action=\"shipping.aspx?EditGUID=" + EditGUID + "\" method=\"post\" id=\"ByWeightForm\" name=\"ByWeightForm\" onsubmit=\"return (validateForm(this) && ByWeightForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitByWeight\" value=\"true\">\n");

                        using (DataTable dtWeight = new DataTable())
                        {
                            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                            {
                                con.Open();
                                using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                                {
                                    dtWeight.Load(rs);
                                }
                            }

                            if (dtWeight.Rows.Count > 0)
                            {
                                writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                writer.Write("<tr class=\"tablenormal\"><td colspan=2 align=\"left\" valign=\"middle\">Order Weight (in " + Localization.WeightUnits() + ")</td><td align=\"left\" valign=\"middle\" colspan=" + dtWeight.Rows.Count.ToString() + ">Shipping Charge By Weight</td><td align=\"left\" valign=\"middle\">&nbsp;</td><td>&nbsp;</td></tr>\n");
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Low</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">High</td>\n");
                                foreach (DataRow row in dtWeight.Rows)
                                {
                                    writer.Write("<td align=\"left\">" + DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                }
                                writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
                                writer.Write("</tr>\n");

                                string sqlShipping = "select distinct rowguid,lowvalue,highvalue from ShippingByWeight   with (NOLOCK)  order by LowValue";
                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS(sqlShipping, con))
                                    {
                                        while (rs.Read())
                                        {
                                            bool EditRow = (EditGUID == DB.RSFieldGUID(rs, "RowGUID"));
                                            writer.Write("<tr>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.DecimalStringForDB(DB.RSFieldDecimal(rs, "LowValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a weight value]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.DecimalStringForDB(DB.RSFieldDecimal(rs, "LowValue")));
                                            }
                                            writer.Write("</td>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.DecimalStringForDB(DB.RSFieldDecimal(rs, "HighValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a weight value]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.DecimalStringForDB(DB.RSFieldDecimal(rs, "HighValue")));
                                            }
                                            writer.Write("</td>\n");

                                            foreach (DataRow row in dtWeight.Rows)
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByWeightCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"))) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByWeightCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"))));
                                                }
                                                writer.Write("</td>\n");
                                            }
                                            if (EditRow)
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                                                writer.Write("</td>");
                                            }
                                            else
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Edit\" value=\"Edit\" onClick=\"self.location='shipping.aspx?EditGUID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            }
                                            writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Delete\" value=\"Delete\" onClick=\"self.location='shipping.aspx?DeleteByWeightID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            writer.Write("</tr>\n");
                                        }
                                    }
                                }

                                // add new row:
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_0\" \">\n");
                                writer.Write("<input type=\"hidden\" name=\"Low_0_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_0\" >\n");
                                writer.Write("<input type=\"hidden\" name=\"High_0_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");

                                foreach (DataRow row in dtWeight.Rows)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                }
                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Add New Row\" name=\"submit\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">&nbsp;</td>");
                                writer.Write("</tr>\n");
                                writer.Write("</table>\n");
                            }
                        }

                        writer.Write("</form>\n");
                        break;
                    }
                case Shipping.ShippingCalculationEnum.CalculateShippingByTotal:
                    {
                        writer.Write("<hr size=1>");

                        writer.Write("<p><b>ACTIVE RATE TABLE FOR: CALCULATE SHIPPING BY ORDER TOTAL:</b></p>\n");

                        writer.Write("<form action=\"shipping.aspx?EditGUID=" + EditGUID + "\" method=\"post\" id=\"ByTotalForm\" name=\"ByTotalForm\" onsubmit=\"return (validateForm(this) && ByTotalForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitByTotal\" value=\"true\">\n");

                        using (DataTable dtTotal = new DataTable())
                        {
                            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                            {
                                con.Open();
                                using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                                {
                                    dtTotal.Load(rs);
                                }
                            }

                            if (dtTotal.Rows.Count == 0)
                            {
                                writer.Write("No shipping methods are defined. <a href=\"shippingmethods.aspx\"><b>Click here</b></a> to define your shipping methods");
                            }
                            else
                            {
                                writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                writer.Write("<tr class=\"tablenormal\"><td colspan=2 align=\"left\" valign=\"middle\">Order Total (in your currency)</td><td align=\"left\" valign=\"middle\" colspan=" + dtTotal.Rows.Count.ToString() + ">Shipping Charge By Total</td><td>&nbsp;</td><td>&nbsp;</td></tr>\n");
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Low</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">High</td>\n");
                                foreach (DataRow row in dtTotal.Rows)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">" + DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                }
                                writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
                                writer.Write("</tr>\n");

                                string sqlShipping = "select distinct rowguid,lowvalue,highvalue from ShippingByTotal   with (NOLOCK)  order by LowValue";

                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS(sqlShipping, con))
                                    {
                                        while (rs.Read())
                                        {
                                            bool EditRow = (EditGUID == DB.RSFieldGUID(rs, "RowGUID"));
                                            writer.Write("<tr>\n");
                                            writer.Write("<td align=\"center\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")));
                                            }
                                            writer.Write("</td>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")));
                                            }
                                            writer.Write("</td>\n");
                                            foreach (DataRow row in dtTotal.Rows)
                                            {
                                                writer.Write("<td align=\"center\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"))) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"))));
                                                }
                                                writer.Write("</td>\n");
                                            }
                                            if (EditRow)
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                                                writer.Write("</td>");
                                            }
                                            else
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Edit\" value=\"Edit\" onClick=\"self.location='shipping.aspx?EditGUID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            }
                                            writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Delete\" value=\"Delete\" onClick=\"self.location='shipping.aspx?deleteByTotalid=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            writer.Write("</tr>\n");

                                        }
                                    }
                                }
                                // add new row:
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_0\" \">\n");
                                writer.Write("<input type=\"hidden\" name=\"Low_0_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_0\" >\n");
                                writer.Write("<input type=\"hidden\" name=\"High_0_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");

                                foreach (DataRow row in dtTotal.Rows)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                }
                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Add New Row\" name=\"submit\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td>&nbsp;</td>");
                                writer.Write("</tr>\n");
                                writer.Write("</table>\n");

                            }
                        }

                        writer.Write("</form>\n");
                        break;
                    }
                case Shipping.ShippingCalculationEnum.CalculateShippingByTotalByPercent:
                    {
                        writer.Write("<hr size=1>");

                        writer.Write("<p><b>ACTIVE RATE TABLE FOR: CALCULATE SHIPPING BY ORDER TOTAL BY PERCENT:</b></p>\n");

                        writer.Write("<form action=\"shipping.aspx?EditGUID=" + EditGUID + "\" method=\"post\" id=\"ByTotalByPercentForm\" name=\"ByTotalByPercentForm\" onsubmit=\"return (validateForm(this) && ByTotalByPercentForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitByTotalByPercent\" value=\"true\">\n");

                        using (DataTable dtTotalByPercent = new DataTable())
                        {
                            using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                            {
                                con.Open();
                                using (IDataReader rs = DB.GetRS("select * from ShippingMethod   with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                                {
                                    dtTotalByPercent.Load(rs);
                                }
                            }

                            if (dtTotalByPercent.Rows.Count == 0)
                            {
                                writer.Write("No shipping methods are defined. <a href=\"shippingmethods.aspx\"><b>Click here</b></a> to define your shipping methods");
                            }
                            else
                            {
                                writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"1\">\n");
                                writer.Write("<tr class=\"tablenormal\"><td colspan=2 align=\"center\" valign=\"middle\"><b>Order Total (xx.xx)</b></td><td align=\"center\" valign=\"middle\"><b>Minimum Charge (xx.xx)</b></td></td><td align=\"center\" valign=\"middle\"><b>Base Charge (xx.xx)</b></td><td align=\"center\" valign=\"middle\" colspan=" + dtTotalByPercent.Rows.Count.ToString() + "><b>Shipping Charge As % Of Total</b></td><td>&nbsp;</td><td>&nbsp;</td></tr>\n");
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Low</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">High</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Minimum</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Base</td>\n");
                                foreach (DataRow row in dtTotalByPercent.Rows)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">" + DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                }
                                writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
                                writer.Write("</tr>\n");

                                string sqlShipping = "select distinct rowguid,lowvalue,highvalue,minimumcharge,SurCharge from ShippingByTotalByPercent  with (NOLOCK)  order by LowValue";

                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS(sqlShipping, con))
                                    {
                                        while (rs.Read())
                                        {
                                            bool EditRow = (EditGUID == DB.RSFieldGUID(rs, "RowGUID"));
                                            writer.Write("<tr>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")));
                                            }
                                            writer.Write("</td>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")));
                                            }
                                            writer.Write("</td>\n");

                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Minimum_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "MinimumCharge")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"Minimum_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter Minimum shipping cost for this order range, in xx.xx format][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "MinimumCharge")));
                                            }
                                            writer.Write("</td>\n");

                                            writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                            if (EditRow)
                                            {
                                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Base_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "SurCharge")) + "\">\n");
                                                writer.Write("<input type=\"hidden\" name=\"Base_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter base shipping cost for this order range, in xx.xx format][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            }
                                            else
                                            {
                                                writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "SurCharge")));
                                            }
                                            writer.Write("</td>\n");

                                            foreach (DataRow row in dtTotalByPercent.Rows)
                                            {
                                                Decimal SurCharge = System.Decimal.Zero; // not used here
                                                Decimal MinimumCharge = System.Decimal.Zero; // not used here
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalByPercentCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"), out MinimumCharge, out SurCharge)) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalByPercentCharge(DB.RowFieldInt(row, "ShippingMethodID"), DB.RSFieldGUID(rs, "RowGUID"), out MinimumCharge, out SurCharge)));
                                                }
                                                writer.Write("</td>\n");
                                            }
                                            if (EditRow)
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                                                writer.Write("</td>");
                                            }
                                            else
                                            {
                                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Edit\" value=\"Edit\" onClick=\"self.location='shipping.aspx?EditGUID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            }
                                            writer.Write("<td align=\"left\"><input class=\"normalButtons\" type=\"Button\" name=\"Delete\" value=\"Delete\" onClick=\"self.location='shipping.aspx?deleteByTotalByPercentid=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                            writer.Write("</tr>\n");

                                        }
                                    }
                                }
                                // add new row:
                                writer.Write("<tr>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_0\" \">\n");
                                writer.Write("<input type=\"hidden\" name=\"Low_0_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_0\" >\n");
                                writer.Write("<input type=\"hidden\" name=\"High_0_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Minimum_0\" >\n");
                                writer.Write("<input type=\"hidden\" name=\"Minimum_0_vldt\" value=\"[number][blankalert=Please enter minimum shipping charge for this range, in xx.xx format][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Base_0\" >\n");
                                writer.Write("<input type=\"hidden\" name=\"Base_0_vldt\" value=\"[number][blankalert=Please enter base shipping charge for this range, in xx.xx format][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                writer.Write("</td>\n");

                                foreach (DataRow row in dtTotalByPercent.Rows)
                                {
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                }

                                writer.Write("<td align=\"left\" valign=\"middle\">");
                                writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Add New Row\" name=\"submit\">\n");
                                writer.Write("</td>\n");
                                writer.Write("<td>&nbsp;</td>");
                                writer.Write("</tr>\n");
                                writer.Write("</table>\n");

                            }
                        }

                        writer.Write("</form>\n");
                        break;
                    }
                case Shipping.ShippingCalculationEnum.UseFixedPrice:
                    {
                        writer.Write("<hr size=1>");
                        writer.Write("<p><b>FIXED RATE SHIPPING TABLE:</b></p>\n");

                        writer.Write("<form action=\"shipping.aspx?EditGUID=" + EditGUID + "\" method=\"post\" id=\"FixedRateForm\" name=\"FixedRateForm\" onsubmit=\"return (validateForm(this) && FixedRateForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitFixedRate\" value=\"true\">\n");

                        string sqlUseFixedPrice = "select * from ShippingMethod   with (NOLOCK)  where name not like " + DB.SQuote("%Real Time%") + " and IsRTShipping=0 order by DisplayOrder";
                        string sqlCount = "SELECT count(*) as N from ShippingMethod  with (NOLOCK) where name not like " + DB.SQuote("%Real Time%") + " and IsRTShipping=0";

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rs = DB.GetRS(sqlCount + ";" + sqlUseFixedPrice, con))
                            {
                                if (rs.Read() && DB.RSFieldInt(rs, "N") == 0)
                                {
                                    writer.Write("No shipping methods are defined. <a href=\"shippingmethods.aspx\"><b>Click here</b></a> to define your shipping methods first");
                                }
                                else
                                {
                                    if (rs.NextResult())
                                    {
                                        writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                        writer.Write("<tr><td align=\"left\" valign=\"middle\">Shipping Method</td><td align=\"left\" valign=\"middle\">Flat Rate</td></tr>\n");
                                        while (rs.Read())
                                        {
                                            writer.Write("<tr>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                            writer.Write("<td>\n");
                                            writer.Write("<input maxLength=\"10\" size=\"10\" name=\"FixedRate_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "FixedRate")) + "\"> (in x.xx format)\n");
                                            writer.Write("<input type=\"hidden\" name=\"FixedRate_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][req][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                            writer.Write("</td>\n");
                                            writer.Write("</tr>\n");
                                        }
                                        writer.Write("<tr><td align=\"left\" valign=\"middle\"></td><td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\"></td></tr>\n");
                                        writer.Write("</table>\n");
                                    }
                                }
                            }
                        }

                        writer.Write("</form>\n");

                        break;
                    }
                case Shipping.ShippingCalculationEnum.AllOrdersHaveFreeShipping:
                    {
                        break;
                    }
                case Shipping.ShippingCalculationEnum.UseFixedPercentageOfTotal:
                    {
                        writer.Write("<hr size=1>");
                        writer.Write("<p><b>FIXED PERCENT OF TOTAL ORDER SHIPPING TABLE:</b></p>\n");

                        writer.Write("<form action=\"shipping.aspx?EditGUID=" + EditGUID + "\" method=\"post\" id=\"FixedPercentOfTotalForm\" name=\"FixedPercentOfTotalForm\" onsubmit=\"return (validateForm(this) && FixedPercentOfTotalForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitFixedPercentOfTotal\" value=\"true\">\n");

                        string sqlUseFixedPercentageOfTotal = "select * from ShippingMethod   with (NOLOCK)  where name not like " + DB.SQuote("%Real Time%") + "  and IsRTShipping=0 order by DisplayOrder";
                        string sqlCount = "SELECT count(*) as N FROM ShippingMethod   with (NOLOCK)  where name not like " + DB.SQuote("%Real Time%") + "  and IsRTShipping=0";

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rs = DB.GetRS(sqlCount + ";" + sqlUseFixedPercentageOfTotal, con))
                            {
                                if (rs.Read() && DB.RSFieldInt(rs, "N") == 0)
                                {
                                    writer.Write("No shipping methods are defined. <a href=\"shippingmethods.aspx\"><b>Click here</b></a> to define your shipping methods first");
                                }
                                else
                                {
                                    if (rs.NextResult())
                                    {
                                        writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n");
                                        writer.Write("<tr class=\"tablenormal\"><td align=\"left\" valign=\"middle\">Shipping Method</td><td align=\"left\" valign=\"middle\">Flat Percent Of Total Order Cost</td></tr>\n");
                                        while (rs.Read())
                                        {
                                            writer.Write("<tr>\n");
                                            writer.Write("<td align=\"left\" valign=\"middle\">" + DB.RSFieldByLocale(rs, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                            writer.Write("<td>\n");
                                            writer.Write("<input maxLength=\"10\" size=\"10\" name=\"FixedPercentOfTotal_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "\" value=\"" + Localization.DecimalStringForDB(DB.RSFieldDecimal(rs, "FixedPercentOfTotal")) + "\"> (in x.xx format)\n");
                                            writer.Write("<input type=\"hidden\" name=\"FixedPercentOfTotal_" + DB.RSFieldInt(rs, "ShippingMethodID").ToString() + "_vldt\" value=\"[number][req][blankalert=Please enter the shipping percentage][invalidalert=Please enter a shipping percentage (percent of total order) without the leading % sign]\">\n");
                                            writer.Write("</td>\n");
                                            writer.Write("</tr>\n");
                                        }
                                        writer.Write("<tr><td></td><td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\"></td></tr>\n");
                                        writer.Write("</table>\n");
                                    }
                                }

                            }
                        }

                        writer.Write("</form>\n");

                        break;
                    }
                case Shipping.ShippingCalculationEnum.UseIndividualItemShippingCosts:
                    {
                        writer.Write("<p>Set Your shipping costs in each product variant.</p>");
                        break;
                    }
                case Shipping.ShippingCalculationEnum.UseRealTimeRates:
                    {
                        writer.Write("<p align=\"left\">Real Time I/F will be used for rates, based on order weights. Remember to set your AppConfig:RTShipping parameters accordingly! Current settings are shown below.<br/><br/>");
                        writer.Write("<a href=\"appconfig.aspx?searchfor=RTShipping\"><b>Click here</b></a> to edit these settings.<br/><br/>");

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rss = DB.GetRS("Select * from appconfig   with (NOLOCK)  where name like " + DB.SQuote("RTShipping%") + " order by name", con))
                            {
                                while (rss.Read())
                                {
                                    writer.Write(DB.RSField(rss, "Name") + "=" + DB.RSField(rss, "ConfigValue") + "<br/>");
                                }
                            }
                        }
                        writer.Write("</p>");

                        break;
                    }
                case Shipping.ShippingCalculationEnum.CalculateShippingByWeightAndZone:
                    {
                        writer.Write("<hr size=1>");

                        writer.Write("<p><b>ACTIVE RATE TABLE FOR: CALCULATE SHIPPING BY ORDER WEIGHT BY ZONE:</b></p>\n");

                        int ShippingMethodID = CommonLogic.FormUSInt("ShippingMethodID");
                        if (ShippingMethodID == 0)
                        {
                            ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
                        }

                        writer.Write("<form action=\"shipping.aspx\" method=\"post\" id=\"WeightByZoneSelectForm\" name=\"WeightByZoneSelectForm\" onSubmit=\"return confirm('If you have unsaved changes in your rate table below, click CANCEL and save them first!')\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitWeightByZone\" value=\"true\">\n");
                        writer.Write("Edit weight/zone table for shipping method: ");
                        writer.Write("<select name=\"ShippingMethodID\" id=\"ShippingMethodID\" size=\"1\">");
                        writer.Write("<option value=\"0\" " + CommonLogic.IIF(ShippingMethodID == 0, " selected ", "") + ">Select Shipping Method To Edit</option>");

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rssm = DB.GetRS("Select * from ShippingMethod  with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                            {
                                while (rssm.Read())
                                {
                                    writer.Write("<option value=\"" + DB.RSFieldInt(rssm, "ShippingMethodID").ToString() + "\" " + CommonLogic.IIF(ShippingMethodID == DB.RSFieldInt(rssm, "ShippingMethodID"), " selected ", "") + ">" + DB.RSFieldByLocale(rssm, "Name", ThisCustomer.LocaleSetting) + "</option>");
                                }
                            }
                        }

                        writer.Write("</select>");
                        writer.Write("&nbsp;");
                        writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Submit\" name=\"submit\">");
                        writer.Write("</form>");
                        if (ShippingMethodID != 0)
                        {
                            using (DataTable dtWeightAndZone = new DataTable())
                            {
                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS("select * from ShippingZone  with (NOLOCK)  where Deleted=0 order by DisplayOrder,Name", con))
                                    {
                                        dtWeightAndZone.Load(rs);
                                    }
                                }

                                if (dtWeightAndZone.Rows.Count == 0)
                                {
                                    writer.Write("No shipping zones are defined. <a href=\"shippingzones.aspx\"><b>Click here</b></a> to define your zones");
                                }
                                else
                                {
                                    writer.Write("<form action=\"shipping.aspx\" method=\"post\" id=\"WeightByZoneForm\" name=\"WeightByZoneForm\" onsubmit=\"return (validateForm(this) && WeightByZoneForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"EditGUID\" value=\"" + EditGUID + "\">");
                                    writer.Write("<input type=\"hidden\" name=\"IsSubmitWeightByZone\" value=\"true\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"ShippingMethodID\" value=\"" + ShippingMethodID.ToString() + "\">\n");
                                    writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"1\">\n");
                                    writer.Write("<tr class=\"tablenormal\"><td colspan=2 align=\"center\"><b>Order Weight (in " + Localization.WeightUnits() + ")</b></td><td colspan=" + dtWeightAndZone.Rows.Count.ToString() + " align=\"center\"><b>Shipping Charge By Zone</b></td><td>&nbsp;</td><td>&nbsp;</td></tr>\n");
                                    writer.Write("<tr>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">Low</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">High</td>\n");

                                    foreach (DataRow row in dtWeightAndZone.Rows)
                                    {
                                        writer.Write("<td align=\"center\">" + DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                    }

                                    writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
                                    writer.Write("</tr>\n");

                                    string sqlShipping = "select distinct RowGUID,LowValue,HighValue from ShippingWeightByZone  with (NOLOCK)  where ShippingMethodID=" + ShippingMethodID.ToString() + " order by LowValue";

                                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                    {
                                        con.Open();
                                        using (IDataReader rs = DB.GetRS(sqlShipping, con))
                                        {
                                            while (rs.Read())
                                            {

                                                bool EditRow = (EditGUID == DB.RSFieldGUID(rs, "RowGUID"));
                                                writer.Write("<tr>\n");
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")));
                                                }
                                                writer.Write("</td>\n");
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")));
                                                }
                                                writer.Write("</td>\n");
                                                foreach (DataRow row in dtWeightAndZone.Rows)
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                    if (EditRow)
                                                    {
                                                        writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByWeightAndZoneCharge(DB.RowFieldInt(row, "ShippingZoneID"), ShippingMethodID, DB.RSFieldGUID(rs, "RowGUID"))) + "\">\n");
                                                        writer.Write("<input type=\"hidden\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                    }
                                                    else
                                                    {
                                                        writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByWeightAndZoneCharge(DB.RowFieldInt(row, "ShippingZoneID"), ShippingMethodID, DB.RSFieldGUID(rs, "RowGUID"))));
                                                    }
                                                    writer.Write("</td>\n");
                                                }
                                                if (EditRow)
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\">");
                                                    writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                                                    writer.Write("</td>");
                                                }
                                                else
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Edit\" value=\"Edit\" onClick=\"self.location='shipping.aspx?ShippingMethodID=" + ShippingMethodID.ToString() + "&EditGUID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                                }
                                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Delete\" value=\"Delete\" onClick=\"self.location='shipping.aspx?ShippingMethodID=" + ShippingMethodID.ToString() + "&DeleteWeightByZoneID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                                writer.Write("</tr>\n");

                                            }
                                        }
                                    }

                                    // add new row:
                                    writer.Write("<tr>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_0\" \">\n");
                                    writer.Write("<input type=\"hidden\" name=\"Low_0_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_0\" >\n");
                                    writer.Write("<input type=\"hidden\" name=\"High_0_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");

                                    foreach (DataRow row in dtWeightAndZone.Rows)
                                    {
                                        writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                        writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "\">\n");
                                        writer.Write("<input type=\"hidden\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                        writer.Write("</td>\n");
                                    }

                                    writer.Write("<td align=\"left\" valign=\"middle\">");
                                    writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Add New Row\" name=\"submit\">\n");
                                    writer.Write("</td>\n");
                                    writer.Write("<td>&nbsp;</td>");
                                    writer.Write("</tr>\n");
                                    writer.Write("</table>\n");

                                }
                            }
                        }

                        writer.Write("</form>\n");
                        break;
                    }
                case Shipping.ShippingCalculationEnum.CalculateShippingByTotalAndZone:
                    {
                        writer.Write("<hr size=1>");

                        writer.Write("<p><b>ACTIVE RATE TABLE FOR: CALCULATE SHIPPING BY ORDER TOTAL BY ZONE:</b></p>\n");

                        int ShippingMethodID = CommonLogic.FormUSInt("ShippingMethodID");
                        if (ShippingMethodID == 0)
                        {
                            ShippingMethodID = CommonLogic.QueryStringUSInt("ShippingMethodID");
                        }

                        writer.Write("<form action=\"shipping.aspx\" method=\"post\" id=\"TotalByZoneSelectForm\" name=\"TotalByZoneSelectForm\" onSubmit=\"return confirm('If you have unsaved changes in your rate table below, click CANCEL and save them first!')\">\n");
                        writer.Write("<input type=\"hidden\" name=\"IsSubmitTotalByZone\" value=\"true\">\n");
                        writer.Write("Edit total/zone table for shipping method: ");
                        writer.Write("<select name=\"ShippingMethodID\" id=\"ShippingMethodID\" size=\"1\">");
                        writer.Write("<option value=\"0\" " + CommonLogic.IIF(ShippingMethodID == 0, " selected ", "") + ">Select Shipping Method To Edit</option>");

                        using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                        {
                            con.Open();
                            using (IDataReader rssm = DB.GetRS("Select * from ShippingMethod  with (NOLOCK)  where IsRTShipping=0 order by DisplayOrder", con))
                            {
                                while (rssm.Read())
                                {
                                    writer.Write("<option value=\"" + DB.RSFieldInt(rssm, "ShippingMethodID").ToString() + "\" " + CommonLogic.IIF(ShippingMethodID == DB.RSFieldInt(rssm, "ShippingMethodID"), " selected ", "") + ">" + DB.RSFieldByLocale(rssm, "Name", ThisCustomer.LocaleSetting) + "</option>");
                                }
                            }
                        }

                        writer.Write("</select>");
                        writer.Write("&nbsp;");
                        writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Submit\" name=\"submit\">");
                        writer.Write("</form>");
                        if (ShippingMethodID != 0)
                        {
                            using (DataTable dtTotalAndZone = new DataTable())
                            {
                                using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                {
                                    con.Open();
                                    using (IDataReader rs = DB.GetRS("select * from ShippingZone  with (NOLOCK)  where deleted=0 order by DisplayOrder,Name", con))
                                    {
                                        dtTotalAndZone.Load(rs);
                                    }
                                }

                                if (dtTotalAndZone.Rows.Count == 0)
                                {
                                    writer.Write("No shipping zones are defined. <a href=\"shippingzones.aspx\"><b>Click here</b></a> to define your zones");
                                }
                                else
                                {
                                    writer.Write("<form action=\"shipping.aspx\" method=\"post\" id=\"TotalByZoneForm\" name=\"TotalByZoneForm\" onsubmit=\"return (validateForm(this) && TotalByZoneForm_Validator(this))\" onReset=\"return confirm('Do you want to reset all fields to their starting values?');\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"EditGUID\" value=\"" + EditGUID + "\">");
                                    writer.Write("<input type=\"hidden\" name=\"IsSubmitTotalByZone\" value=\"true\">\n");
                                    writer.Write("<input type=\"hidden\" name=\"ShippingMethodID\" value=\"" + ShippingMethodID.ToString() + "\">\n");
                                    writer.Write("<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"1\">\n");
                                    writer.Write("<tr class=\"tablenormal\"><td colspan=2 align=\"center\"><b>Order Total</b></td><td colspan=" + dtTotalAndZone.Rows.Count.ToString() + " align=\"center\"><b>Shipping Charge By Zone</b></td><td>&nbsp;</td><td>&nbsp;</td></tr>\n");
                                    writer.Write("<tr>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">Low</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">High</td>\n");
                                    foreach (DataRow row in dtTotalAndZone.Rows)
                                    {
                                        writer.Write("<td align=\"center\">" + DB.RowFieldByLocale(row, "Name", ThisCustomer.LocaleSetting) + "</td>\n");
                                    }
                                    writer.Write("<td align=\"left\" valign=\"middle\">Edit</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">Delete</td>\n");
                                    writer.Write("</tr>\n");

                                    string sqlShipping = "select distinct RowGUID,LowValue,HighValue from ShippingTotalByZone  with (NOLOCK)  where ShippingMethodID=" + ShippingMethodID.ToString() + " order by LowValue";
                                    using (SqlConnection con = new SqlConnection(DB.GetDBConn()))
                                    {
                                        con.Open();
                                        using (IDataReader rs = DB.GetRS(sqlShipping, con))
                                        {
                                            while (rs.Read())
                                            {
                                                bool EditRow = (EditGUID == DB.RSFieldGUID(rs, "RowGUID"));
                                                writer.Write("<tr>\n");
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"Low_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "LowValue")));
                                                }
                                                writer.Write("</td>\n");
                                                writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                if (EditRow)
                                                {
                                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")) + "\">\n");
                                                    writer.Write("<input type=\"hidden\" name=\"High_" + DB.RSFieldGUID(rs, "RowGUID") + "_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                }
                                                else
                                                {
                                                    writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(DB.RSFieldDecimal(rs, "HighValue")));
                                                }
                                                writer.Write("</td>\n");
                                                foreach (DataRow row in dtTotalAndZone.Rows)
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                                    if (EditRow)
                                                    {
                                                        writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "\" value=\"" + Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalAndZoneCharge(DB.RowFieldInt(row, "ShippingZoneID"), ShippingMethodID, DB.RSFieldGUID(rs, "RowGUID"))) + "\">\n");
                                                        writer.Write("<input type=\"hidden\" name=\"Rate_" + DB.RSFieldGUID(rs, "RowGUID") + "_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                                    }
                                                    else
                                                    {
                                                        writer.Write(Localization.CurrencyStringForDBWithoutExchangeRate(Shipping.GetShipByTotalAndZoneCharge(DB.RowFieldInt(row, "ShippingZoneID"), ShippingMethodID, DB.RSFieldGUID(rs, "RowGUID"))));
                                                    }
                                                    writer.Write("</td>\n");
                                                }
                                                if (EditRow)
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\">");
                                                    writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Update\" name=\"submit\">\n");
                                                    writer.Write("</td>");
                                                }
                                                else
                                                {
                                                    writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Edit\" value=\"Edit\" onClick=\"self.location='shipping.aspx?ShippingMethodID=" + ShippingMethodID.ToString() + "&EditGUID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                                }
                                                writer.Write("<td align=\"left\" valign=\"middle\"><input class=\"normalButtons\" type=\"Button\" name=\"Delete\" value=\"Delete\" onClick=\"self.location='shipping.aspx?ShippingMethodID=" + ShippingMethodID.ToString() + "&DeleteTotalByZoneID=" + DB.RSFieldGUID(rs, "RowGUID") + "'\"></td>\n");
                                                writer.Write("</tr>\n");
                                            }
                                        }
                                    }
                                    // add new row:
                                    writer.Write("<tr>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Low_0\" \">\n");
                                    writer.Write("<input type=\"hidden\" name=\"Low_0_vldt\" value=\"[number][blankalert=Please enter starting order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                    writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                    writer.Write("<input maxLength=\"10\" size=\"10\" name=\"High_0\" >\n");
                                    writer.Write("<input type=\"hidden\" name=\"High_0_vldt\" value=\"[number][blankalert=Please enter ending order amount][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                    writer.Write("</td>\n");
                                    foreach (DataRow row in dtTotalAndZone.Rows)
                                    {
                                        writer.Write("<td align=\"left\" valign=\"middle\">\n");
                                        writer.Write("<input maxLength=\"10\" size=\"10\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "\">\n");
                                        writer.Write("<input type=\"hidden\" name=\"Rate_0_" + DB.RowFieldInt(row, "ShippingZoneID").ToString() + "_vldt\" value=\"[number][blankalert=Please enter the shipping cost][invalidalert=Please enter a money value, WITHOUT the dollar sign]\">\n");
                                        writer.Write("</td>\n");
                                    }
                                    writer.Write("<td align=\"left\" valign=\"middle\">");
                                    writer.Write("<input class=\"normalButtons\" type=\"submit\" value=\"Add New Row\" name=\"submit\">\n");
                                    writer.Write("</td>\n");
                                    writer.Write("<td>&nbsp;</td>");
                                    writer.Write("</tr>\n");
                                    writer.Write("</table>\n");
                                }
                            }
                        }

                        writer.Write("</form>\n");
                        break;
                    }
            }
        }

    }
}
