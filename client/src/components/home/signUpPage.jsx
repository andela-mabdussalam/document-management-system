import React, { PropTypes } from 'react';
import SignUpForm from './signUpForm.jsx';
import { connect } from 'react-redux';
import { userSignUpRequest, isUserExists } from '../../actions/signupActions';
import validateSignupForm from '../../../../server/shared/validations/signup';
import { Redirect } from 'react-router-dom';

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        roleId: 1
      },
       isLoading: false,
       invalid: false,
       done: false

    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  isValid() {
    const { errors, isFormValid } = validateSignupForm(this.state.user);

    if(!isValid) {
      this.setState({ errors });
    }

    return isFormValid;
  }

  checkUserExists(event){
    const field = event.target.name;
    const val = event.target.value;
    if( val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid
        if(res.data.user.length > 0) {
          errors[field] = 'A user with this ' + field + ' already exists';
          invalid = true;
        } else{
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid})
      });
    }
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    if(true){
    this.setState({ errors: {}, isLoading: true});
    this.props.userSignUpRequest(this.state.user).then(
      () => {
         this.setState({done: true})
      },
      (response) => {
        this.setState({errors: response.data, isLoading: false});
      }
    );
  }

  }

  /**
   * Render the component.
   */
  render() {
    const { userSignUpRequest, isUserExists} = this.props;
      const signUp = (
      <SignUpForm
        userSignUpRequest={userSignUpRequest}
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        isLoading={this.state.isLoading}
        checkUserExists={this.checkUserExists}
        invalid={this.state.invalid}
      />
  );
  return (
    <div>
    { this.state.done ? <Redirect to="/dashboard" /> : signUp }
    </div>
    );
  }

}

SignUpPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect((state) => {return {} },{ userSignUpRequest, isUserExists })(SignUpPage);
