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
text('tap here to play some sound!', 10, 20, width - 20);
// Early exit of the draw loop
return;
}
let centroidplot = 0.0;
let spectralCentroid = 0;

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
//let x = map(log(i), 0, log(spectrum.length), 0, width);
let h = map(spectrum[i], 0, 255, 0, height);
fill(i * (255/spectrum.length), 255, 255);
//let rectangle_width = (log(i + 1) - log(i)) * (width / log(spectrum.length));
rect(i * (width/spectrum.length), height, width/spectrum.length, -h)
}

for (let i = 0; i < 10; i++) {
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 8;
      let x = rad * cos(j);
      let y = rad * sin(j);
      var z = sin(frameCount + i * 10) * 50;

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