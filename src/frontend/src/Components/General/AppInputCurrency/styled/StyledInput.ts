import styled from 'styled-components';
import { InputNumber } from 'antd';

const StyledInputCurrency = styled(InputNumber)`
	width: 100%;
	font-family: 'Comfortaa', cursive !important;
	font-weight: 400 !important;
	background-color: ${(props) => props.theme.container};
	border-color: ${(props) => props.theme.container};

	.ant-input-number-input-wrap input,
	.ant-input-number-group-addon {
		color: ${(props) => props.theme.text};
	}

	.ant-input-number-input-wrap input::placeholder {
		color: ${(props) => props.theme.halfText};
	}

	:hover,
	:focus {
		border-color: ${(props) => props.theme.text};
	}

	.ant-input-number-group-addon {
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		border-color: ${(props) => props.theme.container};
	}

	.ant-input-number-group-addon:hover,
	.ant-input-number-group-addon:focus {
		border-color: ${(props) => props.theme.text};
	}
`;

export default StyledInputCurrency;
