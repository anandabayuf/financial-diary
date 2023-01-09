import { Form } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import AppInput from '../../../General/AppInput';
import { WalletFormProps } from './interfaces/interfaces';
import AppButton from '../../../General/AppButton/index';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../../../General/AppLoader';

const WalletForm: React.FC<WalletFormProps> = ({
	isEdit,
	data,
	handleSubmit,
	isLoading,
}) => {
	const navigate = useNavigate();

	return (
		<Form
			autoComplete='on'
			layout='vertical'
			initialValues={data}
			onFinish={handleSubmit}
		>
			<AppFormItem
				label='Wallet Name'
				name='name'
				rules={[
					{ required: true, message: 'Please input wallet name!' },
				]}
			>
				<AppInput placeholder='input wallet name...' />
			</AppFormItem>

			<AppFormItem>
				<div className='flex justify-center items-center gap-x-3'>
					{isLoading ? (
						<AppLoader />
					) : (
						<>
							<AppButton
								block
								type='text'
								onClick={() => navigate(-1)}
							>
								Cancel
							</AppButton>
							<AppButton
								htmlType='submit'
								block
								type='primary'
							>
								{isEdit ? 'Edit Wallet' : 'Create Wallet'}
							</AppButton>
						</>
					)}
				</div>
			</AppFormItem>
		</Form>
	);
};

export default WalletForm;
