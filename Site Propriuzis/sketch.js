//TODO in Functional1, sa il fac sa citeasca din fisier intervalul pentru fiecare variabila individual
//TODO userFriendly console.logs
//TODO refactoring
//TODO all variables to their respective file (daca esete folosit in mai multe locuri, o pun pe sketch)


var nn;
var i1, i2, i3;
var b41;
var t41;
var t42;
var t43;
var uploaded = false;

var time1;
var mapDraw;

var img;
var Col = 0;
var col;
var help = true;

var once = true;

var step = 0;

var option = 0;

function setup() {
  createCanvas(400, 400);
  col = color(0, 255, 0);
  ChooseWhatToDo();
  //step2();
}

function draw() {
  if (option == 1) {
    draw_1();
  }
  if (option == 2) {
    draw_2();
  }
  if (option == 3){
    draw_3();
  }
}

function keyPressed() {
  if (step == 24) {
    if (key == 'r' || key == 'R') {
      col = color(255, 0, 0);
    }
    if (key == 'v' || key == 'V') {
      col = color(0, 255, 0);
    }
    noStroke();
    fill(col);
    rect(0, 0, 25, 25);
  }
}

function mousePressed() {
  for (var i = 0; i < blobs.length; i++) {
    if (abs(mouseX - blobs[i].x) < 7 && abs(mouseY - blobs[i].y) < 7) {
      blobs[i].changeCol();
      blobs[i].Col = (red(col) == 255 ? 0 : 1);
    }
  }
}
