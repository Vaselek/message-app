import React, {Component} from 'react';
import Message from '../Message/Message';

class Summary extends Component {
  render() {
    const messages = this.props.messages.map(message=>{
      const dateTime = JSON.stringify(Date(message.datetime));
      return (<Message key={message._id}
               author={message.author}
                  text={message.message}
                  dateTime={dateTime} />
      )
    });
    return (
      <div id="messages">
        {messages}
      </div>
    );
  }
}

export default Summary;