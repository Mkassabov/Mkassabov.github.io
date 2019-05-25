let nSlider;

function setup() {
  let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var myCanvas = createCanvas(height - 1, height - 68, WEBGL);
  myCanvas.parent("myDiv");
  textSize(15);
  noStroke();
  nSlider = createSlider(0,20,12);
  nSlider.position(0,100);
  nSlider["elt"].style.position = "fixed";
} 

function draw() {
  
  var n = nSlider.value();
  
  orbitControl(10);
  scale(0.20);
  
  background(175);
  
  stroke(255, 255, 255);
  strokeWeight(2.5);
  noFill();
  
  translate(0,400,0);
  translate(0,0,100 * n);
  stroke(100, 100, 100);
  
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < (i + 1); j++) {
      for(var k = 0; k < (i + 1); k++) {
        box(100,100,100);
        translate(0,-100,0);
      }
      translate(0, 100 * (i + 1), 0);
      translate(-100,0,0)
    }
    (i % 2 == 0) ? stroke(255, 255, 255) : stroke(100, 100, 100);
    translate(100* (i + 1),0,0);
    translate(50,0,0);
    translate(0,0,-100);
  }
  
  for(var i = n; i > 0; i--) {
    for(var j = 0; j < (i + 1); j++) {
      for(var k = 0; k < (i + 1); k++) {
        box(100,100,100);
        translate(0,-100,0);
      }
      translate(0, 100 * (i + 1), 0);
      translate(-100,0,0)
    }
    (i % 2 == 0) ? stroke(255, 255, 255) : stroke(100, 100, 100);
    translate(100* (i + 1),0,0);
    translate(-50,0,0);
    translate(0,0,-100);
  }
  box(100,100,100);
  
}