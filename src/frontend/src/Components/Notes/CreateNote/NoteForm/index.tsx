import { Form } from 'antd';
import { NoteFormProps } from './interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import AppFormItem from '../../../General/AppFormItem';
import AppLoader from '../../../General/AppLoader';
import AppButton from '../../../General/AppButton';
import AppDatePicker from '../../../General/AppDatePicker';

const NoteForm: React.FC<NoteFormProps> = ({
	handleSubmit,
	isLoading,
	handleChangeDatePicker,
	I18n,
}) => {
	const navigate = useNavigate();

	return (
		<Form
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
		>
			<AppFormItem
				label={I18n?.t('form.label.note_month')}
				name='date'
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.note_month')!,
					},
				]}
			>
				<AppDatePicker
					placeholder={I18n?.t('form.placeholder.note_month')!}
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
								type='text'
								onClick={() => navigate(-1)}
							>
								{I18n?.t('label.cancel')}
							</AppButton>
							<AppButton
								htmlType='submit'
								type='primary'
							>
								{I18n?.t('label.create.note')}
							</AppButton>
						</>
					)}
				</div>
			</AppFormItem>
		</Form>
	);
};

export default NoteForm;
