import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import FlashMessages from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';
class FlashMessagesList extends React.Component {
  render () {
    const messages = this.props.messages.map(message =>
      <FlashMessages key={message.id} message={message} deleteFlashMessage={ this.props.deleteFlashMessage } />
    )
  return(
    <div>
    { messages}
    </div>
  )
  }
}

function mapStatetoProps(state) {
  return {
    messages: state.flashMessages
  }
}
FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}
export default connect(mapStatetoProps, { deleteFlashMessage })(FlashMessagesList);
