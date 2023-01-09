import { CategoryFormProps } from './interfaces/interfaces';

const withCreateCategory = (
	Component: React.ComponentType<CategoryFormProps>
) => {
	const NewComponent: React.FC<CategoryFormProps> = ({ ...rest }) => {
		return <Component {...rest} />;
	};

	return NewComponent;
};

export default withCreateCategory;
