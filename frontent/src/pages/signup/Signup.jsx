import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../assets/Logo.jpg";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signupThunk } from "../../store/slices/auth.slice";
import { successToast, errorToast } from "../../helper/toast";
import errorThrower from "../../../../backend/src/helper/errorThrower";
export default function Signup() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const result = await dispatch(
      await signupThunk(
        data.get("email"),
        data.get("password"),
        data.get("firstName"),
        data.get("lastName")
      )
    );
    if (result.status == "success") {
      successToast(result.message);
    } else {
      errorToast(result.message);
    }
    setLoading(false);
  };

  return (
    <Container
      component="main"
      className=" flex h-[100vh] align-middle justify-center"
      maxWidth="xs"
    >
      <Box
        className=" flex h-[100%] align-middle justify-center"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="flex justify-start w-[100%]">
          <Link href="/login">
            <ArrowBack />
          </Link>
        </div>
        <div className="flex justify-center">
          <img
            width={100}
            height={100}
            style={{
              borderRadius: "100%",
            }}
            src={logo}
            alt=""
          />
        </div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="confirmPassword"
            id="confirmPassword"
          />

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
              Sign Up
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
