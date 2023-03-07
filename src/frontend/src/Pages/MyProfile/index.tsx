import MainLayout from '../../Layouts/MainLayout';
import AppTitle from '../../Components/General/AppTitle/index';
import AppBreadcrumb from '../../Components/General/AppBreadcrumb/index';
import { useAppSelector, useAppDispatch } from '../../Hooks/useRedux';
import MyProfileCard from '../../Components/MyProfile/MyProfileCard/index';
import AppButton from '../../Components/General/AppButton';
import { Space } from 'antd';
import { BsPencil } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import MyProfileForm from '../../Components/MyProfile/MyProfileForm';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import AppMessage from '../../Components/General/AppMessage';
import { getBase64, dataURLtoFile } from '../../Utils/ImageUtils';
import { editUserById } from '../../Api/User';
import { updateUserData } from '../../Store/User/UserSlice';
import useLocale from '../../Hooks/useLocale';
import { errorHandling } from '../../Api/errorHandling';
import { APP_NAME } from '../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import { TFetchErrorResponse } from '../../Api/interfaces/types';
import { EditUserPayload } from '../../Components/MyProfile/MyProfileForm/interfaces/interfaces';

const MyProfilePage: React.FC = () => {
	const { data, accessToken } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { I18n, language } = useLocale();

	const [isEdit, setIsEdit] = useState(false);

	const [profilePicture, setProfilePicture] = useState<UploadFile>();

	const [previewState, setPreviewState] = useState({
		isOpen: false,
		image: '',
	});

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const setProfilePicToFileList = () => {
			if (data && data.picture !== undefined && data.picture !== null) {
				const file = dataURLtoFile(
					`data:image/png;base64,${data.picture.data}`,
					'image.png'
				);
				setProfilePicture({
					name: file.name,
					uid: '-1',
					originFileObj: file as RcFile,
					type: file.type,
				});
				setFileList([
					{
						name: file.name,
						uid: '-1',
						originFileObj: file as RcFile,
						type: file.type,
					},
				]);
			} else {
				setProfilePicture(undefined);
			}
		};
		setProfilePicToFileList(); //eslint-disable-next-line
	}, [data]);

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

	const handleRemovePicture: UploadProps['onRemove'] = () => {
		setFileList([]);
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

	const handleClickEdit = () => {
		setIsEdit(true);
		handleRemovePicture(profilePicture!);
		if (profilePicture) {
			setFileList([profilePicture]);
		}
	};

	const handleClickCancelEdit = () => setIsEdit(false);

	const handleClickSaveEdit = async (values: EditUserPayload) => {
		setIsLoading(true);
		if (values && accessToken && data) {
			console.log(values.picture, fileList);
			let userData: EditUserPayload = {
				name: values.name,
				username: values.username,
			};
			let payload = new FormData();
			if (values.picture === undefined) {
				//if user do not edit their picture
			} else if (values.picture?.fileList?.length === 0) {
				//if user remove their picture
				userData['picture'] = null;
			} else if (
				fileList.length === 1 &&
				values.picture?.fileList?.length === 1
			) {
				//if user edited their picture
				payload.append(
					'picture',
					values.picture.fileList[0].originFileObj!
				);
			}
			payload.append('data', JSON.stringify(userData));
			try {
				const res = await editUserById(accessToken, data._id, payload);
				AppMessage({
					content: I18n.t(res.data.message),
					type: 'success',
				});
				dispatch(updateUserData(res.data.data));
				handleClickCancelEdit();
			} catch (error) {
				errorHandling(error as TFetchErrorResponse, navigate);
			}
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (isEdit) {
			document.title = `${I18n.t('edit_my_profile')} - ${APP_NAME}`;
		} else {
			document.title = `${I18n.t('my_profile')} - ${APP_NAME}`;
		}
	}, [isEdit, language, I18n]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={I18n.t('my_profile')!}
					level={5}
				/>
				{!isEdit && (
					<AppButton
						type='primary'
						onClick={handleClickEdit}
					>
						<Space>
							<div className='flex justify-center'>
								<BsPencil />
							</div>
							{I18n.t('label.edit.my_profile')}
						</Space>
					</AppButton>
				)}
			</div>
			{!isEdit && data ? (
				<MyProfileCard
					user={data}
					I18n={I18n}
				/>
			) : (
				<MyProfileForm
					user={{
						name: data?.name,
						username: data?.username,
					}}
					isLoading={isLoading}
					handleSubmit={handleClickSaveEdit}
					handleCancel={handleClickCancelEdit}
					handleUploadImage={{
						fileList: fileList,
						handleBeforeUpload: handleBeforeUpload,
						handleChangeUpload: handleChangeUpload,
						handlePreviewProfilePic: handlePreviewProfilePic,
						handleRemove: handleRemovePicture,
					}}
					previewModalProps={{
						previewState: previewState,
						handleCancelViewProfilePic: handleCancelViewProfilePic,
					}}
					I18n={I18n}
				/>
			)}
		</MainLayout>
	);
};

export default MyProfilePage;
