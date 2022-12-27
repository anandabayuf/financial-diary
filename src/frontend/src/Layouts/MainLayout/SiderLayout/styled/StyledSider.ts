import styled from 'styled-components';
import Sider from 'antd/es/layout/Sider';
import { StyledSiderProps } from '../interfaces/interfaces';

const StyledSider = styled(Sider)<StyledSiderProps>`
	width: 200px;
	display: none;

	.ant-menu {
		background-color: ${(props) => props.backgroundcolor} !important;
		border-right: 1px solid ${(props) => props.borderrightcolor} !important;
	}

	@media screen and (min-width: 1024px) {
		display: block !important;
	}
`;

export default StyledSider;
