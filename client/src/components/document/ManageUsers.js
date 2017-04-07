import React from 'react';
import { getAllUsers, editUser, deleteUser, createUser } from '../../actions/getUsers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Pagination from 'material-ui-pagination';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
const style = {
  height: 60,
  width: '100%',
  margin: 30,
  display: 'inline-block',
};

class ManageUsers extends React.Component {
  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      users: [],
      open: false,
      openCreateDialog: false,
      selectedUser: {},
      user: {},
      newUser: {},
      limit: 5,
      page: 1,
      offset: 0,
      total: 0,
      display: 7,
      number: 7

    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  componentWillMount() {
    this.getAll();
  }
  getAll() {
    this.props.getAllUsers(this.state.limit, this.state.offset)
      .then((response) => {
        const count = response.users.pop();
        this.setState({ users: this.props.users, total: count.count });
        let elements = this.state.users;
      }, (error) => {
        // console.log("Mariam Error", error.response.data.message)
      });
  }
  handleOpen(selectedUser) {
    this.setState({ open: true, selectedUser });

  };
  handleOpenCreate(selectedUser) {
    this.setState({ openCreateDialog: true });

  };

  handleClose() {
    this.setState({ open: false });
  };
  handleCreateClose() {
    this.setState({ openCreateDialog: false });
  };
  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * this.state.limit;
    this.setState({
      page: pageNumber,
      offset: offset
    });
    setTimeout(() => { this.getAll() }, 10);
  }
  updateUser() {
    const { selectedUser, newUser } = this.state;
    this.props.editUser(selectedUser.id, newUser)
      .then((response) => {
        this.setState((prev_state, props) => ({
          newUser: {}
        }));
      }, (error) => {
        // console.log("Mariam Error", error.response.data.message)
      });
    this.setState({ open: false });

  };
  createUser() {
    this.createDialog();
  }
  deleteUser(selectedUser) {
    console.log('selecteduser is', selectedUser.id);
    this.props.deleteUser(selectedUser);
  }

  onChange(e) {
    const newUser = this.state.newUser;
    newUser[e.target.name] = e.target.value;
    this.setState(() => ({ newUser: newUser }));
  };
  componentDidMount() {
  }
  createDialog() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCreateClose} />,
      <FlatButton label="Submit" primary={true} keyboardFocused={true}
      />,
    ];
    return (
      <div>
        <Dialog title="Create a User" actions={actions} modal={true}
          open={this.state.openCreateDialog}
          autoScrollBodyContent={true}
        >
          <div>
            <div className="field-line">
              <TextField floatingLabelText="Username"
                name="userName"
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="FirstName"
                name="firstName"
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Lastname"
                name="lastName"
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Email"
                name="email"
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Password"
                type="password"
                name="password"
                onChange={this.onChange}
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
  editDialog() {
    const { userName, firstName, lastName, email } = this.state.selectedUser;
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleClose} />,
      <FlatButton label="Submit" primary={true} keyboardFocused={true}
        onTouchTap={this.updateUser}
      />,
    ];
    return (
      <div>
        <Dialog title="Edit a User" actions={actions} modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <div>
            <div className="field-line">
              <TextField floatingLabelText="Username"
                name="userName"
                defaultValue={userName}
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="FirstName"
                name="firstName"
                defaultValue={firstName}
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Lastname"
                name="lastName"
                defaultValue={lastName}
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Email"
                name="email"
                defaultValue={email}
                onChange={this.onChange}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Password"
                type="password"
                name="password"
                value=""
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }

  /**
  * Render the component.
  */
  render() {
    const { users } = this.props;
    let username;
    return (


      <div className="addMargin">
        <div className="spacer"></div>
        <div>
          <Pagination
            total={Math.ceil(this.state.total / this.state.limit)}
            current={this.state.page}
            display={this.state.display}
            onChange={this.handlePageChange}
          />
        </div>
        <div style={{ width: '100%' }}>
          <RaisedButton onTouchTap={() => this.handleOpenCreate()} style={{ marginLeft: '25px' }} fullWidth={true}><i className="material-icons">add</i> ADD NEW USER</RaisedButton>
          {this.createDialog()}
        </div>
        {users.map((user, index) => (

          <Paper key={index} style={style} zDepth={5}>
            <div className="addW" style={{ borderRight: '1px solid #b2beb5', marginTop: '5px' }}><p style={{ 'float': 'left' }}>{user.id}</p></div>
            <div className="addW" style={{ borderRight: '1px solid #b2beb5', marginTop: '5px' }}><p style={{ 'float': 'left' }}>{user.userName}</p></div>
            <div className="addW" style={{ borderRight: '1px solid #b2beb5', marginTop: '5px' }}><p style={{ 'float': 'left' }}>{user.firstName}</p></div>
            <div className="addW" style={{ borderRight: '1px solid #b2beb5', marginTop: '5px' }}><p style={{ 'float': 'left' }}>{user.roleId}</p></div>
            <div style={{ marginTop: '15px' }}>
              <FlatButton onTouchTap={() => this.handleOpen(user)}><i className="material-icons">create</i></FlatButton>
              <FlatButton onTouchTap={() => this.deleteUser(user)}><i className="material-icons">delete</i></FlatButton>
            </div>
          </Paper>
        ))}
        {this.editDialog()}

      </div>
    )
  }
}


const storeToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(storeToProps, { getAllUsers, editUser, deleteUser, createUser })(ManageUsers);
