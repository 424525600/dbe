function vdColorpicker()
		{
			var _this = this;
			this.colorChanged = function(e){}
			this.loaded = function(){}
			var globalHeight;
			var vdcanvases;
			//Initializes the colorpicker, need to be called with a valid Div id and an integer
			//that will be used as it's height.
			this.initColorpicker = function (elementID, height){
				var str = 	"<canvas id='RGB'> </canvas></br>";		
				str += 	"<canvas id='alpha-brightness'> </canvas></br>";
				str += 	"<canvas id='activeColor'> </canvas></br>";
				document.getElementById(elementID).innerHTML = str;	
				globalHeight = height;
				vdcanvases = new Object();
				
				vdcanvases.rgb = initCanvas('RGB', height * 0.62, height * 0.206);
				var noJava = document.getElementById('noJavascript')
				if (noJava) noJava.innerHTML = "";

				vdgeo.CURVERESOLUTION  = 1000;
			}
			//Handles the AfterOpenDocument event that occurs in the web library.
			function _vdAfterOpenDocument(e) {	
				//In this colopicker tool we are using three different canvases. We want to speed the redraw operation up, in order
				//to make the movement of the different elements as smooth as possible. So we have three sections. One contains the 
				//Red, Green and Blue sliders. The second contains the AlphaBlending and Brightness sliders. The last contains the 
				//Front and Back colors. We call the redraw() function for every section only when this is needed, saving time.
				if (e.canvas.id == "RGB")
				{
					vdcanvases.alphabr = initCanvas('alpha-brightness', globalHeight * 0.62, globalHeight * 0.206);
					e.zoomwindow(new vdgeo.newpoint(-1.5, 9.5,0), new vdgeo.newpoint(16.5, 3.5, 0));
				}
				else if (e.canvas.id == "alpha-brightness")
				{
					vdcanvases.activeCol = initCanvas('activeColor', globalHeight * 0.62, globalHeight * 0.586);
					e.zoomwindow(new vdgeo.newpoint(-1.5, 3.5, 0), new vdgeo.newpoint(16.5, -2.5, 0));
				}
				else if (e.canvas.id == "activeColor")
				{
					_this.ActiveColor = getFromXProperty("FrontColor");
					e.zoomwindow(new vdgeo.newpoint(-1.5, -2.5, 0), new vdgeo.newpoint(16.5, -19.5, 0));
					_this.loaded();
				}
			}
			//Initializes every part of this colorpicker tool.
			function initCanvas(canvasName, width, height){
				vdmanager.AttachCanvas(canvasName, width, height);	
				var vdcanvas = vdmanager.vdrawObject(canvasName);
				vdcanvas.SelectDocument('../Drawings/colorpicker.vds');
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
					ev.FrontColor = getFromXProperty("FrontColor").HatchProperties.FillColor.SystemColor;
					ev.BackColor = getFromXProperty("BackColor").HatchProperties.FillColor.SystemColor;
				
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
					e.FrontColor = getFromXProperty("FrontColor").HatchProperties.FillColor.SystemColor;
					e.BackColor = getFromXProperty("BackColor").HatchProperties.FillColor.SystemColor;
					
					setTimeout(function(){_this.colorChanged(e);}, 0); 
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
						var x = inLimits(e.x, 0, 10);
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
						var redraw = false;
						if (!entity.XProperties) return;
						var propValue = entity.XProperties.Items[0].PropValue;
						if (propValue == 'FrontColor' || propValue == 'BackColor')
						{
							redraw = setActiveColor(entity);
							_redraw(vdcanvases.rgb, 0);
							_redraw(vdcanvases.alphabr, 0);
							_redraw(vdcanvases.activeCol, 0);
						}
						else if (propValue.indexOf("Slider") > -1)
						{
							var x = inLimits(e.x, 0, 10); //Math.min(Math.max(e.x, 0), 10);
							setSlider(propValue, x);
							ActiveSlider = getFromXProperty(propValue);
							_redraw(e.target, 0);
						}
						else if (propValue == "Red" || propValue == "Green" || propValue == "Blue" || propValue == "Brightness" || propValue == "Alpha")
						{
							var x = inLimits(e.x, 0, 10) //Math.min(Math.max(e.x, 0), 10);
							setSlider("Slider" + propValue, x);
							ActiveSlider = getFromXProperty("Slider" + propValue);
							
							_redraw(vdcanvases.rgb, 0);
							_redraw(vdcanvases.alphabr, 0);
						}
						else if (propValue.indexOf("Minus") > -1)
						{
							decreaseSlider(propValue);
							_redraw(e.target, 0);
						}
						else if (propValue.indexOf("Plus") > -1)
						{
							increaseSlider(propValue);
							_redraw(e.target, 0);
						}
					}
				}
			}
			//Increases the value of the slider passed as parameter.
			function increaseSlider(sliderName){
				var slider = sliderName.replace("Plus", "Slider");
				var text = sliderName.replace("Plus", "Text");
				var value = new Number(getFromXProperty(text).TextString);
				
				if (sliderName.indexOf("Alpha") > -1)
				{
					value += 0.01;
					setSlider(slider, value * 10);
				}
				else if (sliderName.indexOf("Brightness") > -1)
				{
					value += 0.01;
					setSlider(slider, (1 + value) * 5);
				}
				else
				{
					value += 1;
					setSlider(slider, value / 255 * 10);
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
					setSlider(slider, value * 10);
				}
				else if (sliderName.indexOf("Brightness") > -1)
				{
					value -= 0.01;
					setSlider(slider, (1 + value) * 5);
				}
				else
				{
					value -= 1;
					setSlider(slider, value / 255 * 10);
				}
			}
			//Updates the passed entity in every vdcanvas used for this colorpicker tool.
			function update(entityName){
				for(var prop in vdcanvases) {
					var entity = getFromXProperty(entityName);
					vdcanvases[prop].UpdateFig(entity);
				}
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
				if (propValue.indexOf("Red") > -1 || propValue.indexOf("Green") > -1 || propValue.indexOf("Blue") > -1)
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
			function setSlidersToColor(r, g, b, a, br){
				setSlider('SliderRed', r * 10 / 255);			
				setSlider('SliderGreen', g * 10 / 255);
				setSlider('SliderBlue', b * 10 / 255);
				setSlider('SliderAlpha', a * 10 / 255);
				setSlider('SliderBrightness', 5 + br * 5);
			}
			//Sets the position passed to the passed value.
			function setSlider(sliderName, value){
				getFromXProperty(sliderName).InsertionPoint[0] = inLimits(value, 0, 10); //Math.min( Math.max(value, 0), 10);
				var text = sliderName.replace("Slider", "Text");
				var textValue;
				if (sliderName.indexOf("Brightness") > -1)
					textValue = inLimits(-1 + value /10 * 2, -1 ,1).toFixed(2);
				else if (sliderName.indexOf("Alpha") > -1)
					textValue = inLimits(value / 10, 0, 1).toFixed(2); //Math.min(Math.max(value / 10, 0), 1)).toFixed(2);
				else
					textValue = inLimits(value / 10 * 255, 0, 255).toFixed(0); //(Math.min(Math.max(value / 10 * 255, 0), 255)).toFixed(0);
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
				var r = getFromXProperty("SliderRed").InsertionPoint[0] * 255 / 10;
				var g = getFromXProperty("SliderGreen").InsertionPoint[0] * 255 / 10;
				var b = getFromXProperty("SliderBlue").InsertionPoint[0] * 255 / 10;
				var a = getFromXProperty("SliderAlpha").InsertionPoint[0] * 255 / 10;
				var brightFactor = -1 + getFromXProperty("SliderBrightness").InsertionPoint[0] /10 * 2;
				
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

				updated = true;
			}
			function inLimits(value, min, max){
				return Math.min(Math.max(value, min), max);
			}
		
		}