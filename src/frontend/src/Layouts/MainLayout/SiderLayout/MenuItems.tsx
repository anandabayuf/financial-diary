import AppText from '../../../Components/General/AppText/index';
import { MdDashboard } from 'react-icons/md';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front } from 'react-icons/bs';
import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';

const MenuItems: () => MenuProps['items'] = () => {
	return [
		{
			key: 'dashboard',
			label: (
				<Link to={getRouteNames(RouteNames.DASHBOARD)}>
					<AppText text='Dashboard' />
				</Link>
			),
			icon: <MdDashboard />,
		},
		{
			key: 'management',
			label: <AppText text='Management' />,
			icon: <MdDashboard />,
			children: [
				{
					key: 'wallets',
					label: (
						<Link to={getRouteNames(RouteNames.MANAGEMENT_WALLETS)}>
							<AppText text='Wallets' />
						</Link>
					),
					icon: <IoWalletOutline />,
				},
				{
					key: 'category',
					label: (
						<Link
							to={getRouteNames(RouteNames.MANAGEMENT_CATEGORY)}
						>
							<AppText text='Category' />
						</Link>
					),
					icon: <BsCreditCard2Front />,
				},
			],
		},
		{
			key: 'estimation',
			label: <AppText text='Estimation' />,
			icon: <MdDashboard />,
		},
		{
			key: 'notes',
			label: (
				<Link to={getRouteNames(RouteNames.NOTES)}>
					<AppText text='Notes' />
				</Link>
			),
			icon: <MdDashboard />,
		},
	];
};

export const rootSubmenuKeys = [
	'dashboard',
	'management',
	'estimation',
	'notes',
];

export default MenuItems;
