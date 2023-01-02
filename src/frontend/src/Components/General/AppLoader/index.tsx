import { Spin } from 'antd';
import { AppLoaderProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import { LoadingOutlined } from '@ant-design/icons';

const AppLoader: React.FC<AppLoaderProps> = ({ ...rest }) => {
	const theme = useTheme();

	return (
		<Spin
			{...rest}
			indicator={
				<LoadingOutlined
					style={{ color: theme?.title }}
					spin
				/>
			}
			className='flex justify-center items-center'
			size='large'
		/>
	);
};

export default AppLoader;
