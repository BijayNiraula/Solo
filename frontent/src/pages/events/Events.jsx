import { IconButton, Typography } from "@mui/material";

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

import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import formatDate from "../../helper/formatDate";
import RefreshIcon from "@mui/icons-material/Refresh";
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

export default function Events() {
  const data = useSelector((state) => state.auth.data.eventsData);
  console.log(data);
  return (
    <div className="mt-4">
      <Typography component="h3" className="pb-5" variant="h5">
        Show All Events
      </Typography>
      <div className="flex justify-between py-3">
        <IconButton aria-label="delete">
          <RefreshIcon className="  text-red-500" />
        </IconButton>

        <select
          id="dropdown"
          name="options"
          className="border border-black  px-5"
        >
          <option selected value="option1">
            All
          </option>
          <option value="option1">previous</option>
          <option value="option2">upcomming</option>
        </select>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">userId</StyledTableCell>
              <StyledTableCell align="right">eventName</StyledTableCell>
              <StyledTableCell align="right">eventDate</StyledTableCell>
              <StyledTableCell align="right">reg Start</StyledTableCell>
              <StyledTableCell align="right">reg End</StyledTableCell>
              <StyledTableCell align="right">reg link</StyledTableCell>
              <StyledTableCell align="right">eventLocation</StyledTableCell>
              <StyledTableCell align="right">description</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.userId}
                </StyledTableCell>
                <StyledTableCell align="right">{row.eventName}</StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.eventDate)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.regStart)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(row.regEnd)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {"http://localhost:5173/registrationform/" + row.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.eventLocation}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
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
