import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {Tabs, Tab} from 'material-ui/Tabs';
import PublicDocs from './PublicDocs';
import NewDocument from './NewDocument';
import ManageUsers from './ManageUsers';
import UserDocument from './UserDocument';
import Roles from '../Roles/Roles';
import {blue500, lightBlue900, purple50, grey50, teal500, brown500, brown600} from 'material-ui/styles/colors';
import { connect } from 'react-redux';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

 class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tile: {},
      value: 'a',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  onSelectTab(tile) {
    this.setState({
      tile
    })
    this.handleChange("c");
  }

  render() {
    const {isAdmin} = this.props;
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        tabItemContainerStyle={{width: '800px'}}
      >
        <Tab label="Home" id="home" value="a" style={{backgroundColor: grey50, color:'black'}}>
          <div className="spacer"></div>
          <div>

            <PublicDocs onSelectTab={this.onSelectTab} />

          </div>
        </Tab>
        <Tab label="My Documents" id="myDocument" value="b" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <h2 id="help" style={styles.headline}>My Documents</h2>
            <UserDocument />
          </div>
        </Tab>
        <Tab label="Create Documents" id="createDocument" value="c" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <NewDocument tile={this.state.tile}  />
          </div>
        </Tab>
        {isAdmin &&
        <Tab label="Manage Users" id="manageUsers" value="d" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <ManageUsers />
          </div>
        </Tab>}
        {isAdmin && <Tab label="Manage Roles" id="manageRoles" value="e" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <Roles />
          </div>
        </Tab>}
      </Tabs>
    );
  }
}
const storeToProps = (state, ownProps) => {
  let isAdmin;
  if (state.auth.user.userRoleId === 1){
    isAdmin = true;
  }
  return {
     isAdmin: isAdmin
  }
}
export default connect(storeToProps)(TabsExampleControlled)
