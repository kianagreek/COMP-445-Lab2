//VARIABLE DECLARATIONS 
const serverURL = 'team5@labs445-2.encs.concordia.ca';
// webcam
let video = document.getElementById('video_camera'); 
// buttons
let startbutton = document.getElementById('start_recording');
// let stopbutton = document.getElementById('stop_button');

// media recorder
let mediaRecorder;

//defining variables to store the recorded video and its data
let recorder;
let recordedChunks = [];

startbutton.onClick = () => {
    switch(startbutton.textContent) {
        case 'Record':
            // changing the text being shown
            startbutton.textContent = 'Stop';
            startRecording();
            break;
        case 'Stop':
            // changing the text being shown
            startbutton.textContent = 'Record';
            stopRecording();
            break;
    }
}

//FUNCTIONS 

async function init() {

    try {
        // promt user for permission, this return a promise
        const stream = await navigator.mediaDevices.getUserMedia({
        // looking for input device that has audio and video
        audio:true,
        video: true

    });
    startWebCamera(stream);
    } catch (error) {
        console.error("Error: could not access web cam or mic", error);
        console.log(error)
    }
}

function startWebCamera(stream) {
    video.srcObject = stream;
    // allows us to access it throught the program
    window.stream = stream;
}

function startRecording() {
    // replace recorded video with webcamera output
    if (video.srcObject === null) {
        video.srcObject = window.stream;
    }
    mediaRecorder = new MediaRecorder(window.stream, {mimeType: 'video/webm;codecs=vp9,opus'});
    // can change teh chunks here
    mediaRecorder.start();
    // when the media recorder stops recording
    mediaRecorder.ondataavailable = recordVideo;
}

function recordVideo(event) {
    // blob that contains raw data
    if (event.data && event.data.size > 0) {
        // remove webcamera output
        video.srcObject = null;
        // turns blob to be added to src
        let videoUrl = URL.createObjectURL(event.data);
        video.src = videoUrl;
    }

}

function stopRecording() {
    mediaRecorder.stop();
}

init();

//using Media Stream API 
//requesting permission to use camera and mic; loalMediaStream is webcam
// function startup() {
//     navigator.mediaDevices.getUserMedia({video: { minWidth: 1280, minHeight: 720}, audio: false}) //false for dev, set back to true for assignment
//         .then(function(stream) {
//             video_camera.srcObject = stream;
//             processor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);

//         })
//         .catch(function(error) {
//             console.error("Error: could not access web cam or mic",error);
//         });    
// }

//function for dealing with chunks of encoded data
// function handleChunk(chunk, metadata) {
//     //code
// }

// //set up encoder
// const encoder = new VideoEncoder({
//     //for dealing with encoded data
//     output: handleChunk, 
//     //for dealing with errors
//     error: (e) => {
//         console.log(e.message);
//         }
// ,});

// //parameters for encoder output
// encoder.configure({
//     codec: "h264",
//     width: 1280,
//     height: 720,
//     bitrate: 5_000_000,
//     framerate: 30,
// });


// //EVENT LISTENERS 

// //requests access to webcam and mic when webpage loads
// window.addEventListener("load", startup, false);

// //capturing video and encoding frames when user clicks start button 
// startbutton.addEventListener('click', async function() {
//     //const trackProcessor = new MediaStreamTrackProcessor(track); - might remove

//     //processor for stream video tracks
//     const trackProcessor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);

//     //const reader = trackProcessor.readable.getReader();

//     //start encoding
//         // Start the encoding process
//         const start = async () => {
//             while (true) {
//               // Wait for the next frame to be available
//               const result = await trackProcessor.read();
//               if (result.done) {
//                 break;
//               }
//               // Encode the frame using the VideoEncoder
//               const encodedFrame = await encoder.encode(value, { keyFrame: true });

//               //do stuff with encoded frame 
//             }
//           };
//     start();
// });

// stopbutton.addEventListener("click", function() {
//     if (encoder) {
//         encoder.close();
//       }
//       if (processor) {
//         processor.stop();
//       }
// });

// //when the recorder is stopped, the recorded video is uploaded to the server
// recorder.addEventListener('stop', function() {
//     //creating a Blob from the recorded chunks
//     const recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' });
    
//     //creating a FormData object to send the recorded video to the server
//     const formData = new FormData();
//     formData.append('video', recordedBlob, 'myvideo.mp4');
    
//     //sending the FormData to the server using a fetch request
//     fetch(serverURL, {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         //updating the UI to show that the video has been uploaded
//         startbutton.disabled = false;
//         startbutton.textContent = 'Start Recording';
//     })
//     .catch(error => console.error(error));
// });
