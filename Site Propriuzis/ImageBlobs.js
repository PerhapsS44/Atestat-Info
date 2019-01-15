var blobs = [];
var selectedBlobs = [];

var testes = 1;

class BLOB {

  constructor(a, b) {
    this.x = 0;
    this.y = 0;
    this.Col = 0.5;
    this.dots = [];
    this.dots.push([a, b])
  }

  middle() {
    for (d of this.dots) {
      this.x += d[0];
      this.y += d[1];
    }
    this.x = (this.x / this.dots.length);
    this.y = (this.y / this.dots.length);
  }

  changeCol() {
    img.loadPixels();
    for (d of this.dots) {
      // var index = d[0] + d[1] * img.width;
      // img.pixels[4 * index] = red(col);
      // img.pixels[4 * index + 1] = green(col);
      // img.pixels[4 * index + 2] = blue(col);
      stroke(col);
      point(d[0], d[1]);
      //console.log(d[0], d[1]);
    }
    img.updatePixels();
  }

}

function check(x, y) {

  for (b of blobs) {
    for (d of b.dots) {
      if (abs(x - d[0]) <= 5 && abs(y - d[1]) <= 5) {
        b.dots.push([x, y]);
        return;
      }
    }
  }
  blobs.push(new BLOB(x, y));
}
