import React from "react";
import {AppBar, Button, Toolbar, Typography, Box} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store";
const Header = () => {
    const dispatch = useDispatch();
    
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    console.log(isLoggedIn);
    return <AppBar sx={{background:"purple"}}
    position="sticky">
        <Toolbar>
            <Typography variant="h4">
                Whatsapp Integration
            </Typography>
            
            <Box display={"flex"} marginLeft={85}>
                { !isLoggedIn && <>
                <Button LinkComponent={Link} to="/login" 
                variant="contained" 
                sx={{margin:1, borderRadius:3}} 
                color="warning">Login</Button>

                <Button LinkComponent={Link} to="/login" 
                variant="contained" 
                sx={{margin:1, borderRadius:10}} 
                color="warning">Sign-up</Button>
                </>
                }
                </Box>
           <Box display={"flex"} marginLeft={"auto"}>
               { isLoggedIn && <Button 
               onClick={()=> dispatch(loginActions.logout())}
               LinkComponent={Link} to="/login" 
               variant="contained"
                sx={{margin:1, borderRadius:10}}
                 color="warning">Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
};

export default Header;