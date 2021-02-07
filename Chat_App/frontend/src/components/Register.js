import React, { useState } from 'react'
import {TextField, Button, Grid, Typography} from "@material-ui/core"
import {Link, Redirect} from 'react-router-dom'
import CreateRoom from './CreateRoom'

function Register(props) {
    const [userName, setUserName] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [cPass, setCPass] = useState("")
    const [pass, setPass] = useState("")
    const [uNameErr, setUNameErr] = useState(null)
    const [samePassErr, setSamePassErr] = useState(null)

    function registerUser(){
        if(userName!= ""&&pass!=""&&fName!=""&&lName!=""){
            if(pass!=cPass){
                setSamePassErr("Passwords Donot Match")
                return
            }
            setSamePassErr(null)
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body : JSON.stringify({
                    first_name : fName,
                    last_name : lName,
                    user_name: userName,
                    password:pass
                })
            }
            fetch('/api/register-user', requestOptions)
                .then((response)=>response.json())
                .then((data)=>{
                    if(data.hasOwnProperty("Error")){
                        setUNameErr("User name already exists")
                    }
                    else{
                        props.history.push("/"+data.user_name)
                    }
                })
        }
    }
    return (
        <div>
            <Grid spacing = {1} container className="center">
            <Grid item xs = {12} align="center">
                    <Typography variant = "h3" component = "h3"> 
                        Sign Up
                    </Typography>
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        //error = {this.state.error}
                        label = "First Name"
                        //value = {this.state.roomCode}
                        //helperText  = {this.state.error}
                        variant = "filled"
                        onChange = {(e)=>setFName(e.target.value)}  
                        size="medium"                  
                        />
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        //error = {this.state.error}
                        label = "Last Name"
                        //value = {this.state.roomCode}
                        //helperText  = {this.state.error}
                        variant = "filled"
                        onChange = {(e)=>setLName(e.target.value)}  
                        size="medium"                  
                        />
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        error = {uNameErr}
                        label = "Username"
                        //value = {this.state.roomCode}
                        helperText  = {uNameErr? uNameErr:"Create A Unique UserName"}
                        variant = "filled"
                        onChange = {(e)=>setUserName(e.target.value)}  
                        size="medium"                  
                        />
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        type="password"
                        error = {samePassErr}
                        label = "Password"
                        // placeholder = "Password"
                        //value = {this.state.roomCode}
                        variant = "filled"
                        onChange = {(e)=>setPass(e.target.value)}
                        size="medium" 
                    />
                    
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        type="password"
                        error = {samePassErr}
                        label = "Confirm Password"
                        //value = {this.state.roomCode}
                       helperText  = {samePassErr}
                        variant = "filled"
                        onChange = {(e)=>setCPass(e.target.value)}
                        size="medium" 
                    />
                    
            </Grid>
            <Grid item xs = {12} align="center">
                <Button variant="contained" color = "secondary" onClick={registerUser}>Register</Button>
                <Button variant="contained" color = "inherit" to="/" component={Link} style={{marginLeft:"10px"}}>Back</Button>

            </Grid>
        </Grid>
        </div>
    )
}

export default Register
