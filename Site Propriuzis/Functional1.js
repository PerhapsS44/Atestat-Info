var no_training;
var no_testing;
var testing;
var training;

var nameNN = 'NeuralNetwork';
var entries;
var min_I;
var max_I;
var min_T;
var max_T;
var countI;
var countT;
var no_loops;
var training_p;
var nn_lr;
var efficency;
var contor_rep = 0;
var error_margin;

function step11() {
  var t01 = createElement('h2', 'Introduceti dimensiunile retelei neuronale.\n');
  t01.position(20, 5);

  var t11 = createElement('h4', 'Inputs: ');
  t11.position(20, 65);
  i1 = Input(100, 75);

  var t21 = createElement('h4', 'Hidden: ');
  t21.position(20, 100);
  i2 = Input(100, 110);

  var t31 = createElement('h4', 'Outputs: ');
  t31.position(20, 135);
  i3 = Input(100, 145);

  //console.log(option);

  var button = createButton('submit');
  button.position(50, 180);
  button.mousePressed(function() {
    i1.hide();
    i2.hide();
    i3.hide();
    t11.hide();
    t21.hide();
    t31.hide();
    button.hide();
    t01.hide();
    step = 12;
    step12();
  });
}

function step12() {
  if (i1) {
    valoare1 = i1.value();
    valoare2 = i2.value();
    valoare3 = i3.value();
  }
  UploadData();
}

function draw_1() {
  if (step == 12) {
    if (uploaded && (frameCount == time1 + 24)) {
      get_data();
    }
  }
}

function get_data() {
  var inputs = [],
  targets = [];
  if (config){
    config = splitTokens(config, '\n');
    for (var i = 0; i < config.length; i++){
      config[i] = splitTokens(config[i], ' ');
      switch (config[i][0]){
        case "nume_nn:":{ nameNN = config[i][1]; break;}
        case "min_V:":{ min_I = parseFloat(config[i][1]); break;}
        case "max_V:":{ max_I = parseFloat(config[i][1]); break;}
        case "min_R:":{ min_T = parseFloat(config[i][1]); break;}
        case "max_R:":{ max_T = parseFloat(config[i][1]); break;}
        case "inputs:":{ entries = parseInt(config[i][1]); break;}
        case "int_left_nn:":{ int_left_nn = parseFloat(config[i][1]); break;}
        case "int_right_nn:":{ int_right_nn = parseFloat(config[i][1]); break;}
        case "nn_lr:":{ nn_lr = parseFloat(config[i][1]); break;}
        case "no_loops:":{ no_loops = parseInt(config[i][1]); break;}
        case "training_p:":{ training_p = parseFloat(config[i][1]); break;}
        case "efficency:":{ efficency = parseFloat(config[i][1]); break;}
        case "error_margin:":{ error_margin = parseFloat(config[i][1]); break;}

      }
    }
  }
  if (datai) {
    var temp1 = splitTokens(datai, '\n');
    inputs = [];
    if (valoare1 > 1) {
      for (var i = 0; i < entries; i++)
      temp1[i] = splitTokens(temp1[i], ' ');
      for (var i = 0; i < entries; i++) {
        inputs[i] = [];
        for (var j = 0; j < valoare1; j++) {
          inputs[i][j] = parseFloat(temp1[i][j]);
        }
      }
    } else {
      for (var i = 0; i < entries; i++) {
        inputs[i] = [];
        inputs[i][0] = parseFloat(temp1[i]);
      }
    }
    for (var i = 0; i < entries; i++){
      for (var j = 0; j < valoare1; j++) {
        inputs[i][j] = map(inputs[i][j], min_I, max_I, 0, 1);
      }
    }
  }
  if (datat) {
    var temp2 = splitTokens(datat, '\n');
    if (valoare3 > 1) {
      for (var i = 0; i < entries; i++)
      temp2[i] = splitTokens(temp2[i], ' ');
      for (var i = 0; i < entries; i++) {
        targets[i] = [];
        for (var j = 0; j < valoare3; j++) {
          targets[i][j] = parseFloat(temp2[i][j]);
        }
      }
    } else {
      for (var i = 0; i < entries; i++) {
        targets[i] = [];
        targets[i][0] = parseFloat(temp2[i]);
      }
    }
    for (var i = 0; i < entries; i++){
      for (var j = 0; j < valoare3; j++) {
        targets[i][j] = map(targets[i][j], min_T, max_T, 0, 1);
      }
    }
  }

  nn = new NeuralNetwork(parseInt(valoare1), parseInt(valoare2), parseInt(valoare3));
  nn.lr = nn_lr;

  testing = [];
  training = [];
  no_training = parseInt(training_p * entries);
  no_testing = entries - no_training;
  for (var i = 0; i < no_training; i++)
  training[i] = new set(inputs[i], targets[i]);

  for (var i = no_training; i < entries; i++)
  testing[i - no_training] = new set(inputs[i], targets[i]);

  step = 13;
  console.log("upload & ready");

  step13();
}

function step13() {
  for (var i = 0; i < no_loops; i++) {
    console.log(test_this_NN()*100);
    training = randomize(training);
    for (var j = 0; j < no_training; j++) {
      nn.evolve(training[j].inp, training[j].tar);
    }
    if (i > 0.2*no_loops && test_this_NN() < 0.2){
      i--;
    }
    else if (i > 0.4*no_loops && test_this_NN() < 0.4){
      i--;
      nn.lr=nn_lr*0.95;
    }
    else if (i > 0.6*no_loops && test_this_NN() < 0.6){
      i--;
      nn.lr=nn_lr*0.95*0.95;
    }
    else if (i > 0.8*no_loops && test_this_NN() < 0.8){
      i--;
      nn.lr=nn_lr*0.95*0.95*0.9;
    }
    else if (i == no_loops-1 && test_this_NN() < efficency){
      i--;
      nn.lr=nn_lr*0.95*0.95*0.9*0.9;
    }
    if (test_this_NN()>efficency){
      break;
    }
    if (nn.trainings/no_training > 5*no_loops){
      console.log("schimba");
      nn = new NeuralNetwork(parseInt(valoare1), parseInt(valoare2), parseInt(valoare3));
      nn.lr = nn_lr;
      contor_rep++;
      if (contor_rep == 5){
        console.log("Nu a mers");
        break;
      }
    }
  }
  console.log(test_this_NN()*100);

  step = 14;
  step14();
}

function step14(){
  console.log("Heyo! Treb sa salvez.");
    createButton('Descarca Reteaua Neuronala')
    .position(10, 200)
    .mousePressed(function() {
      var nnData = [];
      nnData.push(nn.inputs+" "+nn.hidden+" "+nn.outputs);
      for (var i=0;i<nn.m1.r;i++){
        var lineStr = "";
        for (var j=0;j<nn.m1.c;j++){
          lineStr+=(nn.m1.data[i][j]+" ")
        }
        nnData.push(lineStr);
      }
      for (var i=0;i<nn.m2.r;i++){
        var lineStr = "";
        for (var j=0;j<nn.m2.c;j++){
          lineStr+=(nn.m2.data[i][j]+" ")
        }
        nnData.push(lineStr);
      }
      for (var i=0;i<nn.bh.r;i++){
        var lineStr = "";
        for (var j=0;j<nn.bh.c;j++){
          lineStr+=(nn.bh.data[i][j]+" ")
        }
        nnData.push(lineStr);
      }
      for (var i=0;i<nn.bo.r;i++){
        var lineStr = "";
        for (var j=0;j<nn.bo.c;j++){
          lineStr+=(nn.bo.data[i][j]+" ")
        }
        nnData.push(lineStr);
      }
      saveStrings(nnData,nameNN + '.nn','txt');
    });
  }

function test_this_NN() {
  var score = 0;
  var loss = 0;
  for (var i = 0; i < no_testing; i++) {
      var dist = 0;
    for (var j = 0; j < testing[i].tar.length; j++) {
      dist += abs(map(nn.estimate(testing[i].inp)[j],0,1,min_T,max_T) - map(testing[i].tar[j],0,1,min_T,max_T));
   }
   if (dist < error_margin*testing[i].tar.length)
    score++;
  }
  score = score / no_testing;
  return score;
}

class set {
  constructor(i, t) {
    this.inp = i;
    this.tar = t;
  }
}
