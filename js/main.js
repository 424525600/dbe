
function _vdmousedown(e) {
    document.getElementById("display").focus();
    var entity = e.target.GetEntityFromPoint(e.xPix, e.yPix);
    if (entity != null && entity._t != undefined) {
        info2.innerHTML = "Item Clicked Type : " + e.target.Fig_codeToString(entity._t) + ", Handle : " + entity.HandleId.toString();
    } else {
        info2.innerHTML = "";
    }
}

function _vdmousemove(e) {
    info3.innerHTML = e.x.toString() + " , " + e.y.toString();
}

function EnableAllLayers() {
    oListBox.EnableAll();
    var vdcanvas = vdmanager.vdrawObject('display');
    var vddoc = vdcanvas.GetDocument();
    var layers = vddoc.layers;
    if (vddoc == null) return;
    for (var i = 0; i < vddoc.Layers.Items.length; i++) {
        vdcanvas.GetDictItem(vddoc.Layers, vddoc.Layers.Items[i]).Frozen = false;
    }
    vdcanvas.redraw();
}
function DisableAllLayers() {
    oListBox.DisableAll();
    var vdcanvas = vdmanager.vdrawObject('display');
    var vddoc = vdcanvas.GetDocument();
    if (vddoc == null) return;
    for (var i = 0; i < vddoc.Layers.Items.length; i++) {
        vdcanvas.GetDictItem(vddoc.Layers, vddoc.Layers.Items[i]).Frozen = true;
    }
    vdcanvas.redraw();
}
function ListOnClick(Sender, EventArgs) {
    if (Sender == null) return;
    var vdcanvas = vdmanager.vdrawObject('display');
    var layers = vdcanvas.GetDocument().Layers;
    var layer = vdcanvas.GetDictItem(layers, "h_" + EventArgs.Value);
    if (layer == null) return;

    if (Sender.checked == true)
        layer.Frozen = false;
    else
        layer.Frozen = true;

    vdcanvas.redraw();
}

var oListBox;
function InitLayersList() {
    var Arguments = {
        Base: document.getElementById('LayersListBox'),
        Rows: 15,
        Width: 150,
        NormalItemColor: null,
        NormalItemBackColor: null,
        AlternateItemColor: null,
        AlternateItemBackColor: null,
        SelectedItemColor: null,
        SelectedIItemBackColor: null,
        HoverItemColor: null,
        HoverItemBackColor: null,
        HoverBorderdColor: null,
        ClickEventHandler: ListOnClick
    };

    oListBox = new ListBox(Arguments);
}

function _vdAfterOpenDocument(e) {
    var vdcanvas = vdmanager.vdrawObject('display');
    var layers = vdcanvas.GetDocument().Layers;

    // oListBox.DeleteItems();
    // for (var c = 0; c < layers.Items.length; c++) {
    //     var layer = vdcanvas.GetDictItem(layers, layers.Items[c]);
    //     var selected = true;
    //     var fr = layer.Frozen;
    //     if (fr === null) selected = true;
    //     else {
    //         if (fr === true) selected = false;
    //         else selected = true;
    //     }
    //     oListBox.AddItem(layer.Name, layer.HandleId, selected);
    // }

    // var layouts = vdcanvas.GetDocument().LayOuts;
    // if (layouts == null) {
    //     document.getElementById("LayoutsButton").disabled = true;
    // }
    // else {
    //     document.getElementById("LayoutsButton").disabled = false;
    // }
}
function nextlayout() {
    var vdcanvas = vdmanager.vdrawObject('display');
    vdcanvas.SetActiveLayoutId(vdcanvas.GetActiveLayoutId() + 1);
    var vd_i = vdcanvas.GetDocument(); debugger;//构建图层，名字，id，
    var sdf = vdcanvas.GetLayouts(); debugger;
    layout = vd_i.LayOuts.Items[0];
    alert(layout.Name);
}

function OnUnload() {
    oListBox.Dispose();
}

function vdrawInitPageLoad() {
    vdmanager.AttachCanvas('display', 400, 400);
    document.getElementById('noJavascript').innerHTML = "";
    var vdcanvas = vdmanager.vdrawObject('display');
    vdcanvas.GripManager.Enable = false;
    vdcanvas.vdmousemove = _vdmousemove;
    vdcanvas.vdmousedown = _vdmousedown;
    vdcanvas.vdAfterOpenDocument = _vdAfterOpenDocument;
    vdcanvas.SetDefaultTimeOutMilliseconds(500);
    vdcanvas.vdprogress = _progress;
    vdcanvas.ActiveAction().DefaultActions = vdConst.DEFAULT_ZOOMSCALE + vdConst.DEFAULT_SCROLL + vdConst.DEFAULT_ZOOMEXTENTS;

    ExtendCancvas();
    // InitLayersList();
    Open();
}
function _progress(evt) {
    if (evt.percent < 0) printInfo('info2', evt.Info);
    else if (evt.percent >= 100) printInfo('info2', ' ');
    else printInfo('info2', evt.Info + " " + evt.percent.toString() + "%");
}
function Open() {
    // var combo = document.getElementById('DrawingCombo');
    // var selected = combo.options[combo.selectedIndex].text;
    // var name = "./Drawings/" + selected + ".vds";
    var name = "./demo/Drawings/Map.vds";
    vdmanager.vdrawObject('display').SelectDocument(name);
}
function ExtendCancvas() {
    var winW = 640, winH = 480;
    if (document.body && document.body.offsetWidth) {
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    }
    if (document.compatMode == 'CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth) {
        winW = document.documentElement.offsetWidth;
        winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
        winW = window.innerWidth;
        winH = window.innerHeight;
    }
    vdmanager.vdrawObject('display').SetSize(winW-30, winH-25);
}
this.printInfo = function (infoId, text) {

    var info = document.getElementById(infoId);
    if (info == undefined) return;
    info.innerHTML = text;
}
function printCanvas() {
    var vdcanvas = vdmanager.vdrawObject('display');
    var dataUrl = vdcanvas.printToImageData(vdConst.PRINT_WINDOW_FLAG_VIEW, vdConst.PRINT_SCALE_FLAG_FIT, new Array(830, 1170), 10, Array(255, 255, 255, 255), 2);

    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', '', 'width=830,height=600,scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
}
function About() {
    var str = 'This is a basic sample that is intended to demonstrate basic functionality of our web javascript solution.\n'
        + '•So in this sample you can zoom (with mouse wheel or two finger gesture in a touch screen!).\n'
        + '•You can Pan (with left/middle click or one touch gesture in touch screens).\n'
        + '•Zoom Extends is available with Double Click.\n'
        + '•You can open different drawings and navigate to their layouts using the Next Layout button if available.\n'
        + ' The drawings are already uploaded and exported(from our main library) in our special javascript format.\n'
        + '•Handle the layers of the drawing using the side listbox.\n'
        + '•Also you can click on an entity and get it\'s type and handle.\n'
        + '•And you can also ask a printout of the extends of the drawing using the print button';
    alert(str);
}

