import styled from 'styled-components';
import { Upload } from 'antd';
import { StyledUploadProps } from '../interfaces/interfaces';

const StyledUpload = styled(Upload)<StyledUploadProps>`
	.ant-upload-list {
		display: flex !important;
		justify-content: center !important;
	}

	.ant-upload-select,
	.ant-upload-list-item-container {
		width: ${(props) =>
			props.widthupload && `${props.widthupload}px`} !important;
		height: ${(props) =>
			props.widthupload && `${props.widthupload}px`} !important;
	}

	.ant-upload.ant-upload-select {
		margin-inline-end: 0px !important;
		margin: 0px !important;
		border-color: ${(props) => props.bordercolor} !important;
	}

	.ant-upload.ant-upload-select:hover {
		border-color: ${(props) => props.bordercolor} !important;
		--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
			0 8px 10px -6px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
			var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
	}

	.ant-upload-list-item-container {
		margin-block: 0px !important;
		margin-inline: 0px !important;
	}
`;

export default StyledUpload;
