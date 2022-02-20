import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import User from '../image/login.jpg';

function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email("Invalid email address format").min(11).max(150).required(),
    role: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

// onsubmit send the values and navigate to login page
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth/register", data).then(() => {
      console.log(data);
      navigate('/login')
    });
  };

  

  return (
    <div className="loginContainer">
        <h1>Register Account</h1>
        <img src={User} alt="login symbol" style={{ height: "70px", width: "70px"}} />
     <div className="loginContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form className="loginContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            
          />

          
         <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
         
          />
           <label>Role: </label>
          <ErrorMessage name="role" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="role"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
         
          />

          <label>Comfirm Password: </label>
          <ErrorMessage name="comfirmPassword" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="comfirmPassword"
           
          />

          <button type="submit"> Register</button>
          <Link to="/login"><p className="RegisterStatement" style={{color: 'orangered'}}>Already registered? go to login</p></Link>
       
        </Form>
      </Formik>
    </div>
   </div>
   
  );
}

export default Registration;