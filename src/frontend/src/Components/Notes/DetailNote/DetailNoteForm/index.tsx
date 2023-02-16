import { DetailNoteFormProps } from './interfaces/interfaces';
import { Form } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import AppCheckboxGroup from '../../../General/AppCheckboxGroup/index';
import AppButton from '../../../General/AppButton/index';
import AppLoader from '../../../General/AppLoader';
import AppEmpty from '../../../General/AppEmpty';

const DetailNoteForm: React.FC<DetailNoteFormProps> = ({
	walletData,
	categoryData,
	isWallet = false,
	isCategory = false,
	isLoading,
	isFetching,
	I18n,
	handleSubmit,
	handleCancel,
}) => {
	const checkboxOptions: () => CheckboxGroupProps['options'] = () => {
		if (isWallet && walletData) {
			return walletData.map((el) => {
				return {
					label: el.name,
					value: el._id,
				};
			});
		} else if (isCategory && categoryData) {
			return categoryData.map((el) => {
				return {
					label: el.name,
					value: el._id,
				};
			});
		}
	};

	return isFetching ? (
		<AppLoader />
	) : (
		<Form
			autoComplete='on'
			layout='vertical'
			onFinish={handleSubmit}
		>
			{(walletData && walletData.length > 0) ||
			(categoryData && categoryData.length > 0) ? (
				<AppFormItem
					label={
						isWallet
							? I18n?.t('form.label.note.wallet')
							: I18n?.t('form.label.note.category')
					}
					name='ids'
					rules={[
						{
							required: true,
							message: I18n?.t('form.required.note.detail')!,
						},
					]}
				>
					<AppCheckboxGroup options={checkboxOptions()} />
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
						{I18n?.t('label.cancel')}
					</AppButton>
					{((walletData && walletData.length > 0) ||
						(categoryData && categoryData.length > 0)) && (
						<AppButton
							type='primary'
							htmlType='submit'
						>
							{I18n?.t('label.create.note.detail')}
						</AppButton>
					)}
				</div>
			)}
		</Form>
	);
};

export default DetailNoteForm;
