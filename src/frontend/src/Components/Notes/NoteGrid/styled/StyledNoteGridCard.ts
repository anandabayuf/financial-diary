import styled from 'styled-components';
import AppCard from '../../../General/AppCard/index';

const StyledNoteGridCard = styled(AppCard)`
	width: 200px;

	@media screen and (max-width: 320px) {
		width: 100% !important;
	}

	@media screen and (max-width: 425px) {
		width: 175px;
	}
`;

export default StyledNoteGridCard;
