import styled from 'styled-components';
import { Layout } from 'antd';
import { StyledContentProps } from '../interfaces/interfaces';

const { Content } = Layout;

const StyledContent = styled(Content)<StyledContentProps>`
	background-color: ${(props) => props.backgroundcolor};
	padding: 10px;

	@media screen and (min-width: 1024px) {
		padding: 20px;
	}
`;

export default StyledContent;
