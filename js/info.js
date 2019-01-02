function InfoWin(Arguments)
{
    //Public property Version.
    this.Version = '1.0';
	
	//Local variables.
    var Ids = 0;
    var EventHandlers = new Array();
    //Create div for list box.
    // var ListBoxDiv = document.createElement('div');
	// ListBoxDiv.style.backgroundColor = 'rgba(24,24,24,0.5)';
    // ListBoxDiv.style.textAlign = 'left';
    // ListBoxDiv.style.verticalAlign = 'top';
    // ListBoxDiv.style.cursor = 'default';
    // ListBoxDiv.style.borderStyle = 'inset';
    // ListBoxDiv.style.overflow = 'auto';
    // ListBoxDiv.style.width = Width + 'px';
    // ListBoxDiv.style.height = (Size * 22) + 'px';
    

    // show infomation window
    this.show = function(){
        var infoWin = document.getElementById("infoWin");
        if(infoWin){
            $("#infoWin").css("visibility","visible");
        }        
    }

    // close infomation window
    this.close = function(){
        var infoWin = document.getElementById("infoWin");
        if(infoWin){
            $("#infoWin").css("visibility","hidden");
        }  
    }

    // update infomation window 
    this.update = function(infos){
        if(infos){
            // update

        }else{
            return;
        }
    }
}

var info =new InfoWin();

$(document).ready(function () {
    //infomatin window 拖曳功能
    var popupfather = document.getElementById('infoWin');
    var popupson = document.getElementById('infoWin_title');
    popupson.onmouseover = function (event) {
        document.getElementById('infoWin_title').style.cursor = 'move';
    }
    popupson.onmousedown = function (event) {
        document.getElementById('infoWin_title').style.cursor = 'move';
        var event = event || window.event;
        var that = this;
        var x = event.clientX - popupfather.offsetLeft - 1; // 当前鼠标点击处相对于popupfather所在位置x
        var y = event.clientY - popupfather.offsetTop - 1; // 当前鼠标点击处相对于popupfather所在位置y
        document.onmousemove = function (event) {
            var event = event || window.event;
            popupfather.style.left = event.clientX - x + "px";
            popupfather.style.top = event.clientY - y + "px";
            window.getSelection ? window.getSelection()
                .removeAllRanges() : document.selection.empty();
            document.getElementById('infoWin_title').style.cursor = 'default';
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        
    }

    $("#infoClose").click(function(){
        info.close();
    });
});