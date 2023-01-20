import styled from 'styled-components';
import { Checkbox } from 'antd';
import { StyledCheckboxGroupProps } from '../interfaces/interfaces';

const StyledCheckboxGroup = styled(Checkbox.Group)<StyledCheckboxGroupProps>`
	/* display: block !important; */
	margin-top: 1rem;
	.ant-checkbox-wrapper {
		margin-inline-start: 0px;
		margin-bottom: 1rem;
		span {
			font-family: 'Comfortaa', cursive !important;
			font-weight: 400 !important;
			color: ${(props) => props.checkboxtheme?.text};
		}

		.ant-checkbox .ant-checkbox-inner {
			background-color: ${(props) => props.checkboxtheme?.text};
			border-color: ${(props) => props.checkboxtheme?.text};
		}

		.ant-checkbox.ant-checkbox-checked .ant-checkbox-inner {
			background-color: ${(props) => props.checkboxtheme?.button};
			border-color: ${(props) => props.checkboxtheme?.button};
		}

		:hover {
			.ant-checkbox.ant-checkbox-checked .ant-checkbox-inner {
				background-color: ${(props) => props.checkboxtheme?.button};
				border-color: ${(props) => props.checkboxtheme?.button};
			}

			.ant-checkbox-checked::after {
				border: none !important;
				animation: none !important;
			}
		}
	}
`;

export default StyledCheckboxGroup;
