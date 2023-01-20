import { AppTooltipProps } from './interfaces/interfaces';
import { Tooltip } from 'antd';

const AppTooltip: React.FC<AppTooltipProps> = ({
	title,
	children,
	...rest
}) => {
	return (
		<Tooltip
			title={title}
			{...rest}
		>
			{children}
		</Tooltip>
	);
};

export default AppTooltip;
