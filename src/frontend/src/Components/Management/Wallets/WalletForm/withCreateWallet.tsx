import { WalletFormProps } from './interfaces/interfaces';

const withCreateWallet = (Component: React.ComponentType<WalletFormProps>) => {
	const NewComponent: React.FC<WalletFormProps> = ({ ...rest }) => {
		return <Component {...rest} />;
	};

	return NewComponent;
};

export default withCreateWallet;
