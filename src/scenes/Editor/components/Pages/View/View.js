import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
	data: PropTypes.shape({
		pages: PropTypes.array
	}),
	funcs: PropTypes.shape({
		onClick: PropTypes.func,
		createNewPage: PropTypes.func,
	})
}

const Wrapper = styled.div`
	position: fixed;
	top: 80px;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 20px;
	width: 180px;
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

const Page = styled.div`
	width: calc(100% - 53px);
	padding: 5px 24px;
	margin: 3px auto;
	margin-right: 5px;
	background-color: rgba(250, 250, 250, .15);
	color: #fff;
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const Pages = styled.div`
	max-height: 300px;
	width: 100%;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 3px;
	}
 
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(250,250,250,0.3);
	}
	
	&::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}
`


const View = ({
	data: {
		pages
	},
	funcs
}) => (
	<Wrapper>
		<Title>Your pages</Title>
		<Pages>{
			pages.map(page => (
				<Page onClick={funcs.onClick(page.id)} key={page.id}>{
					page.title
				}</Page>
			))
		}</Pages>
		<Button onClick={funcs.createNewPage}>Add new</Button>

	</Wrapper>
)

View.propTypes = propTypes

export default View