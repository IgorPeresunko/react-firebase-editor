import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
	words: PropTypes.number.isRequired
}

const Wrapper = styled.div`
	position: fixed;
	left: 0px;
	bottom: 0px;
	padding: 20px;
	color: #fff;
	font-size: 16px;
	opacity: 1;
`

const Info = ({ words }) => (
	<Wrapper>{ words }</Wrapper>
)

Info.propTypes = propTypes

export default Info