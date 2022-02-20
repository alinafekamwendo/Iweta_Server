import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Download from '../../image/download.png';
import { AuthContext } from "../../helpers/AuthContext";
import "./livestock.css";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RenderLivestock from "../RenderLivestock/RenderLivestock";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 1200,
  bgcolor: 'whitesmoke',
 // bgcolor: 'background.paper',
  border: '2px solid blue',
  p: 2,
  px: 4,
  pb: 3,
};

function Livestock() {
  const navigate = useNavigate();
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const[breedId, setBreedId] = useState();
  const [postBreed, setBreedObject] = useState({});
  const [livestocks, setLivestocksObject] = useState([]);
  const { authState } = useContext(AuthContext);
  // for the register livestock modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  //initialising the input fieldsx
    const initialValues = {
    userBreedName: "",
    Dob: "",
    origin: "",
    region: "",
    active: "",
    
  };

//persist state after refreshing the page
useEffect(()=> {
  const data = localStorage.getItem('maintain-active-modal-state');
  if(data) {
    setOpen(JSON.parse(data));
  }
  },[]);

useEffect(()=> {
  localStorage.setItem("maintain-active-modal-state", JSON.stringify(open));
});

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
   
}, [])

useEffect(()=>{
  setBreedId(localStorage.getItem("breedId"))
 
}, [])



  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);

  //for posting data to the database
  
  const validationSchema = Yup.object().shape({
    userBreedName: Yup.string().required("You must input a Name!"),
    Dob: Yup.string().required(),
    origin: Yup.string().required(),
    region: Yup.string().required(),
    active: Yup.string().required(),
  });

  const onSubmit = (data) => {
   console.log(data)
    axios
      .post(`http://localhost:3001/api/livestock/${breedId}/${userId}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
           console.log(response)
           handleClose()
       
      }).catch(err=>console.log(err));
  };
  //for getting data from the database
  useEffect(() => {
    axios.get(`http://localhost:3001/api/breeds/byId/${id}`).then((response) => {
      setBreedObject(response.data);
      console.log(setBreedObject);
    });

    axios.get(`http://localhost:3001/api/livestock/${id}`).then((response) => {
      setLivestocksObject(response.data);
    });
  }, []);

  return (
    <div className="livestock">
  <div className="createLivestockContainer">

<button className="createBreed" onClick={handleOpen}> Add {postBreed.breedName} </button>
<StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title" onClick={handleClose} className="close-modal"><CloseIcon style={{width: "50px", height: "50px"}}/></h2>
          <div className="createLivestock">
          <h2 id="unstyled-modal-title">Register Livestock</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>name: </label>
          <ErrorMessage name="userBreedName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="userBreedName"
            placeholder="(Tonde)"
          />
           <label>Date of Birth </label>
          <ErrorMessage name="Dob" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Dob"
            placeholder="(20-July-2019)"
          />
          <label>Origin: </label>
          <ErrorMessage name="origin" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="origin"
            placeholder="(Malawi)"
          />
           <label>Region </label>
          <ErrorMessage name="region" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="region"
            placeholder="(Northen)"
          />
           <label>Active </label>
          <ErrorMessage name="active" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="active"
            placeholder="(Yes/No)"
          />
          

          <button type="submit"> Create Livestock</button>
        </Form>
      </Formik>
    </div>
        </Box>
      </StyledModal>

</div>
    <div className="livestockWidgets">
      <div className="displayInline">
      <h3>{postBreed.BreedName} </h3>
    <img className="img" src={Download} alt="breed" style={{height: "45px", width: "45px"}}/>
    </div>
    
    <RenderLivestock/>
    </div>
    </div>
  );
}
export default Livestock;
