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

export const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        "& h1": {
          fontFamily: "Musicografi",
          color: "White",
          fontSize: 80,
        },
        "& h2": {
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

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <ButtonGroup  disableElevation variant="contained" color="primary">
            <Button style={{ backgroundColor: "#0d0e4a" }} to="/signin" component={Link}>
              Sign In
            </Button>
            <Button style={{ marginLeft: '1rem', backgroundColor: "#800515" }} to="/signup" component={Link}>
              Sign Up
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} align="center">
        <ThemeProvider theme={theme}>
          <Typography variant="h3" compact="h3">
            <h1>House Party</h1>
            <h2><Info /></h2>
          </Typography>
        </ThemeProvider>
        </Grid>

        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button style={{ backgroundColor: "#0d0e4a"  }} to="/join" component={Link}>
              Join a Room
            </Button>
            {/* <Button color="default" to="/info" component={Link}>
              Info
            </Button> */}
            <Button style={{ marginLeft: '1rem', backgroundColor: "#800515" }} to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
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
