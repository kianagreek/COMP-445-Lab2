//VARIABLE DECLARATIONS
const serverURL = "team5@labs445-2.encs.concordia.ca";
let video = document.getElementById("video_camera");
let startbutton = document.getElementById("start_recording");
let stopbutton = document.getElementById("stop_recording");

//defining variables to store the recorded video and its data
let mediaRecorder;
let chunks = [];
let timeslice = 3000; // number of miliseconds to record each blob

//FUNCTIONS

navigator.mediaDevices
  .getUserMedia({ audio: true, video: { minWidth: 1280, minHeight: 720 } })
  .then(function (stream) {
    video.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
  })
  .catch(function (err) {
    console.log("Error: " + err);
  });

startbutton.onclick = function () {
  chunks = [];
  let count = 1;
  startbutton.disabled = true;
  stopbutton.disabled = false;
  mediaRecorder.start(timeslice); // begins recording media into one or more Blob objects
  mediaRecorder.ondataavailable = function (e) {
    // chunks.push(e.data);
    // maybe we can uplaod one blob at a time
    const blob = new Blob([e.data], { type: "video/mp4" });
    const formData = new FormData();
    formData.append("video" + count.toString(), blob);
    let server = "http://labs445-2.encs.concordia.ca/~team5/public_html/upload.php";
    // let server = "upload.php";
    fetch(server, {
      method: "POST",
      body: formData,
    });
    count++;
  };
}; 

stopbutton.onclick = function () {
  startbutton.disabled = false;
  stopbutton.disabled = true;

  // when we stop the recording we upload the blobs
  mediaRecorder.onstop = function () {
    // let blob = new Blob(chunks, { type: "video/mp4" });
    // let url = URL.createObjectURL(blob);
    // let a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = url;
    // a.download = "recorded.mp4"; // Set your desired file name here
    // a.click();
    // window.URL.revokeObjectURL(url);

    // const blob = new Blob(chunks, { type: "video/mp4" });
    // // using the Fetch API
    // const formData = new FormData();
    // formData.append("video", blob);
    // let server = "http://labs445-2.encs.concordia.ca/~team5/public_html/upload.php";
    // // let server = "upload.php";
    // fetch(server, {
    //   method: "POST",
    //   body: formData,
    // });

  };

  mediaRecorder.stop();
};

// Log in info
// username: team5
// password: password5
// SSH: team5@labs445-2.encs.concordia.ca

// ********************* uncoment here for old stuff *********************
/*


//using Media Stream API
//requesting permission to use camera and mic; loalMediaStream is webcam
function startup() {
  navigator.mediaDevices
    .getUserMedia({ video: { minWidth: 1280, minHeight: 720 }, audio: false }) //false for dev, set back to true for assignment
    .then(function (stream) {
      video_camera.srcObject = stream;
      processor = new MediaStreamTrackProcessor(stream.getVideoTracks()[0]);
    })
    .catch(function (error) {
      console.error("Error: could not access web cam or mic", error);
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
  },
});

//parameters for encoder output
// encoder.configure({
//     codec: "h264",
//     width: 1280,
//     height: 720,
//     bitrate: 5_000_000,
//     framerate: 30,
// });

//EVENT LISTENERS

//requests access to webcam and mic when webpage loads
window.addEventListener("load", startup, false);

//capturing video and encoding frames when user clicks start button
startbutton.addEventListener("click", async function () {
  //const trackProcessor = new MediaStreamTrackProcessor(track); - might remove

  //processor for stream video tracks
  const trackProcessor = new MediaStreamTrackProcessor(
    stream.getVideoTracks()[0]
  );

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

stopbutton.addEventListener("click", function () {
  if (encoder) {
    encoder.close();
  }
  if (processor) {
    processor.stop();
  }
});

//when the recorder is stopped, the recorded video is uploaded to the server
recorder.addEventListener("stop", function () {
  //creating a Blob from the recorded chunks
  const recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });

  //creating a FormData object to send the recorded video to the server
  const formData = new FormData();
  formData.append("video", recordedBlob, "myvideo.mp4");

  //sending the FormData to the server using a fetch request
  fetch(serverURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      //updating the UI to show that the video has been uploaded
      startbutton.disabled = false;
      startbutton.textContent = "Start Recording";
    })
    .catch((error) => console.error(error));
});

*/
// ********************* uncoment here for old stuff *********************
