import { Button, TextField, Typography, Box, Link } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import  {useDispatch } from "react-redux";
import { loginActions } from "../store/index.js";
import {useNavigate}  from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        match: ""
    });
    const [isSignUp, setIsSignup] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const sendRequest = async (type = "login") => {
        const res = await axios.post(`http://localhost:5000/whatsapp/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            match : inputs.match
        }).catch(err => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignUp) {
            sendRequest("signup")
            .then((data) => localStorage.setItem("userId",data.user._id))
            .then(() => dispatch
            (loginActions.login()))
            .then(() => navigate("/login"));
            //alert("Logged in successfully");
        } else {
            sendRequest()
            .then((data) => localStorage.setItem("userId",data.user._id))
            .then(() => dispatch(loginActions.login()))
            .then(() => navigate("/details"));
        }
    }   
    // const handleForgotpwd = () => {
    //     navigate("/forgetpwd");
    // }
    
    // const handleForgotpwd = async (req,res) => {
    //     navigate("/details")
    //     // const email = req.body;
    //     // res = await axios.post("http://localhost:5000/whatsapp/forgot_pwd", {
    //     //     email : inputs.email
        
    //   });
// alert("Reset Password link is shared on your regiatered mail id");
//       // Display a success message to the user
//     }
    return (
        <div>
            <form onSubmit={handleSubmit}
            >
                <Box maxWidth={400}
                    display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={5}
                    borderRadius={5}>
                    <Typography variant="h2" padding={3} textAlign="center">{isSignUp ? "Signup" : "Login"}</Typography>
                    {isSignUp && <TextField onChange={handleChange} name="name" margin="normal" placeholder="Name" value={inputs.name} />}
                    <TextField onChange={handleChange} name="email" margin="normal" placeholder="Email" type={"email"} value={inputs.email} />
                    <TextField onChange={handleChange} name="password" margin="normal" placeholder="Password" type={"password"} value={inputs.password} />
                    {isSignUp && <TextField onChange={handleChange} name="match" margin="normal" placeholder="Confirm Password" type={"password"} value={inputs.match}/>} 
                    <Button color="warning" variant="contained" type="submit"> Submit</Button>
                    <Button onClick={() => setIsSignup(!isSignUp)}>Change to {isSignUp ? "Login" : "Signup"}
                    </Button>
                    
                </Box>
            </form>
            <Link href="" 
                     onClick= {() => navigate("/forgetpwd")}
                    // LinkComponent={Link} to="/forgetpwd"
                    > forgot Password
</Link>
        </div>
    )
}


export default Login;