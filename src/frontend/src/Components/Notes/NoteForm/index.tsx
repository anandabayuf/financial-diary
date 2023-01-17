import { Form } from 'antd';
import { NoteFormProps } from './interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import AppFormItem from '../../General/AppFormItem/index';
import AppLoader from '../../General/AppLoader/index';
import AppButton from '../../General/AppButton/index';
import AppDatePicker from '../../General/AppDatePicker/index';

const NoteForm: React.FC<NoteFormProps> = ({
	handleSubmit,
	isLoading,
	handleChangeDatePicker,
}) => {
	const navigate = useNavigate();

	return (
		<Form
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
		>
			<AppFormItem
				label='Note Month'
				name='date'
				rules={[
					{ required: true, message: 'Please input note month!' },
				]}
			>
				<AppDatePicker
					placeholder='Select month...'
					picker='month'
					onChange={handleChangeDatePicker}
				/>
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
								Create Note
							</AppButton>
						</>
					)}
				</div>
			</AppFormItem>
		</Form>
	);
};

export default NoteForm;
