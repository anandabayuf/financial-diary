import styled from 'styled-components';
import { Layout } from 'antd';
import { StyledContentProps } from '../interfaces/interfaces';

const { Content } = Layout;

const StyledContent = styled(Content)<StyledContentProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.backgroundcolor};
`;

export default StyledContent;
