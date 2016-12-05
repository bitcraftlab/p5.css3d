# p5.css3d
__p5.css3d__ is a library for [p5.js](https://github.com/processing/p5.js) that lets you create and transfrom HTML elements in 3D space.
This library is still pretty much work in progress.
Currently it only supports the creation of 3D DIV elements.  
See the example for how to use it.

## Examples
* Create several canvases floating in space
  * [Multi Canvas 1](https://bitcraftlab.github.io/p5.css3d/examples/multicanvas-1/)
* Create 3D interfaces programmatically
* Create (invisible) divs on top of your canvas, so you can attach mouse events to your 3D sketch

## Transformations
You can use `rotateX`, `rotateY`, `rotateZ` `translate` etc to move divs in 3D space.  
(Very much like you would do when drawing in a p5 sketch).

## Mouse Support
Each 3D DIV has `mouseX` and `mouseY` properties.  
They provide the mouse pointer position in the coordinate system of the DIV.  
This is very useful if you want to draw on a canvas in 3D space (see example)

## Licensing
__p5.css3d__ is licensed under the MIT License.
