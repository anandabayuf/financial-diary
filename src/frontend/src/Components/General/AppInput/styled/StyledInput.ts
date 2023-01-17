import styled from 'styled-components';
import { Input } from 'antd';

const StyledInput = styled(Input)`
	font-family: 'Comfortaa', cursive !important;
	font-weight: 400 !important;
	background-color: ${(props) => props.theme.container};
	color: ${(props) => props.theme.text};
	border-color: ${(props) => props.theme.container};

	::placeholder {
		color: ${(props) => props.theme.halfText};
	}

	:hover,
	:focus {
		border-color: ${(props) => props.theme.text};
	}
`;

export default StyledInput;
