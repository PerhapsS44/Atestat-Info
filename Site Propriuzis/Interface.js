var valoare1, valoare2, valoare3;
var k = 20;
var cont = 0;

var datai, datat;
var config;
var f;

function ChooseWhatToDo() {
  var t1c = createElement('h2', 'Alege ce vrei sa faci:');
  t1c.position(20, 15);

  var t2c = createElement('h4', 'Determina o ecuatie:');
  t2c.position(40, 45);

  var b1 = createButton('Next');
  b1.position(200, 65);
  b1.mousePressed(function() {
    step = 11;
    option = 1;
    t1c.hide();
    t2c.hide();
    t3c.hide();
    t4c.hide();
    b1.hide();
    b2.hide();
    b3.hide();
    step11();
  });

  var t3c = createElement('h4', 'Determina linia orizontului:');
  t3c.position(40, 85);

  var b2 = createButton('Next');
  b2.position(250, 105);
  b2.mousePressed(function() {
    step = 21;
    option = 2;
    t1c.hide();
    t2c.hide();
    t3c.hide();
    t4c.hide();
    b1.hide();
    b2.hide();
    b3.hide();
    step21();
  });

  var t4c = createElement('h4', 'Utilizeaza o ecuatie:');
  t4c.position(40, 125);

  var b3 = createButton('Next');
  b3.position(200, 145);
  b3.mousePressed(function() {
    step = 31;
    option = 3;
    t1c.hide();
    t2c.hide();
    t3c.hide();
    t4c.hide();
    b1.hide();
    b2.hide();
    b3.hide();
    step31();
  });
}

function TrainNN(n, readyInputs) {
  for (var i = 0; i < n; i++) {
    readyInputs = randomize(readyInputs);
    for (var r = 0; r < readyInputs.length; r++) {
      var arr1 = [readyInputs[r][0], readyInputs[r][1]];
      var arr2 = [readyInputs[r][2]];
      nn.evolve(arr1, arr2);
    }
  }
}

function test_NN(_inputs) {
  var succes_percent = 0;
  for (var i = 0; i < _inputs.length; i++) {
    var arr1 = [_inputs[i][0], _inputs[i][1]];
    if (nn.estimate(arr1)[0] > 0.5 && _inputs[i][2] == 1) {
      succes_percent++;
    } else if (nn.estimate(arr1)[0] < 0.5 && _inputs[i][2] == 0) {
      succes_percent++;
    }
  }
  succes_percent /= _inputs.length;
  return (succes_percent * 100);
}

function Input(a, b) {
  var i;
  i = createInput();
  i.position(a, b);
  i.size(20, 20);
  return i;
}

function UploadImage() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('Great success! All the File APIs are supported');
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  // <div id="drop_zone">Drop files here</div>
  // Make a div to drag a file on
  var dropZone = createDiv('Trage aici imaginea');
  dropZone.id('drop_zone');
  dropZone.style('padding', '24px');
  dropZone.style('border-style', 'dashed');
  dropZone.style('font-size', '24pt');
  // Add some events
  dropZone.elt.addEventListener('dragover', handleDragOver, false);
  dropZone.drop(gotFile);
  dropZone.elt.addEventListener('dragleave', handleDragLeave, false);

  // A list of files
  list = createElement('ol', '');

  // When you drag a file on top
  function handleDragOver(evt) {
    // Stop the default browser behavior
    evt.stopPropagation();
    evt.preventDefault();
    dropZone.style('background', '#AAAAAA');
  }

  // If the mosue leaves
  function handleDragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  function gotFile(file) {
    img = loadImage(file.data);
    console.log(file.data);
    time1 = frameCount;
    uploaded = true;
    dropZone.hide();
    image(img, 0, 0, width, height);
  }
}

function randomize(arr) {
  var a = arr;
  for (var i = a.length - 1; i >= 0; i--) {
    var j = floor(random(0, i));
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

function ShowImage() {
  image(img, 0, 0, width, height);
}

function UploadData() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('Great success! All the File APIs are supported');
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  // <div id="drop_zone">Drop files here</div>
  // Make a div to drag a file on
  var dropZone = createDiv('Trage aici documentele');
  dropZone.id('drop_zone');
  dropZone.style('padding', '24px');
  dropZone.style('border-style', 'dashed');
  dropZone.style('font-size', '24pt');
  // Add some events

  dropZone.elt.addEventListener('dragover', handleDragOver, false);
  dropZone.drop(gotFile);
  dropZone.elt.addEventListener('dragleave', handleDragLeave, false);

  // A list of files
  list = createElement('ol', '');

  // When you drag a file on top
  function handleDragOver(evt) {
    // Stop the default browser behavior
    evt.stopPropagation();
    evt.preventDefault();
    dropZone.style('background', '#AAAAAA');
  }

  // If the mosue leaves
  function handleDragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  // If you drop the file
  function gotFile(file) {
    if (file.name == "variabile.txt") {
      inputs = [];
      datai = file.data;
    }
    if (file.name == "rezultate.txt") {
      targets = [];
      datat = file.data;
    }
    if (file.name == "config.txt"){
      config = file.data;
    }
    //img = loadImage(f.name);
    time1 = frameCount;
    uploaded = true;
    // console.log(datai);
    // console.log(datat);
    dropZone.hide();

  }

}

function UploadNN() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log('Great success! All the File APIs are supported');
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  // <div id="drop_zone">Drop files here</div>
  // Make a div to drag a file on
  var dropZone = createDiv('Trage aici documentele');
  dropZone.id('drop_zone');
  dropZone.style('padding', '24px');
  dropZone.style('border-style', 'dashed');
  dropZone.style('font-size', '24pt');
  // Add some events

  dropZone.elt.addEventListener('dragover', handleDragOver, false);
  dropZone.drop(gotFile);
  dropZone.elt.addEventListener('dragleave', handleDragLeave, false);

  // A list of files
  list = createElement('ol', '');

  // When you drag a file on top
  function handleDragOver(evt) {
    // Stop the default browser behavior
    evt.stopPropagation();
    evt.preventDefault();
    dropZone.style('background', '#AAAAAA');
  }

  // If the mosue leaves
  function handleDragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  // If you drop the file
  function gotFile(file) {
    //console.log(file);
    var disposable = splitTokens(file.name, '.');
    if (disposable[disposable.length-2] == "nn") {
      ImportedNN = file.data;
    }
    if (file.name == "variabile.txt") {
      Step3Inputs = file.data;
    }
    if (file.name == "config.txt"){
      config = file.data;
    }
    time1 = frameCount;
    uploaded = true;
    dropZone.hide();

  }

}
