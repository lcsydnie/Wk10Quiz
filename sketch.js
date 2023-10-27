//set something new
let song;

function preload() {
// Fill in the url for your audio asset
song = loadSound("audio/sample-visualisation.mp3");
}

function setup() {
cnv = createCanvas(400, 400, WEBGL);
angleMode(DEGREES);
// Create a new FFT analysis object
fft = new p5.FFT(0.8, 128);
// Add the song (sample) into the FFT's input
song.connect(fft);
}

function draw() {
// Give the user a hint on how to interact with the sketch
if (getAudioContext().state !== 'running') {
  background(220);

  // Early exit of the draw loop
  return;
}

background(30);
rotateX(60);
noFill();
stroke(255);

// Request fresh data from the FFT analysis
let spectrum = fft.analyze();
//fill(0, 255, 0); // spectrum is green

colorMode(HSB);
//draw the spectrum using a log scale to show energy per octave
for (let i = 0; i < spectrum.length; i++) {
  var r = map(sin(i), -1, 1, 0, 255);
  var g = map(i, 0, spectrum.length, 0, 255);
  var b = map(cos(i), -1, 1, 255, 0);
}

for (let i = 0; i < 50; i++) {

  var r = map(sin(frameCount / 2), -1, 1, 100, 200);
  var g = map(i, 0, 50, 100 ,200);
  var b = map(cos(frameCount), -1, 1, 200, 100);

  stroke(r, g, b);

  rotate(frameCount / 10);

    beginShape();
    for (let j = 0; j < 360; j += 90) {
      let rad = i * 3;
      let x = rad * cos(j);
      let y = rad * sin(j);
      var z = sin(frameCount * 2 + i * 10) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }

colorMode(RGB);
}


// Toggle playback on or off with a mouse click
function mousePressed() {
if (song.isPlaying()) {
// .isPlaying() returns a boolean
song.stop();
background(255, 0, 0);
} else {
song.play();
background(0, 255, 0);
}
}