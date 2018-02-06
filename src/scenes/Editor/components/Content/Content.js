import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Parser from 'html-react-parser'

const propTypes = {
	text: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}

const Wrapper = styled.div`
	max-width: 800px;
	width: 90%;
	margin: auto;
	font-family: 'Inconsolata', monospace;
`

const Title = styled.h1`
	color: #fff;
	width: 100%;
	font-size: 26px;
	letter-spacing: 1px;
	line-height: 36px;
	outline: none;
	padding-top: 100px;
	margin: 0;
	margin-bottom: 0px;
`

const Paragraph = styled.p`
	color: #fff;
	width: 100%;
	font-size: 20px;
	letter-spacing: .5px;
	line-height: 28px;
	outline: none;
	min-height: 300px;
	margin: 0;
	padding: 10px 0 80px;
	& > p::selection {
  		color: #fff;
		background: #fff;
	}
	& > p::-moz-selection {
		color: #fff;
		background: #fff;
	}
`

class Content extends Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		const { text, title, funcs } = this.props
		return (
			<Wrapper>
				<Title  contentEditable onInput={funcs.onTextChange('title')}>
					{ title }
				</Title>
				<Paragraph contentEditable onInput={funcs.onTextChange('text')}>{
					Parser(text)
				}</Paragraph>
			</Wrapper>
		)
	}
}

Content.propTypes = propTypes

export default Content