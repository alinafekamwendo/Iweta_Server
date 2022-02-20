import "./production.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import breedcategory from "../../image/breedtype.png";
import Next from "../../image/next.png";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

export default function Production(props) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfBreeds, setListOfBreeds] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
 
 
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);


  useEffect(() => { 
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
  });
    axios.get(`http://localhost:3001/api/breeds/byuserId/${id}`).then((response) => {
        setListOfBreeds(response.data);
    });
}, []);


console.log(id)
return <div className="production">
<div className="basicInfo">
  <div className="createBreedContainer">
<Link to="/createbreed">
<button className="createBreed"> Register Breed </button>
</Link>
</div>

    { " "}
     <h2 style={{color: "blue", padding: "20px"}}>This is livestock owned by {username}  </h2>

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
     </div>

<div className="productionWidgets">

{listOfBreeds.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.breedName?.toLowerCase().includes(searchTitle.toLowerCase())
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
                localStorage.setItem("breedId", JSON.stringify(value.id))
               }}
            >
              <div className="arrange">
              <img className="img" src={breedcategory} alt="breed" style={{height: "50px", width: "50px"}} />
             <div className="split">
             <h3 className="breedname">{value.breedName} </h3>
             <img className="imgg" src={Next} alt="breed" style={{height: "30px", width: "30px", marginTop: "10px"}} />
             </div>
              </div> </div>
           </div>
            
            
          </div>
        );
      })}

        </div>
    </div>

}
