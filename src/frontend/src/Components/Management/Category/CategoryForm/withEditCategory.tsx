import { CategoryFormProps } from './interfaces/interfaces';

const withEditCategory = (
	Component: React.ComponentType<CategoryFormProps>
) => {
	const NewComponent: React.FC<CategoryFormProps> = ({ ...rest }) => {
		return (
			<Component
				isEdit
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditCategory;
