//VARIABLE DECLARATIONS
const serverURL = "team5@labs445-2.encs.concordia.ca";
let video = document.getElementById("video_camera");
let startbutton = document.getElementById("start_recording");
let stopbutton = document.getElementById("stop_recording");

//defining variables to store the recorded video and its data7
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
    formData.append("video", blob, "video.mp4");

    // where the POST happens
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_video.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Video saved successfully! " + count.toString());
      } else {
        console.log("Error saving video!");
      }
    };
    xhr.send(formData);
    count++;
    delete blob;
  };
};

stopbutton.onclick = function () {
  startbutton.disabled = false;
  stopbutton.disabled = true;
  mediaRecorder.stop();
};

// Log in info
// username: team5
// password: password5
// SSH: team5@labs445-2.encs.concordia.ca

