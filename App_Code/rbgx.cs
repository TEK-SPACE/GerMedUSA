using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AspDotNetStorefrontCore;
using System.Data;
using System.Data.SqlClient;

public class rbgx
{
    string m_FirstName, m_LastName, m_Email, m_InterestedIn, m_IPAddress, m_UserLoginName;

    public string IPAddress
    {
        get { return m_IPAddress; }
        set { m_IPAddress = value; }
    }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string InterestedIn { get; set; }

    public string UserLoginName { get; set; }

    public rbgx()
    {
        //Empty Contructor
    }

    public int EnterToWin()
    {
        int counter = 0;
        //string cnnstring = "data source=sql2k5d.appliedi.net;initial catalog=rbg-germedusa;user id=germedusa;password=2uwrE3we;persist security info=True;packet size=4096";
        try
        {
            using (SqlConnection cnn = new SqlConnection(DB.GetDBConn()))
            {
                using (SqlCommand cmd = new SqlCommand("usp_InsertETW",cnn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "usp_InsertETW";
                    cmd.Parameters.AddWithValue("@FirstName", FirstName);
                    cmd.Parameters.AddWithValue("@LastName", LastName);
                    cmd.Parameters.AddWithValue("@Email", Email);
                    cmd.Parameters.AddWithValue("@InterestedIn", InterestedIn);
                    cmd.Parameters.AddWithValue("@IPAddress", IPAddress);
					cmd.Parameters.AddWithValue("@UserLoginName", UserLoginName);
                    cnn.Open();
                    counter = cmd.ExecuteNonQuery();
                }
            }


        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
      
        return (counter);
        
    }

    //public DataSet GetCategories()
    //{

    //    DataSet ds = new DataSet();
    //    string sQuery = "select CategoryID,Name from Category where (ParentCategoryID='0')" +
    //                    "and (Published='1') and (Deleted='0')";
    //    using(SqlDataAdapter sda=new SqlDataAdapter(sQuery,DB.GetDBConn()))
    //    {
    //        sda.Fill(ds);
    //    }
    //    return(ds);
    //}


    //public DataTable GetCategories()
    //{
    //    DataTable dt = new DataTable();
    //    string sQuery = "select CategoryID,Name from Category where (ParentCategoryID='0')" +
    //                    "and (Published='1') and (Deleted='0')";
    //    using (SqlDataAdapter sda = new SqlDataAdapter(sQuery, DB.GetDBConn()))
    //    {
    //        sda.Fill(dt);
    //    }
    //    return (dt);
    //}


    public DataTable GetCategories()
    {
        DataTable dt = new DataTable();
        dt.Columns.Add("CategoryID",typeof(System.Int32));
        dt.Columns.Add("Name",typeof(System.String));

        string sQuery = "select CategoryID,Name from Category where (ParentCategoryID='0')" +
                        "and (Published='1') and (Deleted='0')";
        using(SqlConnection cnn=new SqlConnection(DB.GetDBConn()))
        {
            using (SqlCommand cmd = new SqlCommand(sQuery, cnn))
            {
                SqlDataReader sdr = null;
                {
                    cnn.Open();
                    sdr = cmd.ExecuteReader();
                    while(sdr.Read())
                    {
                        if (sdr[1].ToString().Length > 20)
                        {
                            string temp;
                            temp = sdr[1].ToString().Substring(0, 20);
                            temp += "...";
                            dt.Rows.Add(sdr[0], temp);
                        }
                        else
                        {
                            dt.Rows.Add(sdr[0], sdr[1]);
                        }
                    }
                }
            }
        }

        return (dt);
    }

    
}
