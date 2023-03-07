import StyledSwitch from './styled/StyledSwitch';
import { AppSwitchProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';

const AppSwitch: React.FC<AppSwitchProps> = ({
	checkedChildren,
	unCheckedChildren,
	checked,
	size = 'default',
	onChange,
	...rest
}) => {
	const { color } = useTheme();

	return (
		<StyledSwitch
			switchtheme={color}
			checkedChildren={checkedChildren}
			unCheckedChildren={unCheckedChildren}
			checked={checked}
			onChange={onChange}
			size={size}
			{...rest}
		/>
	);
};

export default AppSwitch;
