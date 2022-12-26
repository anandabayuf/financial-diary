import styled from 'styled-components';
import { Row } from 'antd';

const StyledContainer = styled(Row)`
	.illustration-container {
		display: none;
	}

	@media screen and (min-width: 768px) {
		.illustration-container {
			display: flex;
		}

		.illustration-container img {
			width: 300px !important;
		}

		.login-form-container {
			width: 300px !important;
		}
	}

	@media screen and (min-width: 1024px) {
		.illustration-container img {
			width: 500px !important;
		}
	}
`;

export default StyledContainer;
