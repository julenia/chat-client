import React from 'react';
import './App.css';

class App extends React.Component{
    state = {
      messages: []
    }
  source = new EventSource(`http://localhost:5000/stream`)

  componentDidMount(){
    this.source.onmessage = (event)=>{
      const newMessages = [...this.state.messages, event.data]
      this.setState({messages: newMessages})
    }
  }
  render(){
    const messages = this.state.messages.map((message, i) =><p key={i}>{message}</p>)
    return <div>{messages}</div>
  }
}

export default App;
