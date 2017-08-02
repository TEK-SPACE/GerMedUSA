<script type="text/javascript">
function doFullScreen(el)
{
	var idEdit=document.getElementById(el);
	idEdit.style.position="";
	idEdit.style.left=0;
	idEdit.style.top=0;
}
function doNormalScreen(el)
{
	var idEdit=document.getElementById(el);
	idEdit.style.position="relative";
}
</script>

<script type="text/javascript">
var edit(!FormFieldName!) = new InnovaEditor("edit(!FormFieldName!)");
edit(!FormFieldName!).onFullScreen=new Function("doFullScreen('id(!FormFieldName!)')");
edit(!FormFieldName!).onNormalScreen=new Function("doNormalScreen('id(!FormFieldName!)')");
edit(!FormFieldName!).mode="HTMLBody";
edit(!FormFieldName!).btnSpellCheck=false;
edit(!FormFieldName!).btnHTMLSource=false;
edit(!FormFieldName!).btnXHTMLSource=true;
edit(!FormFieldName!).width="100%";
edit(!FormFieldName!).height="350px";
edit(!FormFieldName!).cmdAssetManager="modalDialogShow('../../assetmanager/assetmanager.asp',800,600);";
edit(!FormFieldName!).REPLACE("(!FormFieldName!)");
</script>