import { Input } from 'antd';
import styled from 'styled-components';
import { StyledSearchInputProps } from '../interfaces/interfaces';

const { Search } = Input;

const StyledSearchInput = styled(Search)<StyledSearchInputProps>`
	width: auto !important;

	.ant-input-affix-wrapper {
		background-color: ${(props) => props.theme.container};
		border-color: ${(props) => props.theme.container};

		input {
			background-color: ${(props) => props.theme.container};
			color: ${(props) => props.theme.text};
			font-family: 'Comfortaa', cursive !important;
			font-weight: 400 !important;

			::placeholder {
				color: ${(props) => props.theme.halfText};
			}
		}

		:hover {
			border-color: ${(props) => props.theme.text};
		}

		.ant-input-clear-icon {
			color: ${(props) => props.theme.text};
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.ant-input-affix-wrapper-focused {
		border-color: ${(props) => props.theme.text} !important;
	}

	.ant-input-search-button {
		background-color: ${(props) => props.theme.container};

		:hover {
			background-color: ${(props) => props.theme.container};
			border-top: 1px solid ${(props) => props.theme.text};
			border-bottom: 1px solid ${(props) => props.theme.text};
			border-right: 1px solid ${(props) => props.theme.text};
		}

		span {
			display: flex;
			justify-content: center;
			align-items: center;

			color: ${(props) => props.theme.text};
		}
	}
`;

export default StyledSearchInput;
