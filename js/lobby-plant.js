let angle = 0;
const ANGLE_INC = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  const cam = createCamera();
  cam.setPosition(-72, -116, 345);
  cam.lookAt(-72, -116, 0);
}

function draw() {
  background(255, 255, 239);

  rotateY(angle);
  randomSeed(18);

  orbitControl();

  branch(200, 0);

  angle += ANGLE_INC;
}

function branch(len, iteration) {
  const short = -len / 4;
  const mid = (-len / 7) * 2;
  const long = -(len / 2);

  let segment = iteration === 0 ? short : iteration < 2 ? mid : long;

  strokeWeight(map(len, 10, 100, 0.5, 1.7));
  stroke(33, 88, 42);

  line(0, 0, 0, 0, segment, 0);
  translate(0, segment, 0);

  if (len > 20) {
    for (let i = 0; i < 4; i++) {
      push();
      rotateY(i * 90);
      rotateZ(random(10, 100));
      branch(len * 0.5, iteration + 1);
      pop();
    }
  } else {
    drawLeaf();
  }
}

function drawLeaf() {
  const r = 80 + random(-20, 20);
  const g = 120 + random(-20, 20);
  const b = 40 + random(-20, 20);

  fill(r, g, b, 200);
  noStroke();

  beginShape();

  for (let i = 45; i < 135; i++) {
    vertex(3 * cos(i), 3 * sin(i));
  }

  for (let i = 135; i > 45; i--) {
    vertex(7 * cos(i), 7 * sin(-i + 10));
  }

  endShape();
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
