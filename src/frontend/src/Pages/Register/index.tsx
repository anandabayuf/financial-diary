import AppCard from '../../Components/General/AppCard';
import FrontLayout from '../../Layouts/FrontLayout';
import AppButton from '../../Components/General/AppButton';
import AppText from '../../Components/General/AppText';
import StyledRegisterContainer from './styled/StyledRegisterContainer';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../Components/Register/RegisterForm/index';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { useState, useEffect } from 'react';
import { getBase64 } from '../../Utils/ImageUtils';
import { register } from '../../Api/Auth';
import AppMessage from '../../Components/General/AppMessage/index';
import AppLogo from '../../Components/General/AppLogo/index';
import AppTitle from '../../Components/General/AppTitle/index';
import useLocale from '../../Hooks/useLocale';
import AppModal from '../../Components/General/AppModal/index';
import { errorHandling } from '../../Api/errorHandling';
import { encryptPassword } from '../../Utils/AuthUtils';
import { APP_NAME } from '../../Constants/Constants';

const RegisterPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [previewState, setPreviewState] = useState({
		isOpen: false,
		image: '',
		title: '',
	});
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const navigate = useNavigate();
	const { I18n, language } = useLocale();

	const handleRegister = async (values: any) => {
		setLoading(true);
		let { picture, passwordconfirm, password, ...data } = values;

		try {
			data['password'] = encryptPassword(password);
		} catch (error) {
			errorHandling(error, navigate);
		}

		const payload = new FormData();
		if (picture && picture.fileList.length !== 0) {
			payload.append('picture', picture.fileList[0].originFileObj);
		}
		payload.append('data', JSON.stringify(data));

		try {
			const res = await register(payload);
			AppMessage({ content: I18n.t(res.data.message), type: 'success' });
			navigate('/login', { replace: true });
		} catch (error) {
			errorHandling(error, navigate);
		}

		setLoading(false);
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
				content: I18n.t('form.validation.upload_only_image'),
				type: 'error',
			});
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			AppMessage({
				content: I18n.t('form.validation.size_lower_than_2mb'),
				type: 'error',
			});
		}

		if (isJpgOrPng && isLt2M) {
			setFileList([file]);
		}

		return false;
	};

	useEffect(() => {
		document.title = `${I18n.t('register')} - ${APP_NAME}`;
	}, [language, I18n]);

	return (
		<FrontLayout>
			<AppCard>
				<div className='min-[426px]:hidden flex justify-center mb-3'>
					<AppLogo width='128px' />
				</div>
				<div className='flex justify-between items-baseline mb-5'>
					<AppTitle
						level={4}
						title={I18n.t('register')!}
					/>
					<div className='max-[425px]:hidden'>
						<AppLogo width='128px' />
					</div>
				</div>
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
						text={I18n.t('content.already_have_an_account?')}
						className='text-xs'
					/>
					<AppButton
						type='link'
						onClick={handleClickLogin}
					>
						{I18n.t('login')}
					</AppButton>
				</StyledRegisterContainer>
			</AppCard>
			<AppModal
				open={previewState.isOpen}
				title={
					<AppTitle
						title={previewState.title}
						level={5}
					/>
				}
				closable
				onCancel={handleCancelViewProfilePic}
			>
				<img
					alt='example'
					style={{ width: '100%' }}
					src={previewState.image}
				/>
			</AppModal>
		</FrontLayout>
	);
};

export default RegisterPage;
