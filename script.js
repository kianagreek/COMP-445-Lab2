// linking button and html elements by is:

const videoButton = document.getElementById("main__video-button");
const video = document.getElementById("main__video");

let mediaRecorder;

// when the button is clicked we start recording, if clicked again we stop recording
videoButton.onclick = () => {
  switch (videoButton.textContent) {
    // if recording call the stop case
    case "Record":
      videoButton.textContent = "Stop";
      startRecoring();
      break;
    // if stopped, start recording
    case "Stop":
      videoButton.textContent = "Record";
      stopRecording();
      break;
  }
};

// allow us to handle promises in a cleaner way
async function init() {
  try {
    // promt the user if we can access the webcame
    // await can only be used in async function
    const stream = await navigator.mediaDevices.getUserMedia({
      // checks for input device that has audio and video
      audio: true,
      video: true,
    });
    startWebCamera(stream);
  } catch (err) {
    console.log(err);
  }
}

function startWebCamera(stream) {
  video.srcObject = stream;
  // allow use to access the webcamera thorught the program
  window.stream = stream;
}

function startRecoring() {
  // replaces the recorded video with webcamera output
  if (video.srcObject == null) {
    video.srcObject = window.stream;
  }
  // mimetype used to identify the type of data
  // video./webm is file format for html video tag
  // vp9 is open soruce video codec
  // ops is the audio codec
  mediaRecorder = new MediaRecorder(window.stream, {
    mimeType: "video/webm;codecs=vp9,ops",
  });
  mediaRecorder.start();
  //when the media recorder stopes we call the recordVideo
  mediaRecorder.ondataavailable = recordVideo;
}

function recordVideo(event) {
  // blob contains raw data
  if (event.data && event.data.size > 0) {
    // swap camera output with the record video
    // remove webcamera out from the element:
    video.srcObject = null;
    // static method that creates DOM
    let videoUrl = URL.createObjectURL(event.data);
    video.src = videoUrl;
  }
}

function stopRecording() {
  mediaRecorder.stop();
}

init();
