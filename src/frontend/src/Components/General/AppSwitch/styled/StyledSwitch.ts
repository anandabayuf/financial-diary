import { Switch } from 'antd';
import styled from 'styled-components';
import { StyledSwitchProps } from '../interfaces/interfaces';

const StyledSwitch = styled(Switch)<StyledSwitchProps>`
	background-color: ${(props) =>
		props.checked
			? props.switchtheme?.bg
			: props.switchtheme?.bg} !important;

	.ant-switch-inner-checked {
		margin-top: 5px !important;
	}

	.ant-switch-inner-unchecked {
		margin-top: -12.5px !important;
	}
`;

export default StyledSwitch;
