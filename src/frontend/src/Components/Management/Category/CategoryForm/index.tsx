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
				label='Category Name'
				name='name'
				rules={[
					{ required: true, message: 'Please input category name!' },
				]}
			>
				<AppInput placeholder='input category name...' />
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
								Cancel
							</AppButton>
							<AppButton
								htmlType='submit'
								type='primary'
							>
								{isEdit ? 'Edit Category' : 'Create Category'}
							</AppButton>
						</>
					)}
				</div>
			</AppFormItem>
		</Form>
	);
};

export default CategoryForm;
