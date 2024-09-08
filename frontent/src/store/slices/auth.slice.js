import { createSlice } from "@reduxjs/toolkit";
import fetchData from "../../helper/fetchData";
import { getLocalStorage, setLocalStorage } from "../../helper/localstorage.js";

export const signupThunk = (email, password, firstName, lastName) => {
  return async function signupAsyncThunk() {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/signup`,
      {
        method: "POST",
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data;
  };
};
export const loginThunk = (email, password, role) => {
  return async function loginAsyncThunk(dispatch) {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (data.status == "success") {
      setLocalStorage("auth", { jwt: data.data.jwt });
      dispatch(getLoginDetailThunk());
    }
    return data;
  };
};
export const logoutThunk = () => {
  return async function logoutAsyncThunk(dispatch) {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/logout`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (data.status == "success") {
      dispatch(logout());
    }
    return data;
  };
};

export const getLoginDetailThunk = () => {
  return async function getLoginDetailAsyncThunk(dispatch) {
    dispatch(setStatus("loading"));
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/getLoginDetail`,
      {
        method: "POST",
        body: JSON.stringify({ jwt: getLocalStorage("auth").jwt }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data);
    if (data.status == "success") {
      dispatch(setStatus("success"));
      dispatch(login(data.data));
    } else {
      dispatch(setStatus("error"));
    }
  };
};
export const createEvent = (
  description,
  eventName,
  eventDate,
  regStart,
  regEnd,
  eventLocation
) => {
  return async function createEventAsyncThunk(dispatch) {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/createEvent`,
      {
        method: "POST",
        body: JSON.stringify({
          description,
          eventName,
          eventDate,
          regStart,
          regEnd,
          eventLocation,
          jwt: getLocalStorage("auth").jwt,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  };
};

export const createSubUser = (userName, email, password) => {
  return async function createSubUserAsyncThunk(dispatch) {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/createSubUser`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          userName,
          jwt: getLocalStorage("auth").jwt,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  };
};

const initialState = {
  status: "loading",
  authenticated: false,
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.data = {};
    },
    increaseTotalBalance: (state, action) => {
      const totalBalance = Number(state?.data?.totalBalance);
      state.data.totalBalance = totalBalance + Number(action.payload);
    },
    decreaseTotalBalance: (state, action) => {
      const totalBalance = Number(state?.data?.totalBalance);
      state.data.totalBalance = totalBalance - Number(action.payload);
    },
    setCurrency: (state, action) => {
      setLocalStorage("settings", action.payload);
      state.settings.currency = action.payload.currency;
      state.settings.currencySign = action.payload.currencySign;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setStatus,
  increaseTotalBalance,
  decreaseTotalBalance,
  setCurrency,
} = authSlice.actions;

export default authSlice.reducer;
