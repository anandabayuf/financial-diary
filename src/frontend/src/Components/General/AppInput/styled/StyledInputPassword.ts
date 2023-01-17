import { Input } from 'antd';
import styled from 'styled-components';

const StyledInputPassword = styled(Input.Password)`
	background-color: ${(props) => props.theme.container};
	border-color: ${(props) => props.theme.container};

	input {
		background-color: ${(props) => props.theme.container};
		color: ${(props) => props.theme.text};

		::placeholder {
			color: ${(props) => props.theme.halfText};
		}
	}

	.ant-input-suffix svg {
		fill: ${(props) => props.theme.text};
	}
`;

export default StyledInputPassword;
