import { Spin } from 'antd';
import { AppLoaderProps } from './interfaces/interfaces';
import useTheme from '../../../Hooks/useTheme';
import { LoadingOutlined } from '@ant-design/icons';

const AppLoader: React.FC<AppLoaderProps> = ({ isInPage = false, ...rest }) => {
	const { color } = useTheme();

	return (
		<div className={isInPage ? 'grid place-items-center h-[60vh]' : ''}>
			<Spin
				{...rest}
				indicator={
					<LoadingOutlined
						style={{ color: color?.title }}
						spin
					/>
				}
				className='flex justify-center items-center'
				size='large'
			/>
		</div>
	);
};

export default AppLoader;
