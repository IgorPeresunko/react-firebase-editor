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
			words: 0,
			color: localStorage.getItem('color') || this.colors[0]
		}

		this.funcs = {
			onTextChange: this.onTextChange,
			changeColor: this.changeColor,
		}
	}

	saveText = () => {
		const { title, text, contentChanged } = this.state

		if (!contentChanged) return

		const blogRef = firebase.database().ref().child('blog')
		const id = window.location.search.slice(1)
	
		blogRef.child(id).set({ title, text }).then(() => this.setState({ contentChanged: false }))
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

	componentDidMount() {
		const blogRef = firebase.database().ref().child('blog')
		const id = window.location.search.slice(1)
	
		blogRef.child(id).once('value', snap => {
			const result = snap.val()
			this.setState({
				...result,
				text: result ? this.parseIntoHtml(result.text) : 'Start here...',
				loading: false,
				words: result ? this.countWords(result.text) : 2
			})
		})

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