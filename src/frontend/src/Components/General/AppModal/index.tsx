import { AppModalProps } from './interfaces/interfaces';
import StyledModal from './styled/StyledModal';
import useTheme from '../../../Hooks/useTheme';

const AppModal: React.FC<AppModalProps> = ({
	title,
	open,
	onCancel,
	children,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledModal
			title={title}
			open={open}
			onCancel={onCancel}
			centered
			closable={false}
			modaltheme={color}
			footer={null}
			maskClosable={false}
			{...rest}
		>
			{children}
		</StyledModal>
	);
};

export default AppModal;
