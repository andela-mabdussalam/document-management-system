import React from 'react';
import { Document, viewDoc, updateDocument } from '../../actions/publicDocs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {createNewDoc} from '../../actions/publicDocs';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css'
import FroalaEditor from 'react-froala-wysiwyg';
import toastr from 'toastr';
const items = [
  <MenuItem key={1} value="private" primaryText="private" />,
  <MenuItem key={2} value="public" primaryText="public" />,
  <MenuItem key={3} value="role" primaryText="role" />,
  ];

class NewDocument extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      modalTitle: 'Create Document',
      newDocument: {}
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.createDoc = this.createDoc.bind(this);
 }

  componentWillReceiveProps(nextProps){
    const { document } = nextProps;
    let { modalTitle } = this.state;
    if(document.id) modalTitle = 'Edit Document';
    this.setState(() => ({
      newDocument: document,
      modalTitle
    }));
  }

 handleAccessChange(event, index, value) {
   this.setState((state) => {
     const newDocument = Object.assign({}, state.newDocument, { access: value });
     return { newDocument };
   });
  }

  onTitleChange(event) {
    const { name: field, value } = event.target;
    const { ownerId } = this.props;
    this.setState((state) => {
      const newDocument = Object.assign({}, state.newDocument, { [field]: value, ownerId });
      return { newDocument };
    });
  }

  handleModelChange(model){
    const { ownerId } = this.props;
    this.setState((state) => {
     const newDocument = Object.assign({}, state.newDocument, { content: model, ownerId });
     return { newDocument };
   });
  }

createDoc(){
  this.props.createNewDoc(this.state.newDocument).then((response) => {
    toastr.success('Document Successfully Created');
    this.setState({ newDocument: {} });
  });
}

  updateDoc(){
    const { newDocument } = this.state
    this.props.updateDocument(newDocument).then(() => {
      toastr.success('Document Successfully Updated');
       this.setState({ newDocument: {} });
     });
  }
  render() {
    const { ownerId: userId } = this.props;
    const { modalTitle } = this.state;
    const { title = '', content = '', access = '', id: docId, ownerId = userId } = this.state.newDocument;

    return(
      <div>
        <Card className="docPlaceholder">
        <form>
          <CardMedia
            overlay={<CardTitle title={modalTitle} />}
            />
          <div className="margin">
            <div className="spacer"></div>
            <p>DOCUMENT TITLE</p>

            <TextField name="title" onChange={this.onTitleChange} value={title} style={{width:'98%'}}/>
            <p>CONTENT</p>
              <FroalaEditor
         tag="textarea"
         model={content}
         config={{heightMin: 500, toolbarSticky: false}}
         onModelChange={this.handleModelChange}
         />

       <div><p>SELECT TYPE/ACCESS</p>
           <SelectField
              name="access"
              value={access}
              onChange={this.handleAccessChange}
              floatingLabelText="Select a role for the document"
              >{items}
          </SelectField></div>

            {!docId && <RaisedButton onTouchTap={this.createDoc} label="Create Document" primary />}
            { docId && <RaisedButton onTouchTap={this.updateDoc} label="Update Document" secondary />}

            <div className="spacer"></div>
            </div>
        </form>
        </Card>
      </div>
    )
  }
}
const storeToProps = (state, ownProps) => {
  return {
     ownerId: state.auth.user.userId
  }
}
export default connect(storeToProps, {createNewDoc, updateDocument})(NewDocument);
