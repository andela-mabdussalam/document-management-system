import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SignUpForm = ({
  userSignUpRequest,
  onSubmit,
  onChange,
  checkUserExists,
  errors,
  user,
  isLoading,
  invalid
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h3 className="card-heading">Sign Up</h3>


      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="userName"
          errorText={errors.userName}
          onChange={onChange}
          onBlur={checkUserExists}
          value={user.userName}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="FirstName"
          name="firstName"
          errorText={errors.firstName}
          onChange={onChange}
          value={user.firstName}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Lastname"
          name="lastName"
          errorText={errors.lastName}
          onChange={onChange}
          value={user.lastName}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          onBlur={checkUserExists}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText=" Confirm Password"
          type="password"
          name="passwordConfirm"
          onChange={onChange}
          errorText={errors.password}
          value={user.passwordConfirm}
        />
      </div>

<RaisedButton disabled={ isLoading || invalid} type="submit" label="Create New Account" primary />
<CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

// SignUpForm.propTypes = {
//   userSignUpRequest: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
//   checkUserExists: PropTypes.func
// };

export default SignUpForm;
