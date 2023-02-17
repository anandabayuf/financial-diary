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
	const theme = useTheme();

	return (
		<StyledSwitch
			switchtheme={theme}
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
