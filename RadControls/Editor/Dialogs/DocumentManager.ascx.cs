using System.Text;

namespace Telerik.WebControls.EditorDialogControls
{
	public class DocumentManager : BaseBrowserControl
	{
		override protected string GetAdditionalJavaScript()
		{
			StringBuilder javaScript = new StringBuilder();
			javaScript.AppendFormat("var documentFilters = '{0}'.split(',');", string.Join(",", DialogParameters["FileFilters"] as string[]));
			return javaScript.ToString();
		}

	}
}