import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return(
      <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
      </Card>
    );
  }
}

export default HomePage;
