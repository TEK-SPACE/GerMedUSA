using System;
using System.IO;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.Caching;
using Telerik.WebControls;
using Telerik.Charting;

namespace Telerik.WebControls.Dialogs
{
    public class ChartImage : System.Web.UI.Page
    {
        private ImageFormat GetImageFormat(string imageFormat)
        {
            EnumConverter ec = new EnumConverter(typeof(ImageFormat));

            ImageFormatConverter fc = new ImageFormatConverter();

            ImageFormat result;

            try
            {
                result = (ImageFormat)fc.ConvertFromString(imageFormat);
            }
            catch
            {
                result = ImageFormat.Gif;
            }

            return result;
        }


        private string GetContentType(ImageFormat imageFormat)
        {
            if (imageFormat == ImageFormat.Bmp) return "image/bmp";
            else if (imageFormat == ImageFormat.Emf) return "image/emf";
            else if (imageFormat == ImageFormat.Exif) return "image/exif";
            else if (imageFormat == ImageFormat.Gif) return "image/gif";
            else if (imageFormat == ImageFormat.Icon) return "image/icon";
            else if (imageFormat == ImageFormat.Jpeg) return "image/jpeg";
            else if (imageFormat == ImageFormat.MemoryBmp) return "image/bmp";
            else if (imageFormat == ImageFormat.Png) return "image/png";
            else if (imageFormat == ImageFormat.Tiff) return "image/png";
            else if (imageFormat == ImageFormat.Wmf) return "image/wmf";

            return "image/gif";
        }

        private static string UngarbleImagePath(string garbledPath)
        {
            return Security.decryptStringFromBytes_AES(Convert.FromBase64String(garbledPath), Security.chartKey, Security.chartIV); 
        }

        private void Page_Load(object sender, System.EventArgs e)
        {
            string useSession = Request.QueryString.Get("useSession");

            bool loadFromSession = Convert.ToBoolean(useSession);
            ImageFormat imageFormat = GetImageFormat(Request.QueryString.Get("imageFormat"));
            if (imageFormat == ImageFormat.Emf) loadFromSession = false;
            if (loadFromSession)
            {
                string chartID = Request.QueryString.Get("ChartID");
                MemoryStream ms = null;
                if (chartID != null)
                {
                    if (this.Cache[chartID] != null)
                    {
                        ms = (MemoryStream)this.Cache[chartID];
                    }
                    else
                    {
                        if (Session[chartID] != null)
                        {
                            System.Drawing.Image bitmap = (System.Drawing.Image)Session[chartID];
                            Session[chartID] = null;
                            ms = new MemoryStream();
                            if (imageFormat != ImageFormat.Emf)
                            {
                                bitmap.Save(ms, imageFormat);
                                this.Cache.Add(chartID, ms, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(5), CacheItemPriority.Default, null);
                                bitmap.Save(ms, imageFormat);
                            }
                            bitmap.Dispose();
                        }
                    }

                    if (ms != null && ms.ToArray().Length > 0)
                    {
                        Response.Clear();
                        Response.ContentType = GetContentType(imageFormat);
                        Response.Expires = 24 * 60;
                        byte[] buffer = ms.ToArray();
                        Response.OutputStream.Write(buffer, 0, buffer.Length);
                        Response.End();
                    }
                }
            }
            else
            {
                string imageName = Request.QueryString.Get("ImageName");
                imageName = UngarbleImagePath(imageName);
                MemoryStream ms = null;
                bool deleteFile = false;
                if (this.Cache[imageName] != null)
                {
                    ms = (MemoryStream)this.Cache[imageName];
                }
                else
                {
                    if (System.IO.File.Exists(Server.MapPath(imageName)))
                    {
                        ms = new MemoryStream(File.ReadAllBytes(Server.MapPath(imageName)));                       
                        this.Cache.Add(imageName, ms, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(5), CacheItemPriority.Default, null);
                        deleteFile = true;
                    }
                }

                if (ms != null)
                {
                    Response.Clear();
                    Response.Expires = 24 * 60;
                    Response.ContentType = GetContentType(imageFormat);
                    byte[] buffer = ms.ToArray();
                    Response.OutputStream.Write(buffer, 0, buffer.Length);
                    if (deleteFile)
                    {
                        try
                        {
                            System.IO.File.Delete(Server.MapPath(imageName));
                        }
                        catch (Exception deleteError)
                        {
                            Trace.Warn(deleteError.ToString());
                        }
                    }
                    Response.End();
                }
            }
        }

        #region Web Form Designer generated code
        override protected void OnInit(EventArgs e)
        {
            InitializeComponent();
            base.OnInit(e);
        }

        private void InitializeComponent()
        {
            this.Load += new System.EventHandler(this.Page_Load);
        }
        #endregion
    }
}