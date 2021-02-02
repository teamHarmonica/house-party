import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: [
//       'Musicografi',
//     ].join(','),
//   },});


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <ThemeProvider theme={theme}>
        <div className="center">
          <HomePage />
        </div>
      // </ThemeProvider>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
