import React from 'react';
import { getPublicDocs } from '../../actions/publicDocs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1200,
    height: 1200,
    overflowY: 'auto',

  },
  titleStyle: {
    color: 'black',
  },
};
const iconStyles = {
  marginRight: 24,
};

class PublicDocs extends React.Component {
  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      documents: [],
      tileData: []
    };
  }

  componentWillMount() {
    this.props.getPublicDocs()
    .then((response) => {
      console.log('cool', response.documents.data)
      this.setState({documents: response.documents.data});
      var elements = this.state.documents;
      const arrayr = [];
      elements.forEach((element) => {
        console.log('the eleement is', element);
        const obj = {
          "img"   : './images/grid-list/bg1.jpg',
          "title" : element.content,
          "author" : element.title,
          "username": element.User.userName,
        };
        arrayr.push(obj);
      });
      this.setState({tileData: arrayr});
    }, (error) => {
      console.log("Mariam Error", error.response.data.message)
    });
  }

  componentDidMount() {
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
    const { documents, tileData } = this.state;
    console.log('the data is', tileData);
    if (documents.length > 0) {
      return(
        <div style={styles.root}>
          <GridList
            cellHeight={230}
            style={styles.gridList}
            cols={4}
            padding={34}
            >

            {tileData.map((tile) => (
              <GridTile
                key={tile.title}
                title={tile.author}
                subtitle={<span>by <b>{tile.username}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                titleStyle={styles.titleStyle}
                >
                { tile.content }
                <RaisedButton label="View Document" fullWidth={true} backgroundColor="#EFEBE9">
                  <i className="material-icons orange600">explore</i>
                </RaisedButton>
                <hr/>
                <div id="onboard">
                  {tile.title}
                </div>
              </GridTile>
            ))}
          </GridList>
        </div>

      )} else {
        return(
          <div>
            <p>No documents</p>
          </div>
        )
      }
    }
  }

  const storeToProps = (state) => {
    return {
      documents: state.getDocuments
    }
  }



  export default connect(storeToProps, { getPublicDocs })(PublicDocs);
