import styled from 'styled-components';

const StyledUsernameContainer = styled.div`
	width: 50px;

	@media screen and (min-width: 768px) {
		width: auto;
		max-width: 100px;
	}

	@media screen and (max-width: 320px) {
		display: none !important;
	}
`;

export default StyledUsernameContainer;
