import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";



export default function RenderKholas(props) {
  const navigate = useNavigate();
  const [listOfKhola, setListOfKhola] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  


  useEffect(() => { 
  //   axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
  //     setUsername(response.data.username);

  // });
  var id = localStorage.getItem('id');
 
    axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
        console.log(response.data);
       setListOfKhola(response.data);
        
    });
}, []);
//(`http://localhost:3001/api/breeds/byuserId/${id}`)


//   useEffect(() => { 
//     var id = localStorage.getItem('id');
//     axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
//         setMakola(response.data);
//         console.log(response.data);
        
//     });
// }, []);

 return(
   <div>
     
     {listOfKhola.map((value, key) => {
  return (
       <div key={key} className="postbreed">
            <div className="title" >
            
            <div className="breeedcategory"
              onClick={() => {
                navigate(`/livestock/${value.id}`);
                localStorage.setItem("breedId", JSON.stringify(value.id))
               }}
            >
              <div className="arrange"><div className="split">
             <h3 className="breedname">{value.KholaName} </h3> </div>
              </div> </div>
           </div>
            
            
          </div>
        );
      })}


   </div>
 )
   

}
