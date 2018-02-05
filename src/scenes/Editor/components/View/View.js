import React from 'react'
import styled from 'styled-components'

import Content from '../Content'

const Wrapper = styled.div`
	min-height: 100vh;
	background: linear-gradient(180deg,#FD7BEB 20%,#FFA841 100%);
	color: '#fff';
	font-family: 'Inconsolata', monospace;
`

const View = ({ data: { text, title, loading }, funcs }) => (
	<Wrapper>{
		loading ? 'loading' : <Content text={text} title={title} funcs={funcs} />
	}</Wrapper>
)

export default View