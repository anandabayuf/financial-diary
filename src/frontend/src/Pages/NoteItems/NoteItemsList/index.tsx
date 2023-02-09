import MainLayout from '../../../Layouts/MainLayout';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useRedux';
import { useEffect, useState } from 'react';
import {
	getAllUserCategoryNoteItemsByNoteId,
	getAllUserWalletNoteItemsByNoteId,
} from '../../../Api/NoteItems';
import AppMessage from '../../../Components/General/AppMessage/index';
import AppEmpty from '../../../Components/General/AppEmpty/index';
import AppTable from '../../../Components/General/AppTable/index';
import AppText from '../../../Components/General/AppText/index';
import AppLoader from '../../../Components/General/AppLoader/index';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb/index';
import AppTitle from '../../../Components/General/AppTitle/index';
import AppButton from '../../../Components/General/AppButton/index';
import { BsPlusLg } from 'react-icons/bs';
import { Space, TableProps } from 'antd';
import NoteItemColumns from '../../../Components/NoteItems/NoteItemsColumn/index';
import { useParams, useNavigate } from 'react-router-dom';
import { toURLFormat } from '../../../Utils/UrlUtils';
import AppSearchInput from '../../../Components/General/AppSearchInput';
import { getUserWalletNoteById } from '../../../Api/Wallet-Note';
import { getUserCategoryNoteById } from '../../../Api/Category-Note';
import { formatIDR } from '../../../Utils/CurrencyUtils';
import NoteItemsDeleteModal from '../../../Components/NoteItems/NoteItemsDeleteModal';
import { deleteUserNoteItem } from '../../../Api/NoteItems';
import { setNotePaginationSize } from '../../../Store/Note/NoteSlice';

const NoteItemsPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { selectedNote, selectedCategoryNote, selectedWalletNote } =
		useAppSelector((state) => state.note);
	const pageSize = useAppSelector(
		(state) => state.note.paginationSize?.items
	);

	const [walletNote, setWalletNote] = useState<any>();
	const [categoryNote, setCategoryNote] = useState<any>();
	const [data, setData] = useState<any[]>([]);
	const [dataList, setDataList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [deletedData, setDeletedData] = useState<any>();
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const navigateIfLocationIsNotMatch = () => {
			if (params) {
				if (
					params.year !== selectedNote?.year ||
					params.month !== selectedNote?.month ||
					(selectedCategoryNote?.id !== '' &&
						params.name !==
							toURLFormat(selectedCategoryNote?.name!)) ||
					(selectedWalletNote?.id !== '' &&
						params.name !== toURLFormat(selectedWalletNote?.name!))
				) {
					navigate(
						`/notes/${selectedNote?.year}/${selectedNote?.month}/${
							selectedWalletNote?.name === ''
								? toURLFormat(selectedCategoryNote?.name!)
								: toURLFormat(selectedWalletNote?.name!)
						}`
					);
				}
			}
		};

		const getNoteItems = async () => {
			setIsLoading(true);
			navigateIfLocationIsNotMatch();
			if (selectedNote?.id !== '' && selectedWalletNote?.id !== '') {
				let res = await getUserWalletNoteById(
					token,
					selectedWalletNote?.id
				);

				if (res.request.status === 200) {
					const data = res.data.data;

					setWalletNote(data);
				} else {
					AppMessage({ type: 'error', content: '' });
				}

				res = await getAllUserWalletNoteItemsByNoteId(
					token,
					selectedNote?.id,
					selectedWalletNote?.id
				);
				// console.log(res);
				if (res.request.status === 200) {
					const data = res.data.data.map((el: any, index: number) => {
						return {
							...el,
							key: index,
						};
					});
					setData(data);
					setDataList(data);
				} else {
					AppMessage({ type: 'error', content: '' });
				}
			}

			if (selectedNote?.id !== '' && selectedCategoryNote?.id !== '') {
				let res = await getUserCategoryNoteById(
					token,
					selectedCategoryNote?.id
				);

				if (res.request.status === 200) {
					const data = res.data.data;

					setCategoryNote(data);
				} else {
					AppMessage({ type: 'error', content: '' });
				}

				res = await getAllUserCategoryNoteItemsByNoteId(
					token,
					selectedNote?.id,
					selectedCategoryNote?.id
				);
				// console.log(res);
				if (res.request.status === 200) {
					const data = res.data.data.map((el: any, index: number) => {
						return {
							...el,
							key: index,
						};
					});
					setData(data);
					setDataList(data);
				} else {
					AppMessage({ type: 'error', content: '' });
				}
			}
			setIsLoading(false);
		};

		if (!isModalDeleteOpen) {
			getNoteItems();
		} // eslint-disable-next-line
	}, [
		selectedNote?.id,
		selectedWalletNote?.id,
		selectedCategoryNote?.id,
		isModalDeleteOpen,
	]);

	const handleClickCreate = () => navigate('create');

	const handleClickEdit = (values?: any) =>
		navigate('edit', { state: values });

	const handleClickDelete = (values?: any) => {
		setDeletedData(values);
		setIsModalDeleteOpen(true);
	};

	const handleCancelDelete = () => setIsModalDeleteOpen(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		const res = await deleteUserNoteItem(token, deletedData._id);
		console.log(res);
		if (res.request.status === 200) {
			AppMessage({ content: res.data.message, type: 'success' });
		} else {
			AppMessage({ content: '', type: 'error' });
		}
		handleCancelDelete();
		setIsDeleting(false);
	};

	const handleChangeSearch = (e: any) => {
		if (e.target.value === '') {
			setDataList(data);
		}
	};

	const handleSearch = (value: string) => {
		if (value) {
			const searchQuery = value.trim();

			if (searchQuery !== '' && searchQuery !== ' ') {
				const regex = new RegExp(`${searchQuery}`, 'gi');
				setDataList(
					data.filter((data) => data.description.match(regex))
				);
			}
		}
	};

	const pagination: TableProps<any>['pagination'] = {
		pageSize: pageSize,
		onShowSizeChange(current, size) {
			dispatch(
				setNotePaginationSize({
					paginationSize: { items: size },
				})
			);
		},
	};

	useEffect(() => {
		if (selectedCategoryNote) {
			document.title = document.title.includes(selectedCategoryNote.name!)
				? document.title
				: `${selectedCategoryNote.name} - ${document.title}`;
		}

		if (selectedWalletNote) {
			document.title = document.title.includes(selectedWalletNote.name!)
				? document.title
				: `${selectedWalletNote.name} - ${document.title}`;
		}
	}, [selectedWalletNote, selectedCategoryNote]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title={`Note Items - ${
						selectedCategoryNote?.name === ''
							? selectedWalletNote?.name
							: selectedCategoryNote?.name
					}`}
					level={5}
				/>
				<AppButton
					type='primary'
					onClick={handleClickCreate}
				>
					<Space>
						<div className='flex justify-center'>
							<BsPlusLg />
						</div>
						Create Item
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader />
			) : data.length > 0 ? (
				<>
					<div className='flex justify-between items-center mb-5'>
						<AppSearchInput
							placeholder={`Search item description...`}
							onSearch={handleSearch}
							onChange={handleChangeSearch}
						/>
						<div className='flex items-center gap-x-3'>
							<div>
								<AppText
									text={
										selectedCategoryNote?.id === ''
											? 'Balance: '
											: 'Total: '
									}
									className='text-sm'
								/>
								<AppText
									text={formatIDR(
										selectedCategoryNote?.id === ''
											? walletNote.balance
											: categoryNote.total
									)}
									strong
									className='text-sm'
								/>
							</div>
							{/* <AppText
								text='Show:'
								className='text-sm'
							/> */}
						</div>
					</div>
					<AppTable
						dataSource={dataList}
						columns={NoteItemColumns({
							walletNoteId: selectedWalletNote?.id,
							isCategory: selectedCategoryNote?.id !== '',
							isWallet: selectedWalletNote?.id !== '',
							handleEdit: handleClickEdit,
							handleDelete: handleClickDelete,
						})}
						pagination={pagination}
					/>
				</>
			) : (
				<AppEmpty />
			)}
			{isModalDeleteOpen && deletedData && (
				<NoteItemsDeleteModal
					deletedData={deletedData}
					handleCancelDelete={handleCancelDelete}
					isCategory={selectedCategoryNote?.id !== ''}
					isLoading={isDeleting}
					isModalDeleteOpen={isModalDeleteOpen}
					handleDelete={handleDelete}
				/>
			)}
		</MainLayout>
	);
};

export default NoteItemsPage;
