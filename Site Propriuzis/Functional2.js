function step21() {
  var t01 = createElement('h2', 'Introduceti dimensiunile retelei neuronale.\n');
  t01.position(20, 5);

  var t11 = createElement('h4', 'Inputs:  2');
  t11.position(20, 65);
  i1 = 2; //Input(100, 75);

  var t21 = createElement('h4', 'Hidden: ');
  t21.position(20, 100);
  i2 = Input(100, 110);

  var t31 = createElement('h4', 'Outputs:  1');
  t31.position(20, 135);
  i3 = 1; //Input(100, 145);

  console.log(option);

  var button = createButton('submit');
  button.position(50, 180);
  button.mousePressed(function() {
    //i1.hide();
    i2.hide();
    //i3.hide();
    t11.hide();
    t21.hide();
    t31.hide();
    button.hide();
    t01.hide();
    step = 22;
    step22();
  });
}

function step22() {
  if (i2) {
    valoare1 = i1;
    valoare2 = i2.value();
    valoare3 = i3;
    nn = new NeuralNetwork(valoare1, valoare2, valoare3);
    console.log(nn);
  }
  UploadImage();
}

function step25() {
  var err = 0;
  var inputs2 = [];
  for (b of blobs) {
    if (b.Col != 0.5) {
      //selectedBlobs.push(b);
      inputs2.push([b.x / img.width, b.y / img.height, b.Col]);
    }
  }
  console.log(inputs2);
  while (test_NN(inputs2) < 95 && cont < 100) {
    if (nn.trainings % inputs2.length == 0)
      console.log(test_NN(inputs2));
    if (nn.trainings > 60000) {
      console.log("Schimba");
      nn = new NeuralNetwork(valoare1, valoare2, valoare3);
      cont++;
      //break;
    }
    if (test_NN(inputs2) < 90) {
      k = 20;
      nn.lr = 0.03;
      if (nn.trainings >= 4500 && test_NN(inputs2) >= 60) {
        k = 10;
      } else if (nn.trainings >= 9000 && test_NN(inputs2) >= 70) {
        k = 5;
        nn.lr = 0.02
      } else if (nn.trainings >= 13500 && test_NN(inputs2) >= 80) {
        k = 3;
        nn.lr = 0.015;
      }
      TrainNN(k, inputs2);
    } else if (test_NN(inputs2) < 95) {
      nn.lr = 0.01;
      TrainNN(k, inputs2);
    }
  }

  console.log("PERFECT");
  console.log(test_NN(inputs2));
  step = 26;
}

function draw_2() {
  if (step == 22) {
    if (uploaded && (frameCount == time1 + 24)) {
      ShowImage();
      step = 23;
      console.log("upload");
    }
  }
  if (step == 23) {
    img.loadPixels();
    for (var x = 0; x < img.width; x++) {
      for (var y = 0; y < img.height; y++) {
        var index = y * img.width + x;
        if (img.pixels[4 * index] > 200 && img.pixels[4 * index + 1] > 200 && img.pixels[4 * index + 2] > 200) {
          //stroke(255, 255, 0);
          //point(x, y);
          //console.log(x, y, img.pixels[4 * index], img.pixels[4 * index + 1], img.pixels[4 * index + 2]);
          check(x, y);
        }

      }
    }
    for (b of blobs) {
      b.middle();
      //b.changeCol();
    }
    img.updatePixels();
    step = 24;
  }
  if (step == 24) {

    b41 = createButton('Next');
    b41.position(300, 600);


    if (once) {
      noStroke();
      fill(col);
      rect(0, 0, 25, 25);
      t41 = createElement('h4', 'Apasati pe stele ca sa le colorati.');
      t42 = createElement('h4', 'Stelele rosii sunt cele pe care nu le puteti vedea.');
      t43 = createElement('h4', 'Stelele verzi sunt cele pe care le puteti vedea.');
      once = false;
    }
    b41.mousePressed(function() {
      option = 2;
      t41.hide();
      t42.hide();
      t43.hide();
      b41.hide();
      step = 25;
      step25();
    });
  }
  if (step == 26) {
    mapDraw = [];
    for (var x = 0; x < img.width; x++) {
      var arr = [];
      for (var y = 0; y < img.height; y++) {
        arr.push(nn.estimate([x / img.width, y / img.height])[0]);
      }
      mapDraw.push(arr);
    }
    var points = [];
    for (var x = 0; x < img.width; x++) {
      for (var y = 0; y < img.height - 1; y++) {
        if ((mapDraw[x][y] < 0.5 && mapDraw[x][y + 1] > 0.5) || (mapDraw[x][y] > 0.5 && mapDraw[x][y + 1] < 0.5)) {
          points.push([x, y]);
          strokeWeight(3);
          stroke(0, 0, 255);
          point(x, y);
        }
      }
    }
    strokeWeight(2);
    stroke(255, 255, 0);
    for (var i = 0; i < points.length - 1; i++) {
      line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
    }
    step = 27;
  }
}
