import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import "./manage.css";
import {  Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '300px',
  color: theme.palette.text.secondary,
}));

export default function Manage() {
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });


  
  useEffect(() => {

    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    
  }, []);


  return (
    <div className="user">
       
      <div className="homeWidgets">
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
         


          
           <h3>{authState.username} </h3>



          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
      </Grid>
    </Box>
        </div>
    </div>
  );
}
