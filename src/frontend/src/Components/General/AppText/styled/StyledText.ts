import styled from 'styled-components';
import { Typography } from 'antd';
import { StyledTextProps } from '../interfaces/interfaces';

const StyledText = styled(Typography.Text)<StyledTextProps>`
	color: ${(props) => props.textcolor} !important;
	font-family: 'Comfortaa', cursive !important;
	font-weight: 400 !important;
`;

export default StyledText;
