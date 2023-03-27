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
            video_camera.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error: could not access web cam or mic",error);
        });    
    }

//function for dealing with chunks of encoded data
function handleChunk(chunk, metadata) {
    //code
}

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
    codec: "h264",
    width: 1280,
    height: 720,
    bitrate: 5_000_000,
    framerate: 30,
});


//EVENT LISTENERS 

//requests access to webcam and mic when webpage loads
window.addEventListener("load", startup, false);

//capturing video and encoding frames when user clicks start button 
startbutton.addEventListener('click', async function() {
    //const trackProcessor = new MediaStreamTrackProcessor(track); - might remove

    //processor for stream video tracks
    const trackProcessor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);

    //const reader = trackProcessor.readable.getReader();

    //start encoding
        // Start the encoding process
        const start = async () => {
            while (true) {
              // Wait for the next frame to be available
              const result = await trackProcessor.read();
              if (result.done) {
                break;
              }
              // Encode the frame using the VideoEncoder
              const encodedFrame = await encoder.encode(value, { keyFrame: true });

              //do stuff with encoded frame 
            }
          };
    start();
});

stopbutton.addEventListener("click", function() {
    if (encoder) {
        encoder.close();
      }
      if (processor) {
        processor.stop();
      }
});

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


//chatgpt

// Get permission to access the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    // Set the source of the video element to the camera stream
    video.srcObject = stream;

    // Create a new MediaStreamTrackProcessor with the video track
    const processor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);

    // Create a new VideoEncoder with the desired configuration
    const encoder = new VideoEncoder({
      output: (chunk) => {
        // Send the encoded chunk to the server or save it to disk
        console.log(`Encoded chunk size: ${chunk.byteLength}`);
      },
      error: (e) => {
        console.error(`VideoEncoder error: ${e.message}`);
      },
      codec: 'h264',
      width: 1280,
      height: 720,
      bitrate: 5000000,
      framerate: 30,
    });

    // Start the encoding process
    const start = async () => {
      while (true) {
        // Wait for the next frame to be available
        const { value, done } = await processor.read();

        if (done) {
          console.log('No more frames to encode');
          break;
        }

        // Encode the frame using the VideoEncoder
        const encodedFrame = await encoder.encode(value, { keyFrame: true });

        // Send the encoded frame to the server or save it to disk
        console.log(`Encoded frame size: ${encodedFrame.byteLength}`);
      }
    };

    start();
  })
  .catch((e) => {
    console.error(`getUserMedia error: ${e.message}`);
  });