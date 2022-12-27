import { Menu } from 'antd';
import styled from 'styled-components';
import { StyledMenuProps } from '../interfaces/interfaces';

const StyledMenu = styled(Menu)<StyledMenuProps>`
	.ant-menu-item-selected {
		background-color: ${(props) => props.theme.button} !important;
	}

	.ant-menu-item:hover,
	.ant-menu-submenu:hover {
		background-color: rgba(63, 114, 175, 0.5) !important;
	}

	.ant-menu-submenu-arrow {
		color: ${(props) => props.theme.text} !important;
	}

	.ant-menu-item svg,
	.ant-menu-submenu svg {
		fill: ${(props) => props.theme.text};
		stroke: ${(props) => props.theme.text};
	}
`;

export default StyledMenu;
