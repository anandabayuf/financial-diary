import { Form } from 'antd';
import AppFormItem from '../../../General/AppFormItem';
import AppInput from '../../../General/AppInput';
import { CategoryFormProps } from './interfaces/interfaces';
import AppButton from '../../../General/AppButton/index';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../../../General/AppLoader';

const CategoryForm: React.FC<CategoryFormProps> = ({
	isEdit,
	data,
	handleSubmit,
	isLoading,
	I18n,
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
				label={I18n?.t('form.label.category_name')}
				name='name'
				rules={[
					{
						required: true,
						message: I18n?.t('form.required.category_name')!,
					},
				]}
			>
				<AppInput
					placeholder={I18n?.t('form.placeholder.category_name')}
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
								{isEdit
									? I18n?.t('label.edit.category')
									: I18n?.t('label.create.category')}
							</AppButton>
						</>
					)}
				</div>
			</AppFormItem>
		</Form>
	);
};

export default CategoryForm;
