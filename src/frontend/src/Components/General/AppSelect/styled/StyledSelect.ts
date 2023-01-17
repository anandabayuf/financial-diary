import { Select } from 'antd';
import styled from 'styled-components';
import { StyledSelectProps } from '../interfaces/interfaces';

const StyledSelect = styled(Select)<StyledSelectProps>`
	.ant-select-selector {
		background-color: ${(props) => props.theme?.container} !important;
		border-color: transparent !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		color: ${(props) => props.theme?.text} !important;

		:hover {
			border-color: ${(props) => props.theme?.container} !important;
		}
	}

	.ant-select-arrow {
		color: ${(props) => props.theme?.text} !important;
	}

	.ant-select-dropdown {
		background-color: ${(props) => props.theme?.container} !important;
		color: ${(props) => props.theme?.text} !important;
	}

	.ant-select-item-option {
		color: ${(props) => props.theme?.text} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		:hover {
			background-color: ${(props) => props.theme?.button};
		}
	}

	.ant-select-item-option-selected {
		background-color: ${(props) => props.theme?.button};
	}

	.ant-select-selection-item {
		color: ${(props) => props.theme?.text} !important;
	}

	:where(.ant-select-dropdown) {
		background-color: ${(props) => props.theme?.container} !important;
	}
`;

export default StyledSelect;
