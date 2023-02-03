import { Form, Space, Avatar } from 'antd';
import AppCard from '../../General/AppCard';
import AppFormItem from '../../General/AppFormItem';
import AppInput from '../../General/AppInput';
import { MyProfileFormProps } from './interfaces/interfaces';
import StyledUpload from '../../Register/RegisterForm/styled/StyledUpload';
import useTheme from '../../../Hooks/useTheme';
import UploadButton from '../../Register/UploadButton';
import AppButton from '../../General/AppButton/index';
import AppModal from '../../General/AppModal/index';
import AppTitle from '../../General/AppTitle/index';
import AppLoader from '../../General/AppLoader';

const MyProfileForm: React.FC<MyProfileFormProps> = ({
	user,
	isLoading,
	handleSubmit,
	handleCancel,
	handleUploadImage,
	previewModalProps,
}) => {
	const theme = useTheme();
	return (
		<>
			<AppCard>
				<Form
					autoComplete='on'
					layout='vertical'
					initialValues={{
						name: user.name,
						username: user.username,
					}}
					onFinish={handleSubmit}
				>
					<AppFormItem name='picture'>
						<StyledUpload
							widthupload={150}
							bordercolor={theme?.text}
							listType='picture-card'
							fileList={handleUploadImage?.fileList}
							onPreview={
								handleUploadImage?.handlePreviewProfilePic
							}
							onChange={handleUploadImage?.handleChangeUpload}
							beforeUpload={handleUploadImage?.handleBeforeUpload}
							onRemove={handleUploadImage?.handleRemove}
						>
							{handleUploadImage?.fileList!.length ===
							1 ? null : (
								<UploadButton />
							)}
						</StyledUpload>
					</AppFormItem>
					<AppFormItem
						label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input username!',
							},
							{
								pattern: new RegExp(/^[^\s-]+$/g),
								message: 'No spaces allowed!',
							},
						]}
					>
						<AppInput placeholder='input username...' />
					</AppFormItem>
					<AppFormItem
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input profile name!',
							},
						]}
					>
						<AppInput placeholder='input profile name...' />
					</AppFormItem>

					{isLoading ? (
						<AppLoader />
					) : (
						<div className='flex justify-center gap-x-5 mt-10'>
							<AppButton
								type='text'
								onClick={handleCancel}
							>
								<Space>Cancel</Space>
							</AppButton>
							<AppButton
								type='primary'
								htmlType='submit'
							>
								<Space>Save</Space>
							</AppButton>
						</div>
					)}
				</Form>
			</AppCard>
			<AppModal
				open={previewModalProps?.previewState?.isOpen}
				title={
					<AppTitle
						title={'Profile Picture Preview'}
						level={5}
					/>
				}
				closable
				maskClosable
				footer={null}
				onCancel={previewModalProps?.handleCancelViewProfilePic}
			>
				<div className='flex justify-center '>
					<Avatar
						src={previewModalProps?.previewState?.image}
						className='w-[400px] h-[400px] shadow-lg max-sm:w-[200px] max-sm:h-[200px]'
					/>
				</div>
			</AppModal>
		</>
	);
};

export default MyProfileForm;
