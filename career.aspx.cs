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
using System.Net;

namespace AspDotNetStorefront
{
    public partial class career : SkinBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            rbgx r = new rbgx();
            r.IPAddress = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            r.UserLoginName = System.Web.HttpContext.Current.Request.ServerVariables["Local_USER"];
            //r.FirstName = txtName.Text;
            string[] strAttachname = flUpload.PostedFile.FileName.Split('\\');

            StringBuilder MessageBuilder = new StringBuilder();
            MessageBuilder.Append("<br /><br />"+txtName.Text + " ");
            MessageBuilder.Append(" submitted his/her resume ");
            MessageBuilder.Append("<br />You can contact ");
            MessageBuilder.Append(txtName.Text);
            MessageBuilder.Append(" at ");
            MessageBuilder.Append(txtEmail.Text + " or " + txtTelephone.Text);
            MessageBuilder.Append("<br /><br /> Message Sent from " + r.IPAddress);
            string Message = MessageBuilder.ToString();
            //socialnetworking@germedusa.com
            MailMessage mailObj = new MailMessage(txtEmail.Text, "socialnetworking@germedusa.com", txtName.Text, Message);
            SmtpClient SMTPServer = new SmtpClient("mail.germedusa.com");
            SMTPServer.Credentials = new NetworkCredential("notifications@germedusa.com", "M12125757");
            Attachment mailAttach = new Attachment(flUpload.PostedFile.InputStream,
                                strAttachname[strAttachname.Length - 1]);
            mailObj.Attachments.Add(mailAttach);
            mailObj.IsBodyHtml = true;
            try
            {
                SMTPServer.Send(mailObj);
            }
            catch (Exception ex)
            {
                lblMessage.Text = ex.ToString();
            }
            lblMessage.Text = "Your Resume is received, we will get back to you after reviewing it.";
        }
    }
}