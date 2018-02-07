import React, { Component } from 'react'
import styled from 'styled-components'
import { database } from 'firebase'

import Time from './Time'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin: 30px auto 50px;
	color: #fff;
	font-size: 14px;
`

const Button = styled.span`
	padding: 5px 24px;
	margin: 3px auto;
	border-radius: 20px;
	background-color: rgba(250, 250, 250, .15);
	color: #fff;
	font-size: 16px;
	cursor: pointer;
`


class Timer extends Component {
	constructor(props) {
		super(props)

		this.defaultTime = 1500
		this.date = new Date().toJSON().slice(0,10)
		
		this.state = {
			time: this.defaultTime,
			running: false,
			today: 0,
		}
		this.interval = null
	}

	changeState = () => {
		const { running } = this.state

		if (running) {
			clearInterval(this.interval)
		} else {
			this.interval = setInterval(this.countTime, 1000)
		}

		this.setState({ running: !running })
	}

	countTime = () => {
		if (this.state.time <= 0) {
			this.onEnd()
		} else {
			this.setState(prevState => ({ time: prevState.time - 1 }))
		}
	}

	onEnd = () => {
		clearInterval(this.interval)

		this.refs.audio.play()
		
		database().ref().child('time').child(this.date).set(this.state.today + 1)
		this.setState({ running: false, time: this.defaultTime, today: this.state.today + 1 })
	}

	componentDidMount = () => {
		const ref = database().ref().child('time')
		ref.child(this.date).once('value', snap => {
			const result = snap.val()
			
			if (result)
				this.setState({ today: result })
		})

		this.interval = setInterval(this.saveText, 5000)
	}

	render() {
		const { time, running, today } = this.state
		return (
			<Wrapper>
				<audio src="https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/Wood_Plank_Flicks.mp3?alt=media&token=410d68c7-96a1-4b23-a77c-8a5246c71f40" ref="audio"></audio>
				<Time time={time} />
				<Button onClick={this.changeState}>{ running ? 'Stop' : 'Start' }</Button>
				Sessions today: { today }
			</Wrapper>
		)
	}
}

export default Timer