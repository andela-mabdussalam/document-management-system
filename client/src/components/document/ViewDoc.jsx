import React from 'react';
import { getPublicDocs, viewDoc } from '../../actions/publicDocs';
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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ViewDoc extends React.Component {
  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      document: {}
    }

 }
  componentWillMount() {
    this.props.viewDoc(this.props.match.params.id);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.document) {
      this.setState({document: nextProps.document});
    }
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

      const { document } = this.state;
      return(
        <div>
        <Card className="docPlaceholder">

    <CardMedia
      overlay={<CardTitle title={document.title} subtitle="Overlay subtitle" />}
    >

    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <hr/>
    <CardText style={{ 'fontSize': '20px', 'textAlign': 'justify'}} className="cardText">
    {document.content}
    </CardText>
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
    </Card>
        {this.state.document.title}
        </div>
      )}

  }

  const storeToProps = (state, ownProps) => {
    return {
      document: state.getDocuments.currentDoc
    }
  }

  // const dispatchTopProps = (dispatch) => {
  //   return{
  //     viewDoc: (id) => dispatch(viewDoc)
  //   }
  // }



  export default connect(storeToProps, { viewDoc })(ViewDoc);
