import React from 'react';
import './App.css';
import * as request from 'superagent'
import {allMessages} from './actions'
import { connect } from 'react-redux'
import MessageForm from './components/MessageForm'
import UserForm from './components/UserForm'

class App extends React.Component {
  state = {message: ""}
  source = new EventSource(`https://ancient-headland-48278.herokuapp.com/stream`)

  componentDidMount() {
    this.source.onmessage = (event) => {
      const messages = JSON.parse(event.data)
      this.props.allMessages(messages)
    }
  }
  onSubmit =async (event)=> {
    event.preventDefault()
    await request
      .post('http://localhost:5000/message')
      .send({message: this.state.message})
    this.setState({message: ''})
  }

  onChange=(event)=>{
    const {value} = event.target
    this.setState({ message: value })
  }

  render() {
    const messages = this.props.messages.map((message, i) => <p key={i}>{message.user}: {message.text}</p>)
  
    return <main>
      <MessageForm user={this.props.user}/>
      <UserForm user = {this.props.user}/>
      {messages}
    </main>
  }
}

function mapStateToProps(state){
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps ={
  allMessages
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
