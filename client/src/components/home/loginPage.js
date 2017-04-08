import React from 'react';
import LoginForm from './logInForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s10">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
