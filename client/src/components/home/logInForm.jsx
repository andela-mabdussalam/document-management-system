import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import validateInput from '../../../../server/shared/validations/login';
import { login } from '../../actions/authActions';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  chip: {
    margin: 16,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
      done: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e, context) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => {
          this.setState({done: true});
        },
        (errors) => {
          this.setState({ errors: errors.response.data.errors, isLoading: false })
        }
      );
    }
  }

  handleRequestDelete() {
    alert('You clicked the delete button.');
  }

  handleTouchTap() {
    alert('You clicked the Chip.');
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    const form = (
      <Card className="container">
        <form  onSubmit={this.onSubmit}>
          <h3 className="card-heading">Log in</h3>

   <Chip className="added">{errors.form}</Chip>


       <div className="field-line">
        <TextField
          name="identifier"
          floatingLabelText="Username / Email"
          value={identifier}
          errorText={errors.identifier}
          onChange={this.onChange}
        />
    </div>

        <div className="field-line">
        <TextField
          name="password"
          floatingLabelText="Password"
          value={password}
          errorText={errors.password}
          onChange={this.onChange}
          type="password"
        />
    </div>
    <RaisedButton disabled={ isLoading} type="submit" label="Log In" name="action" primary />
      </form>
    </Card>
    )
    return (
        <div>
            { this.state.done ? <Redirect to="/dashboard" /> : form }
        </div>


    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};



export default connect(null, { login })(LoginForm);
