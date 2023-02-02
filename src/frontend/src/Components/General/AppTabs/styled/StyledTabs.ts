import { Tabs } from 'antd';
import styled from 'styled-components';
import { StyledTabsProps } from '../interfaces/interfaces';

const StyledTabs = styled(Tabs)<StyledTabsProps>`
	.ant-tabs-nav::before {
		border-bottom-color: ${(props) => props.theme.container} !important;
	}

	.ant-tabs-nav-more {
		color: ${(props) => props.theme.text} !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ant-tabs-tab {
		background-color: ${(props) => props.theme.container} !important;
		border: none !important;

		svg {
			fill: ${(props) => props.theme.text} !important;
			stroke: ${(props) => props.theme.text} !important;
		}
	}

	.ant-tabs-tab-active {
		background-color: ${(props) => props.theme.button} !important;
		border-bottom: none !important;
	}
`;

export default StyledTabs;
