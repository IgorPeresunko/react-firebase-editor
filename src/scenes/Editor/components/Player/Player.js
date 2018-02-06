import React, { Component } from 'react'

import { Range, Wrapper, Icon }  from './View'

class Player extends Component {
	constructor(props) {
		super(props)

		this.sounds = [
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/01%20-%20Petricor.mp3?alt=media&token=117d036a-bfb0-4630-8dfc-f88a710fe47a',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/02%20-%20Night.mp3?alt=media&token=9a558412-2fb8-4202-8d2f-423ebeeee00b',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/03%20-%20Drop.mp3?alt=media&token=901b7e93-1a68-47ad-8565-21783f31f151',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/04%20-%20Four%20Dimensions.mp3?alt=media&token=0c87d416-934c-4ca2-af32-2ae982b418b9',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/05%20-%20Elements.mp3?alt=media&token=c6b0609c-2f26-4513-b3c4-31256b4bbfc5',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/06%20-%20Whirling%20Winds.mp3?alt=media&token=b94f0a71-ad96-41d7-8970-a92258e57cc8',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/07%20-%20Twice.mp3?alt=media&token=52d760d3-9109-4b0e-9dbc-55ae89e2a062',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/08%20-%20ABC.mp3?alt=media&token=0044dc1c-77a2-44f8-9954-b6d76713c1c1',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/09%20-%20Numbers.mp3?alt=media&token=45949ed8-d7ee-4d1a-bb2f-99e0b572ab23',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/10%20-%20Mountain.mp3?alt=media&token=b9196ee2-d09c-4dd2-a2ac-8c95e0c25428',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/11%20-%20Logos.mp3?alt=media&token=9d8802ae-a32b-43f5-9950-3b719a873b91',
			'https://firebasestorage.googleapis.com/v0/b/blog-8c653.appspot.com/o/12%20-%20Song%20For%20Gavin.mp3?alt=media&token=e790ebc2-51b3-43f3-94f3-fb8580ab04b8',
		]

		const soundIndex = localStorage.getItem('sound') || 0
		this.state = {
			volume: 80,
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