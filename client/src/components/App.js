import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlashMessagesList from './flash/FlashMessagesList';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Navbar from './common/Navbar';

class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
         <Navbar />
          <FlashMessagesList />
          {this.props.children}
        </div>
      </MuiThemeProvider>

    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
