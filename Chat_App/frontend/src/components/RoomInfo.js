import React, { useState } from 'react'
import { Typography, Grid, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

function RoomInfo(props) {
    const [newUserName, setNewUserName] = useState("")
    const [room, setRoom] = useState(props.room)
    const [showUserNotFoundErr,setShowUserNotFoundErr] = useState(null)

    function addUser(){
        if(newUserName!=""){
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type":"application/json" },
                body: JSON.stringify({
                    code : room.code,
                    user_name: newUserName
                })
            
            }
            fetch('/api/add-user-to-room', requestOptions)
                .then((response)=>{
                    return response.json()
                })
                .then((data)=>{
                    console.log(data)
                    if(data.hasOwnProperty('Error')){
                        setShowUserNotFoundErr(data.Error)
                    }
                    else{
                    console.log(data)
                    setShowUserNotFoundErr(null)
                    setRoom(data)
                    }
                })
        }
        setNewUserName("")
    }
    return (
        <div>
            <Grid spacing = {2} container alignContent="center" alignItems="center"> 
                <Grid item xs = {12} align="center">
                         {room.name}
                </Grid>
                <Grid item xs = {12} align="center">
                         {room.code}
                </Grid>
                <Grid item xs = {12} align="center">
                         Host : {room.host_user_name}
                </Grid>
                {
                room.user_set.map((user)=>{
                    return(
                <Grid item xs = {12} align="center">
                         {user}
                </Grid>
                    )
                })
                }
                <Grid item xs = {12} align="center">
                <TextField
                        error = {showUserNotFoundErr}
                        variant="outlined"
                        label = "Add Member"
                        value = {newUserName}
                        helperText  = {showUserNotFoundErr}
                        onChange = {(e)=>setNewUserName(e.target.value)}  
                        size="small"                  
                        />
                </Grid>
                <Grid item xs = {12} align="center">
                <Button variant="contained" color = "primary" onClick = {addUser}>Add</Button>
                <Button variant="contained"color="secondary" onClick={props.cancelShowRoomInfo}>Go Back</Button>
            </Grid>
            </Grid>
           
        </div>
    )
}

export default RoomInfo
