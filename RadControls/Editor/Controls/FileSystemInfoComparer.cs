using System;
using System.Collections;
using System.IO;

namespace Telerik.WebControls.EditorControls
{
	public enum FileBrowserSortField
	{
		Name,
		Extension,
		Size
	}

	public enum FileBrowserSortDirection
	{
		Ascending,
		Descending
	}

	public class FileSystemInfoComparer : IComparer
	{
		private FileBrowserSortField _field;
		private FileBrowserSortDirection _direction;

		public FileSystemInfoComparer(FileBrowserSortField field, FileBrowserSortDirection direction)
		{
			_field = field;
			_direction = direction;
		}

		int IComparer.Compare(object x, object y)
		{
			FileSystemInfo first = x as FileSystemInfo;
			FileSystemInfo second = y as FileSystemInfo;
			if (first == null || second == null)
			{
				throw new ArgumentException();
			}

			int result = Compare(first, second);
			if (result == 0)
			{
				//Both are the same type
				result = first is FileInfo && second is FileInfo ? 
					CompareFiles(first as FileInfo, second as FileInfo) : 
					CompareDirectories(first as DirectoryInfo, second as DirectoryInfo);
			}

			return ApplyDirection(result);
		}


		private int ApplyDirection(int compareResult)
		{
			return _direction == FileBrowserSortDirection.Ascending ? compareResult : -compareResult;
		}

		private int CompareFiles(FileInfo x, FileInfo y)
		{
			switch (_field)
			{
				case FileBrowserSortField.Extension:
					return string.Compare(x.Extension, y.Extension);
				case FileBrowserSortField.Name:
					return string.Compare(x.Name, y.Name);
				case FileBrowserSortField.Size:
					return Compare(x.Length, y.Length);
				default:
					throw new ApplicationException("Invalid SortBy");
			}
		}

		private int CompareDirectories(DirectoryInfo x, DirectoryInfo y)
		{
			return string.Compare(x.Name, y.Name);
		}

		private int Compare(FileSystemInfo x, FileSystemInfo y)
		{
			int numX = x is FileInfo ? 0 : 1 /*x is DirectoryInfo*/;
			int numY = y is FileInfo ? 0 : 1 /*y is DirectoryInfo*/;
			//The directories are always greater than files (because they pwn them)
			return numX - numY;
		}

		private int Compare(long x, long y)
		{
			if (x > y)
			{
				return 1;
			}
			else if (x < y)
			{
				return -1;
			}
			else
			{
				return 0;
			}
		}

	}
}