//ListBox.js
//Version: 1.0
//This script is created by Samir Nigam. Do not remove, modify, or hide the author information. keep it intact.
//Mail: nigam.samir@hotmail.com
var setting = {
    view : {
		dblClickExpand : false,
		showLine : false,
		showIcon : false,
		selectedMulti : false/*,
//		addHoverDom: addHoverDom, //当鼠标移动到节点上时，显示用户自定义控件
        removeHoverDom: removeHoverDom //离开节点时的操作
*/	},
	edit: {
        enable: true,
        showRenameBtn:false,
        showRemoveBtn: false//setRemoveBtn
    },
	check : {
		enable : true,
		chkDisabledInherit: true
	},
	data : {
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "pId",
			rootPId : "0"
		}
	},
	callback : {
		beforeCheck: beforeCheck,
				onCheck: onCheck
		/*onRightClick: onRightClick,
		onCheck : setLayerStatus,
		onClick : zTreeOnClick,
		beforeRemove : beforeRemove,
		onRemove: onRemove //移除事件*/
	}
};

var zNodes =[
    { id:1, pId:0, name:"进度", title:""},
    { id:2, pId:0, name:"监测点", title:""},
    { id:3, pId:0, name:"中心点", title:""},
    { id:4, pId:0, name:"图层", title:"",checked:"true"}
];
function setTitle(node) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = node ? [node]:zTree.transformToArray(zTree.getNodes());
    for (var i=0, l=nodes.length; i<l; i++) {
        var n = nodes[i];
        n.title = "[" + n.id + "] isFirstNode = " + n.isFirstNode + ", isLastNode = " + n.isLastNode;
        zTree.updateNode(n);
    }
}
function count() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    hiddenCount = zTree.getNodesByParam("isHidden", true).length;
    $("#hiddenCount").text(hiddenCount);
}
function showNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getNodesByParam("isHidden", true);
    zTree.showNodes(nodes);
    setTitle();
    count();
}
function hideNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes();
    if (nodes.length == 0) {
        alert("请至少选择一个节点");
        return;
    }
    zTree.hideNodes(nodes);
    setTitle();
    count();
}

function beforeCheck(treeId, treeNode) {
	// className = (className === "dark" ? "":"dark");
	// showLog("[ "+getTime()+" beforeCheck ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name );
	// return (treeNode.doCheck !== false);
}
function onCheck(e, treeId, treeNode) {
	if(treeNode.pId ==0){//父节点，分
		if(treeNode.id==1){}
		else if(treeNode.id==2){}
		else if(treeNode.id==3){}
		else if(treeNode.id==4){//图层一并开关
			if(treeNode.checked==true){
				EnableAllLayers();
			}else{
				DisableAllLayers();
			}
		}
	}else{
		if(treeNode.pId ==4){
			ListOnClick(treeNode.checked, treeNode.value);
		}
	}
}


function ListBox(Arguments)
{
    //Public property Version.
    this.Version = '1.0';
	
	//Local variables.
    var Ids = 1;

	this.AddItem = function(_Text, _Value, _Selected) {
		var nodetemp = {};
		nodetemp.id = "30"+Ids;
		nodetemp.pId = 4;
		nodetemp.name = _Text;
		nodetemp.value = _Value;
		nodetemp.checked = _Selected;
		zNodes.push(nodetemp);
	    Ids++;
	}
	
    //Public method GetItems.
    this.GetItems = function()
	{
        var Items = new Array();
		
		var Divs = ListBoxDiv.getElementsByTagName('div');
		
        for(var n = 0; n < Divs.length; ++n)    
			Items.push({IsSelected: Divs[n].childNodes[0].checked, Text: Divs[n].childNodes[1].innerHTML, Value: Divs[n].childNodes[1].value, ItemIndex: Divs[n].ItemIndex});  
       		
        return Items;
    }
	
    //Public method Dispose.
	this.Dispose = function()
	{
	    while(EventHandlers.length > 0)
	        DetachEventHandler(EventHandlers.pop());
			
	    Base.removeChild(ListBoxDiv);
	}
	
	//Public method Contains.
	this.Contains = function(Index)
	{
		return typeof(Index) == 'number' && ListBoxDiv.childNodes[Index] ? true : false;
	}
	
	//Public method GetItem.
	this.GetItem = function(Index)
	{	    
	    var Divs = ListBoxDiv.getElementsByTagName('div');
		
	    return this.Contains(Index) ? { IsSelected: Divs[Index].childNodes[0].checked, Text: Divs[Index].childNodes[1].innerHTML, Value: Divs[Index].childNodes[1].value, ItemIndex: Index} : null;
	}
	
	//Public method DeleteItem.
	this.DeleteItem = function(Index)
	{
	    if(!this.Contains(Index)) return false;
	    
	    try
	    {
			ListBoxDiv.removeChild(ListBoxDiv.childNodes[Index]);
	    }
	    catch(err)
	    {
			return false;
	    }
	    
	    return true;
	}
	
	//Public method DeleteItems.
	this.DeleteItems = function()
	{
	    var ItemsRemoved = 0;
	    
	    for(var n = ListBoxDiv.childNodes.length - 1; n >= 0; --n)   
	        try
	        {
				ListBoxDiv.removeChild(ListBoxDiv.childNodes[n]);
				ItemsRemoved++;
	        }
	        catch(err)
	        {
			    break;
	        }
	        
	   return ItemsRemoved;
	}

	this.EnableAll = function() {
	    var Divs = ListBoxDiv.getElementsByTagName('div');
	    for (var n = 0; n < Divs.length; ++n) {
	        Divs[n].childNodes[0].checked = true;
	    }
	}
	this.DisableAll = function() {
	    var Divs = ListBoxDiv.getElementsByTagName('div');
	    for (var n = 0; n < Divs.length; ++n) {
	        Divs[n].childNodes[0].checked = false;
	    }
	}
	
	//Public method GetTotalItems.
	this.GetTotalItems = function()
	{
	    return ListBoxDiv.childNodes.length;
	}
	
    //Item mouseover event handler.
    var OnMouseOver = function(CheckBox, Item)
    {
        if(CheckBox.checked) return;
				
        Item.bgColor = Item.style.backgroundColor;
	    Item.fColor = Item.style.color;
	    Item.bColor = Item.style.borderTopColor;
        Item.style.backgroundColor = HoverItemBackColor;
		Item.style.color = HoverItemColor;
		Item.style.borderTopColor = Item.style.borderBottomColor = HoverBorderdColor;
		Item.style.fontWeight = 'bold';
    }
    
    //Item mouseout event handler.
    var OnMouseOut = function(CheckBox, Item)
    {
        if(CheckBox.checked) return;
				
		Item.style.backgroundColor = Item.bgColor;
	    Item.style.color = Item.fColor;
	    Item.style.borderTopColor = Item.style.borderBottomColor = Item.bColor;
		Item.style.fontWeight = 'normal';
    }
    
    //CheckBox click event handler.
	var OnClick = function(CheckBox, Item)
	{	
	    if(CheckBox.checked)
        {
			Item.style.backgroundColor = SelectedIItemBackColor;
			Item.style.color = SelectedItemColor;
			Item.style.borderTopColor = Item.style.borderBottomColor = SelectedIItemBackColor;
        }
        else
        {
            Item.style.backgroundColor = HoverItemBackColor;
		    Item.style.color = HoverItemColor;
			Item.style.borderTopColor = Item.style.borderBottomColor = HoverBorderdColor;
        }
	} 
	
    //Private anonymous method to wire up event handlers.
	var WireUpEventHandler = function(Target, Event, Listener)
	{
	    //Register event.
	    if(Target.addEventListener)	   
			Target.addEventListener(Event, Listener, false);	    
	    else if(Target.attachEvent)	   
			Target.attachEvent('on' + Event, Listener);
	    else 
	    {
			Event = 'on' + Event;
			Target.Event = Listener;	 
		}
		
	    //Collect event information through object literal.
	    var EVENT = { Target: Target, Event: Event, Listener: Listener }
	    EventHandlers.push(EVENT);
	}
	
	//Private anonymous  method to detach event handlers.
	var DetachEventHandler = function(EVENT)
	{
	    if(EVENT.Target.removeEventListener)	   
			EVENT.Target.removeEventListener(EVENT.Event, EVENT.Listener, false);	    
	    else if(EVENT.Target.detachEvent)	   
			EVENT.Target.detachEvent('on' + EVENT.Event, EVENT.Listener);
	    else 
		{
			EVENT.Event = 'on' + EVENT.Event;
			EVENT.Target.EVENT.Event = null;	 
	    }
	}
	 
	// WireUpEventHandler(ListBoxDiv, 'contextmenu', function(){ return false; });
    // Base.appendChild(ListBoxDiv);
}
    




