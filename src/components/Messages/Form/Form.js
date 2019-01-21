import React, {Component} from 'react';

class Form extends Component {
  render() {
    return (
      <div>
        <form className="form-inline d-flex justify-content-center mt-5 mb-5">Enter message:
        <input value={this.props.value} type="text" id="message-txt" className="form-control" size="50" onChange={this.props.changeMessage}/>
        <button type="button" id="send-message" className="btn btn-danger" onClick={this.props.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}

export default Form;