import React, { useState } from "react";
import { useRef, useEffect } from "react";
const VideoRec = () => {
  const [result, setResult] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const temp = useRef(null);
  const temp1 = useRef(null);
  const videoWidth = 640;
  const videoHeight = 480;
  useEffect(() => {
    // faceapi.nets.tinyFaceDetector.loadFromUri(

    // ),
    // faceapi.nets.faceLandmark68TinyNet.loadFromUri(
    //   "http://localhost:5173/model"
    // ),
    // faceapi.nets.faceRecognitionNet.loadFromUri(
    //   "http://localhost:5173/model"
    // ),

    startVideo();
    async function loadModel() {
      const MODEL_URL = "http://localhost:5173/model";
      Promise.all([
        // window.faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        window.faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        window.faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ])
        .then(() => s())
        .catch((error) => console.log("error when load model"));
    }
    loadModel();
  }, []);

  function takePicture() {
    console.log("runn");
    if (videoRef.current) {
      console.log("runn");
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        temp.current.src = dataURL;
        console.log(dataURL);
        s(dataURL);
      }
    }
  }

  async function s(refImg) {
    const sampleData = [
     
      {
        name: "bijay niraula",
        img: "http://localhost:5173/d.jpg",
      },
      {
        name: " Milan",
        img: "http://localhost:5173/t.jpg",
      },
    ];
    const matchers = [];
    for (let data of sampleData) {
      temp.current.src = data.img;
      let refFaceData = await faceapi
        .detectAllFaces(temp.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      refFaceData = faceapi.resizeResults(refFaceData, temp.current);

      let faceMatcher = new faceapi.FaceMatcher(refFaceData);
      matchers.push(faceMatcher);
    }
    canvasRef.current.style.left = videoRef.current.offsetLeft;
    canvasRef.current.style.top = videoRef.current.offsetTop;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current.width = videoRef.current.videoWidth;
    //we grab the reference image, and hand it to detectAllFaces method
    setInterval(async () => {
      // const canvas = document.createElement("canvas");
      // canvas.width = videoRef.current.videoWidth;
      // canvas.height = videoRef.current.videoHeight;
      // const context = canvas.getContext("2d");
      // if (context) {
      //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      //   const dataURL = canvas.toDataURL("image/png");
      //   temp.current.src = dataURL;

      let faceData = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const o = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceData = faceapi.resizeResults(faceData, o);
      faceapi.draw.drawDetections(canvasRef.current, faceData);
      faceData.forEach((face) => {
        const { detection, descriptor } = face;
        //make a label, using the default
        var index = 0;
        for (var faceMatcher of matchers) {
          let label = faceMatcher.findBestMatch(descriptor).toString();
          console.log(label);
          var options = {
            label: sampleData[index].name,
          };
          if (label.includes("unknown")) {
            options = {
              label: "unknowns",
            };
          }
          console.log(options);

          const drawBox = new faceapi.draw.DrawBox(detection.box, options);
          drawBox.draw(canvasRef.current);
          index++;
        }
      });
    }, 1000);
  }

  console.log(result);
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  return (
    <div className="App" style={{ position: "relative" }}>
      <h1>Live Webcam Face Detection</h1>
      <div style={{ position: "relative", width: "640px", height: "480px" }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          muted
          style={{ width: "100%", height: "100%" }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", top: "0", left: "0" }}
        />
      </div>
      <img src="" style={{ display: "none" }} ref={temp} alt="" />
    </div>
  );
};

export default VideoRec;
