import { Component } from 'react'
import Timer from 'easytimer.js'
import io from 'socket.io-client'
import Head from 'next/head'

class Mandom extends Component {
  state = {
    field: ''
  }

  componentDidMount () {
    const timer = new Timer();
    timer.start({countdown: true, startValues: [0,3,0,0,0]});
    timer.addEventListener('secondsUpdated', function (e) {
      document.querySelector('#timer').innerHTML = timer.getTimeValues().toString();
    });
    timer.addEventListener('targetAchieved', function (e) {
      document.querySelector('#timer').style.color = '#dd0000'
      timer.stop();
      timer.start();
    });

    this.socket = io();
    this.socket.on('time', function(msg){
      document.querySelector('#timer').style.color = '#000000'
      timer.stop();
      timer.start({countdown: true, startValues: msg});
    });
  }

  handleChange = event => {
    this.setState({ field: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.socket.emit('time', [0,0,document.getElementById("time").value-0,0,0]);
  }

  render () {
    return (
      <div>
        <Head>
          <title>mandom</title>
        </Head>
        <style jsx>{`
          #timer {
            font-size: 15em;
            font-family: 'Lato', sans-serif;
          }
        `}</style>
        <div id='timer'></div>
        <form id="timeForm" onSubmit={this.handleSubmit}>
          <input type="text" id="time" name="time"
            onChange={this.handleChange}
            value={this.state.field}
          />
          <input type="submit" value="start"></input>
        </form>
      </div>
    )
  }
}

export default Mandom
