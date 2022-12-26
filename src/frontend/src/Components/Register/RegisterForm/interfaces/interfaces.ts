import { UploadFile, UploadProps, RcFile } from 'antd/es/upload';

export interface RegisterFormProps {
	handleFinish?: (values: string) => void;
	handleFinishFailed?: (errorInfo: any) => void;
	loading?: boolean;
	handleUploadImage?: {
		fileList?: UploadFile[];
		handleCancelViewProfilePic?: () => void;
		handlePreviewProfilePic?: (file: UploadFile) => void;
		handleChangeUpload?: UploadProps['onChange'];
		handleBeforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean;
	};
}

export interface StyledUploadProps {
	bordercolor?: string;
}
