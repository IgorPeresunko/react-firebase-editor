import React, { Component } from 'react'
import * as firebase from 'firebase'

import View from './components/View'

class Editor extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: 'Start here...',
			title: 'Title',
			contentChanged: false,
			loading: true
		}

		this.funcs = {
			onTextChange: this.onTextChange
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

		this.setState({ [field]: value, contentChanged: true })
	}

	parseIntoHtml = text => {
		const html = text
			.split('\n')
			.map(row =>
				row.length > 0 ? `<p>${row}</p>` : row)
			.join('')

		console.log(html)

		return html
	}

	componentDidMount() {
		const blogRef = firebase.database().ref().child('blog')
		const id = window.location.search.slice(1)
	
		blogRef.child(id).once('value', snap => {
			const result = snap.val()
			this.setState({
				...result,
				text: result ? this.parseIntoHtml(result.text) : 'Start here...',
				loading: false
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