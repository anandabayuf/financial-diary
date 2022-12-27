import { MainLayoutProps } from './interfaces/interfaces';
import StyledContent from './styled/StyledContent';
import StyledLayout from './styled/StyledLayout';
import useTheme from '../../Hooks/useTheme';
import React from 'react';
import HeaderLayout from './HeaderLayout/index';
import useUserInfo from '../../Hooks/useUserInfo';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const theme = useTheme();
	const user = useUserInfo();

	return (
		<StyledLayout>
			<StyledLayout>
				<HeaderLayout user={user} />
				<StyledContent backgroundcolor={theme?.bg}>
					{children}
				</StyledContent>
			</StyledLayout>
		</StyledLayout>
	);
};

export default MainLayout;
