const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

let myVideoStream; // created a variable outside so that to access it throughtout

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

navigator.mediaDevices // this promise is to capture video and audio from the device
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

socket.emit("join-room", ROOM_ID);
socket.on('user-connected', () => {
   connectToNewUSer();
})

const connectToNewUSer = () => {
   console.log("new user connected")
}



