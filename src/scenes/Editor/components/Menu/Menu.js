import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Info from '../Info'
import SidePanel from '../SidePanel'
import Pages from '../Pages'

const propTypes = {
	funcs: PropTypes.object,
	words: PropTypes.number,
	fullscreen: PropTypes.bool
}

const Wrapper = styled.div`
	
`

const Icon = styled.div`
	position: fixed;
	top: 20px;
	left: 20px;
	display: none;
	
	& > i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
	}

	@media screen and (min-width: 1180px) {
		display: none;
	}
`

const Menu = ({
	funcs,
	words,
	fullscreen
}) => (
	<Wrapper>
		<Icon><i className="fas fa-bars"></i></Icon>
		<Info words={words} />
		<SidePanel funcs={funcs} full={fullscreen} />
		<Pages loadPage={funcs.loadPage} newPage={funcs.newPage}/>
	</Wrapper>
)

Menu.propTypes = propTypes

export default Menu