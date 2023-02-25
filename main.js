scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload(){
    sound = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("modelo foi carregado");
}
function gotPoses(result){
    console.log(result);
    if(result.length > 0){
        scoreRightWrist =  result[0].pose.keypoints[10].score;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        rightWristX = result[0].pose.rightWrist.x-15;
        rightWristY = result[0].pose.rightWrist.y;
        leftWristX = result[0].pose.leftWrist.x-100;
        leftWristY = result[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video, 0, 0, 500, 500);
    fill("#ff0000")
    stroke("#ff0000")
    if(scoreRightWrist > 0.2){ // esse esta seperando em partes
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.querySelector("#velocidadeValor").innerHTML="0.5x";
            sound.rate(0.5); // rate ele altera a velocidade.
        }
        if(rightWristY > 100 && rightWristY <= 200){
            document.querySelector("#velocidadeValor").innerHTML="1x";
            sound.rate(1);
        }
        if(rightWristY > 200 && rightWristY <= 300){
            document.querySelector("#velocidadeValor").innerHTML="1.5x";
            sound.rate(1.5);
        }
        if(rightWristY > 300){
            document.querySelector("#velocidadeValor").innerHTML="2x";
            sound.rate(2);
        }
    }
    if(scoreLeftWrist > 0.2){ // esse não esta separando em partes
        circle(leftWristX, leftWristY, 20);
        volume = floor(leftWristY)/500;
        console.log(volume);
        document.querySelector("#volumeValor").innerHTML = floor(volume*10);
        sound.setVolume(volume); // coloca volume
    }
}
function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}