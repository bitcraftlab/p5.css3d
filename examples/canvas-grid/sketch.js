////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//    p5.css3d.js : Multi Canvas Example 1                                    //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

// @bitcraftlab 2016

// Example featuring 3 x 3 canvases which are continuously rotating
// - Press the left mouse button to draw
// - Press the right mouse button to drag stuff around


////////////////////////////////////////////////////////////////////////////////
//   params                                                                   //
////////////////////////////////////////////////////////////////////////////////

// number of canvases
var n = 9;

// main div containing all the 3D divs
var space;

// arrays to hold every div and its canvas
var div = [];
var canvas = [];

// canvas dimensions
var canvasWidth = 150;
var canvasHeight = 150;


////////////////////////////////////////////////////////////////////////////////
//     main                                                                   //
////////////////////////////////////////////////////////////////////////////////

function setup() {

  // hide the default canvas
  var cvs = createCanvas();
  cvs.hide();

  // create a space where all our divs will live
  space = createDiv('');

  // fill the window and set perspective
  space.size(windowWidth, windowHeight);
  space.style('background-color', '#333');
  space.style('perspective', '500px');
  space.style('perspective-origin', '50%', '50%');

  // create an individual div for each canvas
  for(var i = 0; i < n; i++) {

    // create the div and position it on screens
    var d = div[i] = createDiv3D();
    var x = i % 3;
    var y = floor(i / 3);

    // border to the top and left side of the window
    var gapx = (windowWidth - 3 * canvasWidth) / 2;
    var gapy = (windowHeight - 3 * canvasHeight) / 2;

    // position and style each div
    d.position( gapx + x * canvasWidth, gapy + y * canvasHeight);
    d.size(canvasWidth, canvasHeight);
    d.style('background-color', '#ff9');

    // create a graphics for each canvas
    var g = canvas[i] = createGraphics(canvasWidth, canvasHeight);
    g.parent(d);
    g.show();

  }

  clearNotes();

  // no context menu on right click (chrome browser hack)
  window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

}


function draw() {

  // iterate over all the divs
  for(var i = 0; i < n; i++) {

    // get div and canvas / graphics
    var d = div[i];
    var g = canvas[i];

    // draw something
    g.stroke('#000');
    g.strokeWeight(0.5);

    if(mouseIsPressed && mouseButton === LEFT) {
      g.line(d.pmouseX, d.pmouseY, d.mouseX, d.mouseY);
    }

    // add rotation
    div[i].rotateY(radians(0.5));
    div[i].rotateX(radians(0.5));

    // update cursor for each of the divs
    div[i].elt.style.cursor = mouseButton === LEFT ? ARROW : HAND;

  }

  // update cursor for the background
  space.elt.style.cursor = mouseButton === LEFT ? ARROW : HAND;

}

////////////////////////////////////////////////////////////////////////////////
//     interaction                                                            //
////////////////////////////////////////////////////////////////////////////////

function mouseDragged() {

  // only draw with the right mouse button
  if(mouseButton === RIGHT) {

    // relative mouse movement
    var dx = mouseX - pmouseX;
    var dy = mouseY - pmouseY;

    // update positions of all the divs
    for(var i = 0; i < n; i++) {
      var pos = div[i].position();
      div[i].position(pos.x + dx, pos.y + dy);
    }
  }
}

// press [any key] to clean your drawings
function keyTyped() {
  clearNotes();
}

// clear the notes, adding a fine outline
function clearNotes() {
  for(var i = 0; i < n; i++) {
    var g = canvas[i];
    g.clear();
    g.noFill();
    g.rect(0, 0, canvasWidth, canvasHeight);
  }
}

// adjust the space to the window
function windowResized() {
  space.size(windowWidth, windowHeight);
}
