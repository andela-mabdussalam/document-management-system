import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {Tabs, Tab} from 'material-ui/Tabs';
import PublicDocs from './PublicDocs';
import {blue500, lightBlue900, purple50, grey50, teal500, brown500, brown600} from 'material-ui/styles/colors';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log('gets here');
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        tabItemContainerStyle={{width: '600px'}}
      >
        <Tab label="Home" value="a" style={{backgroundColor: grey50, color:'black'}}>
          <div className="spacer"></div>
          <div>

            <PublicDocs />

          </div>
        </Tab>
        <Tab label="My Documents" value="b" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <h2 id="help" style={styles.headline}>My Documents</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
        <Tab label="Create Documents" value="c" style={{backgroundColor: grey50, color:'black'}}>
          <div>
            <h2 style={styles.headline}>Create Document</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
