import { BsPlusLg } from 'react-icons/bs';
import { Space } from 'antd';
import { DataViewTypeNames } from '../../../../Constants/DataViewTypeNames';
import AppLoader from '../../../General/AppLoader/index';
import AppTable from '../../../General/AppTable/index';
import AppEmpty from '../../../General/AppEmpty/index';
import AppSegmented from '../../../General/AppSegmented/index';
import AppText from '../../../General/AppText/index';
import AppButton from '../../../General/AppButton/index';
import AppTitle from '../../../General/AppTitle/index';
import { DetailNoteTabProps } from './interfaces/interfaces';
import DetailNoteColumns from '../DetailNoteColumns/index';
import AppSearchInput from '../../../General/AppSearchInput';
import DetailNoteGrid from '../DetailNoteGrid/index';
import { formatIDR } from '../../../../Utils/CurrencyUtils';

const DetailNoteTab: React.FC<DetailNoteTabProps> = ({
	data,
	dataList,
	isWallet = false,
	isCategory = false,
	isBudget = false,
	isLoading,
	isSearching,
	dataViewType = DataViewTypeNames.LIST,
	modalAdd,
	pagination,
	I18n,
	handleClickAdd,
	handleClickView,
	handleClickEdit,
	handleChangeDataViewType,
	handleChangeSearch,
	handleSearch,
}) => {
	return (
		<>
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={
						isWallet
							? I18n?.t('notes.wallet')
							: isCategory
							? I18n?.t('notes.category')
							: I18n?.t('notes.budget')
					}
					level={5}
				/>
				<AppButton
					type='primary'
					onClick={handleClickAdd}
				>
					<Space>
						<div className='flex justify-center'>
							<BsPlusLg />
						</div>
						{isWallet
							? I18n?.t('label.create.note.wallet')
							: isCategory
							? I18n?.t('label.create.note.category')
							: I18n?.t('label.create.note.budget')}
					</Space>
				</AppButton>
			</div>

			{isLoading ? (
				<AppLoader />
			) : (
				data &&
				(data.length > 0 ? (
					<>
						<div className='flex justify-between items-center mb-3 gap-x-3'>
							<AppSearchInput
								placeholder={
									isWallet
										? I18n?.t(
												'search.placeholder.note.detail.wallet_tab'
										  )
										: isCategory
										? I18n?.t(
												'search.placeholder.note.detail.category_tab'
										  )
										: I18n?.t(
												'search.placeholder.note.detail.budget_tab'
										  )
								}
								onSearch={handleSearch}
								onChange={handleChangeSearch}
								loading={isSearching}
							/>
							{isBudget ? (
								<div>
									<AppText
										text={`${I18n?.t('content.balance')}: `}
									/>
									<AppText
										text={formatIDR(
											data[0].note.estimated.balance || 0
										)}
										strong
									/>
								</div>
							) : (
								<div className='flex items-center gap-x-3'>
									<div className='max-sm:hidden'>
										<AppText
											text={`${I18n?.t('content.show')}:`}
											className='text-sm'
										/>
									</div>
									<AppSegmented
										value={dataViewType}
										handleChange={handleChangeDataViewType}
									/>
								</div>
							)}
						</div>
						{dataViewType === DataViewTypeNames.LIST ? (
							<AppTable
								dataSource={dataList}
								columns={DetailNoteColumns({
									isWallet: isWallet,
									isCategory: isCategory,
									isBudget: isBudget,
									I18n: I18n,
									handleView: handleClickView,
									handleEdit: handleClickEdit,
								})}
								pagination={pagination}
							/>
						) : (
							<DetailNoteGrid
								isWallet={isWallet}
								data={dataList}
								I18n={I18n}
								handleView={handleClickView}
							/>
						)}
					</>
				) : (
					<AppEmpty />
				))
			)}
			{modalAdd}
		</>
	);
};

export default DetailNoteTab;
