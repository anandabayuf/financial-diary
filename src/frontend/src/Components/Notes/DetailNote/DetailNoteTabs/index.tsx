import AppText from '../../../General/AppText';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front, BsClock } from 'react-icons/bs';
import { DetailNoteTabsType } from './interfaces/interfaces';
import withWalletNoteTab from '../DetailNoteTab/withWalletNoteTab';
import DetailNoteTab from '../DetailNoteTab';
import withCategoryNoteTab from '../DetailNoteTab/withCategoryNoteTab';
import withEstimationNoteTab from '../DetailNoteTab/withEstimationNoteTab';

const EstimationNoteTab = withEstimationNoteTab(DetailNoteTab);
const WalletNoteTab = withWalletNoteTab(DetailNoteTab);
const CategoryNoteTab = withCategoryNoteTab(DetailNoteTab);

const DetailNoteTabs: DetailNoteTabsType = ({ noteId }) => [
	{
		key: 'estimation-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<BsClock />
				<AppText text='Estimation' />
			</div>
		),
		children: <EstimationNoteTab noteId={noteId} />,
	},
	{
		key: 'wallet-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<IoWalletOutline />
				<AppText text='Wallet' />
			</div>
		),
		children: <WalletNoteTab noteId={noteId} />,
	},
	{
		key: 'category-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<BsCreditCard2Front />
				<AppText text='Category' />
			</div>
		),
		children: <CategoryNoteTab noteId={noteId} />,
	},
];

export default DetailNoteTabs;
