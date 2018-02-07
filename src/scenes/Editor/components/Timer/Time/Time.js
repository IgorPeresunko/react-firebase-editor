import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
	time: PropTypes.number.isRequired
}

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	color: #fff;
	margin: 4px auto;
`

const Span = styled.span`
	font-size: 24px;
	font-weight: 100;
`

const Time = ({ time }) => {
	const min = Math.floor(time / 60)
	const sec = time % 60
	return (
		<Wrapper>
			<Span>{ min < 10 ? '0' + min : min }</Span>:
			<Span>{ sec < 10 ? '0' + sec : sec }</Span>
		</Wrapper>
	)
}

Time.propTypes = propTypes

export default Time