import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { errorToast, successToast } from "../../helper/toast";
import { useDispatch } from "react-redux";
import { createSubUser } from "../../store/slices/auth.slice";
export default function CreateSubUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const result = await dispatch(
      await createSubUser(
        data.get("userName"),
        data.get("email"),
        data.get("password")
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
    <div className=" w-5/12">
      <Box
        className=" flex h-[100%] align-middle justify-center"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className=" flex justify-start w-[100%]">
          <Typography component="h3" variant="h5">
            Create Sub User
          </Typography>
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="userName"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
          />

          {!loading ? (
            <Button
              type="submit"
              className="w-4/12"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          ) : (
            <Button
              className="w-4/12"
              type="submit"
              variant="contained"
              disabled
              sx={{ mt: 3, mb: 2 }}
            >
              loading
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
}
