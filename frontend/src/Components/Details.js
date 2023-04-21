import { Button, TextField, Typography, Box } from "@mui/material";

const Details = () => {
    const handleChange = (e) => {

    }
    const handleSubmit = (e) => {

    }
return(
    <div>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={400}
                    display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={5}
                    borderRadius={5}>
                    <Typography variant="h4" textAlign="center" color={"purple"}>Details</Typography>
                    
                    <TextField onChange={handleChange} name="mobno" margin="normal" placeholder="Enter whatsapp No." type={"tel"} pattern= " [0-9] {3}- [0-9] {3}- [0-9] {4}"   />
                    {/* <Button color="warning" variant="contained" type="submit"> Upload Excel File</Button> */}
                    <Button
  variant="contained"
  component="label"
  color="warning"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
                </Box>
            </form>
        </div>
)
}

export default Details;