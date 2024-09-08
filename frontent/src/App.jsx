import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import { useSelector } from "react-redux";
import LoadingScreen from "./common/LoadingScreen";
import { useDispatch } from "react-redux";
import { getLoginDetailThunk } from "./store/slices/auth.slice";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import { errorToast } from "./helper/toast";
import { getLocalStorage } from "./helper/localstorage";
import ResponsiveDrawer from "./common/ResponsiveDrawer";
import UserRegistration from "./pages/userRegistration/UserRegistration";
import InvalidPage from "./pages/invalid/InvalidPage";
const App = () => {
  const { authenticated, data, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = getLocalStorage("auth");
    if (data.jwt) {
      dispatch(getLoginDetailThunk());
    }
  }, []);

  useEffect(() => {
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

  // if (status == "loading") {
  //   return <LoadingScreen />;
  // }
  if (!authenticated) {
    return (
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<InvalidPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/registrationform/:id"
            element={<UserRegistration />}
          ></Route>
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <ResponsiveDrawer />
      </div>
    );
  }
};

export default App;
