import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import SignUp from "./SignUp";
import LogIn from "./SignIn";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./Info";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LogOut from "./Log";



export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        "& h1": {
          fontFamily: "Musicografi",
          color: "white",
          fontSize: 100,
        },
        "& h5": {
          fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif",
          fontWeight:"lighter",
          color: "White",
        }
      }
    }
  }
});

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }


  checktt = ()=>{
    if (localStorage.getItem('token') == undefined){
      window.location.href = "/signin"
    }else{
      window.location.href = "/create"
    }
  }

log_out = () => {
  localStorage.removeItem('token');
  window.location.href = "/"
}

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="right">
          <ButtonGroup  disableElevation variant="contained" color="primary">
            <Button style={{fontWeight:"lighter" , backgroundColor: "#0d0e4a" , position:"fixed", right:"-300px", top:"-20px"}} id = "signin" to="/signin" component={Link} onClick={ ()=> this.disabled=true}>
              Sign In
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} align="center">
        <ThemeProvider theme={theme}>
          <Typography variant="h3" compact="h3">
            <h1>House Party</h1>
            <h2><Info /></h2>
          </Typography>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button style={{ backgroundColor: "#0d0e4a", width:"200px",height:"70px", marginTop:"-50px", fontSize:20,fontWeight:"lighter"  }} to="/join" component={Link}>
              Join Room
            </Button>
            <Button style={{ marginLeft: '1rem', backgroundColor: "#800515" , marginTop:"-50px", width:"200px",height:"70px", fontSize:20 ,fontWeight:"lighter" }} onClick={this.checktt}>
              Host Room
            </Button>
          </ButtonGroup>
        </ThemeProvider>

        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={LogIn} />
          <Route path="/home" component={LogOut} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
