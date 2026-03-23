let cam1;
let cam2;
let cam3;
let isDefaultCamera = 0;
let angle = 0;
let angleIncrement = 0.1;
let fontTree;
let textTree;
let fullTxt_tree;
let words = [];
let txtFile = "sombra.txt";

// SLIDERS
// let leavesDistSl; let leavesDist;

function preload() {
  // font = loadFont('./assets/IBMPlexSerif-Regular.otf');
  fontTree = loadFont("./assets/fonts/AncizarSerif-VariableFont_wght.otf");
  textTree = loadStrings(`./assets/texts/${txtFile}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // frameRate(60);

  // SLIDERS

  angleMode(DEGREES);

  textFont(fontTree);
  textSize(15);

  if (textTree) {
    fullTxt_tree = textTree.join("\n");
    fullTxt_tree = fullTxt_tree.replace(/\\n/g, "\n");
    words = fullTxt_tree.split(" ");
  }

  fill("rgb(34, 34, 34)");

  cam2 = createCamera();
  cam2.setPosition(150, -250, 170);
  cam2.lookAt(-30, -100, -10);

  cam3 = createCamera();
  cam3.setPosition(80, -0, 240);
  cam3.lookAt(-60, -190, -100);

  cam1 = createCamera();
  cam1.setPosition(-50, -120, 300);
  cam1.lookAt(-50, -120, 0);
}

function draw() {
  background("rgb(255, 255, 239)");

  rotateY(angle);
  randomSeed(11);

  orbitControl();

  guide();
  ground();
  branch(200, 0);

  angle += angleIncrement;
}

function branch(len, iteration = -1) {
  let strWgt = map(len, 10, 100, 0.5, 4);

  strokeWeight(strWgt);
  stroke("rgb(66, 53, 33)");

  if (iteration < 1) {
    line(0, 0, 0, 0, (-len / 3) * 2, 0);

    // textLine(0, 0, 0, 0, -len/3 * 2, 0, strWgt);

    translate(0, (-len / 3) * 2, 0);
  } else if (iteration < 2) {
    line(0, 0, 0, 0, (-len / 3) * 2, 0);

    translate(0, (-len / 3) * 2, 0);
  } else {
    line(0, 0, 0, 0, -len - 2, 0);
    translate(0, -len, 0);
  }

  if (len > 10) {
    for (let i = 0; i < 4; i++) {
      rotateY(72);
      push();

      rotateZ(random(30, 50));
      branch(len * 0.5, iteration + 1);

      pop();
    }
  } else {
    var r = 200 + random(-20, 20);
    var g = 130 + random(-20, 20);
    var b = 20 + random(-20, 20);

    fill(r, g, b, 255);
    noStroke();
    push();
    translate(5, 0, 0);
    rotateY(random(60, 120));
    rotateX(180);

    // let rectX = random(5, 10);
    // let rectY = random(10, 15);
    let currWord = random(words);

    // rect(0, 0, rectX, rectY);
    textSize(7);
    text(currWord, 0, 0);

    pop();
  }
}

function textLine(x1, y1, z1, x2, y2, z2, strWgt) {}

function ground() {
  for (let i = 0; i < 500; i++) {
    push();
    textSize(6);
    var r = 170 + random(-20, 20);
    var g = 120 + random(-20, 20);
    var b = 20 + random(-20, 20);

    fill(r, g, b, 255);
    translate(random(-100, 100), 0, random(-100, 100));
    rotateZ(random(-20, 20));
    rotateY(random(-200, 200));
    text(random(words), 0, 0);
    pop();
  }
}

function guide() {
  push();
  textSize(7);
  translate(10, -10, 0);
  fill("rgb(0, 0, 0)");
  text("Puedes navegar por el espacio", 0, 0);
  pop();
}

function doubleClicked() {
  console.log("cambio");
  if (isDefaultCamera === 0) {
    setCamera(cam2);
    isDefaultCamera++;
  } else if (isDefaultCamera === 1) {
    setCamera(cam3);
    isDefaultCamera++;
  } else if (isDefaultCamera === 2) {
    setCamera(cam1);
    isDefaultCamera = 0;
  }
  resetCameras();
}

/*
beginShape()
for (var i = 45; i < 135; i++) {
  var rad = 7;
  var x = rad * cos(i);
  var y = rad * sin(i);
  vertex(x, y);
}
for (var i = 135; i > 45; i--) {
  var rad = 7;
  var x = rad * cos(i);
  var y = rad * sin(-i + 10);
  vertex(x, y);
}
endShape();
*/

function resetCameras() {
  cam1.setPosition(-50, -120, 300, 0, 0, 0);
  cam1.lookAt(-50, -120, 0);
  cam2.setPosition(150, -250, 170);
  cam2.lookAt(-30, -80, -0);
  cam3.setPosition(80, -0, 240);
  cam3.lookAt(-60, -190, -100);
}
