import styled from 'styled-components';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem /* 16px */;

	@media screen and (max-width: 320px) {
		width: 100%;
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	@media screen and (min-width: 640px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media screen and (min-width: 1030px) {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	@media screen and (min-width: 1300px) {
		grid-template-columns: repeat(5, minmax(0, 1fr));
	}

	@media screen and (min-width: 1500px) {
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	@media screen and (min-width: 1700px) {
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	@media screen and (min-width: 1900px) {
		grid-template-columns: repeat(8, minmax(0, 1fr));
	}

	@media screen and (min-width: 2100px) {
		grid-template-columns: repeat(9, minmax(0, 1fr));
	}

	@media screen and (min-width: 2300px) {
		grid-template-columns: repeat(10, minmax(0, 1fr));
	}

	@media screen and (min-width: 2500px) {
		grid-template-columns: repeat(11, minmax(0, 1fr));
	}
`;

export default StyledGrid;
