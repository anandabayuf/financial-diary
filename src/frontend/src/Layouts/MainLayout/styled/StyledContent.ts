import styled from 'styled-components';
import { Layout } from 'antd';
import { StyledContentProps } from '../interfaces/interfaces';

const { Content } = Layout;

const StyledContent = styled(Content)<StyledContentProps>`
	background-color: ${(props) => props.backgroundcolor};
	padding: 30px;

	@media screen and (max-width: 768px) {
		padding: 10px;
	}
`;

export default StyledContent;
