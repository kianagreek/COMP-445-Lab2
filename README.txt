Ryan Haniff - 27069421, Kiana Greek - 40135171

Log in info:
username: team5
password: password5
SSH: team5@labs445-2.encs.concordia.ca

We have client_side.html and its corresponding style sheet style.css for the
front end of our website. This webpage is where the webcam video element, 
start recording button and stop recording button are located.

The scripts.js folder is where we implement the functions to control the webcam and buttons. 
We implement a getUserMedia function which prompts the user for permission to use the
webcam. We then set the srcObject of the webcam to the getUserMedia stream.

For the start recording button, we have a function that gets triggered onclick. When the 
button is clicked it gets disabled so it cannot be clicked again and cause another 
recording to start. It also enables the stop recording button. We defined a mediaRecorder
that will start recording video segments set by our timeslice variable (3000ms). When 
there is video data available, the ondataavailable function is triggered. This function
creates a new Blob and stores the video segment. This blob gets saved into a FormData,
which provides a way to construct a set of key/value pairs representing form fields 
and their values, which can be sent using the XMLHttpRequest function. In the
XMLHttpRequest function we set a POST request and call save_video.php which is 
server side.

On the server side, there should be a save_video.php file. This is where the communication
between the client and server occurs. The main issue we had Same Origin Policy (SOP) which 
is enforced by broswers. It blocks web pages from making requests to a different domain than
the one the page originated from, unless the server explicitly allows it through CORS headers. 
To fix this, the php file needed the Access-Control-Allow-Origin headers. The formData is sent
across the network to the server, a integer variable is read to keep track of and stop the 
overlap of video segments. The video file is then stored in the server directory called
"video_segments". The integer is then incremented and saved for the next video segment that gets sent.

Once the user clicks the stop recording button, the onclick function is triggered. The last
video segment is recorded and sent to the server. The start button is then enabled again 
and the stop button is disabled. Finally, the mediaRecorder is stopped.

Notes to run: 
- Make sure you have a folder called "video_segments" otherwise the php file wont know where
  to save the video segments.
- Have a text file called "counter.txt" with a integer value inside. save_video.php uses that
  integer value to save the video segments in order.
