import { UploadFile, UploadProps, RcFile } from 'antd/es/upload';
import { i18n } from 'i18next';

export interface MyProfileFormProps {
	user?: any;
	isLoading?: boolean;
	handleSubmit?: (values: any) => void;
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
			image?: any;
		};
		handleCancelViewProfilePic?: () => void;
	};
	I18n?: i18n;
}
