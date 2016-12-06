////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             p5.css.3d                                      //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

(function(p5) {

  // factory function in analogy to createDiv

  p5.prototype.createDiv3D = function(html) {
    if(html === undefined) html = '';
    var elt = document.createElement('div');
    elt.innerHTML = html;
    return new p5.Div3D(elt, this);
  };

  ////////////////////////////////////////////////////////////////////////////////
  //
  // Div 3D
  //
  // - functions to transform the position of the div in 3D space
  // - mouse coordinates in the coordinate system of the div
  //   (only when the mouse is inside the div)

  p5.Div3D = function(elt, pInst) {

    // call parent element
    p5.Element.call(this, elt, pInst);

    // register node / element
    var node = pInst._userNode ? pInst._userNode : document.body;
    node.appendChild(elt);
    pInst._elements.push(this);

    // create transformation matrix
    this.matrix = new p5.Matrix();

    // register mouse listeners to update mouse coordinates
    this.mouseMoved(this._mouseMoved);
    this.mouseOver(this._mouseOver);
    this.mouseOut(this._mouseOut);

    return this;

  };

  p5.Div3D.prototype = Object.create(p5.Element.prototype);
  p5.Div3D.prototype.constructor = p5.Div3D;

  ////////////////////////////////////////////////////////////////////////////////
  // transformation methods

  // TODO: generate those programmatically ?


  // center canvas inside its container
  /*
  Div3D.prototype.center = function() {
    var p = this.parent();
    // if the parent is undefined, use window dimensions
    var width = p.width || windowWidth;
    var height = p.height || windowHeight;
    // update position of the canvas
    this.x = width/2  - this.width/2;
    this.y = height/2 - this.height/2;
    this.position(this.x, this.y);
  };
  */

  // set transformation matrix
  p5.Div3D.prototype.setMatrix = function(matrix) {
    this.matrix = matrix;
    this._updateMatrix();
  };

  p5.Div3D.prototype.rotateX = function(angle) {
    this.matrix.rotateX(angle);
    this._updateMatrix();
  };

  p5.Div3D.prototype.rotateY = function(angle) {
    this.matrix.rotateY(angle);
    this._updateMatrix();
  };

  p5.Div3D.prototype.rotateZ = function(angle) {
    this.matrix.rotateY(angle);
    this._updateMatrix();
  };

  p5.Div3D.prototype.translate = function(v) {
    this.matrix.translate(v);
    this._updateMatrix();
  };

  p5.Div3D.prototype._updateMatrix = function() {
    var str = this.matrix.mat4.join(', ');
    this.style('transform', 'matrix3d(' + str + ')');
  };

  ////////////////////////////////////////////////////////////////////////////////
  // mouse methods

  // update current and previous mouse positions on mouse move
  p5.Div3D.prototype._mouseMoved = function(evt) {
    this.pmouseX = this.mouseX;
    this.pmouseY = this.mouseY;
    this.mouseX = evt.offsetX;
    this.mouseY = evt.offsetY;
  };

  // reset previous mouse position on mouse enter
  p5.Div3D.prototype._mouseOver = function(evt) {
    this.mouseX = this.pmouseX = evt.offsetX;
    this.mouseY = this.pmouseY = evt.offsetY;
  };

  // unset mouse positions
  p5.Div3D.prototype._mouseOut = function(evt) {
    this.mouseX = this.pmouseX = undefined;
    this.mouseY = this.pmouseY = undefined;
  };


  //////////////////////////////////////////////////////////////////////////////
  // trigger mouse

  // Magically activate the mouse even if it was not really moved (!)
  // This is necessary since the divs may move relative to the mouse

  // We do want actual mouse events because we get clientX and clientY for free.
  // (otherwise we would need to re-create the CSS 3D projection ...)

  var activeElement;
  var pactiveElement;

  p5.prototype.triggerMouse = function() {

    // get the HTML element at mouse positon
    var elt = document.elementFromPoint(mouseX, mouseY);

    // find the corresponding p5 element
    var elts = _elements.map(function(e) { return e.elt; });
    var i = elts.indexOf(elt);

    // trigger mouse events
    if(i !== -1) {
      pactiveElement = activeElement;
      activeElement  = elt;
      if(activeElement === pactiveElement) {
        trigger(activeElement, "mousemove");
      } else {
        trigger(pactiveElement, "mouseout");
        trigger(activeElement, "mouseover");
      }
    }

    // trigger function for dispatching the event
    function trigger(elt, action) {
      if(elt === undefined) return;
      var evt = new MouseEvent(action, {
        clientX: mouseX,
        clientY: mouseY,
        view: window
      });
      elt.dispatchEvent(evt);
    }

  };

})(p5);
