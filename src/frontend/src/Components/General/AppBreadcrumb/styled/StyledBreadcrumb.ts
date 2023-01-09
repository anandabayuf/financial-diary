import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { StyledBreadcrumbProps } from '../interfaces/interfaces';

const StyledBreadcrumb = styled(Breadcrumb)<StyledBreadcrumbProps>`
	.ant-breadcrumb-separator {
		color: ${(props) => props.separatorcolor} !important;
	}

	.ant-breadcrumb-link a {
		color: ${(props) => props.linkcolor} !important;
		font-family: 'Comfortaa', cursive;
		font-weight: 300;
		font-size: 12px;

		:hover {
			text-decoration: underline;
		}
	}
`;

export default StyledBreadcrumb;
