import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
     constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      redirect: false
    }

 }


    componentWillMount() {
      if (!this.props.isAuthenticated) {
        <Redirect to="/login" />
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false)  {
         this.setState({redirect: true});
      }
    }
    render() {
      const {redirect} = this.state;
      return (
        <div>
        <ComposedComponent {...this.props} />
        { redirect && <Redirect to="/dashboard" />}
        </div>
      );
    }
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
