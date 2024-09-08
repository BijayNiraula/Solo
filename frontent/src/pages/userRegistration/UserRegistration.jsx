import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import FaceScan from "./FaceScan";
import { signupThunk } from "../../store/slices/auth.slice";
import { successToast, errorToast } from "../../helper/toast";
import errorThrower from "../../../../backend/src/helper/errorThrower";
import formatMiliToYY_MM_DD from "../../helper/formatDate";

export default function UserRegistration() {
  const [photo, setPhoto] = useState();
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
    if (faceData.length == 1) {
      successToast("face scan successfull");
      formArea.current.style.display = "flex";
      setPhoto(dataURL);
      scanArea.current.style.display = "none";
    }

    if (faceData.length == 0) {
      errorToast("no faces detected");
    }

    if (faceData.length > 1) {
      errorToast("there are multiple facess");
    }
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const scanArea = useRef();
  const formArea = useRef();
  console.log(id);
  const [state, setState] = useState();
  const [loadingData, setLoadingData] = useState(true);

  const fetchdata = async () => {
    console.log("running");

    try {
      console.log("running");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/getRegistrationForm`,
        {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const d = await response.json();
      console.log(d);
      setState(d.data);
      setLoadingData(false);
    } catch (e) {
      console.log(e);
      alert("could not able to connect to server");
    }
  };

  function dataURLtoBlob(dataUrl) {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  useEffect(() => {
    fetchdata();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const formData = new FormData();
      const data = new FormData(event.currentTarget);
      formData.append("email", data.get("email"));
      formData.append("firstName", data.get("firstName"));
      formData.append("lastName", data.get("lastName"));
      formData.append("age", data.get("age"));
      formData.append("eventId", id);
      formData.append("face", dataURLtoBlob(photo), "photo.png"); // Convert Data URL to Blob and append

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/register`,
        {
          method: "POST",
          body: formData, // Use FormData directly
        }
      );
      const result = await response.json();

      setLoadingData(false);
      if (result.status == "success") {
        successToast(result.message);
      } else {
        errorToast(result.message);
      }
    } catch (e) {
      console.log(e);
      alert("could not able to connect to server");
    }

    setLoading(false);
  };

  const startScanning = () => {
    formArea.current.style.display = "none";
    scanArea.current.style.display = "flex";
    startVideo();
  };

  if (loadingData) {
    return <div>loading</div>;
  }

  return (
    <Container
      component="main"
      className=" flex h-[100vh] align-middle justify-center"
      maxWidth="xs"
    >
      <div ref={formArea}>
        <Box
          className=" flex h-[100%] align-middle justify-center"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div className=" border width-[100%]">
              <h5 className=" text-3xl">Event Details</h5>
              <div className=" mt-5 mb-5">
                {" "}
                <b> Event name </b> : {state.eventName}
                <br />
                <b> Event date </b> : {formatMiliToYY_MM_DD(state.eventDate)}
                <br />
                <b> Registration Open </b> :{" "}
                {formatMiliToYY_MM_DD(state.regStart)}
                <br />
                Registration regEnd : {formatMiliToYY_MM_DD(state.regEnd)}
                <br />
                Event date : {formatMiliToYY_MM_DD(state.eventDate)}
                <br />
                Description : {state.description}
              </div>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="firstName"
              type="firstName"
              id="firstName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="lastName"
              type="lastName"
              id="lastName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="age"
              label="age"
              type="number"
              id="age"
            />
            <div className="mt-4">
              <button className="" type="button" onClick={startScanning}>
                scan face
              </button>
            </div>

            {loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled
                sx={{ mt: 3, mb: 2 }}
              >
                loading
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            )}
          </Box>
        </Box>
      </div>
      <div ref={scanArea} style={{ display: "none" }}>
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
      </div>
    </Container>
  );
}
