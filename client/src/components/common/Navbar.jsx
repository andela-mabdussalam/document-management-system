import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import {blue500, lime900, teal500
} from 'material-ui/styles/colors';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }


  guestLinks({ isAuthenticated, user, isAdmin}) {
    if(isAuthenticated) {
      return(
        <div className="divWidth">
          Hi!,
          {user.userName}
          <a href="#" onClick={this.logout}>Logout</a>
        </div>
      );
    }

  return(
      <div>
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign up</Link>
      </div>

  );
}
   render(){
     const navLinks = this.guestLinks(this.props);
     return(
     <AppBar
       title="Document Manager"
       iconClassNameRight="muidocs-icon-navigation-expand-more"
       style={{backgroundColor: teal500}}
       >
       <div className="top-bar">
         <div className="top-bar-right">
          { navLinks }
         </div>
     </div>
   </AppBar>
   );
  }
}
Navbar.propTypes = {
  user: React.PropTypes.object,
  logout: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isAdmin: React.PropTypes.bool.isRequired,

}
export const mapStateToProps = (state) => {
  const{auth: {isAuthenticated, user}} = state;
  const isAdmin = isAuthenticated && user.userRoleId === 1;
  return {
  isAuthenticated, user, isAdmin
  }
}
export default connect(mapStateToProps, { logout })(Navbar);
