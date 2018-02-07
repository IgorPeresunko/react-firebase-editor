import React, { Component } from 'react'
import * as firebase from 'firebase'

import View from './View'

class Pages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			pages: []
		}
		this.funcs = {
			onClick: this.onClick,
			createNewPage: this.createNewPage
		}
	}

	onClick = id => () => {
		this.props.loadPage(id)
	}

	createNewPage = () => {
		this.props.newPage(this.loadPages)
	}

	loadPages = () => {
		const blogRef = firebase.database().ref().child('blog')

		blogRef.once('value', snap => {
			const result = snap.val()

			const pages = Object
				.keys(result)
				.map(key => ({ id: key, title: result[key].title, date: result[key].date }))	
				.sort((a, b) => a.date - b.date)

			this.setState({ loading: false, pages })
		})
	}

	componentDidMount() {
		this.loadPages()
	}

	shouldComponentUpdate = nextProps => {
		return true
	}

	render() {
		if (this.state.loading)
			return null

		return (
			<View data={this.state} funcs={this.funcs}/>
		)
	}
}

export default Pages