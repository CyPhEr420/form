
import React, { useState, useEffect } from "react";
import { TextField, Container, Typography, Paper, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import Map from './components/map';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  title: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  wrapper: {
    display: 'flex',

  }

  ,
  fileInput: {
    width: '60%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop: 10,
    padding: 10,
    color: "white",
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black'
    }
  },

}));





export default function Home() {


  const [name, setName] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([])
  const [corrdinates, setCorrdinates] = useState([])

  const coordinates = (location) => {
    const pickup = location;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
      new URLSearchParams({
        access_token: "<apikey>",
        limit: 1
      })
    )
      .then(res => res.json())
      .then(data => {
        setCorrdinates(data.features[0].center);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    coordinates(country)
  }, [country])


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const countryName = data.map((name) => {
          return name.name.common
        })
        setCountryData(countryName)
      })

  }, []);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const onCreate = () => {
    fetch('http://localhost:3000/createCampaign', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        minAge: minAge,
        maxAge: maxAge,
        country: country,
        gender: gender,

      })
    })
  };

  const classes = useStyles();


  return (
    <div className="wrapper">

      <Paper >
        <form className={`${classes.root} ${classes.form}`}>
          <Typography className={classes.title} variant="h5" component="h3">
            Create a Campaign
          </Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth onChange={(e) => setName(e.target.value)} />
          <TextField name="minAge" variant="outlined" label="Min Age" fullWidth onChange={(e) => setMinAge(e.target.value)} />
          <TextField name="maxAge" variant="outlined" label="Max Age" fullWidth onChange={(e) => setMaxAge(e.target.value)} />

          <FormControl >
            <InputLabel id="gender-label" >Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="demo-simple-select"
              value={gender}
              label="Age"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Other</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            id="combo-box-demo"
            options={countryData}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Countries" onChange={setCountry(params.inputProps.value)} />}
          />
          <Button variant="contained" className={classes.buttonSubmit} onClick={(e) => {
            console.log(name, minAge, maxAge, gender, country)
          }}> Create</Button>

        </form>
      </Paper>


      <Map countrycorrds={corrdinates} />


    </div >

  )
}

