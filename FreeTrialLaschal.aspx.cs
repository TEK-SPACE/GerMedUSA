using System;
using System.Data;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using AspDotNetStorefrontCore;
using AspDotNetStorefrontGateways;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Web.Configuration;

namespace AspDotNetStorefront
{
    public partial class FreeTrailLaschal : SkinBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            MailMessage message = new MailMessage();
            message.To.Add("sales@germedusa.com");
            message.Bcc.Add("harsha@germedusa.com");
            message.Subject = "Laschal NDS Free Trail Request from " + txtFirstName.Text + " " + txtLastName.Text;
            StringBuilder sb = new StringBuilder();
            sb.Append("Name: ");
            sb.Append(txtFirstName.Text + " " + txtLastName.Text);
            sb.Append("<br />");

            sb.Append("Address: ");
            sb.Append(txtAddress.Text);
            sb.Append("<br />");

            sb.Append("Email: ");
            sb.Append(txtEmail.Text);
            sb.Append("<br />");

            sb.Append("Phone: ");
            sb.Append(txtPhone.Text);
            sb.Append("<br />");

            sb.Append("Best Time to Reach: ");
            sb.Append(txtTimeToReach.Hour.ToString() + ":" + txtTimeToReach.Minute.ToString() + " " + txtTimeToReach.AmPm.ToString());
            sb.Append("<br />");
            if (!String.IsNullOrEmpty(txtComments.Text))
            {
                sb.Append("Comments: ");
                sb.Append(txtComments.Text);
            }

            message.Body = sb.ToString();
            //Specify true if it is html message
            message.IsBodyHtml = true;
            string host = WebConfigurationManager.AppSettings["SMTPHost"].ToString();
            int port = Convert.ToInt32(WebConfigurationManager.AppSettings["SMTPPort"]);
            string username = WebConfigurationManager.AppSettings["SMTPUsername"].ToString();
            string password = WebConfigurationManager.AppSettings["SMTPPwd"].ToString();
            string fromAddress = WebConfigurationManager.AppSettings["EmailFrom"].ToString(); //txtEmail.Text;

            SmtpClient smtpC = new SmtpClient();
            smtpC.Host = host;
            smtpC.Port = port;
            //smtpC.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
            smtpC.Credentials = new System.Net.NetworkCredential(username, password);
            smtpC.EnableSsl = false;
            message.From = new MailAddress(fromAddress);
            smtpC.Send(message);
            lblMessage.Text = "Message Sent Successfully!";
        }
    }
}