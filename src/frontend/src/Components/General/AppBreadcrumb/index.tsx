import { Breadcrumb } from 'antd';
import { AppBreadcrumbProps } from './interfaces/interfaces';
import { useLocation, Link } from 'react-router-dom';
import StyledBreadcrumb from './styled/StyledBreadcrumb';
import useTheme from '../../../Hooks/useTheme';
import AppButton from '../AppButton';

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ ...rest }) => {
	const location = useLocation();
	const pathSnippets = location.pathname.split('/').filter((i) => i);
	const theme = useTheme();

	return (
		<StyledBreadcrumb
			{...rest}
			separatorcolor={theme?.button}
			linkcolor={theme?.button}
		>
			{pathSnippets.map((_, index) => {
				const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
				return (
					<Breadcrumb.Item key={url}>
						<Link to={url}>{pathSnippets[index]}</Link>
					</Breadcrumb.Item>
				);
			})}
		</StyledBreadcrumb>
	);
};

export default AppBreadcrumb;
