import { Select } from 'antd';
import styled from 'styled-components';
import { StyledSelectProps } from '../interfaces/interfaces';

const StyledSelect = styled(Select<any>)<StyledSelectProps>`
	.ant-select-selector {
		background-color: ${(props) => props.themeselect?.container} !important;
		border-color: ${(props) => props.themeselect?.container} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		color: ${(props) => props.themeselect?.text} !important;
		.ant-select-selection-item {
			color: ${(props) =>
				props.disabled && props.themeselect?.halfText} !important;
		}

		:hover {
			border-color: ${(props) => props.themeselect?.text} !important;
		}

		.ant-select-selection-placeholder {
			color: ${(props) => props.themeselect?.halfText};
		}
	}

	.ant-select-arrow {
		color: ${(props) =>
			props.disabled
				? props.themeselect?.halfText
				: props.themeselect?.text} !important;
	}

	.ant-select-clear {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ${(props) => props.themeselect?.container};
		color: ${(props) => props.themeselect?.text};

		:hover {
			color: ${(props) => props.themeselect?.halfText};
		}
	}

	.ant-select-dropdown {
		background-color: ${(props) => props.themeselect?.container} !important;
		color: ${(props) => props.themeselect?.text} !important;
	}

	.ant-select-item-option {
		color: ${(props) => props.themeselect?.text} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
		:hover {
			background-color: ${(props) => props.themeselect?.button};
		}
	}

	.ant-select-item-option-selected {
		background-color: ${(props) => props.themeselect?.button};
	}

	.ant-select-selection-item {
		color: ${(props) => props.themeselect?.text} !important;
	}

	:where(.ant-select-dropdown) {
		background-color: ${(props) => props.themeselect?.container} !important;
	}
`;

export default StyledSelect;
