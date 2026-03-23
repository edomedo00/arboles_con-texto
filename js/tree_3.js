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
let txtFile = "3.txt";

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
  cam2.setPosition(138, -296, 216);
  cam2.lookAt(-68, -123, 9);

  cam3 = createCamera();
  cam3.setPosition(-17, 1, 135);
  cam3.lookAt(-67, -252, -37);

  cam4 = createCamera();
  cam4.setPosition(-167, -181, 159);
  cam4.lookAt(-68, -217, -26);

  cam1 = createCamera();
  cam1.setPosition(-220, -133, 289);
  cam1.lookAt(-70, -133, -10);
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
    setCamera(cam4);
    isDefaultCamera++;
  } else if (isDefaultCamera === 3) {
    setCamera(cam1);
    isDefaultCamera = 0;
  }
  resetCameras();
}

function resetCameras() {
  cam1.setPosition(-220, -133, 289, 0, 0, 0);
  cam1.lookAt(-70, -133, -10);
  cam2.setPosition(138, -296, 216);
  cam2.lookAt(-68, -123, 9);
  cam3.setPosition(-17, 1, 135);
  cam3.lookAt(-67, -252, -37);
  cam4.setPosition(-167, -181, 159);
  cam4.lookAt(-68, -217, -26);
}

function keyPressed() {
  if (key === "s") {
    let cam = _renderer._curCamera; // gets the currently active camera

    console.log("Position:", cam.eyeX, cam.eyeY, cam.eyeZ);
    console.log("LookAt center:", cam.centerX, cam.centerY, cam.centerZ);
    console.log("Up vector:", cam.upX, cam.upY, cam.upZ);

    // Ready-to-paste format:
    console.log(
      `cam.setPosition(${cam.eyeX.toFixed(1)}, ${cam.eyeY.toFixed(1)}, ${cam.eyeZ.toFixed(1)})`,
    );
    console.log(
      `cam.lookAt(${cam.centerX.toFixed(1)}, ${cam.centerY.toFixed(1)}, ${cam.centerZ.toFixed(1)})`,
    );
  }
}
