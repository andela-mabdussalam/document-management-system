import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title="Document Manager"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            >
            <div className="top-bar">
              <div className="top-bar-left">
                <IndexLink to="/">React App</IndexLink>
              </div>

              <div className="top-bar-right">
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
              </div>
          </div>
        </AppBar>
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
