import { Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Forgetpwd = () => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
setEmail(e.target.value);
    }
    
    const onSendToMail = async () => {
        if (!email) return alert('No Email Found !!!', { variant: 'error' })
        
        const body = { email }
        await axios.post("http://localhost:5000/whatsapp/forgetpwd", body)
            .then(res => {
                if (res.data.success) {
                    alert('Email Sent Successfully !!!', { variant: 'success' })
                } else {
                    alert(res.data.message, { variant: 'error' })
                }
                
            })
            .catch(err => {
                console.log(err);
                
            })
    }
    return (
        <div>
            <form>
        <Box maxWidth={400}
                    display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={5}
                    borderRadius={5}>
                    <Typography variant="h4" textAlign="center" color={"purple"}>Forgot Password</Typography>
                    
                    <TextField onChange={handleChange} name="email" margin="normal" placeholder="Enter Email" value={email}   />
                    {/* <Button color="warning" variant="contained" type="submit"> Upload Excel File</Button> */}
                    <Button
  variant="contained"
  component="label"
  color="warning"
  onClick={onSendToMail}
>
  Send Link
  
</Button>
                </Box>
            </form>
        </div>
    )
}

export default Forgetpwd;