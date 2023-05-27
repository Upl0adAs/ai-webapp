leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

song1 = " ";
song2 = " ";

song1_status = "";
song2_status = "";

function preload()
{
  song = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        coreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX +"leftWristY = "+ leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightWristX +"rightWristY = "+ rightWristY)
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song2status= song2.isPlaying();
    song1status= song.isPlaying();
    if (leftWristScore>0.2){
        fill("red");
        stroke("red");
          circle(leftWristX, leftWristY, 25);
          if(song2status==false){
            song.stop();
           song2.play();
          }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}