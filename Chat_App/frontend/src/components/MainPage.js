import React, { Component, useEffect, useState } from 'react'
import {TextField, Button, Grid, Typography} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateRoom from './CreateRoom';
import RoomInfo from './RoomInfo'

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      marginLeft:"10px"
    }
  })(Typography);

class MainPage extends Component{

    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            userName: null,
            showCreateRoom: false,
            showRoomInfo:false,
            userData:{},
            rooms: [],
            selectedRoom : {},
            text:"",
            messages: {},
            selectedMessages:[]
        }
        this.toggleShowCreateRoom = this.toggleShowCreateRoom.bind(this)
        this.logout = this.logout.bind(this)
        this.changeSelectedRoom = this.changeSelectedRoom.bind(this)
        this.getUser = this.getUser.bind(this)
        this.render = this.render.bind(this)
        this.updateMessages = this.updateMessages.bind(this)
        this.authenticateUser()

        

    }
    componentDidMount(){
        this.interval = setInterval(this.updateMessages, 1000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    updateMessages(){
        fetch('/api/update-messages?room_code='+this.state.selectedRoom.code)
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({selectedMessages:data.messages})
            })
    }
    getUser(){
        console.log("jdfd")
        console.log(this.state)
        fetch('/api/get-curr-user?user_name='+this.state.userName)
            .then((response)=>response.json())
            .then((data)=>{
                this.setState({
                    userData: data.userData,
                    rooms: data.rooms,
                    messages: data.messages
                })
                console.log(this.state.messages)
                })
    }
    authenticateUser(){
        fetch('/api/authenticate-user?user_name='+this.props.match.params.userName)
            .then((response)=>{
                if(response.ok){
                    this.setState({
                        userName:this.props.match.params.userName
                    })
                    console.log(this.state.userName)
                    this.getUser()
                }
                else{
                    this.props.history.push('/')
                }
            })
            
    }
    sendMessage(){
        if(this.state.text!="" && Object.keys(this.state.selectedRoom).length>0){
            const requestOptions = {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(
                    {
                        user_name: this.state.userName,
                        message: this.state.text,
                        code: this.state.selectedRoom.code
                    }
                )
            }
            fetch('/api/send-message', requestOptions)
            this.setState({text:""})
        }
    }
    toggleShowCreateRoom(){
        this.setState((oldState)=>{
            return {
                ...oldState,
                showCreateRoom:!oldState.showCreateRoom
            }
            
        })
    }
    toggleShowRoomInfo(){
        this.setState((oldState)=>{
            return {
                ...oldState,
                showRoomInfo:!oldState.showRoomInfo
            }
            
        })
    }
    logout(){
        console.log("logout")
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json" }
        }
        fetch('/api/logout-user', requestOptions)
            .then((response)=>{
                if(response.ok){
                    this.props.logoutCallBack()
                    this.props.history.push("/")
                }
            })
    }
    changeSelectedRoom(id){
        for(let room of this.state.rooms){
            if(room.id === id){
                this.setState({
                    selectedRoom : room,
                    selectedMessages: this.state.messages[room.code]
                })
            }
        }
    }
    getTimeForMessages(s){
        var date = new Date(s)
        return `${date.getHours()}:${date.getMinutes()}`
    }
    getTimeForRooms(s){
        var date = new Date(s)
        return `${date.getHours()}:${date.getMinutes()}`
    }
    render(){
    return (
        
        <div>
            <ul>
                <li><WhiteTextTypography variant = "h4" component = "h4"> 
                        {this.state.userName}
                    </WhiteTextTypography></li>
                <li className="logout" style={{float:"right"}}><Button variant="contained" color = "inherit" onClick={this.logout}><AccountBoxIcon fontSize="large"/></Button></li>
            </ul>
        <div className="chat-container">
            <div className="search-container">
                <input type="text" placeholder="Search Group"/>
            </div>
            <div className="conversation-list">
                {  this.state.rooms.map((room)=>{
                    return (<div key={room.id} onClick={()=>this.changeSelectedRoom(room.id)} className={room.id===this.state.selectedRoom.id?"conversation active":"conversation"}>
                                <div className="title-text">
                                    {room.name}
                                </div>
                                <div className="created-date">
                                    {this.getTimeForRooms(room.created_at)}
                                </div>
                                {/* <div className="conversation-message">
                                    msg
                                </div> */}
                            </div>)
                })}
            </div>
            <div className="new-message-container">
            </div>
            {
                    this.state.showCreateRoom?(<>
                        <div className="chat-title">
                            Create Room
                        </div>
                        <div className="chat-message-list">
                            {<CreateRoom userName = {this.state.userName} cancelCreateRoomCallBack = {()=>{
                                this.getUser();
                                this.toggleShowCreateRoom()}}/>}
                        </div>
                        {/* <div className="chat-form">
                        </div> */}
                    </>):
                    this.state.showRoomInfo?<RoomInfo room = {this.state.selectedRoom} cancelShowRoomInfo = {()=>this.setState({showRoomInfo:false})}/>:
                    (<>
                        <div className="chat-title">
                        <div>
                        {Object.keys(this.state.selectedRoom).length>0?(<>
                                                                        {this.state.selectedRoom.name}
                                                                        <Button onClick={()=>this.toggleShowRoomInfo()}><SettingsIcon fontSize="large"/></Button></>):
                                                                        "Start A Conversation"}
                    </div>
                        <Button variant="contained" color = "secondary" onClick={()=>this.toggleShowCreateRoom()}>Create Room</Button>
                        </div>
                        <div className="chat-message-list">
                            {
                            (this.state.selectedMessages).length > 0?(
                            this.state.selectedMessages.map((m)=>{
                                return (<>
                                    <div className ={this.state.userName === m.userName?"message-row you-message":"message-row other-message"}>
                                    <div className="message-sender">{m.userName}</div>
                                    <div className="message-text">{m.text}</div>
                                    <div className="message-time">{this.getTimeForMessages(m.sent_date)}</div>
                            </div>
                                </>)
                            })
                            ):
                            (<>
                                Welcome to Chat App  
                            </>)
                            
                        }
                            
                        </div>
                        <div className="chat-form">
                            <Grid container direction="row" spacing={3} justify="flex-start" alignItems="flex-end" alignContent="flex-end">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Send a chat..."
                                        value = {this.state.text}
                                        onChange = {(e)=>this.setState({text:e.target.value})}  
                                        fullWidth={true}                  
                                    />
                                </Grid>
                                <Grid item xs ={6} sm={3}>
                                    <Button variant="contained" color = "primary" onClick = {this.sendMessage.bind(this)}>Send</Button> 
                                </Grid>
                            </Grid>
                        </div>
                            </>)
            }
            
            
        </div>
        </div>
    )
        }
}

export default MainPage
