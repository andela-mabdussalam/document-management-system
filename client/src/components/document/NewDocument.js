import React from 'react';
import { getPublicDocs, viewDoc } from '../../actions/publicDocs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {createNewDoc} from '../../actions/createDoc';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

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

    }
  this.onSubmit = this.onSubmit.bind(this);
  this.onChange = this.onChange.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleModelChange = this.handleModelChange.bind(this);
 }
 handleModelChange(model) {
   this.setState({content: model});
 }
 handleChange(event, index, value) {
   let state = this.state;
   state.value = value;
   state.access = value;
   state.ownerId = this.props.ownerId;
   this.setState({state});

  }

  onSubmit(e, context) {
    e.preventDefault();
      this.props.createNewDoc(this.state).then();

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { title, content, access, value } = this.state;
    const { ownerId, tile } = this.props;

    return(
      <div>
        <Card className="docPlaceholder">
        <form  onSubmit={this.onSubmit}>
          <CardMedia
            overlay={<CardTitle title="Create Document" />}
            />


          <div className="margin">
            <div className="spacer"></div>
            <p>DOCUMENT TITLE</p>

            <TextField name="title" onChange={this.onChange} value={tile.title} style={{width:'98%'}}/>
            <p>CONTENT</p>
              <FroalaEditor
         tag="textarea"
         model={this.state.model}
         onModelChange={this.handleModelChange}
         config={{heightMin: 1000, toolbarSticky: false}}

         />



            <p>SELECT TYPE/ACCESS</p>
            <SelectField
              name="access"
              value={value}
              onChange={this.handleChange}
              floatingLabelText="Select a role for the document"
              >
              {items}
            </SelectField>
            <RaisedButton type="submit" label="Create Document" primary />
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
export default connect(storeToProps, {createNewDoc})(NewDocument);
