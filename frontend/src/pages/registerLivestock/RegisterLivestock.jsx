import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";


function RegisterLivestock() {
  const[userId, setUserId] = useState();
  const [listOfLivestocks, setListOfLivestocks] = useState([]);
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    userBreedName: "",
    Dob: "",
    origin: "",
    region: "",
    active: "",
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
    userBreedName: Yup.string().required("You must input a Name!"),
    Dob: Yup.string().required(),
    origin: Yup.string().required(),
    region: Yup.string().required(),
    active: Yup.string().required()
  });

  const onSubmit = (data) => {
    console.log(data)
    axios
      .post("http://localhost:3001/api/livestock", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {

        navigate( `/livestock/${userId}`);
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
          <label>name: </label>
          <ErrorMessage name="userBreedName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="userBreedName"
            placeholder="(Ex. Title...)"
          />
           <label>Date of Birth </label>
          <ErrorMessage name="Dob" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Dob"
            placeholder="(Ex. Title...)"
          />
          <label>Origin: </label>
          <ErrorMessage name="origin" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="origin"
            placeholder="(Ex. Post...)"
          />
           <label>Region </label>
          <ErrorMessage name="region" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="region"
            placeholder="(Ex. Title...)"
          />
           <label>Active </label>
          <ErrorMessage name="active" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="active"
            placeholder="(Ex. Title...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterLivestock;