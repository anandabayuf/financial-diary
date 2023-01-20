import { DatePicker } from 'antd';
import styled from 'styled-components';
import { StyledDatePickerProps } from '../interfaces/interfaces';

const StyledDatePicker = styled(DatePicker)<StyledDatePickerProps>`
	background-color: ${(props) => props.theme.container} !important;
	border-color: ${(props) => props.theme.container};
	width: 100% !important;

	:hover {
		border-color: ${(props) => props.theme.text};
	}

	.ant-picker-input {
		input {
			color: ${(props) => props.theme.text};
			font-family: 'Comfortaa', cursive;
			font-weight: 400;

			::placeholder {
				color: ${(props) => props.theme.halfText};
			}
		}

		.ant-picker-suffix,
		.ant-picker-clear {
			color: ${(props) => props.theme.text};
			background-color: ${(props) => props.theme.container};
		}
	}
`;

export default StyledDatePicker;
