import styled from 'styled-components';
import { Modal } from 'antd';
import { StyledModalProps } from '../interfaces/interfaces';

const StyledModal = styled(Modal)<StyledModalProps>`
	.ant-modal-header {
		background-color: ${(props) => props.modaltheme?.container} !important;
	}
	.ant-modal-content {
		background-color: ${(props) => props.modaltheme?.container} !important;
		color: ${(props) => props.modaltheme?.text};

		.ant-modal-close {
			color: ${(props) => props.modaltheme?.button};

			span {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
`;

export default StyledModal;
