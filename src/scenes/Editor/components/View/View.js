import React from 'react'
import styled from 'styled-components'

import Content from '../Content'
import Menu from '../Menu'

const Wrapper = styled.div`
	min-height: 100vh;
	background: ${props => props.color };
	background-size: cover;
	color: '#fff';
	font-family: 'Inconsolata', monospace;
	transition: 2s;
	&::selection {
  		background: #ffb7b7;
	}
	&::-moz-selection {
		background: #ffb7b7;
	}
`

const View = ({ data: { text, title, loading, words, color, fullscreen }, funcs }) => (
	<Wrapper color={color}>{ 
		loading
			? 'loading'
			: <Content text={text} title={title} funcs={funcs} />	}
		<Menu funcs={funcs} fullscreen={fullscreen} words={words} />
	</Wrapper>
)

export default View