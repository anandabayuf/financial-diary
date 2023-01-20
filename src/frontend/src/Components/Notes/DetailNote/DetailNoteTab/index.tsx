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

const DetailNoteTab: React.FC<DetailNoteTabProps> = ({
	data,
	dataList,
	isWallet,
	isLoading,
	isSearching,
	dataViewType,
	modalAdd,
	handleClickAdd,
	handleClickView,
	handleChangeDataViewType,
	handleChangeSearch,
	handleSearch,
}) => {
	return (
		<>
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={isWallet ? 'Wallet Note' : 'Category Note'}
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
							? 'Add Wallet to Note'
							: 'Add Category to Note'}
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
										? 'Search Wallet Name...'
										: 'Search Category Name...'
								}
								onSearch={handleSearch}
								onChange={handleChangeSearch}
								loading={isSearching}
							/>
							<div className='flex items-center gap-x-3'>
								<div className='max-sm:hidden'>
									<AppText
										text='Show:'
										className='text-sm'
									/>
								</div>
								<AppSegmented
									value={dataViewType}
									handleChange={handleChangeDataViewType}
								/>
							</div>
						</div>
						{dataViewType === DataViewTypeNames.LIST ? (
							<AppTable
								dataSource={dataList}
								columns={DetailNoteColumns({
									isWallet: isWallet,
									handleView: handleClickView,
								})}
							/>
						) : (
							<DetailNoteGrid
								isWallet={isWallet}
								data={dataList}
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
