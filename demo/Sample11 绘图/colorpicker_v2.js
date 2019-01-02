function vdColorpicker()
		{
			var _this = this;
			this.colorChanged = function(e){}
			this.loaded = function(){}
			var globalHeight;
			var vdcanvases;
			var colorPalette = new Object();
			//Initializes the colorpicker, need to be called with a valid Div id and an integer
			//that will be used as it's height.
			this.initColorpicker = function (elementID, height){
				var str = 	"<canvas id='RGB'> </canvas></br>";		
				str += 	"<canvas id='alpha-brightness'> </canvas></br>";
				str += 	"<canvas id='activeColor'> </canvas>";
				document.getElementById(elementID).innerHTML = str;	
				globalHeight = height;
				SliderLength = 15;
				vdcanvases = new Object();
				
				vdcanvases.rgb = initCanvas('RGB', height * 0.41, height * 0.46);
				var noJava = document.getElementById('noJavascript')
				if (noJava) noJava.innerHTML = "";				
				
				vdgeo.CURVERESOLUTION  = 1000;
			}
			function initPalette(){
				colorPalette.color0 = getFromXProperty('color0').HatchProperties.FillColor.SystemColor;
				colorPalette.color1 = getFromXProperty('color1').HatchProperties.FillColor.SystemColor;
				colorPalette.color2 = getFromXProperty('color2').HatchProperties.FillColor.SystemColor;
				colorPalette.color3 = getFromXProperty('color3').HatchProperties.FillColor.SystemColor;
				colorPalette.color4 = getFromXProperty('color4').HatchProperties.FillColor.SystemColor;
				colorPalette.color5 = getFromXProperty('color5').HatchProperties.FillColor.SystemColor;
				colorPalette.color6 = getFromXProperty('color6').HatchProperties.FillColor.SystemColor;
				
				colorPalette.Active = 'color0';
			}
			//Handles the AfterOpenDocument event that occurs in the web library.
			function _vdAfterOpenDocument(e) {	
				//In this colopicker tool we are using three different canvases. We want to speed the redraw operation up, in order
				//to make the movement of the different elements as smooth as possible. So we have three sections. One contains the 
				//Red, Green and Blue sliders. The second contains the AlphaBlending and Brightness sliders. The last contains the 
				//Front and Back colors. We call the redraw() function for every section only when this is needed, saving time.
				if (e.canvas.id == "RGB")
				{
					vdcanvases.alphabr = initCanvas('alpha-brightness', globalHeight * 0.41, globalHeight * 0.1396);
					e.zoomwindow(new vdgeo.newpoint(-1.5, 23.5,0), new vdgeo.newpoint(16.5, 3.55, 0));
				}
				else if (e.canvas.id == "alpha-brightness")
				{
					vdcanvases.activeCol = initCanvas('activeColor', globalHeight * 0.41, globalHeight * 0.390);
					e.zoomwindow(new vdgeo.newpoint(-1.5, 3.55, 0), new vdgeo.newpoint(16.5, -2.5, 0));
				}
				else if (e.canvas.id == "activeColor")
				{
					_this.ActiveColor = getFromXProperty("FrontColor");
					e.zoomwindow(new vdgeo.newpoint(-1.5, -2.5, 0), new vdgeo.newpoint(16.5, -19.5, 0));
					_this.loaded();
					initPalette();
				}
			}
			//Initializes every part of this colorpicker tool.
			function initCanvas(canvasName, width, height){
				vdmanager.AttachCanvas(canvasName, width, height);	
				var vdcanvas = vdmanager.vdrawObject(canvasName);
				vdcanvas.SelectDocument('../Drawings/colorpicker_v2.vds');
				vdcanvas.ActiveAction().DefaultActions = 0;
				vdcanvas.vdmousemove = _vdmousemove;
				vdcanvas.vdmousedown = _vdmousedown;
				vdcanvas.vdmouseup = _vdmouseup;
				vdcanvas.vdmouseout = _vdmouseout;
				vdcanvas.vdAfterOpenDocument = _vdAfterOpenDocument;
				return vdcanvas;
			}
			//Handles the mouse up event that occurs in the web library.
			function _vdmouseup(e) {
				ActiveSlider = null;
				if (updated)
				{
					var ev = new Object();
					ev.FrontColor = getFromXProperty("FrontColor").HatchProperties.FillColor.SystemColor.slice();
					ev.BackColor = getFromXProperty("BackColor").HatchProperties.FillColor.SystemColor.slice();
				
					setTimeout(function(){_this.colorChanged(ev);}, 0); 
					_redraw(vdcanvases.alphabr, 0);
					_redraw(vdcanvases.activeCol, 0);
					updated = false;
				}
			}
			//Handles the mouse out event that occurs in the web library.
			function _vdmouseout(e){
				ActiveSlider = null;
				if (updated)
				{
					var e = new Object();
					e.FrontColor = getFromXProperty("FrontColor").HatchProperties.FillColor.SystemColor.slice();
					e.BackColor = getFromXProperty("BackColor").HatchProperties.FillColor.SystemColor.slice();
					
					setTimeout(function(){_this.colorChanged(e);}, 0); 
					_redraw(vdcanvases.alphabr, 0);
					_redraw(vdcanvases.activeCol, 0);
					updated = false;
				}
			}
			//Handles the mouse move event that occurs in the web library.
			function _vdmousemove(e) {
				if (!e.target.ActiveAction().IsStarted()) {
					var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
					if (entity != null && entity._t != undefined)
						e.target.canvas.style.cursor = "pointer";
					else
						e.target.canvas.style.cursor = null;
					if (ActiveSlider != null)
					{
						var x = inLimits(e.x, 0, SliderLength);
						setSlider(ActiveSlider.XProperties.Items[0].PropValue, x);
						_redraw(e.target, -1);
					}
				}
			}
			var ActiveSlider = null;
			this.ActiveColor = null;
			//Handles the mouse down event that occurs in the web library.
			function _vdmousedown(e) {
				if (!e.target.ActiveAction().IsStarted()) 
				{
					var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
					if (entity != null && entity._t != undefined)
					{
						if (!entity.XProperties) return;
						var propValue = entity.XProperties.Items[0].PropValue;
						if (propValue == 'FrontColor' || propValue == 'BackColor')
						{
							setActiveColor(entity);
							_redraw(vdcanvases.rgb, 0);
							_redraw(vdcanvases.alphabr, 0);
							_redraw(vdcanvases.activeCol, -1);
						}
						else if (propValue.indexOf("Slider") > -1)
						{
							var x = inLimits(e.x, 0, SliderLength); //Math.min(Math.max(e.x, 0), 10);
							setSlider(propValue, x);
							ActiveSlider = getFromXProperty(propValue);
							_redraw(e.target, 0);
						}
						else if (propValue == "Red" || propValue == "Green" || propValue == "Blue" || propValue == "Brightness" || propValue == "Alpha")
						{
							var x = inLimits(e.x, 0, SliderLength) //Math.min(Math.max(e.x, 0), 10);
							setSlider("Slider" + propValue, x);
							ActiveSlider = getFromXProperty("Slider" + propValue);
							
							_redraw(vdcanvases.rgb, 0);
							_redraw(vdcanvases.alphabr, 0);
						}
						else if (propValue.indexOf("color") > -1)
						{
							setActivePaletteColor(propValue);
							var color = colorPalette[colorPalette.Active];
							setSlidersToColor(color[0], color[1], color[2], color[3], 0);
							
							_redraw(vdcanvases.rgb, 0);
							_redraw(vdcanvases.alphabr, 0);
							_redraw(vdcanvases.activeCol, 0);
						}
						else if (propValue == "arrow")
						{
							updatePaletteColor();
							_redraw(vdcanvases.rgb, 0);
						}
					}
				}
			}
			function updatePaletteColor(){
				var colorObj = getFromXProperty(colorPalette.Active);
				
				colorObj.HatchProperties.FillColor.SystemColor[0] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[0];
				colorObj.HatchProperties.FillColor.SystemColor[1] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[1];
				colorObj.HatchProperties.FillColor.SystemColor[2] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[2];
				update(colorPalette.Active);
				colorPalette[colorPalette.Active][0] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[0];
				colorPalette[colorPalette.Active][1] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[1];
				colorPalette[colorPalette.Active][2] = _this.ActiveColor.HatchProperties.FillColor.SystemColor[2];
			}
			function setActivePaletteColor(name)
			{
				var prevActive = getFromXProperty(colorPalette.Active);
				var currActive = getFromXProperty(name);
				
				prevActive.PenWidth = 0;
				update(colorPalette.Active);
				currActive.PenWidth = 0.3;
				colorPalette.Active = name;
				update(name);
			}
			//Increases the value of the slider passed as parameter.
			function increaseSlider(sliderName){
				var slider = sliderName.replace("Plus", "Slider");
				var text = sliderName.replace("Plus", "Text");
				var value = new Number(getFromXProperty(text).TextString);
				
				if (sliderName.indexOf("Alpha") > -1)
				{
					value += 0.01;
					setSlider(slider, value * SliderLength);
				}
				else if (sliderName.indexOf("Brightness") > -1)
				{
					value += 0.01;
					setSlider(slider, (1 + value) * SliderLength/2);
				}
				else
				{
					value += 1;
					setSlider(slider, value / 255 * SliderLength);
				}
			}
			//Decreases the value of the slider passed as parameter.
			function decreaseSlider(sliderName){
				var slider = sliderName.replace("Minus", "Slider");
				var text = sliderName.replace("Minus", "Text");
				var value = new Number(getFromXProperty(text).TextString);
				
				if (sliderName.indexOf("Alpha") > -1)
				{
					value -= 0.01;
					setSlider(slider, value * SliderLength);
				}
				else if (sliderName.indexOf("Brightness") > -1)
				{
					value -= 0.01;
					setSlider(slider, (1 + value) * SliderLength/2);
				}
				else
				{
					value -= 1;
					setSlider(slider, value / 255 * SliderLength);
				}
			}
			//Updates the passed entity in every vdcanvas used for this colorpicker tool.
			function update(entityName){
				for(var prop in vdcanvases) {
					var entity = getFromXProperty(entityName);
					vdcanvases[prop].UpdateFig(entity);
				}
			}
			function colorizeSliders(r, g, b)
			{
				var red = getFromXProperty('Red');
				var green = getFromXProperty('Green');
				var blue = getFromXProperty('Blue');
				
				red.HatchProperties.FillColor.SystemColor[0] = 255;
				red.HatchProperties.FillColor.SystemColor[1] = g;
				red.HatchProperties.FillColor.SystemColor[2] = b;
				red.HatchProperties.gradientColor2[0] = 0;
				red.HatchProperties.gradientColor2[1] = g;
				red.HatchProperties.gradientColor2[2] = b;
				
				green.HatchProperties.FillColor.SystemColor[0] = r;
				green.HatchProperties.FillColor.SystemColor[1] = 255;
				green.HatchProperties.FillColor.SystemColor[2] = b;
				green.HatchProperties.gradientColor2[0] = r;
				green.HatchProperties.gradientColor2[1] = 0;
				green.HatchProperties.gradientColor2[2] = b;
				
				blue.HatchProperties.FillColor.SystemColor[0] = r;
				blue.HatchProperties.FillColor.SystemColor[1] = g;
				blue.HatchProperties.FillColor.SystemColor[2] = 255;
				blue.HatchProperties.gradientColor2[0] = r;
				blue.HatchProperties.gradientColor2[1] = g;
				blue.HatchProperties.gradientColor2[2] = 0;
			}
			//Sets as active color as the passed entity's hatchproperties color.
			function setActiveColor(entity){
				if (entity.XProperties.Items[0].PropValue == 'FrontColor')
				{
					var Fcolor = getFromXProperty('FrontColor');
					var Bcolor = getFromXProperty('BackColor');
					_this.ActiveColor = Fcolor;
					Fcolor.PenWidth = 0.3;
					Bcolor.PenWidth = 0.0;
					update('FrontColor');
					update('BackColor');
					
					var color = Fcolor.HatchProperties.FillColor.SystemColor;
					setSlidersToColor(color[0], color[1], color[2], color[3], 0.0);
					return true;
				}
				else if (entity.XProperties.Items[0].PropValue == 'BackColor')
				{
					var Fcolor = getFromXProperty('FrontColor');
					var Bcolor = getFromXProperty('BackColor');
					_this.ActiveColor = Bcolor;
					Fcolor.PenWidth = 0.0;
					Bcolor.PenWidth = 0.3;
					update('FrontColor');
					update('BackColor');
					
					var color = Bcolor.HatchProperties.FillColor.SystemColor;
					setSlidersToColor(color[0], color[1],color[2], color[3], 0.0);
					return true;
				}
				return false;
			}
			//Returns the entity that contains the passed xProperty value.
			function getFromXProperty(propValue){
				var vdraw;
				if (propValue.indexOf("Red") > -1 || propValue.indexOf("Green") > -1 || propValue.indexOf("Blue") > -1||
					propValue.indexOf("color") > -1)
					vdraw = vdcanvases.rgb;
				else if (propValue.indexOf("Alpha") > -1 || propValue.indexOf("Brightness") > -1)
					vdraw = vdcanvases.alphabr;
				else
					vdraw = vdcanvases.activeCol;
			
				var layout = vdraw.GetActiveLayout();
				if (!layout) return;
				var entities = layout.Entities;
				if (entities == undefined || entities.Items == undefined || entities.Items.length == undefined) return null;
				for (var k = 0; k < entities.Items.length; k++) {
					var fig = vdraw.GetEntityItem(entities.Items[k]);
					if (fig.XProperties == undefined) continue;
					if (fig.XProperties.Items[0].PropValue == propValue)
						return fig;
				}
				return null;
			}
			//Sets the position of all the sliders to the appropriate position, depending the color values
			//they represent.
			var SliderLength;
			function setSlidersToColor(r, g, b, a, br){
				setSlider('SliderRed', r * SliderLength / 255);			
				setSlider('SliderGreen', g * SliderLength / 255);
				setSlider('SliderBlue', b * SliderLength / 255);
				setSlider('SliderAlpha', a * SliderLength / 255);
				setSlider('SliderBrightness', SliderLength/2 + br * SliderLength/2);				
			}
			//Sets the position passed to the passed value.
			function setSlider(sliderName, value){
				getFromXProperty(sliderName).InsertionPoint[0] = inLimits(value, 0, SliderLength); //Math.min( Math.max(value, 0), 10);
				var text = sliderName.replace("Slider", "Text");
				var textValue;
				if (sliderName.indexOf("Brightness") > -1)
					textValue = inLimits(-1 + value /SliderLength * 2, -1 ,1).toFixed(2);
				else if (sliderName.indexOf("Alpha") > -1)
					textValue = inLimits(value / SliderLength, 0, 1).toFixed(2); //Math.min(Math.max(value / 10, 0), 1)).toFixed(2);
				else
					textValue = inLimits(value / SliderLength * 255, 0, 255).toFixed(0); //(Math.min(Math.max(value / 10 * 255, 0), 255)).toFixed(0);
				getFromXProperty(text).TextString = textValue.toString();
				updateActiveColor();
				update(sliderName);
				update(text);
			}
			//Redraws the entities of the Document.
			function _redraw(vdraw, delay) {		
				if (delay == -1)
					vdraw.redraw();
				else
					setTimeout(vdraw.redraw, delay);
			}
			var updated = false;
			//Updates the ActiveColor entity depending on the red-green-blue-alphaBlending-brightness values.
			function updateActiveColor(){
				var r = getFromXProperty("SliderRed").InsertionPoint[0] * 255 / SliderLength;
				var g = getFromXProperty("SliderGreen").InsertionPoint[0] * 255 / SliderLength;
				var b = getFromXProperty("SliderBlue").InsertionPoint[0] * 255 / SliderLength;
				var a = getFromXProperty("SliderAlpha").InsertionPoint[0] * 255 / SliderLength;
				var brightFactor = -1 + getFromXProperty("SliderBrightness").InsertionPoint[0] /SliderLength * 2;
				
				_this.ActiveColor.HatchProperties.FillColor.SystemColor[0] = parseInt(inLimits(r + 255 * brightFactor, 0, 255));
				_this.ActiveColor.HatchProperties.FillColor.SystemColor[1] = parseInt(inLimits(g + 255 * brightFactor, 0, 255));
				_this.ActiveColor.HatchProperties.FillColor.SystemColor[2] = parseInt(inLimits(b + 255 * brightFactor, 0, 255));
				_this.ActiveColor.HatchProperties.FillColor.SystemColor[3] = parseInt(a);
				
				var alpha = getFromXProperty("Alpha");
				alpha.PenColor.SystemColor[0] = parseInt(inLimits(r + 255 * brightFactor, 0, 255));
				alpha.PenColor.SystemColor[1] = parseInt(inLimits(g + 255 * brightFactor, 0, 255));
				alpha.PenColor.SystemColor[2] = parseInt(inLimits(b + 255 * brightFactor, 0, 255));
				
				var brightness = getFromXProperty("Brightness");
				brightness.PenColor.SystemColor[0] = parseInt(r);
				brightness.PenColor.SystemColor[1] = parseInt(g);
				brightness.PenColor.SystemColor[2] = parseInt(b);
				
				var colorID = _this.ActiveColor.XProperties.Items[0].PropValue;
				var color = _this.ActiveColor.HatchProperties.FillColor.SystemColor;
				getFromXProperty("Text" + colorID).PenColor.SystemColor[0] = 255 - color[0];
				getFromXProperty("Text" + colorID).PenColor.SystemColor[1] = 255 - color[1];
				getFromXProperty("Text" + colorID).PenColor.SystemColor[2] = 255 - color[2];
				
				colorizeSliders(color[0],color[1],color[2]);
				
				updated = true;
			}
			function inLimits(value, min, max){
				return Math.min(Math.max(value, min), max);
			}
		
		}