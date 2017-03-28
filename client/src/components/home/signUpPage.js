import React, { PropTypes } from 'react';
import SignUpForm from './signUpForm';
import { connect } from 'react-redux';
import { userSignUpRequest } from '../../actions/signupActions';
// import axios from 'axios';
import validateSignupForm from '../../../../server/shared/validations/signup';
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
        roleId: 2
      },
       isLoading: false

    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    const { errors, isValid } = validateSignupForm(this.state.user);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    if(this.isValid()){
    this.setState({ errors: {}, isLoading: true});
    // axios.post('/api/users/signup', this.state.user);
    this.props.userSignUpRequest(this.state.user).then(
      () => {},
      ({ response }) => {
        this.setState({errors: response.data, isLoading: false});
      }
    );
  }
// create a string for an HTTP body message
// const userName = encodeURIComponent(this.state.user.userName);
// const firstName = encodeURIComponent(this.state.user.firstName);
// const lastName = encodeURIComponent(this.state.user.lastName);
// const email = encodeURIComponent(this.state.user.email);
// const password = encodeURIComponent(this.state.user.password);
// const roleId = encodeURIComponent(this.state.user.roleId);
// const formData = `userName=${userName}&firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}&roleId=${roleId}`;
//
// // create an AJAX request
// const xhr = new XMLHttpRequest();
// xhr.open('post', '/api/users/signup');
// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhr.responseType = 'json';
// xhr.addEventListener('load', () => {
//   if (xhr.status === 200) {
//     // success
//
//     // change the component-container state
//     this.setState({
//       errors: {}
//     });
//
//     console.log('The form is valid');
//   } else {
//     // failure
//
//     const errors = xhr.response.errors ? xhr.response.errors : {};
//     errors.summary = xhr.response.message;
//
//     this.setState({
//       errors
//     });
//   }
// });
// xhr.send(formData);

  }

  /**
   * Render the component.
   */
  render() {
    const { userSignUpRequest } = this.props;
    return (
      <SignUpForm
        userSignUpRequest={userSignUpRequest}
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        isLoading={this.state.isLoading}
      />
    );
  }

}

SignUpPage.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired
}
export default connect((state) => {return {} },{ userSignUpRequest })(SignUpPage);
