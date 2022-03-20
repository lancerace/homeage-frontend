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
import DateTimePicker from '@mui/lab/DateTimePicker';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function getVaccineCenter() {
  return [
    { name: "None", id: 0},
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
}


const VaccineRegistration = (props) => {

  const [state, setState] = useState({ selectedCenter: 0, date: new Date(), vaccinationcenters: [], nric: "", name: "", userId: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const vc = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/vaccination-centers`);

      setState({ ...state,vaccinationcenters: vc.data.vaccinationCenters  });
    }

    fetchData();
  }, [])

  function handleSelect(event) {
    setState({...state, selectedCenter: event.target.value});
  }
  function handleDateChange(value) {
    setState({...state, date: value});
  }

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
                return <MenuItem key={v.vaccinationcenterId} value={v.vaccinationcenterId}>{v.name}</MenuItem>;
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
              onClick={async (e) => {
                e.preventDefault();
                const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/bookings`, {
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

export default VaccineRegistration;