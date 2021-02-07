import React, { useEffect, useState } from 'react'
import {TextField, Button, Grid, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"


function CreateRoom(props) {
    const [roomName, setRoomName] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(()=>{
        setUserName(props.userName)
    })
    function createRoom(){
        const requestOptions = {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(
                {
                    name: roomName
                }
            )
        }
        fetch('/api/create-room', requestOptions)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                props.cancelCreateRoomCallBack()
            })
    }
    return (
            <Grid spacing = {2} 
                container 
                align="center"
                justify="center"
                direction="column"
            >
            <Grid item xs = {12}> 
                    <TextField
                        //error = {this.state.error}
                        // label = "Room Name"
                        placeholder="Room Name"
                        //value = {this.state.roomCode}
                        //helperText  = {this.state.error}
                        variant="outlined"
                        onChange = {(e)=>setRoomName(e.target.value)}  
                        size="medium"                  
                        />
            </Grid>
            <Grid item xs = {12} align="center">
                <Button variant="contained" color = "primary" onClick = {createRoom}>Add Room</Button>
                <Button variant="contained" color = "secondary" onClick = {()=>{props.cancelCreateRoomCallBack()}} style={{marginLeft:"10px"}}>Cancel</Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoom