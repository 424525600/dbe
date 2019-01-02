

function CmdGetDistance(canvasId) {//We use CmdLine because they are the same regarding user interaction
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    vdcanvas.GetUserLine(_onActionGetDistanceStateChanged);
}
//status = 'start' or 'end' or 'count'
function _onActionGetDistanceStateChanged(action, status) {
    var vdcanvas = action.vdrawOwner();

    if (status == 'start') {
        vdcanvas.Prompt('pick first point');
    } else if (status == 'count') {
        vdcanvas.Prompt('pick second point');
    } else if (status == 'end') {
        vdcanvas.Prompt('');
        if (!action.IsCanceled()) {

            var distance = vdgeo.Distance2D(action.ResValue[0], action.ResValue[1]);
            vdcanvas.Prompt('Distance = ' + distance.toString());
        }
    }
}


function CmdZoomWindow(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    vdcanvas.GetUserRect(_onActioncmdZoomStateChanged);
}

//status = 'start' or 'end' or 'count'
function _onActioncmdZoomStateChanged(action, status) {
    var vdcanvas = action.vdrawOwner();
    if (status == 'start') {
        action.DispProps = (vdConst.ACTION_DISPLAY_DEFAULT ^ vdConst.ACTION_DISPLAY_USEFILLCOLOR);
        vdcanvas.Prompt('pick first corner');
    } else if (status == 'count') {
        vdcanvas.Prompt('pick second corner');
    } else if (status == 'end') {
        vdcanvas.Prompt('');
        if (!action.IsCanceled()) {
            vdcanvas.zoomwindow(action.ResValue[0], action.ResValue[1]);
            vdcanvas.redraw();
        }
    }
}

function CmdPointId(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    vdcanvas.GetUserPoint(_onActionPointIdStateChanged);
}

//status = 'start' or 'end' or 'count'
function _onActionPointIdStateChanged(action, status) {
    var vdcanvas = action.vdrawOwner();
    if (status == 'start') {
        vdcanvas.Prompt('pick a point');
    } else if (status == 'end') {
        if (!action.IsCanceled()) {
            vdcanvas.Prompt('X= ' + action.ResValue[X].toString() + ' Y= ' + action.ResValue[Y].toString());
        } else {
            vdcanvas.Prompt('');
        }
    }
}

function CmdSelect(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    //first will prompt the user to select entities.
    //After finish the selection (usually by right-click) then the _cmdselectCallback function will be called.
    //inside the _cmdselectCallback we decide what to do with the selection.In this case we hightlight the selected entities.
    vdcanvas.scriptCommand.select(null, _cmdselectCallback);
}
function _cmdselectCallback(_vdcanvas) {
    //enum all selected entities
    var selectedEntities = _vdcanvas.scriptCommand.ActiveSelection();
    if (!selectedEntities || selectedEntities.length == 0) return;
    for (var k = 0; k < selectedEntities.length; k++) {
        var fig = selectedEntities[k];
        fig.HighLight = true;
        _vdcanvas.UpdateFig(fig);
    }
    _vdcanvas.redraw();
}

function CmdErase(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    //first will prompt the user to select entities.
    //After finish the selection (usually by right-click) then the _cmdEraseCallback function will be called.
    //inside the _cmdEraseCallback we decide what to do with the selection.In this case we erase the selected entities.
    vdcanvas.scriptCommand.select(null, _cmdEraseCallback);
}
function _cmdEraseCallback(_vdcanvas) {
    _vdcanvas.scriptCommand.erase(); 
}




function CmdLine(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    vdcanvas.scriptCommand.line(null, ActionEntityAdded); //see ActionEntityAdded if you want to add some extra code for the added figure.
}

function CmdPLine(canvasId) {
    var vdcanvas = vdmanager.vdrawObject(canvasId);
    vdcanvas.scriptCommand.polyline(null, false, 0, ActionEntityAdded); //see ActionEntityAdded if you want to add some extra code for the added figure.
}

function ActionEntityAdded(vdraw, entity) {
    //TODO add your code here after user entity was added to document.
    //for example change the color of the entity to green as follow:

    //            entity.PenColor = vdConst.colorFromString("0,255,0");
    //            vdraw.UpdateFig(entity);
    //            vdraw.DrawEntity(entity);
    //            vdraw.Refresh();
}


