import React, { PropTypes } from 'react'
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
class FlashMessage extends React.Component {

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }
  render () {
    const { id , type, text } = this.props.message;
    return(
      <div className='card-panel teal'>
      {text}
      <button onClick={this.onClick} className="modal-close"><span>&times;</span></button>
      </div>
    )
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}
export default FlashMessage;
