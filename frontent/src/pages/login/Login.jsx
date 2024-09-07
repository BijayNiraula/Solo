import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login, loginThunk } from "../../store/slices/auth.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { errorToast, successToast } from "../../helper/toast";
export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const result = await dispatch(
      await loginThunk(data.get("email"), data.get("password"))
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
        <Typography component="h1" variant="h5">
          Log in
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid container className="flex justify-end">
            <Grid item xs className="flex justify-end">
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
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
              Log In
            </Button>
          )}

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
