import { Space } from 'antd';
import styled from 'styled-components';

const StyledSpace = styled(Space)`
	gap: 3px !important;

	@media screen and (min-width: 375px) {
		gap: 5px !important;
	}
`;

export default StyledSpace;
