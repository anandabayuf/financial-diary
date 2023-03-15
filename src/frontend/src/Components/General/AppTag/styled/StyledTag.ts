import { Tag } from 'antd';
import styled from 'styled-components';

const StyledTag = styled(Tag)`
	margin-inline: 0px;
	font-family: 'Comfortaa', cursive !important;
	font-weight: 400 !important;

	background-color: ${(props) =>
		props.color === 'success'
			? '#52c41a'
			: props.color === 'error'
			? '#ff4d4f'
			: ''};
	color: white;
	border: none;
`;

export default StyledTag;
