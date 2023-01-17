import { Segmented } from 'antd';
import styled from 'styled-components';
import { StyledSegmentedProps } from '../interfaces/interfaces';

const StyledSegmented = styled(Segmented)<StyledSegmentedProps>`
	background-color: ${(props) => props.theme.container} !important;

	.ant-segmented-item-selected,
	.ant-segmented-thumb {
		background-color: ${(props) => props.theme.button} !important;
	}

	.ant-segmented-item-icon {
		color: ${(props) => props.theme.text};
		display: flex !important;
		align-items: center !important;
		height: 25px;
	}
`;

export default StyledSegmented;
