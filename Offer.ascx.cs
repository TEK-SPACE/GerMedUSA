using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data;
using System.Text;
using System.Collections;
using System.Globalization;
using AspDotNetStorefrontCore;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Net;

public partial class Offer : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
        FillddCategories();
        }
    }

    private void FillddCategories()
    {
        rbgx f = new rbgx();
        DataTable dt = new DataTable();
        dt=f.GetCategories();
        ddCategory.DataSource =dt;
        ddCategory.DataTextField = "Name";
        ddCategory.DataValueField = "CategoryID";
        ddCategory.DataBind();

    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        lblError.Text = "";
        lblEmailExists.Text = "";
        lblSucess.Text = "";

        try
        {
            rbgx g = new rbgx();
            g.FirstName = txtFirstName.Text;
            g.LastName = txtLastName.Text;
            g.Email = txtEmail.Text;
            g.InterestedIn = ddCategory.SelectedItem.Text;
            g.IPAddress = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            g.UserLoginName = System.Web.HttpContext.Current.Request.ServerVariables["Local_USER"];


            StringBuilder FullNameBuilder = new StringBuilder();
            FullNameBuilder.Append(txtFirstName.Text + " ");
            FullNameBuilder.Append(txtLastName.Text);
            string FullName = FullNameBuilder.ToString();

            StringBuilder MessageBuilder = new StringBuilder();
            MessageBuilder.Append(txtFirstName.Text + " ");
            MessageBuilder.Append(txtLastName.Text + " ");
            MessageBuilder.Append(" is interested in winning a free item from ");
            MessageBuilder.Append(ddCategory.SelectedItem.Text + " Category. \n");
            MessageBuilder.Append("You can contact ");
            MessageBuilder.Append(txtFirstName.Text + " ");
            MessageBuilder.Append("at ");
            MessageBuilder.Append(txtEmail.Text + " ");
            MessageBuilder.Append("\n Message Sent from " +g.IPAddress);
            string Message = MessageBuilder.ToString();


            int counter = g.EnterToWin();

            if (counter > 0)
            {
                btnSubmit.Visible = false;
                lblSucess.Text = "Sucessfully Submited\n" +
                                    "Good Luck!";

                // Configure email account
                MailMessage mailObj = new MailMessage(txtEmail.Text, "socialnetworking@germedusa.com", FullName, Message);
                SmtpClient SMTPServer = new SmtpClient("mail.germedusa.com");
                SMTPServer.Credentials = new NetworkCredential("notifications@germedusa.com", "M12125757");//new NetworkCredential("sales@germedusa.com", "germedusa7890");
                try
                {
                    SMTPServer.Send(mailObj);
                }
                catch (Exception ex)
                {
                    lblError.Text = ex.ToString();
                }
                finally
                {
                    Dispose();
                    FullNameBuilder = null;
                    MessageBuilder = null;
                }

            }
            else
            {
                lblEmailExists.Text = "<< already exists";
                lblError.Text = "The Above email Address is already registered to receive Free Instruments,<br />" +
                                "Please use a different Email to signup!";
            }

        }
        catch (Exception ex)
        {
            lblError.Text = ex.Message;
        }
        finally
        {
            Dispose();
        }

    }
}