import styled from 'styled-components';
import { Card } from 'antd';
import { StyledCardProps } from '../interfaces/interfaces';

const StyledCard = styled(Card)<StyledCardProps>`
	background-color: ${(props) => props.backgroundcolor};

	@media screen and (max-width: 425px) {
		display: ${(props) => !props.ismobileshowcard && 'contents'};

		.ant-card-body {
			padding: ${(props) => props.ismobileshowcard && '16px'};
		}
	}
`;

export default StyledCard;
