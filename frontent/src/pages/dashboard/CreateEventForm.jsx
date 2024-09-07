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
import { createEvent } from "../../store/slices/auth.slice";
export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const result = await dispatch(
      await createEvent(
        data.get("description"),
        data.get("eventName"),
        new Date(data.get("eventDate")).getTime(),
        new Date(data.get("regStart")).getTime(),
        new Date(data.get("regEnd")).getTime(),
        data.get("eventLocation")
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
            Create Event
          </Typography>
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="eventName"
            name="eventName"
            autoComplete="eventName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="eventLocation"
            label="eventLocation"
            type="eventLocation"
            id="eventLocation"
          />
          <p>regStart</p>
          <TextField
            margin="normal"
            required
            fullWidth
            name="regStart"
            type="date"
            id="eventLocation"
          />
          <p>reg end</p>

          <TextField
            margin="normal"
            required
            fullWidth
            name="regEnd"
            type="date"
            id="regEnd"
          />
          <p>event date</p>

          <TextField
            margin="normal"
            required
            fullWidth
            name="eventDate"
            type="date"
            id="eventDate"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="description"
            type="text" // type is usually "text" for text areas
            id="description"
            multiline // This turns the TextField into a text area
            rows={4} // You can adjust the number of rows
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
