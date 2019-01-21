import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="well">
        <p><b>Author: {this.props.author}</b></p>
        <p>Text: {this.props.text}</p>
        <p><i>Time: {this.props.dateTime}</i></p>
      </div>);
  }
}

export default Message;