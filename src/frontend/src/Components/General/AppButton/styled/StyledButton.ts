import styled from 'styled-components';
import { Button } from 'antd';
import { StyledButtonProps } from '../interfaces/interfaces';

const StyledButton = styled(Button)<StyledButtonProps>`
	background-color: ${(props) =>
		(props.type === 'default' || props.type === 'primary') &&
		props.backgroundcolor} !important;

	font-family: 'Comfortaa', cursive !important;
	font-weight: 500 !important;
	color: ${(props) =>
		props.type === 'default' || props.type === 'primary'
			? props.textcolor
			: props.backgroundcolor} !important;

	:hover {
		background-color: ${(props) =>
			(props.type === 'default' || props.type === 'primary') &&
			'rgba(63, 114, 175, 0.5)'} !important;

		span {
			text-decoration: ${(props) =>
				props.type === 'link' ? 'underline' : 'none'} !important;
		}
	}
`;

export default StyledButton;
