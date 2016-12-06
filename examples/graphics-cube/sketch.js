////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//    p5.css3d.js : WEBGL canvas cube                                         //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// @bitcraftlab 2016

// This is just a reference sketch
// Using WEBGL instead of CSS3D to create the canvas-cube

////////////////////////////////////////////////////////////////////////////////
//   params                                                                   //
////////////////////////////////////////////////////////////////////////////////

// number of canvases
var n = 6;

// main div containing all the 3D divs
var space;

// cube diameter
var d= 100;

// face rotations and colors
var rotations = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [-1, 0]];
var colors = ['#99a', '#9a9', '#9aa', '#a9a', '#aa9', '#aaa'];

var rotx = 0;
var roty = 0;

////////////////////////////////////////////////////////////////////////////////
//     main                                                                   //
////////////////////////////////////////////////////////////////////////////////

function setup() {

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  // create a graphics for each side of the cube
  for(var i = 0; i < n; i++) {
    var g = canvas[i] = createGraphics(d, d);
    var b = 15;
    g.background(colors[i]);
    g.stroke(0, 100);
    g.strokeWeight(8);
    g.noFill();
    g.rect(0, 0, g.width, g.height);
    g.fill(255, 140);
    g.strokeWeight(0);
    g.rect(b, b, g.width - 2*b, g.height - 2*b);
  }

}

function draw() {

  background(200);

  // Camera rotation (TODO: Camera library feat. Quaternions)
  rotateY(roty);
  rotateX(rotx);

  // show all the faces
  for(var i = 0; i < n; i++) {

    var g = canvas[i];

    push();

    var rot = rotations[i];
    rotateX(rot[0] * HALF_PI);
    rotateY(rot[1] * HALF_PI);
    translate(0, 0, d);
    texture(canvas[i]);
    quad(-d, -d, +d, -d, +d, +d, -d, +d);

    pop();
  }

}

////////////////////////////////////////////////////////////////////////////////
//     interaction                                                            //
////////////////////////////////////////////////////////////////////////////////

function mouseDragged() {
  rotx +=  (mouseY - pmouseY) / 2 / d;
  roty +=  (mouseX - pmouseX) / 2 / d;
}

// adjust the space to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
