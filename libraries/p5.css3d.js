////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                             p5.css.3d                                      //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// factory function in analogy to createDiv

function createDiv3D(html) {
  if(html === undefined) html = '';
  var elt = document.createElement('div');
  elt.innerHTML = html;
  return new Div3D(elt, this);
}

////////////////////////////////////////////////////////////////////////////////
//
// Div 3D
//
// - functions to transform the position of the div in 3D space
// - mouse coordinates in the coordinate system of the div
//   (only when the mouse is inside the div)

function Div3D(elt, pInst) {

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
  this.mouseOut(this._mouseOver);

  return this;

}

Div3D.prototype = Object.create(p5.Element.prototype);
Div3D.prototype.constructor = Div3D;

////////////////////////////////////////////////////////////////////////////////
// transformation methods

// TODO: generate those programmatically ?

// set transformation matrix
Div3D.prototype.setMatrix = function(matrix) {
  this.matrix = matrix;
  this._updateMatrix();
}

Div3D.prototype.rotateX = function(angle) {
  this.matrix.rotateX(angle);
  this._updateMatrix();
}

Div3D.prototype.rotateY = function(angle) {
  this.matrix.rotateY(angle);
  this._updateMatrix();
}

Div3D.prototype.rotateZ = function(angle) {
  this.matrix.rotateY(angle);
  this._updateMatrix();
}

Div3D.prototype.translate = function(vec) {
  this.matrix.translate(vec);
  this._updateMatrix();
}

Div3D.prototype._updateMatrix = function() {
  var mat = this.matrix.mat4;
  var str = 'matrix3d(' + mat.join(', ') + ')';
  this.style('transform', str);
}

////////////////////////////////////////////////////////////////////////////////
// mouse methods

// update current and previous mouse positions on mouse move
Div3D.prototype._mouseMoved = function(evt) {
  this.pmouseX = this.mouseX;
  this.pmouseY = this.mouseY;
  this.mouseX = evt.offsetX
  this.mouseY = evt.offsetY;
}

// reset previous mouse position on mouse enter
Div3D.prototype._mouseOver = function(evt) {
  this.mouseX = this.pmouseX = evt.offsetX;
  this.mouseY = this.pmouseY = evt.offsetY;
}

Div3D.prototype._mouseOut = function(evt) {
  this.mouseX = this.pmouseX = undefined;
  this.mouseY = this.pmouseY = undefined;
}
