import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Player from '../Player'
import Timer from '../Timer'

const propTypes = {
	funcs: PropTypes.object.isRequired
}

const Wrapper = styled.div`
	position: fixed;
	top: 80px;
	left: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 20px;
	width: 160px;
	opacity: 0;
	transition: .2s;
	&:hover {
		opacity: 1;
	}	
`

const Title = styled.h1`
	width: 100%;
	text-align: center;
	margin: 0;
	margin-bottom: 20px;
	font-size: 20px;
	font-family: 'Dosis', sans-serif;
	letter-spacing: 1.5px;
	color: #fff;
`

const Button = styled.span`
	padding: 5px 24px;
	margin: 3px auto;
	border-radius: 20px;
	background-color: rgba(250, 250, 250, .15);
	color: #fff;
	cursor: pointer;
`

const SidePanel = ({
	funcs,
	full
}) => (
	<Wrapper>
		<Title>Perfect Focus</Title>
		<Player />
		<Timer />
		<Button onClick={funcs.changeColor}>Change color</Button>
		<Button onClick={funcs.changeFullscreenState}>{full ? 'Off Fullscreen' : 'Fullscreen'}</Button>
	</Wrapper>
)

SidePanel.propTypes = propTypes

export default SidePanel