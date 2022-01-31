song="";
leftWristX =0;
rightWristX =0;
leftWristY =0;
rightWristY =0;

function preload() 
{
    song = loadSounds("music.mp3");
}

function setup() 
{
    canvas=createCanvas(500 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded); 
    poseNet.on('pose',gotPoses);
}

function draw() 
{
    image(video , 0 , 0 , 500 , 500);

    fill("red");
    stroke("blue");
    circle(leftWristX,leftWristY,20);
    InNumberleftwristY=Number(leftWristY);
    remove_decimal=floor(InNumberleftwristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume="+volume;
    song.setVolume(volume);
}

function play() 
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function modelLoaded()
{
    console.log("poseNet is loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        console.log("leftwristX =" + leftWristX + ", leftwristY =" + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("rightWristX =" + rightWristX + ", rightWristY =" + rightWristY);
    }
} 
