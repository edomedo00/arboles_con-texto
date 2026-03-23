let cam1;
let cam2;
let cam3;
let isDefaultCamera = 0;
let angle = 0;
let angleIncrement = 0.05;
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
  cam2.setPosition(138, -219, 203);
  cam2.lookAt(-63, -103, 22);

  cam3 = createCamera();
  cam3.setPosition(-3, 35, 164);
  cam3.lookAt(-88, -252, -31);

  cam4 = createCamera();
  cam4.setPosition(-116, -129, 174);
  cam4.lookAt(-51, -153, -29);

  cam1 = createCamera();
  cam1.setPosition(-222, -114, 288);
  cam1.lookAt(-72, -114, -11);
}

function draw() {
  background("rgb(255, 255, 239)");

  rotateY(angle);
  randomSeed(15);

  orbitControl();

  // guide();
  ground();
  branch(200, 0);

  angle += angleIncrement;
}

function branch(len, iteration = -1) {
  let strWgt = map(len, 10, 100, 0.5, 5);

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

  if (len > 30) {
    for (let i = 0; i < 6; i++) {
      rotateY(60);
      push();

      rotateZ(random(10, 100));
      branch(len * 0.5, iteration + 1);

      pop();
    }
  } else {
    var r = 90 + random(-30, 30);
    var g = 6 + random(-30, 30);
    var b = 80 + random(-30, 30);
    ("rgb(90, 6, 80)");

    fill(r, g, b, 255);
    noStroke();
    push();
    translate(5, 0, 0);
    rotateY(random(60, 120));
    rotateX(180);

    // let rectX = random(5, 10);
    // let rectY = random(10, 15);

    // rect(0, 0, rectX, rectY);
    textSize(7);

    for (let i = 0; i < 5; i++) {
      push();
      let currWord = random(words);
      rotateX(random(0, 20));
      // rotateY(random(0, 20));
      // rotateZ(random(0, 20));
      text(currWord, random(-15, 15), random(-15, 15));
      pop();
    }

    pop();
  }
}

function textLine(x1, y1, z1, x2, y2, z2, strWgt) {}

function ground() {
  for (let i = 0; i < 500; i++) {
    push();
    textSize(6);
    var r = 90 + random(-30, 30);
    var g = 6 + random(-30, 30);
    var b = 80 + random(-30, 30);

    fill(r, g, b, 255);
    translate(random(-110, 110), 0, random(-110, 110));
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
  cam1.setPosition(-222, -114, 288, 0, 0, 0);
  cam1.lookAt(-72, -114, -11);
  cam2.setPosition(138, -219, 203);
  cam2.lookAt(-63, -103, 22);
  cam3.setPosition(-3, 35, 164);
  cam3.lookAt(-88, -252, -31);
  cam4.setPosition(-116, -129, 174);
  cam4.lookAt(-51, -153, -29);
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
