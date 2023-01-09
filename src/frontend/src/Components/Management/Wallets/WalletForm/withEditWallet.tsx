import { WalletFormProps } from './interfaces/interfaces';

const withEditWallet = (Component: React.ComponentType<WalletFormProps>) => {
	const NewComponent: React.FC<WalletFormProps> = ({ ...rest }) => {
		return (
			<Component
				isEdit
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEditWallet;
