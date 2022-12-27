import styled from 'styled-components';
import { Typography } from 'antd';
import { StyledTitleProps } from '../interfaces/interfaces';

const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	color: ${(props) => props.titlecolor} !important;
	font-family: 'Comfortaa', cursive !important;
	font-weight: 700 !important;
	margin: 0px !important;
`;

export default StyledTitle;
