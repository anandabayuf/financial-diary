import AppText from '../../../Components/General/AppText/index';
import {
	// MdDashboard,
	MdOutlineManageAccounts,
} from 'react-icons/md';
import { GiNotebook } from 'react-icons/gi';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import { MenuItemsType } from './interfaces/interfaces';

const MenuItems: MenuItemsType = ({ I18n }) => {
	return [
		// {
		// 	key: 'dashboard',
		// 	label: (
		// 		<Link to={getRouteNames(RouteNames.DASHBOARD)}>
		// 			<AppText text='Dashboard' />
		// 		</Link>
		// 	),
		// 	icon: <MdDashboard />,
		// },
		{
			key: 'management',
			label: <AppText text={I18n?.t('menu.management')} />,
			icon: <MdOutlineManageAccounts />,
			children: [
				{
					key: 'wallets',
					label: (
						<Link to={getRouteNames(RouteNames.MANAGEMENT_WALLETS)}>
							<AppText text={I18n?.t('menu.management.wallet')} />
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
							<AppText
								text={I18n?.t('menu.management.category')}
							/>
						</Link>
					),
					icon: <BsCreditCard2Front />,
				},
			],
		},
		{
			key: 'notes',
			label: (
				<Link to={getRouteNames(RouteNames.NOTES)}>
					<AppText text={I18n?.t('menu.notes')} />
				</Link>
			),
			icon: <GiNotebook />,
		},
	];
};

export const rootSubmenuKeys = [
	// 'dashboard',
	'management',
	'notes',
];

export default MenuItems;
