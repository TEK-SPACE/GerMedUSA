using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

public partial class FileUpload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (FileUpload1.HasFile)
        {
            FileUpload1.SaveAs(@"D:\Domains\germedusa.com\wwwroot\misUploads\" + FileUpload1.FileName);
            Label2.Text = @"<h3>Congrats! your file has been uploaded..<br />
			you have any trouble email to <a href='mailto:mughal@germedusa.com'>WebMaster</a> <br />
			after you complete your uplaod please confirm to <a href='mailto:mughal@germedusa.com'>WebMaster</a>
			</h3>";
        }
        else
        {
            Label2.Text = "<h3>Please select the file and then click Upload!!</h3>";
        }
    }
}
