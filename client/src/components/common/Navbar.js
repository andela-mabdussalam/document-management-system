import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
class Navbar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render () {
  const { isAuthenticated } = this.props.auth;

  const userLinks = (
    <a href="#" onClick={this.logout.bind(this)}>Logout</a>
  );

  const guestLinks = (
      <div>
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign up</Link>
      </div>

  )
   return(
     <AppBar
       title="Document Manager"
       iconClassNameRight="muidocs-icon-navigation-expand-more"
       >
       <div className="top-bar">
         <div className="top-bar-left">
           <IndexLink to="/">React App</IndexLink>
         </div>

         <div className="top-bar-right">
          { isAuthenticated ? userLinks : guestLinks }
         </div>
     </div>
   </AppBar>
   );
  }
}
Navbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { logout })(Navbar);
