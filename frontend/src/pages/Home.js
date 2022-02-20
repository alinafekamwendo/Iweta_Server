import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import cattlepig from '../image/livestock_banner.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {  Link } from "react-router-dom";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams, useNavigate } from "react-router-dom";
import RenderKholas from "./RenderKholas/RenderKholas";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '300px',
  color: theme.palette.text.secondary,
}));


function Home() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);


 
  return (
    <div className="home">
     
      <div className="homeWidgets">
          <div className="featured">
          <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item className={classes.root}>
             
             <h2 style={{color:"blue"}}> Livestock Information System</h2>
             <p>iWeta gives you all the infomation you need
                for sucessful cattle and pig production</p>
                
              {/* Button that allows the user of the system to fill the form to create a khola */}
              <Link to="/createKhola">
                <Button variant="contained" color="secondary" style={{marginTop: "140px"}}>
                    <p style={{color: "white"}}> Create Your Khola</p>
                </Button>
                </Link>
                
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <img src={cattlepig} alt="cattlepig pic" style={{ height: "100%", width: "100%"}} className=""/>
            </Item>
        </Grid>
      </Grid>
    </Box>

          </div>
      </div>
 {/* bar that is located in the homepage containing search functionality of the kholas */}
      
  <div className="createBreedContainer">

    <div className="searchKholabar">
<div>
  
  <TextField style={{margin: "5px"}}
                
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Khola)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
              </div>
              <div style={{display: "flex"}}> 
    <h4>Show:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div style={{display: "flex"}}> 
        <h4>SortBy:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div style={{display: "flex"}}> 
        <h4>Filter:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>
      </div>
      <RenderKholas/>
    </div>
    </div>
  );
}

export default Home;