import styled from 'styled-components';
import { Empty } from 'antd';
import { StyledEmptyProps } from '../interfaces/interfaces';

const StyledEmpty = styled(Empty)<StyledEmptyProps>`
	.ant-empty-description {
		color: ${(props) => props.textcolor} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
	}
`;

export default StyledEmpty;
