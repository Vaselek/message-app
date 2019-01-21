import React, {Component} from 'react';
import Form from "../../components/Messages/Form/Form";
import Summary from "../../components/Messages/Summary/Summary";

class Blog extends Component {
  state = {
    messages: [],
    currentMessage: {},
    lastDateTime: null
  };

  componentDidMount() {
    const url = 'http://146.185.154.90:8000/messages/';
    fetch(url).then(response => {
      return response.json();
    }).then(messages => {
      const lastDateTime = messages[messages.length - 1].datetime;
      this.setState({messages, lastDateTime});
      this.messagesFetchInterval = setInterval(this.fetchNewMessages, 2000);
    });
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  fetchNewMessages = () => {
    fetch(`http://146.185.154.90:8000/messages?datetime=${this.state.lastDateTime}`).then(response => {
      return response.json();
    }).then(newMessages => {
      if(newMessages && newMessages.length > 0) {
        const index = newMessages.length - 1;
        const lastDateTime = newMessages[index].datetime;
        let oldMessages = [...this.state.messages];
        let messages = oldMessages.concat(newMessages);
        this.setState({messages, lastDateTime});
      }
    });
  }

  changeMessage = (message) => {
    let currentMessage = {message: message, author: 'Vasya Pupkin'};
    this.setState({currentMessage});
  };

  clearMessageFormInput = () => {
    let currentMessage = {message: ''};
    this.setState({currentMessage});
  };

  sendMessage = () => {
    const url = 'http://146.185.154.90:8000/messages';
    const data = new URLSearchParams();
    data.set('message', this.state.currentMessage.message);
    data.set('author', this.state.currentMessage.author);
    fetch(url, {
      method: 'post',
      body: data,
    }).then(()=>{
      this.clearMessageFormInput();
    }).catch(error => console.error(error));
  };

  updateApp = () => {
    this.stopFetching();
    this.sendMessage();
    this.messagesFetchInterval = setInterval(this.fetchNewMessages, 2000);
  }

  stopFetching = () => {
    clearInterval(this.messagesFetchInterval);
  }

  render() {
    return (
      <div className="container container-fluid text-center">
        <Form value={this.state.currentMessage.message} sendMessage={()=>this.updateApp()} changeMessage={(e)=>this.changeMessage(e.target.value)}/>
        <Summary messages={this.state.messages}/>
      </div>
    );
  }
}

export default Blog;