//A small function to perform a walkthrough using a line.
function walker(vdcanvas, walkline) {
    var _this;
    var samplePoints;
    this.vdObj = vdcanvas;
    this.walkLine = walkline;
    this.walking = false;    
    this.finished = function() { };


    this.start = function() {
        _this = this;
        _this.walking = true;
        if (!walkline) return;
        if (!samplePoints) {
            samplePoints = _this.walkLine.VertexList.Items;
        }
        animationLoop(samplePoints);
    }
    var stop = false;
    this.stop = function() {        
        stop = true;
    }
    this.reset = function() {
        clearTimeout(loopTmt);
        stop = false;
        _this.walking = false;
        glbCount = 0;
    }
    var glbCount = 0;
    var loopTmt;
    var initialView;
    function animationLoop(samplePts) {
        if (stop) {            
            _this.reset();
            return;
        }
        if (!zooming) {
            var ptFrom = samplePts[glbCount];
            var ptTo = samplePts[glbCount + 1];
            initialView = topView;
            topView = false;
            _this.vdObj.ActiveAction().DefaultActions = null;

            _this.vdObj.LookAt(ptFrom, ptTo, 0);
            glbCount += 4;
        }
        if (glbCount < samplePts.length - 1)
            loopTmt = requestAnimationFrame(function() { animationLoop(samplePts) });
        else {
            _this.reset();
            if (_this.finished) {
                topView = initialView;
                if (topView) _this.vdObj.ActiveAction().DefaultActions = vdConst.DEFAULT_SCROLL;
                _this.finished();
            }
        }
    }
    
}