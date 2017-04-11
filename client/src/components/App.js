import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Navbar from './common/Navbar';

class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
         <Navbar />
          {this.props.children}
        </div>
      </MuiThemeProvider>

    );
  }
}


export default App;
