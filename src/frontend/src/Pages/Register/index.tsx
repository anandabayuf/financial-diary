import { Modal } from 'antd';
import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import AppButton from '../../Components/General/AppButton';
import AppText from '../../Components/General/AppText';
import StyledRegisterContainer from './styled/StyledRegisterContainer';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../Components/Register/RegisterForm/index';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { getBase64 } from '../../Utils/ImageUtils';
import { register } from '../../Api/Auth';
import StyledTitle from './styled/StyledTitle';
import AppMessage from '../../Components/General/AppMessage/index';

const RegisterPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [previewState, setPreviewState] = useState({
		isOpen: false,
		image: '',
		title: '',
	});
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const navigate = useNavigate();

	const handleRegister = async (values: any) => {
		setLoading(true);
		const { picture, passwordconfirm, ...data } = values;

		const payload = new FormData();
		if (picture && picture.fileList.length !== 0) {
			payload.append('picture', picture.fileList[0].originFileObj);
		}
		payload.append('data', JSON.stringify(data));

		const res = await register(payload);

		if (res.request.status === 404) {
			AppMessage({
				content: `${res.response.data.message}, username already taken.`,
				type: 'error',
			});
			setLoading(false);
		} else if (res.request.status === 201) {
			AppMessage({ content: res.data.message, type: 'success' });
			setTimeout(() => {
				navigate('/login', { replace: true });
				setLoading(false);
			}, 2000);
		}
	};

	const handleRegisterFailed = (errorInfo: string) => {};

	const handleClickLogin = () => {
		navigate('/login');
	};

	const handleCancelViewProfilePic = () =>
		setPreviewState({
			...previewState,
			isOpen: false,
		});

	const handlePreviewProfilePic = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewState({
			...previewState,
			isOpen: true,
			title:
				file.name ||
				file.url!.substring(file.url!.lastIndexOf('/') + 1),
			image: file.url || (file.preview as string),
		});
	};

	const handleChangeUpload: UploadProps['onChange'] = ({
		fileList: newFileList,
		file: newFile,
	}) => {
		const isJpgOrPng =
			newFile.type === 'image/jpeg' || newFile.type === 'image/png';
		const isLt2M = newFile?.size! / 1024 / 1024 < 2;
		if (isJpgOrPng && isLt2M) {
			setFileList(newFileList);
		}
	};

	const handleBeforeUpload = (file: RcFile, FileList: RcFile[]) => {
		const isJpgOrPng =
			file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			AppMessage({
				content: 'You can only upload JPG/PNG file!',
				type: 'error',
			});
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			AppMessage({
				content: 'Image must smaller than 2MB!',
				type: 'error',
			});
		}

		if (isJpgOrPng && isLt2M) {
			setFileList([file]);
		}

		return false;
	};

	return (
		<FrontLayout>
			<AppCard>
				<StyledTitle
					level={3}
					title='Register'
				/>
				<RegisterForm
					handleFinish={handleRegister}
					handleFinishFailed={handleRegisterFailed}
					loading={loading}
					handleUploadImage={{
						fileList: fileList,
						handleBeforeUpload: handleBeforeUpload,
						handleChangeUpload: handleChangeUpload,
						handlePreviewProfilePic: handlePreviewProfilePic,
					}}
				/>
				<StyledRegisterContainer>
					<AppText
						text='Already have an account?'
						className='text-xs'
					/>
					<AppButton
						type='link'
						onClick={handleClickLogin}
					>
						Login
					</AppButton>
				</StyledRegisterContainer>
			</AppCard>
			<Modal
				open={previewState.isOpen}
				title={previewState.title}
				footer={null}
				onCancel={handleCancelViewProfilePic}
			>
				<img
					alt='example'
					style={{ width: '100%' }}
					src={previewState.image}
				/>
			</Modal>
		</FrontLayout>
	);
};

export default RegisterPage;
