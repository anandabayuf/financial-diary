import styled from 'styled-components';
import { Card } from 'antd';
import { StyledCardProps } from '../interfaces/interfaces';

const StyledCard = styled(Card)<StyledCardProps>`
	background-color: ${(props) => props.backgroundcolor};

	@media screen and (max-width: 425px) {
		display: contents;
	}
`;

export default StyledCard;
