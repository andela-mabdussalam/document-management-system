import React from 'react';
import { getPublicDocs, viewDoc, updateDocument } from '../../actions/publicDocs';
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
import 'font-awesome/css/font-awesome.css';
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
      value: null,
      title:'',
      content:'',
      ownerId: '',
      access: '',
      role:'',
      model: '',
      docTitle: 'Create Document',
      tile: {},
      titles: undefined,
      docId: '',
      updatedUser: { id: '', content: ''},
      newDocument: {title: '', content: '', ownerId: ''}

    }
  this.onSubmit = this.onSubmit.bind(this);
  this.onChange = this.onChange.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleModelChange = this.handleModelChange.bind(this);
  this.updateDoc = this.updateDoc.bind(this);
  this.createDoc = this.createDoc.bind(this);
 }
componentWillReceiveProps(nextProps){
  const updatedUser = this.state.updatedUser;
  const {tile} = nextProps;
  console.log('the tile is -----------------------', tile);
  updatedUser.id = tile.id;
  this.setState({model: Object.assign({}, tile).content, docId: Object.assign({}, tile).id});
  this.setState({docTitle: "Edit Document", titles: Object.assign({}, tile).title});
}
 handleChange(event, index, value) {
   let state = this.state;
   state.value = value;
   state.access = value;
   state.ownerId = this.props.ownerId;
   state.newDocument.ownerId = this.props.ownerId;
   this.setState({state});
  }
createDoc(){
  this.props.createNewDoc(this.state.newDocument).then((response) => {
    toastr.success('Document Successfully Created');
    this.setState({docId: '', docTitle: 'Create Document', titles: '', model: ''});
  });
}
  onSubmit(event, context) {
    // event.preventDefault();

  }

  onChange(event) {
    const {docId, newDocument} = this.state;
    if(docId){
      console.log('wole');
    const updatedUser = this.state.updatedUser;
    updatedUser[event.target.name] = event.target.value;
    this.setState(() => ({ updatedUser: updatedUser }));
    if(event.target.name === "title"){
      this.setState({titles: event.target.value })
    }
    this.setState({ [event.target.name]: event.target.value });
    console.log('the state is ', this.state);
  }
  else{
    newDocument.title = event.target.value;
    newDocument.ownerId = this.props.ownerId;
    this.setState({ [event.target.name]: event.target.value });
    // console.log('jade');
    // const newDocument = this.state.newDocument;
    // console.log('the event is',event.target.name, event.target.value );
    // newDocument[event.target.name] = event.target.value;
    // this.setState({newDocument: newDocument});
  }
  }
  handleModelChange(model){
    const {docId} = this.state;
    if(docId){
      const updatedUser = this.state.updatedUser;
      updatedUser.content = model;
    this.setState({updatedUser: Object.assign({}, updatedUser)});
  }
  else{
    const newDocument = this.state.newDocument;
    newDocument.content = model
    // this.setState({newDocument: Object.assign({}, newDocument)});
  }
  }
  updateDoc(){
    console.log('what is happening');
    const {updatedUser} = this.state
    this.props.updateDocument(updatedUser).then(() => {
      toastr.success('Document Successfully Updated');
      this.setState({docId: '', docTitle: 'Create Document', titles: '', model: ''});
     });
  }
  render() {
    const { title, content, access, value ,docTitle, tile, titles, docId} = this.state;
    const { ownerId } = this.props;

    return(
      <div>
        <Card className="docPlaceholder">
        <form  onSubmit={this.onSubmit}>
          <CardMedia
            overlay={<CardTitle title={docTitle} />}
            />
          <div className="margin">
            <div className="spacer"></div>
            <p>DOCUMENT TITLE</p>

            <TextField name="title" onChange={this.onChange} value={titles} style={{width:'98%'}}/>
            <p>CONTENT</p>
              <FroalaEditor
         tag="textarea"
         model={this.state.model}
         config={{heightMin: 500, toolbarSticky: false}}
         onModelChange={this.handleModelChange}
         />

       {docId && <div><p>SELECT TYPE/ACCESS {docId}</p>
           <SelectField
              name="access"
              value={value}
              onChange={this.handleChange}
              floatingLabelText="Select a role for the document"
              >
          </SelectField></div> }

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
