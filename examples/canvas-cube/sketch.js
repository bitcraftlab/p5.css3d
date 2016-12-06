
////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//    p5.css3d.js : Multi Canvas Example 2                                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// @bitcraftlab 2016

// Example featuring 6 canvases on the face of a space :)
// - Press the left mouse button to draw


////////////////////////////////////////////////////////////////////////////////
//   params                                                                   //
////////////////////////////////////////////////////////////////////////////////

// number of canvases
var n = 6;

// space dimensions
var d = 200;

// face rotations
var rotations = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [-1, 0]];

// divs
var space, cube;
var div = [];
var canvas = [];

////////////////////////////////////////////////////////////////////////////////
//     main                                                                   //
////////////////////////////////////////////////////////////////////////////////

function setup() {

  // hide the default canvas
  var cvs = createCanvas();
  cvs.hide();

  // create the cube
  space = createDiv('');
  space.size(windowWidth, windowHeight);
  space.style('background-color', '#666');

  // create the space
  cube = createDiv3D();
  cube.size(d, d);
  cube.parent(space);
  cube.center();

  // make sure the perspective is inherited
  cube.style('transform-style', 'preserve-3d');

  cube.style('perspective-origin', '50%', '50%');
  // cube.style('perspective', '500px');
  // cube.style('background-color', 'rgba(0, 0, 0, 0.2)');

  // create the faces as 3D divs, each containing a canvas
  for(var i = 0; i < n; i++) {

    // create the face and position it on screen
    var face = div[i] = createDiv3D();
    face.size(d, d);
    face.parent(cube);
    face.center();

    // position the face in space, so we end up on the surface of the space
    var rot = rotations[i];
    face.rotateX(rot[0] * HALF_PI);
    face.rotateY(rot[1] * HALF_PI);
    face.translate([0, 0, d/2]);

    // one graphics / canvas for each face of the cube
    var g = canvas[i] = createGraphics(d, d);
    g.parent(face);
    g.show();

    // prevent the canvas from capturing the events
    g.style('pointer-events', 'none');
  }
  clearFaces();

}


function draw() {

  // iterate over all the faces
  for(var i = 0; i < n; i++) {
    // get face and graphics
    var d = div[i];
    var g = canvas[i];
    // draw something
    if(mouseIsPressed) {
      g.stroke(0, 150);
      g.strokeWeight(0.5);
      g.line(d.pmouseX, d.pmouseY, d.mouseX, d.mouseY);
    }
  }

  // activate the mouse!
  triggerMouse();

  // set the cube in motion
  cube.rotateX(1/500);
  cube.rotateY(1/400);
  cube.rotateZ(1/300);

}


// toy cube look with gentle colors
function clearFaces() {
  var b = 30;
  for(var i = 0; i < n; i++) {
    var g = canvas[i];
    g.clear();
    g.stroke(0);
    g.strokeWeight(8);
    g.noFill();
    g.rect(0, 0, g.width, g.height);
    g.fill(255, 140);
    g.strokeWeight(0);
    g.rect(b, b, g.width - 2*b, g.height - 2*b);
  }
}

////////////////////////////////////////////////////////////////////////////////
//     interaction                                                            //
////////////////////////////////////////////////////////////////////////////////

// press [any key] to clean your drawings
function keyTyped() {
  clearFaces();
}

// adjust the space to the window
function windowResized() {
  space.size(windowWidth, windowHeight);
  for(var i = 0; i < n; i++) {
      cube.center();
  }
}
