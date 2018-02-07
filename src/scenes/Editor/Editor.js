import React, { Component } from 'react'
import * as firebase from 'firebase'

import View from './components/View'

class Editor extends Component {
	constructor(props) {
		super(props)

		this.colors = [
			'rgb(249, 152, 153)',
			'rgb(44, 154, 183)',
			'rgb(144,238,144)',
			'rgb(192, 57, 43)',
			'rgb(138, 220, 179)',
			'rgb(22, 82, 142)',
			'rgb(114, 96, 109)'
		]

		this.state = {
			text: 'Start here...',
			title: 'Title',
			contentChanged: false,
			loading: true,
			words: 2,
			fullscreen: false,
			color: localStorage.getItem('color') || this.colors[0]
		}

		this.funcs = {
			onTextChange: this.onTextChange,
			changeColor: this.changeColor,
			changeFullscreenState: this.changeFullscreenState,
			loadPage: this.loadPage,
			newPage: this.newPage
		}
	}

	onTextChange = field => e => {
		const value = e.target.innerText
		
		this.setState({
			[field]: value,
			contentChanged: true,
			words: this.countWords(field === 'text' ? value : this.state.text)
		})
	}

	parseIntoHtml = text => {
		const html = text
			.split('\n')
			.map(row =>
				row.length > 0 ? `<p>${row}</p>` : row)
			.join('')

		return html
	}

	countWords = text => {
		return text.split(' ').length
	}

	changeColor = () => {
		const index = this.colors.indexOf(this.state.color)
		const indexOfNextColor = index >= this.colors.length - 1 ? 0 : index + 1
		this.setState({ color: this.colors[indexOfNextColor] })
		localStorage.setItem('color', this.colors[indexOfNextColor])
	}

	changeFullscreenState = () => {
		if (this.state.fullscreen) {
			if (document.exitFullscreen)
				document.exitFullscreen()
			else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen()
			else if (document.webkitExitFullscreen)
				document.webkitExitFullscreen()
			else if (document.msExitFullscreen)
				document.msExitFullscreen()
		} else {
			if (document.body.requestFullscreen)
				document.body.requestFullscreen()
			else if (document.body.mozRequestFullScreen)
				document.body.mozRequestFullScreen()
			else if (document.body.webkitRequestFullscreen)
				document.body.webkitRequestFullscreen()
			else if (document.body.msRequestFullscreen)
				document.body.msRequestFullscreen()
		}
		
		this.setState({ fullscreen: !this.state.fullscreen })
	}

	newPage = callback => {
		const blogRef = firebase.database().ref().child('blog')
		const newPage = { title: 'Title', text: 'Start here...', date: Date.now() }
		blogRef
			.push(newPage)
			.then(res => this.loadPage(res.key))
			.then(callback)
	}

	loadPage = id => {
		this.setState({ loading: true })

		const blogRef = firebase.database().ref().child('blog')

		blogRef.child(id).once('value', snap => {
			const result = snap.val()
			this.setState({
				...result,
				text: this.parseIntoHtml(result.text),
				loading: false,
				words: this.countWords(result.text)
			})
		})

		localStorage.setItem('pageId', id)
	}

	saveText = () => {
		const { title, text, contentChanged } = this.state

		if (!contentChanged) return

		const blogRef = firebase.database().ref().child('blog')
		const id = localStorage.getItem('pageId')
	
		blogRef.child(id).set({ title, text }).then(() => this.setState({ contentChanged: false }))
	}

	componentDidMount() {
		this.setState({ loading: false })
	
		const pageId = localStorage.getItem('pageId')

		if (pageId) {
			this.loadPage(pageId)
		}		

		this.interval = setInterval(this.saveText, 5000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<View data={this.state} funcs={this.funcs} />
		)
	}
}

export default Editor