import { DetailNoteFormProps } from './interfaces/interfaces';
import { Form } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import AppCheckboxGroup from '../../../General/AppCheckboxGroup/index';
import AppButton from '../../../General/AppButton/index';
import AppLoader from '../../../General/AppLoader';
import AppEmpty from '../../../General/AppEmpty';

const DetailNoteForm: React.FC<DetailNoteFormProps> = ({
	data,
	isWallet,
	isLoading,
	isFetching,
	handleSubmit,
	handleCancel,
}) => {
	const checkboxOptions: CheckboxGroupProps['options'] = data?.map((el) => {
		return {
			label: el.name,
			value: el._id,
		};
	});

	return isFetching ? (
		<AppLoader />
	) : (
		<Form
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
		>
			{data?.length! > 0 ? (
				<AppFormItem
					label={
						isWallet
							? 'Select Wallet you want to add to the note'
							: 'Select Category you want to add to the note'
					}
					name='ids'
					rules={[
						{ required: true, message: 'Please select minimum 1!' },
					]}
				>
					<AppCheckboxGroup options={checkboxOptions} />
				</AppFormItem>
			) : (
				<AppEmpty className='mb-5' />
			)}

			{isLoading ? (
				<AppLoader />
			) : (
				<div className='flex justify-center gap-x-3'>
					<AppButton
						type='text'
						htmlType='button'
						onClick={handleCancel}
					>
						Cancel
					</AppButton>
					{data?.length! > 0 && (
						<AppButton
							type='primary'
							htmlType='submit'
						>
							Add to the note
						</AppButton>
					)}
				</div>
			)}
		</Form>
	);
};

export default DetailNoteForm;
