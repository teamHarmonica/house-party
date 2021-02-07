import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const myTheme =  createMuiTheme({
    palette: {
        primary: {
          main: '#2402ba',
        },
        secondary: {
          main: '#6200EE',
        },
        error: {
          main: '#ffffff',
        },
    },
});

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <>
        <span><a href="/"><i class='fas fa-arrow-left' style={{ fontSize: "36px", position:"fixed" , left:"-130px", top:"250px", color:"#0d0e4a"}}></i></a></span>
        <div  style={{
            border: '2px solid #0d0e4a', padding:'70px', borderRadius:"7px"
            }}>
        
            <h1 style={{ color: "#0d0e4a", fontFamily: "Musicografi", fontSize:70, marginBottom:"50px" }}> Join Room</h1>
            <MuiThemeProvider theme = {myTheme}>
              <TextField
                style={{ marginBottom: "75px", width:"320px"}}
                error={this.state.error}
                label="Code"
                placeholder="Enter a Room Code"
                value={this.state.roomCode}
                helperText={this.state.error}
                variant="outlined"
                onChange={this.handleTextFieldChange}
              />
            </MuiThemeProvider>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                style={{ backgroundColor: "#800515", color:"white", fontWeight:"lighter", width:"80px" , marginTop:"-20px"}}
                onClick={this.roomButtonPressed}
              >
                Join
              </Button>
            </Grid>
        </div>
      </>
  );

  }

  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: "Room not found." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
