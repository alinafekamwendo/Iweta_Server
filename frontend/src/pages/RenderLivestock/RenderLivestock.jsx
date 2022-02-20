import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import "./renderLivestock.css";

function RenderLivestock() {
  const navigate = useNavigate();
  let {  id } = useParams();
  const [listOflivestock, setListOfLivestock] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
 
  
  useEffect(() => { 
    
    axios.get(`http://localhost:3001/api/livestock/${id}`).then((response) => {
      setListOfLivestock(response.data);
      console.log(response.data)
    });
}, []);

return(
    <div>


<TextField onChange={(e) => setSearchTitle(e.target.value)}
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder="(Search)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />

      
    {listOflivestock.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.userBreedName?.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }).map((value, key) => {
  return (
       <div key={key} className="postbreed">
            <div className="title" >
            
            <div className="breeedcategory"
              onClick={() => {
                navigate(`/livestock/${value.id}`);
               }}
            >
              <div className="arrange"> <div className="split">
               
             <h3 className="breedname">{value.userBreedName} </h3> </div>
              </div> </div>
           </div>
            
            
          </div>
        );
      })}
</div>
  );
}
export default RenderLivestock;
