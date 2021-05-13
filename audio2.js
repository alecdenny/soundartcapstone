//based on tutorials from https://p5js.org/reference/

let synth, soundLoop, soundLoop2;
let notePattern = [60, 62, 64, 67, 69, 72];
let notePattern2 = [72, 74, 59, 55, 53];
let slider, slider2;
let img;

function preload(){
  img = loadImage('calmingmusic2.png');
}

 function setup() {
   let cnv = createCanvas(windowWidth,windowHeight);
   cnv.mousePressed(canvasPressed);
   colorMode(RGB);
   background(255, 255, 255);
   image(img, (windowWidth/2)-(windowHeight/4), windowHeight/4, windowHeight/2, windowHeight/2);
   text('tap to start/stop', 10, 20);
   slider = createSlider(8, 12, 100);
   slider.position((windowWidth/2)-50, (windowHeight/2)+80);
   slider.style('width', '80px');

   slider2 = createSlider(3, 10, 100);
   slider2.position((windowWidth/2)-50, (windowHeight/2)+110);
   slider2.style('width', '80px');

   //the looper's callback is passed the timeFromNow
   //this value should be used as a reference point from
   //which to schedule sounds
   let intervalInSeconds = 0.2;
   soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
   soundLoop2 = new p5.SoundLoop(onSoundLoop2, intervalInSeconds);

   synth = new p5.PolySynth();
   synth.setADSR(0.001, 0.1, 0, 0.1);
   
   textSize(12);
   textAlign(CENTER);
   text('move sliders to change the speeds of each phrase\nDuration: unknown\nAlec Denny', (windowWidth/2), windowHeight - 40);
   strokeWeight(0);
   
   

}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  if (soundLoop.isPlaying) {
    soundLoop.stop();
    soundLoop2.stop();
  } else {
    // start the loop
    soundLoop.start();
    soundLoop2.start();
  }
}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth.play(note, 0.5, timeFromNow, 0.1);
  fill(120, freqToMidi(note)*3 + 40, freqToMidi(note) * 4,80);
  rect(0,0,windowWidth,windowHeight);
  soundLoop.interval = float(slider.value()/10);
}

function onSoundLoop2(timeFromNow) {
  let noteIndex = (soundLoop2.iterations - 1) % notePattern2.length;
  let note = midiToFreq(notePattern2[noteIndex]);
  synth.play(note, 0.5, timeFromNow, 0.1);
  fill(120, freqToMidi(note) * 4, freqToMidi(note) * 2,80);
  rect(0,0,windowWidth,windowHeight);
  soundLoop2.interval = float(slider2.value()/10);
}
