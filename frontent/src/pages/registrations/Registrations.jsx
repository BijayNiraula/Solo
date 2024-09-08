import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import fetchData from "../../helper/fetchData";

import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import formatDate from "../../helper/formatDate";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getLocalStorage } from "../../helper/localstorage";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Registrations() {
  const eventData = useSelector((state) => state.auth.data.eventsData);
  const [eventDat, setEventDat] = useState();
  const fetchDatas = async (eventId) => {
    const data = await fetchData(
      `${import.meta.env.VITE_SERVER_URL}/user/getRegistrations`,
      {
        method: "POST",
        body: JSON.stringify({
          eventId,
          jwt: getLocalStorage("auth").jwt,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setEventDat(data.data);
  };

  React.useEffect(() => {
    fetchDatas(eventData[0].id);
  }, []);
  return (
    <div className="mt-4">
      <Typography component="h3" className="pb-5" variant="h5">
        Show All Registration
      </Typography>
      <div className="flex justify-between py-3">
        <IconButton aria-label="delete">
          <RefreshIcon className="  text-red-500" />
        </IconButton>

        <select
          id="dropdown"
          name="options"
          className="border border-black px-5"
          onChange={(e) => fetchData(e.target.value)}
        >
          {eventData.map((e, index) => (
            <option key={index} selected={index === 1} value={e.eventName}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">photo</StyledTableCell>

              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">firstName</StyledTableCell>
              <StyledTableCell align="right">lastName</StyledTableCell>
              <StyledTableCell align="right">age</StyledTableCell>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventDat?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <img height={100} width={100} src={row.facePath} alt="" />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>

                <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                <StyledTableCell align="right">{row.age}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>

                <StyledTableCell align="right">
                  <div>
                    <IconButton aria-label="delete">
                      <CreateIcon className=" text-red-500" />
                    </IconButton>
                    <IconButton className="me-5" aria-label="delete">
                      <DeleteIcon className=" text-green-500" />
                    </IconButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
