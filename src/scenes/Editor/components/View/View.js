import React from 'react'
import styled from 'styled-components'

import Content from '../Content'
import Info from '../Info'
import SidePanel from '../SidePanel'

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

const View = ({ data: { text, title, loading, words, color }, funcs }) => (
	<Wrapper color={color}>
		{ loading ? 'loading' : <Content text={text} title={title} funcs={funcs} />	}
		<Info words={words} />
		<SidePanel funcs={funcs} />
	</Wrapper>
)

export default View