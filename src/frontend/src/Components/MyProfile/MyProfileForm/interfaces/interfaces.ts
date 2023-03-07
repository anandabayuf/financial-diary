import {
	UploadFile,
	UploadProps,
	RcFile,
	UploadListProps,
} from 'antd/es/upload';
import { i18n } from 'i18next';

export interface EditUserPayload {
	picture?: {
		file: RcFile;
		fileList: UploadProps['fileList'];
	} | null;
	name?: string;
	username?: string;
}

export interface MyProfileFormProps {
	user?: EditUserPayload;
	isLoading?: boolean;
	handleSubmit?: (values: EditUserPayload) => void;
	handleCancel?: () => void;
	handleUploadImage?: {
		fileList?: UploadFile[];
		handleCancelViewProfilePic?: () => void;
		handlePreviewProfilePic?: (file: UploadFile) => void;
		handleChangeUpload?: UploadProps['onChange'];
		handleBeforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean;
		handleRemove?: UploadProps['onRemove'];
	};
	previewModalProps?: {
		previewState?: {
			isOpen?: boolean;
			image?: string;
		};
		handleCancelViewProfilePic?: () => void;
	};
	I18n?: i18n;
}
