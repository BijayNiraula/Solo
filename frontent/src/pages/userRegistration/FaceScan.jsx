import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
const FaceScan = () => {
  const videoRef = useRef();
  const temp = useRef();
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
        s(dataURL);
      }
    }
  }

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const s = async (dataURL) => {
    let faceData = await faceapi
      .detectAllFaces(temp.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();
    console.log(faceData);
  };

  useEffect(() => {
    startVideo();
  });

  return (
    <div className="w-[100vw">
      <div className="mt-36 w-[100%] flex rounded  justify-center">
        <video
          ref={videoRef}
          className="w-[4/12] rounded-lg border"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
          autoPlay
          muted
        />
        <img
          src=""
          ref={temp}
          className=""
          style={{ display: "none" }}
          alt=""
        />
      </div>
      <div className=" w-[100%] justify-center border flex mt-7">
        <Button
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
          variant="contained"
          className=" px-10"
          onClick={takePicture}
        >
          Scan
        </Button>
      </div>
    </div>
  );
};

export default FaceScan;
