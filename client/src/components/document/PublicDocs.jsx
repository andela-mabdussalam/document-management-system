import React from 'react';
import { getPublicDocs, searchDocument, deleteDocument } from '../../actions/getPublicDocs';
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
import Dialog from 'material-ui/Dialog';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1500,
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
      tileData: [],
      limit: 40,
      page: 1,
      offset: 0,
      total: 0,
      display: 7,
      number: 7,
      name: "",
      search: "",
      openCreateDialog: false,
      document: {}
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDocs = this.getDocs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.viewDocument = this.viewDocument.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getDocs(actionToCall, params, set) {
    if (set === 1) {
      $('#field').val("");
    }
    actionToCall(params)
      .then((response) => {
        const count = response.documents.pop();
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
    this.getDocs(this.props.getPublicDocs,
    { offset: this.state.offset, limit: this.state.limit });
  }
  deleteDocument() {
    const { document } = this.state;
  }

  viewDocument() {
    const { document } = this.state
    const actions = [
      <FlatButton label="Cancel" primary={true}
      onTouchTap={this.handleCreateClose} />,
      <FlatButton label="Delete" primary={true}
      onTouchTap={this.deleteDocument} />
    ];
    return (
      <div>
        <Dialog title={document.title} actions={actions} modal={true}
          open={this.state.openCreateDialog}
          autoScrollBodyContent={true}>
            <hr />
            {document.title ? <div>{renderHTML(document.content)}</div> : ""}
        </Dialog>
      </div>
    )
  }

  clearValue() {
    this.setState({ search: "" });
  }
  handleOpen(document) {
    this.setState({ openCreateDialog: true, document });

  };

  handleClose() {
    this.setState({ open: false });
  };
  handleCreateClose() {
    this.setState({ openCreateDialog: false });
  };
  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * this.state.limit;
    this.setState({
      page: pageNumber,
      offset: offset
    });
    setTimeout(() => { this.getDocs(this.props.getPublicDocs,
       { limit: this.state.limit, offset: offset }, 10) });
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

    const { documents } = this.props;
    if (documents.items) {

      return (
        <div id="root" style={styles.root}>
          <div id="pagination">
            <Pagination
              total={Math.ceil(this.state.total / this.state.limit)}
              current={this.state.page}
              display={this.state.display}
              onChange={this.handlePageChange}
            />
          </div>

          <div className="field-line">
            <TextField
              id="field"
              floatingLabelText="Search"
              name="search"
              onChange={this.onChange}
            />
            <FlatButton id="search" onTouchTap={() =>
              (this.getDocs(this.props.searchDocument, this.state.search))}
               label="Search" />
            <FlatButton id="reset" onTouchTap={() =>
              (this.getDocs(this.props.getPublicDocs,
               { limit: this.state.limit, offset: this.state.offset }, 1))} label="Reset" />
          </div>
          <GridList
            id="gridlist"
            cellHeight={290}
            style={styles.gridList}
            cols={4}
            padding={25}
          >

            {documents.items.map((document, index) => {
              return (
                <GridTile
                key={index}
                title={document.title}
                subtitle={<span>by <b>{document.User.userName}</b></span>}
                actionIcon={
                  <IconButton
                  onTouchTap={this.props.onSelectTab.bind(this, document, index)}
                  tooltip="Edit Document" tooltipPosition="top-left">
                  <i className="material-icons orange600">add</i>
                  </IconButton>
                }
                titleStyle={styles.titleStyle}
              >
               <div className="row">
                <RaisedButton onTouchTap={() => this.handleOpen(document)}
                  label="View Document" style={{width: '60%'}}
                  backgroundColor="#EFEBE9">
                  <i className="material-icons orange600">explore</i>
                </RaisedButton>
                <RaisedButton onTouchTap={() => this.handleOpen(document)}
                  label="Delete" style={{width: '35%'}}backgroundColor="#EFEBE9">
                  <i className="material-icons orange600">delete</i>
                </RaisedButton>
                </div>

                <hr />
                <div id="onboard">
                  {renderHTML(document.content)}
                </div>
              </GridTile>
              )
            }

            )}
            {this.viewDocument()}
          </GridList>
        </div>

      )
    } else {
      return (
        <div id="noDocument" style={styles.root}>
          <div id="pagination">
            <Pagination
              total={Math.ceil(this.state.total / this.state.limit)}
              current={this.state.page}
              display={this.state.display}
              onChange={this.handlePageChange}
            />
          </div>

          <div className="field-line">
            <TextField
              id="field"
              floatingLabelText="Search"
              name="search"
              onChange={this.onChange}
            />
            <FlatButton id="search" onTouchTap={() =>
              (this.getDocs(this.props.searchDocument, this.state.search))} label="Search" />
            <FlatButton id="reset" onTouchTap={() =>
              (this.getDocs(this.props.getPublicDocs,
              { limit: this.state.limit, offset: this.state.offset }, 1))} label="Reset" />
          </div>
          <div style={{ width: '57%' }}>
            <hr />
            <p>No document Found </p>
          </div>
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



export default connect(storeToProps, { getPublicDocs, searchDocument, deleteDocument})(PublicDocs);
