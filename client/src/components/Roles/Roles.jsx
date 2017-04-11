import React from 'react';
import { getRoles, createRole } from '../../actions/Roles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const style = {
  height: 60,
  width: '100%',
  margin: 30,
  display: 'inline-block',
};

class Roles extends React.Component {
  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      roles: [],
      open:false,
      selectedUser: {},
      user: {},
      title: {}
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.create = this.create.bind(this);
  }

  componentWillMount() {
    this.props.getRoles()
    .then((response) => {
      this.setState({roles: this.props.roles});
    });
  }
  handleOpen(selectedUser) {
    this.setState({open: true, selectedUser});
  };

  handleClose() {
    this.setState({open: false});
  };
  create(role) {
    const {title} = this.state;
    this.props.createRole(title).then(()=>{});
    this.setState({open: false});
  }
  onChange(e) {
    const {title} = this.state;
    title[e.target.name] = e.target.value;
    this.setState(() => ({ title: title }));
  };
  componentDidMount() {
  }

  roleDialog() {

    const actions = [
    <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose}/>,
    <FlatButton label="Submit" primary={true} keyboardFocused={true}
      onTouchTap={this.create}
      />,
    ];
    return(
      <div>
      <Dialog title="Create a Role" actions={actions} modal={true}
      open={this.state.open}
      autoScrollBodyContent={true}
      >
      <div>
      <div className="field-line">
      <TextField floatingLabelText="ROLE"
      name="title"
      onChange={this.onChange}
      />
      </div>

      </div>
      </Dialog>
      </div>
    )
  }
  /**
  * Process the form.
  *
  * @param {object} event - the JavaScript event object
  */

  /**
  * Render the component.
  */
  render() {
    const {roles} = this.props;
    let username;
    return(
      <div className="addMargin">
      <RaisedButton onTouchTap={() => this.handleOpen()} style={{ marginLeft: '25px'}} fullWidth={true}><i className="material-icons">add</i> ADD NEW ROLES</RaisedButton>

      {roles.map((role, index) => (
        <Paper key={role.id} style={style} zDepth={5}>
        <div className="addW" style={{borderRight:'1px solid #b2beb5', marginTop: '5px'}}><p style={{'float': 'left'}}>{role.id}</p></div>
        <div className="addW" style={{borderRight:'1px solid #b2beb5', marginTop: '5px'}}><p style={{'float': 'left'}}>{role.title}</p></div>
        <div style={{marginTop:'15px'}}>
        <FlatButton onTouchTap={() => this.handleOpen(user)}><i className="material-icons">create</i></FlatButton>
        <FlatButton onTouchTap={() => this.deleteUser(user)}><i className="material-icons">delete</i></FlatButton>
        </div>
        </Paper>
      ))}
        { this.roleDialog() }

      </div>
    )
  }
}


const storeToProps = (state) => {
  return {
   roles: state.roles
  }
}



export default connect(storeToProps, { getRoles, createRole })(Roles);
