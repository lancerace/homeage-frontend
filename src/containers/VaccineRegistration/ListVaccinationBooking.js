import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from 'react-router-dom';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import axios from 'axios';
function getBooking() {
  return [
    {
      id: 1,
      name: "Tan Ah Kow",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T09:00:00"),
    },
    {
      id: 2,
      name: "Jean Lee Ah Meow",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T10:00:00"),
    },
    {
      id: 3,
      name: "Lew Ah Boi",
      centerName: "Bukit Timah CC",
      centerId: 3,
      startTime: new Date("2021-12-01T11:00:00"),
    },
  ];
}

const VaccineRegistrationListing = (props) => {
  const [state, setState] = useState({ bookings: [] });


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/bookings`);
      console.log(data);
      setState({ ...state, bookings: data.bookings })
    }
    fetchData();
  }, [])

  return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{mt: 8}}>
            <Typography component="h1" variant="h5">
              Active Booking
            </Typography>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Center Name</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.bookings.map((row) => (
                    <TableRow
                      key={row.bookingId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.user.fullName}
                      </TableCell>
                      <TableCell align="left">{row.vaccinationcenter.name}</TableCell>
                      <TableCell align="left">
                        {Date(row.startTime.toString())}
                      </TableCell>
                      <TableCell align="left">
                        <Button component={Link} to={`bookings/${row.bookingId}`}>
                          <ModeEditIcon />
                        </Button>
                        <Button onClick={async () => {
                          const res = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/bookings/${row.bookingId}`);
                          if(res.data.success)
                            alert(res.data.message);
                        }}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    );
  }

  export default VaccineRegistrationListing;
