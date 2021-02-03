import React, { Component } from "react";
import { render } from "react-dom";
import {  Button, TextField } from "@material-ui/core";

class Login extends Component {
    state = {
        credentials: {username:'', password:''}
    }

    login = event =>{
       
        fetch('http://127.0.0.1:8000/auth/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(this.state.credentials)
        })
        .then(data =>data.json())
        .then(
            data => {
                this.props.userLogin(data.token)
                if (data.token){
                    window.location.href = '/home'
                }
            }
        ).catch(error => console.error("here",error))
    
    }


    
    inputChanged = event =>{
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials : cred});
    }


    render() {
        return (
            <>
                <span><a href="/"><i class='fas fa-arrow-left' style={{ fontSize: "36px", position:"fixed" , left:"-130px", top:"250px", color:"#0d0e4a"}}></i></a></span>
                <div  style={{
                    border: '2px solid #0d0e4a', padding:'70px', borderRadius:"7px"
                    }}>
                
                    <h1 style={{ color: "#0d0e4a", fontFamily: "Musicografi", fontSize:70, marginBottom:"50px" }}> Login</h1>               
                    <TextField
                        style={{ marginBottom: "15px", width:"350px"}}
                        name="username"
                        label="Username"
                        placeholder="Enter your username"
                        value={this.state.credentials.username}
                        variant="outlined"

                        onChange={this.inputChanged}
                    />             
                    <br/>
                    <TextField
                        style={{ marginBottom: "75px", width:"350px"}}
                        name="password"
                        label="Password"
                        placeholder="Enter your Password"
                        value={this.state.credentials.password}
                        variant="outlined"
                        type="password"
                        onChange={this.inputChanged}
                    />

                    <br/>
                    <Button style={{ fontWeight:"lighter" ,backgroundColor: "#800515" , color:"#ffffff", width:"80px"}} onClick={this.login}>Login</Button>
                    <span style={{ color: "#0d0e4a", marginLeft:"30px", fontSize:17, fontStyle:"italic" }} >Don't have an account! <a style={{ textDecoration: 'none'}} href="/signup" >Create now</a></span>
                </div>
            </>
        );
    }
}

export default Login;