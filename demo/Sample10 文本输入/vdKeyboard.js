function vdKeyboard()
		{
			//Using this function we draw a box on the box passed as parameter. 
			//We call the ActionDrawEntities() function of vdcanvas that draws entities fast without 
			//adding them to the Document and without using redraw(). Using this we can make draw simple
			//objects really fast without having to redraw all the entities inside the Document.
			function ActionDrawBox(box, fill) {			
				var vdcanvas = vdmanager.vdrawObject('keyb');
				vdcanvas.ActionDrawEntities(null);
				var vddoc = vdcanvas.GetDocument();
				if (!vddoc) return;
				if (box) {
					var bmin = vdgeo.newpoint(box[0], box[1], box[2]);
					var bmax = vdgeo.newpoint(box[3], box[4], box[5]);

					var vdobj = {};
					vdobj._t = vdConst.vdRect_code;

					vdobj.LineType = vddoc.ActiveLineType;
					vdobj.Layer = vddoc.ActiveLayer;
					vdobj.PenColor = vddoc.ActivePenColor;
					
					if (fill)
					{
						vdobj.PenColor = {};
						vdobj.PenColor.SystemColor = [50, 50, 200, 150];
						vdobj.HatchProperties = {};
						vdobj.HatchProperties.FillColor = {};
					}
					else
					{
						vdobj.PenColor = {};
						vdobj.PenColor.SystemColor = [0, 255, 255, 255];	
						vdobj.PenWidth = 0.005;
					}
					vdobj.InsertionPoint = bmin;
					vdobj.Rotation = 0.0;
					vdobj.Width = bmax[0] - bmin[0];
					vdobj.Height = bmax[1] - bmin[1];


					vdcanvas.ActionDrawEntities([vdobj]);
				} else {
					vdcanvas.ActionDrawEntities(null);
				}
			}
			var _this = this;
			var PressedEnt;
			var PressedColor = new Array(-50, 0, 100);
			//Handles the mouse down event that occurs in the web library.
			function _vdmousedown(e) {
				if (!e.target.ActiveAction().IsStarted()) {
					var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
					
					if (entity != null)
					{						
						var layers = e.target.GetDocument().Layers;
						var layer = e.target.GetDictItem(layers, entity.Layer);
						var layerName = layer.Name;
						if (layerName.toLowerCase() == "control keys")
						{
							processControlKeyDown(e, entity);
						}
						else
						{
							processSimpleKeyDown(e, entity);
						}
					}
				}
			}
			//Sets the on screen key to the state of "pressed".
			function keyToPressedCanvas(key, vdrawObj){
				PressedEnt = key;
				var keyValue = key.Attributes.Items[0].ValueString;	
				var keys = getKey(keyValue);			
				for (i in keys)
				{
					fillKey(keys[i]);
				}
			}
			//Sets Shift and Caps to the state of "pressed".
			function ControlKeyToPressed(key){
				PressedEnt = key;
				var keyValue = key.Attributes.Items[0].ValueString;	
				var keys = getKey(keyValue);			
				for (i in keys)
				{
					keys[i].PenColor.SystemColor[0] += PressedColor[0];
					keys[i].PenColor.SystemColor[1] += PressedColor[1];
					keys[i].PenColor.SystemColor[2] += PressedColor[2];
				}
			}
			//Handles the necessary actions when a simple key (letters and symbols) is down.
			function processSimpleKeyDown(e, key){	
				keyToPressedCanvas(key, e.target);
			}
			//Handles the necessary actions when a simple key (letters and symbols) is up.
			function processSimpleKeyUp(e, key){			
				if (PressedEnt === key)
				{
					var keyValue = key.Attributes.Items[0].ValueString.toLowerCase();
					keyClicked(key.Attributes.Items[0].ValueString, "simpleKey");
					if (_this.shift)
					{
						resetShift();
						toggleShiftSymbols();
					}	
				}
				keyToUnpressedCanvas();
			}
			//Sets the on screen hey to the state of "un-pressed".
			function keyToUnpressedCanvas(){
				if (PressedEnt == null) return;		
				
				var vdcanvas = vdmanager.vdrawObject('keyb');
				vdcanvas.ActionDrawEntities(null);
				
				var keyValue = PressedEnt.Attributes.Items[0].ValueString;	
				if (keyValue == "Shift" && _this.shift
					|| keyValue == "Caps" && _this.caps) return;
				PressedEnt = null;
			}	
			//Draws an outline on the limit of the key's bounding box.
			function strokeKey(key){
				var bBox = key.BoundingBox;
				if (!bBox) return;
				
				ActionDrawBox(bBox, false);
				return;		
			}
			//Draws a filled rect on the limit of the key's bounding box.
			function fillKey(key){
				var bBox = key.BoundingBox;
				if (!bBox) return;
				
				ActionDrawBox(bBox, true);
				return;				
			}
			//Sets the on screen key to the state of "highlighted".
			function keyToHighlightedCanvas(key, vdrawObj){
				var keyValue = key.Attributes.Items[0].ValueString;	
				var keys = getKey(keyValue);			
				for (i in keys)
				{
					strokeKey(keys[i]);
				}
			}
			//Sets the on screen key to the state of "un-highlighted".
			function keyToUnHighlightedCanvas(vdrawObj){
				HighltdEnt = null;
				var vdcanvas = vdmanager.vdrawObject('keyb');
				vdcanvas.ActionDrawEntities(null);
			}
			//Handles the mouse up event that occurs in the web library.
			function _vdmouseup(e){			
				if (!e.target.ActiveAction().IsStarted()) {
					var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
					
					if (entity != null)
					{						
						var layers = e.target.GetDocument().Layers;
						var layer = e.target.GetDictItem(layers, entity.Layer);
						var layerName = layer.Name;
						if (layerName.toLowerCase() == "control keys")
							processControlKeyUp(e, entity);
						else
							processSimpleKeyUp(e, entity);
					}
					else
						keyToUnpressedCanvas();
				}
			}
			//Fires the keyPressed() function that is used to capture when a key of the keyboard is clicked. 
			function keyClicked(key, keyType){								
					 _this.keyPressed(key, keyType);
			}
			function getKey(keyText)	{
				var buttns = new Array();
				count = 0;

				var activelayout = keybCanvas.GetActiveLayout();
				for (k = 0; k < activelayout.Entities.Items.length; k++) 
				{
					var fig = keybCanvas.GetEntityItem(activelayout.Entities.Items[k]);
					if (!fig.Attributes) continue;
					var keyValue = fig.Attributes.Items[0].ValueString;
					if (keyValue == undefined) continue;
					if (keyText == keyValue)
					{
						buttns[count] = fig;
						count++;
					}
				}
				return buttns;
			}
			_this.shift = false;
			_this.caps = false;
			//Shift the keys depending on if Shift is pressed or not.
			function toggleShiftSymbols() {
				if (keybCanvas.FindLayer("symbol keys").Frozen)
					keybCanvas.FindLayer("symbol keys").Frozen = false;
				else
					keybCanvas.FindLayer("symbol keys").Frozen = true;
					
				if (keybCanvas.FindLayer("letter keys").Frozen)
					keybCanvas.FindLayer("letter keys").Frozen = false;
				else
					keybCanvas.FindLayer("letter keys").Frozen = true;
					
				if (keybCanvas.FindLayer("symbol keys shift").Frozen)
					keybCanvas.FindLayer("symbol keys shift").Frozen = false;
				else
					keybCanvas.FindLayer("symbol keys shift").Frozen = true;
					
				if (keybCanvas.FindLayer("letter keys shift").Frozen)
					keybCanvas.FindLayer("letter keys shift").Frozen = false;
				else
					keybCanvas.FindLayer("letter keys shift").Frozen = true;
				_redraw(keybCanvas, 0);
				
			}
			//Shift the keys depending on if Caps is pressed or not.
			function toggleCaps() {
				if (keybCanvas.FindLayer("letter keys").Frozen)
					keybCanvas.FindLayer("letter keys").Frozen = false;
				else
					keybCanvas.FindLayer("letter keys").Frozen = true;
					
				if (keybCanvas.FindLayer("letter keys shift").Frozen)
					keybCanvas.FindLayer("letter keys shift").Frozen = false;
				else
					keybCanvas.FindLayer("letter keys shift").Frozen = true;
				_redraw(keybCanvas, 0);
			}
			//Handles the necessary actions when a control key (Shift and Caps) is down.
			function processControlKeyDown(e, key){
				var keyValue = key.Attributes.Items[0].ValueString;	
				if (!(keyValue == "Shift" && _this.shift
					|| keyValue == "Caps" && _this.caps))
				{
					keyToPressedCanvas(key, e.target);
				}
				else
					PressedEnt = key;				
			}
			//Handles the necessary actions when a control key (Shift and Caps) is up.
			function processControlKeyUp(e, key){
				if (PressedEnt == null) return;
				var keyValue = key.Attributes.Items[0].ValueString.toLowerCase();
				var pressedKeyValue = PressedEnt.Attributes.Items[0].ValueString.toLowerCase();
				if (keyValue == pressedKeyValue)
				{
					keyClicked(PressedEnt.Attributes.Items[0].ValueString, "controlKey");
					if (keyValue == "shift")
					{
						if (!_this.shift)
						{
							_this.shift = true;				
							ControlKeyToPressed(key);
						}
						else
							resetShift();
						toggleShiftSymbols();
					}
					else if (keyValue == "caps")
					{
						if (!_this.caps)
						{
							_this.caps = true;
							ControlKeyToPressed(key);
						}
						else
							resetCaps();
						toggleCaps();
					}
					else
						keyToUnpressedCanvas();
				}
				else
					keyToUnpressedCanvas();
			}
			//Resets the appearance of the Shift key.
			function resetShift() {
				if (_this.shift)
				{				
					shiftKeys = getKey("Shift");

					shiftKeys[0].PenColor.SystemColor[0] -= PressedColor[0];
					shiftKeys[0].PenColor.SystemColor[1] -= PressedColor[1];
					shiftKeys[0].PenColor.SystemColor[2] -= PressedColor[2];
					
					shiftKeys[1].PenColor.SystemColor[0] -= PressedColor[0];
					shiftKeys[1].PenColor.SystemColor[1] -= PressedColor[1];
					shiftKeys[1].PenColor.SystemColor[2] -= PressedColor[2];

					_this.shift = false;
					if (PressedEnt == shiftKeys[0] || PressedEnt == shiftKeys[1]) PressedEnt = null;
					return true;
				}
				return false;
			}
			//Resets the appearance of the Caps key.
			function resetCaps() {
				if (_this.caps)
				{				
					capsKeys = getKey("Caps");

					capsKeys[0].PenColor.SystemColor[0] -= PressedColor[0];
					capsKeys[0].PenColor.SystemColor[1] -= PressedColor[1];
					capsKeys[0].PenColor.SystemColor[2] -= PressedColor[2];
					
					_this.caps = false;
					if (PressedEnt == capsKeys[0]) PressedEnt = null;
					return true;
				}
				return false;
			}
			
			var HighltdEnt;
			var HltdEntColor;
			var highLightColor = new Array(50,0,0,255);
			//Handles the mouse move event that occurs in the web library.
			function _vdmousemove(e) {
				if (!e.target.ActiveAction().IsStarted()) {
					var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
					if (HighltdEnt != null && HighltdEnt != entity)
						keyToUnHighlightedCanvas(e.target);
					if (entity != null)
					{
						keyToHighlightedCanvas(entity, e.target);
						HighltdEnt = entity;
					}
				}
			}
			//Handles the mouse out event that occurs in the web library.
			function _vdmouseout(e) {	
				keyToUnHighlightedCanvas(e.target);	
			}
			//Redraws the web library.
			function _redraw(vdraw, delay) {				
				if (delay == -1)
					vdraw.redraw();
				else
					setTimeout(vdraw.redraw, delay);
				vdraw.redraw();
			}
			//Handles the AfterOpenDocument event that occurs in the web library.
			function _vdAfterOpenDocument(e) {
				e.zoomwindow(new vdgeo.newpoint(0.113, 0.255, 0), new vdgeo.newpoint(0.6268, 0.0056));
				_this.loaded();				
			}
			var keybCanvas;
			//Initializes the keyboard, needs to be called with a valid Div id and an integer to be used
			//as the its width.
			this.initKeyboard = function (elementID, width){
			var str = 	"<canvas id='keyb'> </canvas></br>";
			document.getElementById(elementID).innerHTML = str;	
			
			vdgeo.CURVERESOLUTION  = 1000;
			vdmanager.AttachCanvas("keyb", width, width * 0.4841);
			keybCanvas = vdmanager.vdrawObject("keyb");
			keybCanvas.vdmousemove = _vdmousemove;
			keybCanvas.vdmousedown = _vdmousedown;
			keybCanvas.vdmouseup = _vdmouseup;
			keybCanvas.vdAfterOpenDocument = _vdAfterOpenDocument;
			keybCanvas.vdmouseout  = _vdmouseout;
			keybCanvas.ActiveAction().DefaultActions = 0;
			
			var noJava = document.getElementById('noJavascript')
			if (noJava) noJava.innerHTML = "";

			keybCanvas.SelectDocument("../Drawings/keyboard.vds");
		}
			this.keyPressed = function(keyValue, keyType){}
			this.loaded = function(){}
		}