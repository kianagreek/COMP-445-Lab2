//VARIABLE DECLARATIONS 
const serverURL = 'team5@labs445-2.encs.concordia.ca';
let video = document.getElementById('video_camera'); 
let startbutton = document.getElementById('start_button');
let stopbutton = document.getElementById('stop_button');

//defining variables to store the recorded video and its data
let recorder;
let recordedChunks = [];

//FUNCTIONS 

//using Media Stream API 
//requesting permission to use camera and mic; loalMediaStream is webcam
function startup() {
    navigator.mediaDevices.getUserMedia({video: { minWidth: 1280, minHeight: 720}, audio: false}) //false for dev, set back to true for assignment
        .then(function(stream) {
            let track = stream.getTracks()[0];
            video_camera.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error: could not access web cam or mic",error);
        });    
    }

window.addEventListener("load", startup, false);

//set up encoder
const encoder = new VideoEncoder({
    //for dealing with encoded data
    output: handleChunk, 
    //for dealing with errors
    error: (e) => {
        console.log(e.message);
        }
,});

//parameters for encoder output
encoder.configure({
    codec: "avc1",
    width: 1280,
    height: 720,
    bitrate: 5_000_000,
    framerate: 30,
});


//EVENT LISTENERS 
//capturing video and encoding frames
startbutton.addEventListener('click', async function() {
    const trackProcessor = new MediaStreamTrackProcessor(track);
    const reader = trackProcessor.readable.getReader();
    while (true) {
        const result = await reader.read();
        if (result.done) break;
        const frameFromCamera = result.value;
    }
});

//function for dealing with chunks of encoded data
function handleChunk(chunk, metadata) {

}


//when the recorder is stopped, the recorded video is uploaded to the server
recorder.addEventListener('stop', function() {
    //creating a Blob from the recorded chunks
    const recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' });
    
    //creating a FormData object to send the recorded video to the server
    const formData = new FormData();
    formData.append('video', recordedBlob, 'myvideo.mp4');
    
    //sending the FormData to the server using a fetch request
    fetch(serverURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        //updating the UI to show that the video has been uploaded
        startbutton.disabled = false;
        startbutton.textContent = 'Start Recording';
    })
    .catch(error => console.error(error));
});