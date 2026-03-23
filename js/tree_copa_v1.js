let cam1;
let cam2;
let cam3;
let isDefaultCamera = 0;
let angle = 0;
let angleIncrement = 0.1;
let fontTree;
let textTree;
let fullTxt_tree;
let text_trunk;
let words = [];
let txtFile = "copa.txt";

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
    text_trunk = textTree.join("");
  }

  fill("rgb(34, 34, 34)");

  cam2 = createCamera();
  cam2.setPosition(150, -250, 170);
  cam2.lookAt(-30, -80, -0);

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

  // angle+=angleIncrement;
  // noLoop();
}

function branch(len, iteration = -1) {
  let strWgt = map(len, 10, 100, 0.5, 5);

  strokeWeight(strWgt);
  stroke(70, 40, 20, 255);

  if (iteration === 0) {
    line(0, 0, 0, 0, -len / 2, 0);

    // textLine(0, 0, 0, 0, -len/2, 0, strWgt);

    translate(0, -len / 2, 0);
  } else {
    line(0, 0, 0, 0, -len - 2, 0);
    translate(0, -len, 0);
  }

  if (len > 13) {
    for (let i = 0; i < 5; i++) {
      rotateY(72);
      push();

      rotateZ(random(50, 70));
      branch(len * 0.5, iteration + 1);

      pop();
    }
  } else {
    var r = 80 + random(-20, 20);
    var g = 120 + random(-20, 20);
    var b = 40 + random(-20, 20);

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

function textLine(x1, y1, z1, x2, y2, z2, strWgt) {
  let ended = false;
  let index = 0;
  let lineLen = 0;
  let distX = x1 - x2;
  let distY = y1 - y2;
  let distZ = z1 - z2;
  let direction;
  let dirNorm = createVector(distX, distY, distZ).normalize();

  while (!ended) {
    push();
    // translate(x1, y1, z1);
    // let forward = createVector(1, 0, 0);

    // // axis of rotation
    // let axis = p5.Vector.cross(forward, dirNorm);

    // // angle between them
    // let angle = acos(p5.Vector.dot(forward, dirNorm));

    // // apply rotation
    // rotate(angle, axis);

    // textSize(20);
    // fill('rgb(241, 0, 0)');
    // translate(strWgt/2, 0, 0);
    // text('text_trunk[index]', 0, 0);

    translate(x1, y1, z1);

    let forward = createVector(1, 0, 0);
    let dir = dirNorm.copy().normalize();

    // Dot product (clamped)
    let dot = constrain(p5.Vector.dot(forward, dir), -1, 1);
    let angle = acos(dot);

    // Axis
    let axis = p5.Vector.cross(forward, dir);

    // If vectors are almost parallel
    if (axis.mag() < 0.0001) {
      // Same direction → no rotation
      if (dot > 0) {
        // do nothing
      }
      // Opposite direction → rotate 180° around any perpendicular axis
      else {
        axis = createVector(0, 1, 0); // or (0,0,1) if better for your scene
        rotate(PI, axis);
      }
    } else {
      axis.normalize();
      rotate(angle, axis);
    }

    textSize(20);
    fill(241, 0, 0);
    translate(strWgt / 2, 0, 0);
    text(text_trunk[index], 0, 0);
    console.log(text_trunk[index]);

    lineLen += textWidth(text_trunk[index]);

    pop();

    if (lineLen >= distX) {
      ended = true;
    }
  }
}

function ground() {
  for (let i = 0; i < 500; i++) {
    push();
    textSize(6);
    var r = 80 + random(-20, 20);
    var g = 120 + random(-20, 20);
    var b = 40 + random(-20, 20);

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

function resetCameras() {
  cam1.setPosition(-50, -120, 300, 0, 0, 0);
  cam1.lookAt(-50, -120, 0);
  cam2.setPosition(150, -250, 170);
  cam2.lookAt(-30, -80, -0);
  cam3.setPosition(80, -0, 240);
  cam3.lookAt(-60, -190, -100);
}
