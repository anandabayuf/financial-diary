import styled from 'styled-components';
import { Button } from 'antd';
import { StyledButtonProps } from '../interfaces/interfaces';

const StyledButton = styled(Button)<StyledButtonProps>`
	background-color: ${(props) =>
		props.type !== 'text' && props.backgroundcolor} !important;

	font-family: 'Comfortaa', cursive !important;
	font-weight: 500 !important;
	color: ${(props) =>
		props.type === 'text'
			? props.backgroundcolor
			: props.textcolor} !important;

	:hover {
		background-color: ${(props) =>
			props.type !== 'text' && 'rgba(63, 114, 175, 0.5)'} !important;
	}
`;

export default StyledButton;
