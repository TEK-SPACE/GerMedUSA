/* Namespace declaration*/
if (typeof(RadEditorNamespace) == "undefined")
{
window.RadEditorNamespace =
{
	/************************************************
	*
	*	Command states
	*
	************************************************/
	RADCOMMAND_STATE_DISABLED :-1,
	RADCOMMAND_STATE_OFF      :0,
	RADCOMMAND_STATE_ON       :1,

	/************************************************
	*
	*	Modes
	*
	************************************************/
	RADEDITOR_DESIGN_MODE :1,
	RADEDITOR_HTML_MODE :2,
	RADEDITOR_PREVIEW_MODE :3,

	/************************************************
	*
	*	Events
	*
	************************************************/
	RADEVENT_CALLBACK_STARTED	:"RADEVENT_CALLBACK_STARTED",
	RADEVENT_MODE_CHANGED		:"RADEVENT_MODE_CHANGED",
	RADEVENT_CONTEXTMENU        :"RADEVENT_CONTEXTMENU",
	RADEVENT_SEL_CHANGED        :"RADEVENT_SEL_CHANGED",
	RADEVENT_SIZE_CHANGED		:"RADEVENT_SIZE_CHANGED",
	RADEVENT_DISPOSE			:"RADEVENT_DISPOSE",
	RADEVENT_SUBMIT				:"RADEVENT_SUBMIT",
	RADEVENT_EDIT_READY         :"RADEVENT_EDIT_READY",


	RADEVENT_BEFORE_EDIT_FOCUS  :"RADEVENT_BEFORE_EDIT_FOCUS",
	RADEVENT_KEYDOWN            :"RADEVENT_KEYDOWN",
	RADEVENT_KEYUP              :"RADEVENT_KEYUP",
	RADEVENT_MOUSEDOWN          :"RADEVENT_MOUSEDOWN",
	RADEVENT_MOUSEUP            :"RADEVENT_MOUSEUP",
	RADEVENT_CUT                :"RADEVENT_CUT",
	RADEVENT_COPY               :"RADEVENT_COPY",
	RADEVENT_PASTE              :"RADEVENT_PASTE",
	RADEVENT_RESIZE_START       :"RADEVENT_RESIZE_START",
	RADEVENT_RESIZE_END         :"RADEVENT_RESIZE_END",
	RADEVENT_DRAG_START         :"RADEVENT_DRAG_START",
	RADEVENT_DRAG_END           :"RADEVENT_DRAG_END",
	RADEVENT_DROP				: "RADEVENT_DROP",

	/************************************************
	*
	*	Commands
	*
	************************************************/
	RADCOMMAND_BOLD			: "Bold",
	RADCOMMAND_ITALIC		: "Italic",
	RADCOMMAND_UNDERLINE	: "Underline",

	RADCOMMAND_FORECOLOR	: "ForeColor",
	RADCOMMAND_BACKCOLOR	: "BackColor",

	RADCOMMAND_FONTNAME     :"FontName",
	RADCOMMAND_FONTSIZE     :"FontSize",
	
	RADCOMMAND_REAL_FONTSIZE  :"RealFontSize",
	RADCOMMAND_CONVERT_TO_UPPER  :"ConvertToUpper",
	RADCOMMAND_CONVERT_TO_LOWER  :"ConvertToLower",

	RADCOMMAND_JUSTIFY_LEFT   :"JustifyLeft",
	RADCOMMAND_JUSTIFY_RIGHT  :"JustifyRight",
	RADCOMMAND_JUSTIFY_CENTER :"JustifyCenter",
	RADCOMMAND_JUSTIFY_FULL	  :"JustifyFull",
	RADCOMMAND_JUSTIFY_NONE	  :"JustifyNone",

	RADCOMMAND_INDENT  :"Indent",
	RADCOMMAND_OUTDENT :"Outdent",

	RADCOMMAND_SUBSCRIPT     :"Subscript",
	RADCOMMAND_SUPERSCRIPT   :"Superscript",
	RADCOMMAND_STRIKETHROUGH :"StrikeThrough",
	RADCOMMAND_FORMAT_BLOCK :"FormatBlock",

	RADCOMMAND_CUT			: "Cut",
	RADCOMMAND_COPY			: "Copy",
	RADCOMMAND_PASTE		: "Paste",
	RADCOMMAND_UNDO			: "Undo",
	RADCOMMAND_REDO			: "Redo",
	RADCOMMAND_SELECT_ALL	: "SelectAll",

	RADCOMMAND_TYPE	: "Typing",
	RADCOMMAND_BACK	: "Back",
	RADCOMMAND_DELETE	: "Delete",

	RADCOMMAND_INSERT_TABLE    :"InsertTable",
	RADCOMMAND_TABLE_WIZARD    :"TableWizard",

	RADCOMMAND_INSERT_IMAGE    :"InsertImage",
	RADCOMMAND_INSERT_FLASH    :"InsertFlash",
	RADCOMMAND_INSERT_MEDIA    :"InsertMedia",
	RADCOMMAND_INSERT_DOCUMENT :"InsertDocument",
	RADCOMMAND_INSERT_SYMBOL    :"InsertSymbol",
	RADCOMMAND_INSERT_SNIPPET	: "InsertSnippet",
	RADCOMMAND_INSERT_FORM_ELEMENT :"InsertFormElement",
	RADCOMMAND_INSERT_DATE :"InsertDate",
	RADCOMMAND_INSERT_TIME :"InsertTime",

	RADCOMMAND_INSERT_ROW_ABOVE :"InsertRowAbove",
	RADCOMMAND_INSERT_ROW_BELOW :"InsertRowBelow",
	RADCOMMAND_DELETE_ROW :"DeleteRow",
	RADCOMMAND_INSERT_COLUMN_LEFT :"InsertColumnLeft",
	RADCOMMAND_INSERT_COLUMN_RIGHT :"InsertColumnRight",
	RADCOMMAND_DELETE_COLUMN :"DeleteColumn",
	RADCOMMAND_MERGE_COLUMNS :"MergeColumns",
	RADCOMMAND_MERGE_ROWS :"MergeRows",
	RADCOMMAND_SPLIT_CELL :"SplitCell",
	RADCOMMAND_DELETE_CELL :"DeleteCell",
	RADCOMMAND_SET_CELL_PROPERTIES :"SetCellProperties",
	RADCOMMAND_SET_TABLE_PROPERTIES :"SetTableProperties",
	RADCOMMAND_DELETE_TABLE :"DeleteTable",
	RADCOMMAND_TOGGLE_TABLE_BORDER :"ToggleTableBorder",

	RADCOMMAND_SET_IMAGE_PROPERTIES :"SetImageProperties",
	RADCOMMAND_SHOW_IMAGE_MAP_DIALOG : "ImageMapDialog",
	
	RADCOMMAND_FORMAT_CODE_BLOCK_DIALOG : "FormatCodeBlock",
	
	RADCOMMAND_SET_LINK_PROPERTIES :"SetLinkProperties",
	RADCOMMAND_STRIP_FORMAT :"FormatStripper",

	RADCOMMAND_SHOW_LINK_DIALOG :"LinkManager",
	RADCOMMAND_SHOW_IMAGE_DIALOG :"ImageManager",
	RADCOMMAND_SHOW_FLASH_DIALOG :"FlashManager",
	RADCOMMAND_SHOW_MEDIA_DIALOG :"MediaManager",
	RADCOMMAND_SHOW_DOCUMENT_DIALOG :"DocumentManager",
	RADCOMMAND_SHOW_FIND_DIALOG :"FindAndReplace",
	RADCOMMAND_SHOW_ABOUT_DIALOG :"AboutDialog",
	RADCOMMAND_SHOW_TEMPLATE_DIALOG :"TemplateManager",
	RADCOMMAND_HELP :"Help",
	RADCOMMAND_MANAGE_MODULE :"ModuleManager",
	RADCOMMAND_PAGE_PROPERTIES :"PageProperties",

	RADCOMMAND_PRINT                 :"Print",
	RADCOMMAND_SPELLCHECK            :"SpellCheck",
	RADCOMMAND_PASTE_FROM_WORD       :"PasteFromWord",
	RADCOMMAND_PASTE_FROM_WORD_ALL   :"PasteFromWordNoFontsNoSizes",
	RADCOMMAND_PASTE_PLAIN_TEXT      :"PastePlainText",
	RADCOMMAND_PASTE_AS_HTML         :"PasteAsHtml",
	RADCOMMAND_ABSOLUTE_POSITION     :"AbsolutePosition",
	RADCOMMAND_UNLINK                :"Unlink",
	RADCOMMAND_INSERT_ORDERED_LIST   :"InsertOrderedList",
	RADCOMMAND_INSERT_UNORDERED_LIST :"InsertUnorderedList",
	RADCOMMAND_INSERT_PARAGRAPH      :"InsertParagraph",

	RADCOMMAND_INSERT_CUSTOM_LINK :"InsertCustomLink",
	RADCOMMAND_TOGGLE_SCREEN_MODE :"ToggleScreenMode",
	RADCOMMAND_TOGGLE_DOCKING     :"ToggleDocking",
	RADCOMMAND_ZOOM               :"Zoom",
	RADCOMMAND_APPLY_CLASS        :"ApplyClass",

	RADCOMMAND_REPEAT_LAST_COMMAND :"RepeatLastCommand",
	RADCOMMAND_MOVE   :"MoveCommand",
	RADCOMMAND_RESIZE :"ResizeCommand",
	RADCOMMAND_TAB :"EnableTab",

	/************************************************
	*
	*	Delete command mode
	*
	************************************************/
	DM_DELETE	: "DELETE",
	DM_BACK	: "BACKSPACE",

	/************************************************
	*
	*	Key codes
	*
	************************************************/
	KEY_F1           :112,
	KEY_F2           :113,
	KEY_F3           :114,
	KEY_F4           :115,
	KEY_F5           :116,
	KEY_F6           :117,
	KEY_F7           :118,
	KEY_F8           :119,
	KEY_F9           :120,
	KEY_F10          :121,
	KEY_F11          :122,
	KEY_F12          :123,
	KEY_CTRL         :17,
	KEY_SHIFT        :16,
	KEY_ALT          :18,
	KEY_ENTER        :13,
	KEY_HOME         :36,
	KEY_END          :35,
	KEY_LEFT         :37,
	KEY_RIGHT        :39,
	KEY_UP           :38,
	KEY_DOWN         :40,
	KEY_PAGEUP       :33,
	KEY_PAGEDOWN     :34,
	KEY_ESC          :27,
	KEY_SPACE        :32,
	KEY_TAB          :9,
	KEY_BACK         :8,
	KEY_DELETE       :46,
	KEY_INSERT       :45,
	KEY_CONTEXT_MENU :93,

	/************************************************
	*
	*	Key flags
	*
	************************************************/
	KF_CTRL		: (1 << 0),
	KF_SHIFT	: (1 << 2),
	KF_ALT		: (1 << 4),

	/************************************************
	*
	*	Tools
	*
	************************************************/
	TOOL_BUTTON			: "B",
	TOOL_COMBOBOX		: "D",
	TOOL_DROP_BUTTON	: "DB",
	TOOL_SEPARATOR		: "S",
	TOOL_BUTTON_COMBOBOX: "TD",
	TOOL_CUSTOM			: "CUSTOM",

	/************************************************
	*
	*	ClearPasteFormatting
	*
	************************************************/
	CLEAR_PASTE_FORMATTING_NONE :0,
	CLEAR_PASTE_FORMATTING_NONE_SUPRESS_MESSAGE :1,
	CLEAR_PASTE_FORMATTING_WORD :2,
	CLEAR_PASTE_FORMATTING_WORD_NO_FONTS :4,
	CLEAR_PASTE_FORMATTING_WORD_REMOVE_ALL :8,
	CLEAR_PASTE_FORMATTING_CSS :16,
	CLEAR_PASTE_FORMATTING_FONT :32,
	CLEAR_PASTE_FORMATTING_SPAN :64,
	CLEAR_PASTE_FORMATTING_ALL :128,

	/************************************************
	*
	*	DialogParametersMode
	*
	************************************************/
	DIALOG_PARAMETERS_MODE_JAVASCRIPT :0,
	DIALOG_PARAMETERS_MODE_SESSION :1,
	DIALOG_PARAMETERS_MODE_COOKIE :2,

	/************************************************
	*
	*	Variables, needed for extensibility
	*	(MCMS, Sharepoint, etc.)
	*
	************************************************/
	IMAGE_MANAGER_DIALOG_NAME : "ImageManager"
	
};

}
//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined")
{
    if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null)
    {
        Sys.Application.notifyScriptLoaded();
    }
}
//END_ATLAS_NOTIFY