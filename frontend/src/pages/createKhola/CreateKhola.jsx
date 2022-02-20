import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './createKhola.css';


function CreateKhola() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    kholaName: "",
    locationName: "",
    animalType: "",
    animalNumber: "",
  };

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
}, [])


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
  const validationSchema = Yup.object().shape({
    KholaName: Yup.string().required("You must input a Khola Name!"),
    Location: Yup.string().required(),
    Animal: Yup.string().required(),
    Number: Yup.string().required()
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/khola/create", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Khola Name: </label>
          <ErrorMessage name="KholaName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="KholaName" 
          />
           <label>Location: </label>
          <ErrorMessage name="Location" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Location"
          />

          <label>Animal Type: </label>
          <ErrorMessage name="Animal" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Animal"
          />

        <label>Number of Animal: </label>
          <ErrorMessage name="Number" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Number"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateKhola;