import React from 'react';
// import { UserDocument } from '../../actions/publicDocs';
import * as ReactRouter from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import renderHTML from 'react-render-html';
import Pagination from 'material-ui-pagination';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import { getUserDocument } from '../../actions/publicDocs';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1200,
    overflowY: 'auto',

  },
  titleStyle: {
    color: 'black',
  },
};
const iconStyles = {
  marginRight: 24,
};

class UserDocument extends React.Component {
  /**
  * Class constructor.
  */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      documents: [],
      tileData: [],
      limit: 20,
      page: 1,
      offset: 0,
      total: 0,
      display: 7,
      number: 7,
      name: "",
      search: ""
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDocs = this.getDocs.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getDocs(actionToCall, params, set) {
    actionToCall(this.props.userId)
      .then((response) => {
        console.log('this happens');
        if (set) {
          this.setState({ search: "" });
        }
        const count = 12;

        this.setState({ documents: response.documents, total: count.count });
        let elements = response.documents;
        const arrayr = [];
        elements.forEach((element) => {
          const obj = {
            "img": './images/grid-list/bg1.jpg',
            "title": element.title,
            "author": element.User.userName,
            "content": element.content,
            "id": element.id
          };
          arrayr.push(obj);
        });
        this.setState({ tileData: arrayr });
      }, (error) => {
      });
  }
  componentWillMount() {
    this.getDocs(this.props.getUserDocument);
  }

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * this.state.limit;
    this.setState({
      page: pageNumber,
      offset: offset
    });
    setTimeout(() => { this.getDocs(this.props.getUserDocument, { limit: this.state.limit, offset: offset }) }, 10);
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
    // if (documents.length > 0) {
      return (
        <div style={styles.root}>
          <div>
            <Pagination
              total={Math.ceil(this.state.total / this.state.limit)}
              current={this.state.page}
              display={this.state.display}
              onChange={this.handlePageChange}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Search"
              name="search"
              onChange={this.onChange}
              value={this.state.search}
            />
            <FlatButton onTouchTap={() => (this.getDocs(this.props.searchDocument, this.state.search))} label="Search" />
            <FlatButton onTouchTap={() =>
              (this.getDocs(this.props.getPublicDocs, { limit: this.state.limit, offset: this.state.offset }, "set"))
            } label="Reset" />
          </div>
          <GridList
            cellHeight={230}
            style={styles.gridList}
            cols={4}
            padding={14}
          >

            {tileData.map((tile, index) => (
              <GridTile
                key={index}
                title={tile.title}
                subtitle={<span>by <b>{tile.author}</b></span>}
                titleStyle={styles.titleStyle}
              >

                <RaisedButton label="View Document" fullWidth={true} backgroundColor="#EFEBE9">
                  <i className="material-icons orange600">explore</i>
                </RaisedButton>
                <hr />
                <div id="onboard">
                  {renderHTML(tile.content)}
                </div>
              </GridTile>
            ))}
          </GridList>
        </div>
      )
    // else {
    //   return (
    //     <div>
    //       <p>No documents</p>
    //     </div>
    //   )
    // }
  }
}

const storeToProps = (state) => {
  return {
    documents: state.getDocuments,
    userId: state.auth.user.userId
  }
}



export default connect(storeToProps, { getUserDocument})(UserDocument);