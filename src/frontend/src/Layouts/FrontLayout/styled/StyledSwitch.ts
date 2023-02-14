import styled from 'styled-components';
import AppSwitch from '../../../Components/General/AppSwitch/index';
import { StyledSwitchProps } from '../interfaces/interfaces';

const StyledSwitch = styled(AppSwitch)<StyledSwitchProps>`
	background-color: ${(props) => props.switchtheme?.container} !important;
	.ant-switch-inner-checked {
		margin-top: 6px !important;
	}
	.ant-switch-inner-unchecked {
		margin-top: -16px !important;
	}
	height: 30px !important;
	width: 60px !important;

	.ant-switch-handle {
		top: 6px;
	}
`;

export default StyledSwitch;
