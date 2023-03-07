import AppText from '../../../General/AppText';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front } from 'react-icons/bs';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { DetailNoteTabsType } from './interfaces/interfaces';
import withWalletNoteTab from '../DetailNoteTab/withWalletNoteTab';
import DetailNoteTab from '../DetailNoteTab';
import withCategoryNoteTab from '../DetailNoteTab/withCategoryNoteTab';
import withEstimationNoteTab from '../DetailNoteTab/withBudgetNoteTab';

const EstimationNoteTab = withEstimationNoteTab(DetailNoteTab);
const WalletNoteTab = withWalletNoteTab(DetailNoteTab);
const CategoryNoteTab = withCategoryNoteTab(DetailNoteTab);

const DetailNoteTabs: DetailNoteTabsType = ({ noteId, I18n }) => [
	{
		key: 'budget-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<FaRegMoneyBillAlt />
				<AppText text={I18n?.t('label.budget')} />
			</div>
		),
		children: (
			<EstimationNoteTab
				noteId={noteId}
				I18n={I18n}
			/>
		),
	},
	{
		key: 'wallet-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<IoWalletOutline />
				<AppText text={I18n?.t('label.wallet')} />
			</div>
		),
		children: (
			<WalletNoteTab
				noteId={noteId}
				I18n={I18n}
			/>
		),
	},
	{
		key: 'category-note-tab',
		label: (
			<div className='flex justify-center items-center gap-x-2'>
				<BsCreditCard2Front />
				<AppText text={I18n?.t('label.category')} />
			</div>
		),
		children: (
			<CategoryNoteTab
				noteId={noteId}
				I18n={I18n}
			/>
		),
	},
];

export default DetailNoteTabs;
