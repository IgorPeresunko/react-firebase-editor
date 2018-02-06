import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px auto 40px
`

export const Icon = styled.span`
	color: #fff;
	font-size: 18px;
	padding: 0 6px;

	&:nth-child(2) {
		font-size: 22px;
	}
`

export const Range = styled.input`
	-webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: rgba(250, 250, 250, .2);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
	margin: 10px auto;
	
	&:hover {
		opacity: 1;
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #fff;
		cursor: pointer;
	}
	&::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #fff;
		cursor: pointer;
	}
`