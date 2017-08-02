/************************************************
 *
 *	RadCommandsManager class
 *
 ************************************************/
 RadEditorNamespace.RadCommandsManager =
{
	New: function (eventDispatcher/*, bUndoEnabled*/)
	{
		var obj = {};
		RadEditorNamespace.Utils.ExtendObject(obj, this);//Assign props and functions!
		obj.Commands = [];
		obj.CurrentCommandIndex = -1; // index of the last (un)executed command
		obj.EventDispatcher = eventDispatcher;	
		return obj;
	},
	
	Execute : function(command, addToStack)
	{
		if (command && command.Execute)
		{			
			var bDone = command.Execute();
			
			if (false == addToStack) return false;//NEW - Do not add to stack

			if (bDone && command.CanUnexecute)
			{
				// if there are commands to redo - remove them
				this.ClearCommandsToRedo();

				RadEditorNamespace.Utils.ArrayAdd(this.Commands, command);
				this.CurrentCommandIndex = this.Commands.length - 1;
				return true;
			}
		}
		return false;
	},
	
	//TEKI: NEW - Added for AJAX type spellchecking
	RemoveCommandAt : function(index)
	{
		this.Commands.splice(index, 1);
		if (this.CurrentCommandIndex >= index)
			this.CurrentCommandIndex--;
	},

	ClearCommandsToRedo : function()
	{
		if (this.IsRedoAvailable())
		{		
			this.Commands.splice(this.CurrentCommandIndex +1, this.Commands.length - this.CurrentCommandIndex);
		}
	},

	Undo : function(depth)
	{
		depth = Math.min(RadEditorNamespace.Utils.IsNull(depth, 0), this.Commands.length);

		var cmdCount = 0;
		var command = null;

		while (0 < depth--
				&& 0 <= this.CurrentCommandIndex
				&& this.CurrentCommandIndex < this.Commands.length)
		{
			command = this.Commands[this.CurrentCommandIndex--];
			if (command)
			{
				command.Unexecute();
				cmdCount++;
			}
		}
	},

	Redo : function(depth)
	{
		depth = Math.min(RadEditorNamespace.Utils.IsNull(depth, 0), this.Commands.length);

		var cmdCount = 0;
		var command = null;

		var commandIndex = this.CurrentCommandIndex + 1;
		while (0 < depth--
				&& 0 <= commandIndex
				&& commandIndex < this.Commands.length)
		{
			command = this.Commands[commandIndex];
			if (command)
			{
				command.Execute();
				this.CurrentCommandIndex = commandIndex;

				cmdCount++;
			}
			commandIndex++;
		}
	},

	IsUndoAvailable : function()
	{
		return (-1 < this.CurrentCommandIndex);
	},

	IsRedoAvailable : function()
	{
		return (this.CurrentCommandIndex < this.Commands.length - 1);
	},

	GetUndoState : function()
	{
		return this.IsUndoAvailable() ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetRedoState : function()
	{
		return this.IsRedoAvailable() ? RadEditorNamespace.RADCOMMAND_STATE_OFF : RadEditorNamespace.RADCOMMAND_STATE_DISABLED;
	},

	GetCommandsToUndo : function()
	{
		if (this.IsUndoAvailable())
		{
			return (this.Commands.slice(0, this.CurrentCommandIndex + 1)).reverse();
		}
		else
		{
			return [];
		}
	},

	GetCommandsToRedo : function()
	{
		if (this.IsRedoAvailable())
		{
			return this.Commands.slice(this.CurrentCommandIndex + 1);
		}
		else
		{
			return [];
		}
	},

	CanRepeatLastCommand : function()
	{
		return ((this.CurrentCommandIndex == this.Commands.length - 1)
				&& null != this.Commands[this.CurrentCommandIndex]
				&& ("function" == typeof(this.Commands[this.CurrentCommandIndex].Clone)));
	},

	RepeatLastCommand : function()
	{
		if (this.CanRepeatLastCommand())
		{
			var command = this.Commands[this.CurrentCommandIndex].Clone();
			this.Execute(command);
		}
	}
};
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY