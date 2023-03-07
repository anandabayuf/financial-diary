import { UploadFile, UploadProps, RcFile } from 'antd/es/upload';

export type RegisterFormType = {
	picture: {
		file: RcFile;
		fileList: UploadProps['fileList'];
	};
	name: string;
	username: string;
	email: string;
	password: string;
	passwordconfirm: string;
};

export interface RegisterFormProps {
	handleFinish?: (values: RegisterFormType) => void;
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
	widthupload?: number;
}
