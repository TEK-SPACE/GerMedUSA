using System.IO;
using System.Text;

namespace Telerik.WebControls.RadEditorUtils
{
	/// <summary>
	/// The base class of the FileItem and DirectoryItem classes. Contains the common functionality.
	/// </summary>
	public abstract class FileBrowserItem
	{
		/// <summary>
		/// Serializes the item into a javascript array. This method should be overriden only when developing 
		/// a custom FileBrowser control.
		/// </summary>
		/// <param name="writer">a StringWriter used as a target for the serialization.</param>
		public abstract void Serialize(StringWriter writer);

		/// <summary>
		/// Utility method used when serializing. Escapes a string for javascript.
		/// </summary>
		protected void WriteJavascriptString(StringWriter writer, string s)
		{
			writer.Write("'");
			writer.Write(s.Replace("\\", "\\\\").Replace("'", "\\'").Replace("\n", "\\n").Replace("\r", "\\r"));
			writer.Write("'");
		}

		/// <summary>
		/// Utility method used when serializing. Writes a javascript array separator.
		/// </summary>
		protected void WriteSeparator(StringWriter writer)
		{
			writer.Write(",");
		}

		/// <summary>
		/// Utility method used when serializing. Removes the last javascript array separator from the underlying
		/// StringBuilder of writer.
		/// </summary>
		protected void RemoveLastSeparator(StringWriter writer)
		{
			StringBuilder underlyingBuilder = writer.GetStringBuilder();
			underlyingBuilder.Remove(underlyingBuilder.Length - 1, 1);
		}
		

		/// <summary>
		/// Gets or sets a string array containing custom values which can be used on the client when 
		/// customizing the FileBrowser control.
		/// </summary>
		public string[] Attributes
		{
			get
			{
				return _attributes;
			}
			set
			{
				_attributes = value;
			}
		}
		

		/// <summary>
		/// Serializes the Attributes array.
		/// </summary>
		/// <param name="writer"></param>
		public void SerializeAttributes(StringWriter writer)
		{
			writer.Write("[");
			if (Attributes != null && Attributes.Length > 0)
			{
				foreach (string attribute in Attributes)
				{
					WriteJavascriptString(writer, attribute);
					WriteSeparator(writer);
				}
				RemoveLastSeparator(writer);
			}
			writer.Write("]");
		}


		private string[] _attributes;
	}
}