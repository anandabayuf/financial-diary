import styled from 'styled-components';
import { Drawer } from 'antd';
import { StyledDrawerProps } from '../interfaces/interfaces';

const StyledDrawer = styled(Drawer)<StyledDrawerProps>`
	.ant-drawer-content-wrapper {
		width: 200px !important;
	}

	.ant-drawer-header {
		background-color: ${(props) => props.backgroundcolor};
		border-bottom: 1px solid ${(props) => props.borderbottomcolor};
	}

	.ant-drawer-body {
		padding: 0px !important;
		background-color: ${(props) => props.backgroundcolor};
	}
`;

export default StyledDrawer;
