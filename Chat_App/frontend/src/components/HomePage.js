import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {TextField, Button, Grid, Typography} from "@material-ui/core"
import MainPage from './MainPage';
import Register from './Register';
function HomePage() {
    const [userCode, setUserCode] = useState(null)
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    useEffect(async()=>{
        async function checkUserExists(){
            await fetch('/api/check-user-session')
                .then((response)=>response.json())
                .then((data)=>{
                    setUserCode(data.user_name)
                })
        }
        checkUserExists()
    })
    function clearUser(){
        setUserCode(null);
        setUserName("");
        setPass("");
    }
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={()=>{
                    return(
                    !userCode ? (LoginScreen()):
                        (<Redirect to={`/${userCode}`}/>)
                    )
                }}/>
                <Route path="/register" component={Register}/>
                <Route path = "/:userName" render={
                    (props)=>{
                        return(
                        <MainPage {...props} 
                                logoutCallBack = {clearUser}
                        />)
                    }
                }/>
            </Switch>
        </Router>
        
    )
    function login(){
        if(userName!=""&&pass!=""){
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body : JSON.stringify({
                    user_name : userName,
                    password : pass
                })
                
            }
            fetch("/api/login-user", requestOptions)
                .then((response)=>response.json())
                .then((data)=>{setUserCode(data.user_name)})
        }
    }
    function LoginScreen(){
        
        return (
            <div>
            <Grid spacing = {3} container className="center">
            <Grid item xs = {12} align="center">
                    <Typography variant = "h1" component = "h1"> 
                        Chat App
                    </Typography>
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        //error = {this.state.error}
                        label = "Username"
                        //value = {this.state.roomCode}
                        //helperText  = {this.state.error}
                        variant = "filled"
                        onChange = {(e)=>setUserName(e.target.value)}  
                        size="medium"                  
                        />
            </Grid>
            <Grid item xs = {12} align="center"> 
                    <TextField
                        fullWidth={true}
                        type="password"
                        //error = {this.state.error}
                        label = "Password"
                        // placeholder = "Password"
                        //value = {this.state.roomCode}
                       // helperText  = {this.state.error}
                        variant = "filled"
                        onChange = {(e)=>setPass(e.target.value)}
                        size="medium" 
                    />
                    
            </Grid>
            <Grid item xs = {12} align="center">
                <Button variant="contained" color = "primary" onClick = {login}>Login</Button>
                <Button variant="contained" color = "secondary" to="/register" component={Link} style={{marginLeft:"10px"}}>Register</Button>
            </Grid>
        </Grid>
        </div>
        )
    }
}

export default HomePage
