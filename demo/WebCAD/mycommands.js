var commands = {};
commands.canvas = function () {
    return vdmanager.vdrawObject();
}
// GetUserLine delegate
function _onActionGetDistanceStateChanged(action, status) {
    var vdcanvas = action.vdrawOwner();

    if (status == 'start') {
        vdcanvas.Prompt('pick first point');
    } else if (status == 'count') {
        vdcanvas.Prompt('pick second point');
    } else if (status == 'end') {
        vdcanvas.Prompt(':');
        if (!action.IsCanceled()) {
            var distance = vdgeo.Distance2D(action.ResValue[0], action.ResValue[1]);
            vdcanvas.Prompt('Distance = ' + distance.toString());

        }
    }
}

// GetUserPoint delegate
function _onActionPointIdChanged(action, status) {
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
// Some common properties
function CommonFigureProperties() {

    vdcanvas.scriptCommand.color(document.getElementById('color').value);
    vdcanvas.scriptCommand.tooltip(document.getElementById('tooltip').value);
    vdcanvas.scriptCommand.lineweight(Number(document.getElementById('lineweight').value));
    var ltscale = Number(document.getElementById('linetypescale').value);
    vdcanvas.scriptCommand.ltscale(ltscale);

} // Entities that added in the undo list 
function actionentityadded(vdrawobj, entity) {
    vdcanvas.scriptCommand.undogroup('close');
}
commands.commandexecute = function (combo, commandname) {
    var vdcanvas = commands.canvas();
    if (!commandname) commandname = combo.id;

    if (combo && combo.style && combo.style.display) combo.style.display = "none";
    if (commandname == "line") {
        vdcanvas.scriptCommand.undogroup('begin');
        CommonFigureProperties();
        vdcanvas.scriptCommand.line(null, actionentityadded);
    }
    else if (commandname == "rect") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.hatch('none'); // in order not to draw a hatch
        CommonFigureProperties();
        vdcanvas.scriptCommand.rect(null, actionentityadded);
    }

    else if (commandname == "arc") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.hatch('none'); // in order not to draw a hatch
        CommonFigureProperties();
        vdcanvas.scriptCommand.arc(null, actionentityadded);
    }
    else if (commandname == "circle") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.hatch('none'); // in order not to draw a hatch
        CommonFigureProperties();
        vdcanvas.scriptCommand.circle(null, actionentityadded);
    }
    else if (commandname == "pline") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.hatch('none'); // in order not to draw a hatch
        CommonFigureProperties();
        vdcanvas.scriptCommand.polyline(null, false, 0, actionentityadded);

    }
    else if (commandname == "spline") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.hatch('none'); // in order not to draw a hatch
        CommonFigureProperties();
        vdcanvas.scriptCommand.polyline(null, false, 1, actionentityadded);

    }
    else if (commandname == "image") {
        vdcanvas.scriptCommand.undogroup('begin');
        vdcanvas.scriptCommand.tooltip(document.getElementById('tooltip').value);
        var imagename = document.getElementById("ImagesCombo").value;
        vdcanvas.scriptCommand.image(imagename, '', null, actionentityadded);
    }

    else if (commandname == "text") {

        document.getElementById("popupText").style.display = "none";
        var tstylelist = document.getElementById("textstylelist");
        var jlist = document.getElementById("justifylist");

        var textheight = document.getElementById("textheight").value;
        var textvalue = document.getElementById("textvalue").value;

        var items = jlist.value.split("_");

        vdcanvas.scriptCommand.undogroup('begin');
        CommonFigureProperties();
        vdcanvas.scriptCommand.textstyle(tstylelist.value, Number(textheight), items[0], items[1]);
        vdcanvas.scriptCommand.text(textvalue, null, actionentityadded);

    }
    else if (commandname == "block") {
        var blockName = document.getElementById("blocksCombo").value;
        vdcanvas.scriptCommand.undogroup('begin');
        CommonFigureProperties();
        vdcanvas.scriptCommand.blockref(blockName, null, actionentityadded);
    }
    else if (commandname == "hatch") {

        var hatchPattern = document.getElementById('HatchPatternsCombo').value;
        var hatchfillcolor = document.getElementById('hatchFillColor').value;
        var hatchbkcolor = document.getElementById('hatchBkColor').value;
        var hatchscale = document.getElementById('hatchScale').value;
        var hatchangle = document.getElementById('HatchAngle').value;
        var ht = document.getElementById('HatchTypeCombo').value;
        vdcanvas.scriptCommand.undogroup('begin');
        CommonFigureProperties();
        if (boundary.checked) {
            vdcanvas.scriptCommand.hatch(hatchPattern, hatchbkcolor, hatchfillcolor, Number(document.getElementById('hatchScale').value), Number(document.getElementById('HatchAngle').value), 255, true);
        }
        if (!boundary.checked) {
            vdcanvas.scriptCommand.hatch(hatchPattern, hatchbkcolor, hatchfillcolor, Number(document.getElementById('hatchScale').value), Number(document.getElementById('HatchAngle').value), 255, false);
        } 
        if (ht == "Circle") { vdcanvas.scriptCommand.circle(null, actionentityadded); }
        else if (ht == "Rectangle") { vdcanvas.scriptCommand.rect(null, actionentityadded); }
        else if (ht == "Polyline") { vdcanvas.scriptCommand.polyline(null, false, 0, actionentityadded); }
    }
    else if (commandname == "move") {
        vdcanvas.scriptCommand.select(null, function (vdcanvas) { vdcanvas.scriptCommand.move(); }); //{ vdcanvas.scriptCommand.move(null, null, actionfinish); }
    }
    else if (commandname == "scale") {
        vdcanvas.scriptCommand.select(null, function (vdcanvas) { vdcanvas.scriptCommand.scale(); });
    }
    else if (commandname == "erase") {
        vdcanvas.scriptCommand.select(null, function (vdcanvas) { vdcanvas.scriptCommand.erase(); vdcanvas.redraw(); });
    }
    else if (commandname == "rotate") {
        vdcanvas.scriptCommand.select(null, function (vdcanvas) { vdcanvas.scriptCommand.rotate(); });
    }
    else if (commandname == "copy") {
        vdcanvas.scriptCommand.select(null, function (vdcanvas) { vdcanvas.scriptCommand.copy(); });
        setTimeout(vdcanvas.redraw);
    }
    else if (commandname == "undo") {
        vdcanvas.scriptCommand.undo();
        setTimeout(vdcanvas.redraw);
    }
    else if (commandname == "redo") {
        vdcanvas.scriptCommand.redo();
        setTimeout(vdcanvas.redraw);
    }
    else if (commandname == "regen") {
        vdcanvas.UpdateLayout(null, true);
        setTimeout(vdcanvas.redraw);
    }
    else if (commandname == "distance") {

        vdcanvas.GetUserLine(_onActionGetDistanceStateChanged);
    }
    else if (commandname == "point") {

        vdcanvas.GetUserPoint(_onActionPointIdChanged);
    }

}
commands.newdrawing = function () {
    var vdcanvas = commands.canvas();
    vdcanvas.SelectDocument('vddocument.vds');
}
commands.open = function (data, filename) {
    var vdcanvas = commands.canvas();
    vdcanvas.SelectDocumentBlob(data, filename);

}
