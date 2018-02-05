import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, .07);
`

const Content = styled.div`
	width: 800px;
	margin: auto;
	padding: 15px 0;
	text-align: center;
`

const Title = styled.h2`
	margin: 0;
	font-size: 24px;
	color: #fff;
	font-family: 'Dosis', sans-serif;
	letter-spacing: 5px;
`

const Header = () => (
	<Wrapper>
		<Content>
			<Title>Ninja</Title>
		</Content>
	</Wrapper>
)

export default Header