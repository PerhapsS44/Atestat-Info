var ImportedNN = [];
var Step3Inputs;

function step31() {
  UploadNN();
}

function draw_3() {
  if (step == 31) {
    if (uploaded && (frameCount == time1 + 24)) {
      step = 32;
      uploaded = false;
      step32();
    }
  }
}

function step32() {
  var temp = splitTokens(ImportedNN, '\n');
  for (var i = 0; i < temp.length; i++)
    temp[i] = splitTokens(temp[i], ' ');
  for (var i = 0; i < temp.length; i++) {
    for (var j = 0; j < temp[i].length; j++) {
      temp[i][j] = parseFloat(temp[i][j]);
    }
  }
  var m1 = [];
  var m2 = [];
  var bh = [];
  var bo = [];
  for (var i = 1; i <= temp[0][0]; i++) {
    m1.push(temp[i]);
  }
  for (var i = 1 + temp[0][0]; i <= temp[0][1] + temp[0][0]; i++) {
    m2.push(temp[i]);
  }
  bh.push(temp[temp.length - 2]);
  bo.push(temp[temp.length - 1]);
  nn = new NeuralNetwork(temp[0][0], temp[0][1], temp[0][2]);
  nn.m1.data = m1;
  nn.m2.data = m2;
  nn.bh.data = bh;
  nn.bo.data = bo;

  console.log(nn);

  if (config) {
    config = splitTokens(config, '\n');
    for (var i = 0; i < config.length; i++) {
      config[i] = splitTokens(config[i], ' ');
      switch (config[i][0]) {
        case "min_V:":
          {
            min_I = parseFloat(config[i][1]);
            break;
          }
        case "max_V:":
          {
            max_I = parseFloat(config[i][1]);
            break;
          }
        case "min_R:":
          {
            min_T = parseFloat(config[i][1]);
            break;
          }
        case "max_R:":
          {
            max_T = parseFloat(config[i][1]);
            break;
          }
      }
    }
  }
  var temp = splitTokens(Step3Inputs, '\n');
  for (var i = 0; i < temp.length; i++)
    temp[i] = splitTokens(temp[i], ' ');
  for (var i = 0; i < temp.length; i++) {
    for (var j = 0; j < temp[i].length; j++) {
      temp[i][j] = temp[i][j] = map(parseFloat(temp[i][j]), min_I, max_I, 0, 1);;
    }
  }
  Step3Inputs = temp;
  console.log(Step3Inputs);
  var noS3Inp = Step3Inputs.length;
  var Step3Outputs = [];
  for (var i = 0; i < noS3Inp; i++) {
    var TempOutputs = "";
    for (var j = 0; j < nn.outputs; j++) {
      TempOutputs += (map(nn.estimate(Step3Inputs[i])[j], 0, 1, min_T, max_T));
      TempOutputs += " ";
    }
    Step3Outputs.push(TempOutputs);
  }
  console.log(Step3Outputs);
  saveStrings(Step3Outputs, 'rezultate', 'txt');
}