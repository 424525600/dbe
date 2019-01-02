"use strict";
var vdcanvas;
var brushesCanv;
var colorsCanv;
var BrushWidth;
var cp;
var frontC = [0, 0, 0, 255];
var backC = [255, 255, 255, 255];
var activeLine = null;
var lastToolId = "brush";
var blockToAdd = null;
var eraser = false;
var activeBlock = null;
//This function is called every time the colorpicker's active color is changed.
function _colorChanged(e) {	
	//frontC is the front color (the color the brush paints). We set a copy of the colorpicker's frontcolor array.
	frontC = e.FrontColor.slice();
	//In contrast to the front color, we don't copy the back color to the backC array. Instead we edit its values, that way
	//all the entities that have the backC color will be drawn with the new back color. That way the lines that were created
	//by the eraser will be the same color as the background.
	backC[0] = e.BackColor[0];
	backC[1] = e.BackColor[1];
	backC[2] = e.BackColor[2];
	backC[3] = 255;
	//The colorpicker's back color is set as the paint's background color.
	vdcanvas.GetDocument().Palette.Background = e.BackColor;
	vdcanvas.redraw();
}
function getLayerName(canvas, fig) {
	var layers = canvas.GetDocument().Layers;
	return brushesCanv.GetDictItem(layers, fig.Layer).Name;
}
//In this function the procedure of changing the pen width is handled.
function _vdmousedownBrushes(e) {
	var fig, layerName, i, entity = e.target.GetEntityFromPoint(e.xPix, e.yPix), entities = e.target.GetActiveLayout().Entities.Items;
	if (entity !== null && entity._t !== undefined) {
		//Iteration through all the document's entities.
		for (i = 0; i < entities.length; i += 1) {
			fig = brushesCanv.GetEntityItem(entities[i]);
			layerName = getLayerName(brushesCanv, fig);
			if (layerName !== 'frozen') {
				fig.PenColor.SystemColor = [255, 255, 255, 255];
				brushesCanv.UpdateFig(fig);
			}
		}

		entity.PenColor.SystemColor = [228, 200, 142, 255];
		brushesCanv.UpdateFig(entity);
		//When getting Xproperties from entities, you should be sure that there will be an Xproperty set, or your code will fail.
		BrushWidth = parseInt(entity.XProperties.Items[0].PropValue, 10);

		brushesCanv.redraw();
	}
}
//This function adds a new vertex to the line drawn by the user with the brush.
function AppendVertex(p) {
	//We edit the polyline's vertexlist and update it, differently the new vertex won't show when drawn.
	activeLine.VertexList.Items.push(vdgeo.newvertex(p[0], p[1], p[2], 0));
	vdcanvas.UpdateFig(activeLine);
	//Now we are creating a dummy simple line that will be drawn temporarily using the ActionDrawEntities() method. That way
	//we make our application faster, since we don't have to redraw the whole document in order to show the new line.
	//The document will be redrawn once, after the mouse button is released.
	var length = activeLine.VertexList.Items.length, line = {};
	line.Layer = activeLine.Layer;
	line.LineType = activeLine.LineType;
	line.LineTypeScale = activeLine.LineTypeScale;
	line.PenColor = activeLine.PenColor;
	line.PenWidth = activeLine.PenWidth;
	line._t = activeLine._t;
	line.VertexList = {};
	line.VertexList.Items = [activeLine.VertexList.Items[length - 2], activeLine.VertexList.Items[length - 1]];
	//The function returns the temporary line.
	return line;
}
function finalizeActiveBlock() {
	activeBlock = null;
}
function endDraw() {
	finalizeActiveBlock();
	activeLine = null;
	document.getElementById('loading').innerHTML = "Loading...";
	window.setTimeout(function() {	    
	    vdcanvas.redraw();
	    //Usint ActionDrawEntities() with null we clear the temporary bitmap, erasing everything that was drawn 
	    //on it.
	    vdcanvas.ActionDrawEntities(null);
	    document.getElementById('loading').innerHTML = "";
	}, 0);
}
function _vdmouseout(e) {
	//We handle the mouseout event similarly to the user releasing the mouse button, but making sure to add a new vertex
	//at the position the mouse left the control.
	if (activeLine) {
		var l = AppendVertex(vdgeo.newpoint(e.x, e.y, e.z));
		vdcanvas.ActionDrawEntities([l]);
	}
	endDraw();
}

function _vdmouseup(e) {
	endDraw();
}
function getColor() {
	if (!eraser) 
		//If we are not using the eraser, we return a copy of the front color. That way every entity will have its own
		//color, thus the color won't change when the user changes the colorpicker's front color.
		return frontC.slice();
	else 
		//If the eraser is true, we return the backC array itself. That way all the lines drawn while erasing will have
		//the same color. This helps us when the user changes the back color. These lines will also change their color
		//giving the impression that they do not exist, since they will have the same color as the background.
		return backC;
}
function insertBlock(name, pos) {
	//To use the AddBlockSymbol() method make sure to have the block in the document already.
	activeBlock = vdcanvas.AddBlockSymbol(name, pos, 1, 0.0, false);
	//In case you have forgotten to include the block in the document, have a check after the AddBlockSymbol().
	if (activeBlock) {
		activeBlock.PenColor.SystemColor = getColor();
	}
}
function AddLine(p) {
	var vert1 = vdgeo.newvertex(p[0], p[1], p[2], 0), vert2 = vdgeo.newvertex(p[0], p[1], p[2], 0), vertexes = [vert1, vert2];
	activeLine = vdcanvas.AddPolyline(vertexes, false);

	activeLine.PenColor.SystemColor = getColor();
	activeLine.PenWidth = BrushWidth;
	return activeLine;
}
function _vdmousedown(e) {

	if (blockToAdd) {insertBlock(blockToAdd, vdgeo.newpoint(e.x, e.y, e.z));}
	else {
		var l = AddLine(vdgeo.newpoint(e.x, e.y, e.z));
		vdcanvas.ActionDrawEntities([l]);
	}
}
//Using the ActionDrawEntities() method you can add visual effects easily to your application.
//In the following function the ActiveBlock is edited dynamically as the user moves the mouse.
function editActiveBlock(point) {
	//We are clearing the temporary bitmap so that the block won't leave a trace while redrawn.
	vdcanvas.ActionDrawEntities(null);
	var insPoint = activeBlock.InsertionPoint, scale = vdgeo.Distance2D(insPoint, point), angle = vdgeo.GetAngle(insPoint, point);
	activeBlock.Xscale = scale;
	activeBlock.Yscale = scale;
	activeBlock.Rotation = angle;
	//When editing properties of an entity, UpdateFig is necessary to draw it properly.
	vdcanvas.UpdateFig(activeBlock);
	vdcanvas.ActionDrawEntities([activeBlock]);
}
function _vdmousemove(e) {
	if (activeBlock) {
		editActiveBlock(vdgeo.newpoint(e.x, e.y, e.z));
	} else if (activeLine) {
		var l = AppendVertex(vdgeo.newpoint(e.x, e.y, e.z));
		vdcanvas.ActionDrawEntities([l]);
	}
}
//To clear the entities of a document simply set the Deleted property to True. You don't need to remove them.
function clearAll() {
	var i, fig, entities = vdcanvas.GetActiveLayout().Entities.Items;
	for (i = 0; i < entities.length; i+=1) {
		fig = vdcanvas.GetEntityItem(entities[i]);
		fig.Deleted = true;
		vdcanvas.UpdateFig(fig);
	}
	vdcanvas.redraw();
}
function printDrawing() {
    var dataUrl = vdcanvas.printToImageData(vdConst.PRINT_WINDOW_FLAG_VIEW, vdConst.PRINT_SCALE_FLAG_FIT, new Array(550, 400), 10, backC, 0);

    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    var windowContent = '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    
    var printWin = window.open('', '', 'width=550,height=400,scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
}
//This function is called when the user clicks on an image in order to define what function will be performed.
function initBlock(name, imageID) {
	eraser = false;
	if (name === "eraser") {
		blockToAdd = null;
		eraser = true;
	} else
		blockToAdd = name;
	document.getElementById(lastToolId).style.backgroundColor = "transparent";
	document.getElementById(imageID).style.backgroundColor = "#BDC6DE";
	lastToolId = imageID;
}
//Initializing the colorpicker.
function OpenColors() {
	cp = new vdColorpicker();
	cp.initColorpicker('colors', 530);
	cp.colorChanged = _colorChanged;
}
function _vdAfterOpenDocumentBrushes(e) {
	brushesCanv.zoomExtents();
	//Opening multiple document's at the same time will cause your application to fail, so make sure
	//to Open a new document after the last has finished doing so. The best solution to this is using
	//the vdAfterOpenDocument field provided by the vdcanvas object.
	OpenColors();
}
function OpenBrushes() {
	vdmanager.AttachCanvas('brushes', 400 / 7, 400);
	brushesCanv = vdmanager.vdrawObject('brushes');
	brushesCanv.SelectDocument('../Drawings/brushes.vds');
	brushesCanv.vdAfterOpenDocument = _vdAfterOpenDocumentBrushes;
	//Using the following command the user won't be able to change the predefined view with the mouse.
	//Cannot Pan, zoom in/out or rotate the scene.
	brushesCanv.ActiveAction().DefaultActions = 0;
	brushesCanv.vdmousedown = _vdmousedownBrushes;
}
function _vdAfterOpenDocument(e) {
	vdcanvas.zoomwindow(vdgeo.newpoint(0, 5, 0), vdgeo.newpoint(0, -65, 0));
	//Opening multiple document's at the same time will cause your application to fail, so make sure
	//to Open a new document after the last has finished doing so. The best solution to this is using
	//the vdAfterOpenDocument field provided by the vdcanvas object.
	OpenBrushes();
}
function OpenMainCanvas() {
	vdmanager.AttachCanvas('myCanvas', 550, 400);
	vdcanvas = vdmanager.vdrawObject('myCanvas');
	vdcanvas.SetEnableSelection(false);
	vdcanvas.SelectDocument('../Drawings/vdPaintDoc.vds');
	vdcanvas.vdAfterOpenDocument = _vdAfterOpenDocument;
	vdcanvas.vdmousedown = _vdmousedown;
	vdcanvas.vdmouseup = _vdmouseup;
	vdcanvas.vdmousemove = _vdmousemove;
	vdcanvas.vdmouseout = _vdmouseout;
	//Using the following command the user won't be able to change the predefined view with the mouse.
	//Cannot Pan, zoom in/out or rotate the scene.
	vdcanvas.ActiveAction().DefaultActions = 0;
}
function vdrawInitPageLoad() {
	//Opening multiple document's at the same time will cause your application to fail, so make sure
	//to Open a new document after the last has finished doing so. The best solution to this is using
	//the vdAfterOpenDocument field provided by the vdcanvas object.
	OpenMainCanvas();
}