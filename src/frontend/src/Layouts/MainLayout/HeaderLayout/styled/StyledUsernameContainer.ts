import styled from 'styled-components';
import { StyledUsernameContainerProps } from '../interfaces/interfaces';

const StyledUsernameContainer = styled.div<StyledUsernameContainerProps>`
	width: 50px;
	color: ${(props) => props.themecontainer?.text};

	@media screen and (min-width: 768px) {
		width: auto;
		max-width: 100px;
	}

	@media screen and (max-width: 320px) {
		display: none !important;
	}
`;

export default StyledUsernameContainer;
