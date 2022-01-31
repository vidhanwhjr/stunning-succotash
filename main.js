status1 = "";
text_input_value = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    classifier = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById('status').innerHTML = "Status = detecting objects";
    text_input_value =  document.getElementById('input1').value;
}

function modelLoaded(){
    console.log('model loaded');
    status1 = true;
}

function draw(){
    image(video, 0, 0, 380, 350);

    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        classifier.detect(video, gotresults);

        for(i = 0; i < objects.length; i++){

            percentage = floor(objects[i].confidence *100);
            fill(r, g, b);
            text(objects[i].label + "" + percentage + "%", objects[i].x + 15, objects[i].y -15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(text_input_value == objects[i].label){
                video.stop();
                classifier.detect(gotresults);
                document.getElementById('status').innerHTML = "Object mentioned found";
                synth = window.speechSynthesis;
                speak_data = new SpeechSynthesisUtterance(text_input_value + "Found");
                synth.speak(speak_data);
            }
            else{
                document.getElementById('status').innerHTML = "Object mentioned not found";
            }
        }
    }
}

function gotresults(error, results){
   if(error){
       console.error(error);
   }
   else{
       console.log(results);
       objects = results;
   }
}