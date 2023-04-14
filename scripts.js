// Log in info
// username: team5
// password: password5
// SSH: team5@labs445-2.encs.concordia.ca

//VARIABLE DECLARATIONS
const serverURL = "http://labs445-2.encs.concordia.ca/~team5/save_video.php";
let video = document.getElementById("video_camera");
let startbutton = document.getElementById("start_recording");
let stopbutton = document.getElementById("stop_recording");

//defining variables to store the recorded video and its data
let mediaRecorder;
// number of miliseconds to record each blob
let timeslice = 3000;

const username = "team5";
const password = "password5";

//FUNCTIONS
navigator.mediaDevices
  // setting the video dimensions for he webcame
  .getUserMedia({
    audio: true,
    video: {
      minWidth: 1280,
      minHeight: 720,
      frameRate: { ideal: 30 },
      // avc1 is the same as h.264 (are used interchangeably)
      mimeType: 'video/mp4; codecs="avc1.640028"',
      // 5 mpbs 
      bitrate: 5000000
    },
  })
  .then(function (stream) {
    video.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
  })
  .catch(function (err) {
    console.log("Error: " + err);
  });

// when the start recording button is pressed
startbutton.onclick = function () {
  // initilize the counter for console logs
  let count = 0;
  // disable the recoding button and enable the stop recording button
  startbutton.disabled = true;
  stopbutton.disabled = false;
  // begins recording media into one or more Blob objects
  mediaRecorder.start(timeslice);

  mediaRecorder.ondataavailable = (video_segment) => {
    // uplaod one blob at a time
    let blob = new Blob([video_segment.data], { type: "video/mp4" });
    let formData = new FormData();
    formData.append("video", blob, "video.mp4");

    // ---------using XMLHttpRequest -----------------
    // When sending files to apache2 server, make sure the directories have the correct permissions to read and write files
    // These had to be changed on the Concordia server to allow the video segments to save
    // POST to APACHE2 server
    const xhr = new XMLHttpRequest();
    // calling the .php file server side
    xhr.open("POST", serverURL, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // console log successfuly upload with counter
        console.log("Video saved successfully! " + count.toString());
      } else {
        console.log("Error saving video!");
      }
    };
    // uploadiing the blob
    xhr.send(formData);
    count++;
  };
};

stopbutton.onclick = function () {
  // disable the recoding button and enable the stop recording button
  startbutton.disabled = false;
  stopbutton.disabled = true;
  // stop recording video
  mediaRecorder.stop();
};
