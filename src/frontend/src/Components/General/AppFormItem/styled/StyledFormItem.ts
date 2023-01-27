import styled from 'styled-components';
import { Form } from 'antd';
import { StyledFormItemProps } from '../interfaces/interfaces';

const StyledFormItem = styled(Form.Item)<StyledFormItemProps>`
	.ant-form-item-label label {
		color: ${(props) => props.formitemtheme?.text} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
	}

	.ant-form-item-explain {
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
	}

	input.ant-input {
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
	}

	.ant-form-item-optional {
		display: none !important;
	}

	.ant-form-item-extra {
		color: ${(props) => props.formitemtheme?.halfText} !important;
		font-family: 'Comfortaa', cursive !important;
		font-weight: 400 !important;
	}
`;

export default StyledFormItem;

// .ant-form-item-explain-error,
// 	.ant-form-item-control,
// 	.ant-input-password {
// 		font-family: 'Comfortaa', cursive !important;
// 		font-weight: 400 !important;
// 	}

// 	.ant-form-item-control-input-content > input,
// 	.ant-input-password {
// 		border-radius: 0.5rem /* 8px */ !important;
// 	}
