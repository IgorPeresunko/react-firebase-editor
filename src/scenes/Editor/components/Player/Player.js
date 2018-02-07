import React, { Component } from 'react'

import { Range, Wrapper, Icon }  from './View'

class Player extends Component {
	constructor(props) {
		super(props)

		this.sounds = [
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/01%20-%20Petricor.mp3?alt=media&token=3d8f4dde-7bb0-487f-8af0-0de2520278fd',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/02%20-%20Night.mp3?alt=media&token=135c5937-077c-4357-9639-4bbb49a6a90c',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/03%20-%20Drop.mp3?alt=media&token=fb12eef7-eb63-43bd-a9a8-b8ed245e4ca7',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/04%20-%20Four%20Dimensions.mp3?alt=media&token=7f84fa44-3309-490a-8968-22ec3e72aaa6',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/05%20-%20Elements.mp3?alt=media&token=a98d4219-c3a8-4378-9c54-7f9bfeeceaf1',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/06%20-%20Whirling%20Winds.mp3?alt=media&token=b37924c5-ca10-40a3-99a8-a97cceaa3950',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/07%20-%20Twice.mp3?alt=media&token=d97e2b6a-36b8-49bc-ae58-ea893b23a28e',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/08%20-%20ABC.mp3?alt=media&token=fbaf10fb-4d44-4310-b7c2-d5cd760bf940',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/09%20-%20Numbers.mp3?alt=media&token=22b2f7ea-33c9-47ad-b449-f6f17c2da362',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/10%20-%20Mountain.mp3?alt=media&token=cb4b3a17-78de-4e86-ad15-e1a4fbe53b74',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/11%20-%20Logos.mp3?alt=media&token=26cf04ca-1f72-494b-82b8-9a207beca150',
			'https://firebasestorage.googleapis.com/v0/b/togetshitdone-2c80d.appspot.com/o/12%20-%20Song%20For%20Gavin.mp3?alt=media&token=ca971e57-8328-44e6-bc05-50d0ff1d132d'
		]

		const soundIndex = localStorage.getItem('sound') || 0
		console.log( localStorage.getItem('volume') || 80)
		this.state = {
			volume: localStorage.getItem('volume') || 80,
			soundIndex: Number(soundIndex),
			sound: this.sounds[Number(soundIndex)],
			isPlaying: false
		}
	}

	onVolumeChange = e => {
		const value = e.target.value

		this.setVolume(value/100)
		this.setState({ volume: value })
	}

	onPlayStateChange = () => {
		const { isPlaying } = this.state

		if (isPlaying)
			this.refs.audio.pause()
		else
			this.refs.audio.play()

		this.setState({ isPlaying: !isPlaying })
	}

	setVolume = vol => {
		this.refs.audio.volume = vol
		localStorage.setItem('volume', vol * 100)
	}

	onNext = () => {
		const { soundIndex } = this.state
		const newIndex =
			soundIndex >= this.sounds.length - 1 ? 0 : soundIndex + 1
		
		this.changeSound(newIndex)
	}

	onPrev = () => {
		const { soundIndex } = this.state
		const newIndex =
			soundIndex <= 0 ? this.sounds.length - 1 : soundIndex - 1
		
		this.changeSound(newIndex)
	}

	changeSound = i => {
		this.setState({ soundIndex: i, sound: this.sounds[i], isPlaying: true })
		localStorage.setItem('sound', i)
		this.refs.audio.src = this.sounds[i]
		this.refs.audio.play()
	}

	componentDidMount = () => {
		this.setVolume(this.state.volume/100)
		this.refs.audio.src = this.state.sound
		this.refs.audio.addEventListener("ended", this.onNext)
	}

	componentWillUnmount = () => {
		this.refs.audio.removeEventListener("ended", this.onNext)
	}

	render() {
		const { volume, isPlaying } = this.state
		
		return (
			<Wrapper>
				<audio ref="audio" preload="auto"></audio>
				<div>
					<Icon><i className="fas fa-step-backward" onClick={this.onPrev}></i></Icon>
					<Icon><i className={`fas fa-${isPlaying ? 'pause' : 'play' }`} onClick={this.onPlayStateChange}></i></Icon>
					<Icon><i className="fas fa-step-forward" onClick={this.onNext}></i></Icon>
				</div>
				<Range type="range" min={0} max={100} value={volume} onChange={this.onVolumeChange}/>
			</Wrapper>
		)
	}
}

export default Player