import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import React, { useEffect, useState }  from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
function getVaccineCenter() {
  return [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
}

function getBooking() {
  return {
    id: 1,
    name: "Tan Ah Kow",
    centerName: "Bukit Timah CC",
    centerId: 3,
    startTime: new Date("2021-12-01T09:00:00"),
  };
}
const EditVaccineRegistration = (props) => {
  const { bookingId } = useParams();
  const [state, setState] = useState({ selectedCenter: 0, date: "", vaccinationcenters: [], nric: "", name: "", userId: 0 });

  function handleSelect(event) {
    setState({ ...state, selectedCenter: event.target.value });
  }
  function handleDateChange(value) {
    setState({ ...state, date: value });
  }


  useEffect(() => {
    const fetchData = async () => {
      const vc = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/vaccination-centers`);

      const { data: { booking: { vaccinationcenterId, user, startTime } } } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/bookings/${bookingId}`);
      setState({ ...state, userId: user.userId, vaccinationcenters: vc.data.vaccinationCenters, selectedCenter: vaccinationcenterId, nric: user.nric, name: user.fullName, date: new Date(startTime)  });
    }

    fetchData();
  }, [])

    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5">
              Book a slot
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nric"
              label="NRIC Number"
              name="NRIC"
              autoComplete="nric"
              value={state.nric}
              onChange={(e) => {
                setState({ ...state, nric: e.target.value });
              }}
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              value={state.name}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
              sx={{mb: 2}}
              name="name"
              autoComplete="name"
            />
            <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
            <Select
              labelId="vaccineCenterLabel"
              label="Vaccine Center"
              required
              fullWidth
              id="vaccineCenter"
              value={state.selectedCenter}
              onChange={handleSelect}
              sx={{mb: 2}}
            >
              {state.vaccinationcenters.map((v) => {
                return (
                  <MenuItem key={v.vaccinationcenterId} value={v.vaccinationcenterId}>
                    {v.name}
                  </MenuItem>
                );
              })}
            </Select>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Slot"
              value={state.date}
              onChange={handleDateChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={async (e)=>{
                e.preventDefault();
                const {data} =await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/bookings/${bookingId}`,{
                  userId: state.userId,
                  fullName: state.name,
                  vaccinationcenterId: state.selectedCenter,
                  nric: state.nric,
                  slot: state.date
                })
                alert(data.message);
              }}
            >
              Register!
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    );

}

export default EditVaccineRegistration;
