song1= "";
song2= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
scoreRight = 0;

function preload() {
 song1 = loadSound("metal.mp3");
 song2 = loadSound("town-10169.mp3");
}

function setup() {
    canvas = createCanvas( 600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    
    posenet = ml5.poseNet(video , modaloaded)
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("cyan");
    stroke("green");
    if (scoreRight > 0.2 ) {
        circle(rightWristX, rightWristY, 20);
        song1.play(); }
       if(scoreLeft > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song2.play();
       }
}
function play() {
    song1.play();
    song2.play();
}    

function gotPoses(results) {
    if(results.length>0){
        console.log("results");
        scoreRight = results[0].pose.keypoints[10].score;
        scoreLeft = results[0].pose.keypoints[9].score;
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX" + leftWristX + "leftWirstY"+ leftWristY);
     
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y; 
      console.log("rightWristX"+ rightWristX + "rightWristY"+ rightWristY)
    }
}

function modaloaded() {
    console.log("Posenet is On");
}

function stop() {
    song1.stop();
    song2.stop();
}