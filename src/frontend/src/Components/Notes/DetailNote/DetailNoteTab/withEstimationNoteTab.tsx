import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { getAllUserWalletNote } from '../../../../Api/Wallet-Note';
import AppMessage from '../../../General/AppMessage/index';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppModal from '../../../General/AppModal';
import AppTitle from '../../../General/AppTitle';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import withAddEstimationNoteForm from '../EstimationNoteForm/withAddEstimationNoteForm';
import EstimationNoteForm from '../EstimationNoteForm/index';
import withEditEstimationNoteForm from '../EstimationNoteForm/withEditEstimationNoteForm';
import { setNotePaginationSize } from '../../../../Store/Note/NoteSlice';
import { TableProps } from 'antd';

const withEstimationNoteTab = (
	Component: React.ComponentType<DetailNoteTabProps>
) => {
	const NewComponent: React.FC<DetailNoteTabProps> = ({
		noteId,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const dispatch = useAppDispatch();
		// const navigate = useNavigate();
		// const location = useLocation();
		const pageSize = useAppSelector(
			(state) => state.note.paginationSize?.estimation
		);

		const [estimations, setEstimations] = useState<any[]>([]);
		const [estimationsList, setEstimationsList] = useState<any[]>([]);

		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isSearching, setIsSearching] = useState<boolean>(false);
		const [isModalOpen, setIsModalOpen] = useState({
			modalAdd: false,
			modalEdit: false,
		});

		const [recordEdit, setRecordEdit] = useState<any>();

		useEffect(() => {
			const getWalletAndCategory = async () => {
				setIsLoading(true);

				const resWalletNote = await getAllUserWalletNote(token, noteId);
				if (resWalletNote.request.status === 200) {
					const walletNote = await resWalletNote.data.data;

					const resCatNote = await getAllUserCategoryNote(
						token,
						noteId
					);

					if (resCatNote.request.status === 200) {
						const catNote = await resCatNote.data.data;
						const data = [...walletNote, ...catNote].map(
							(el, index) => {
								return {
									...el,
									key: index,
									name: el.wallet
										? el.wallet.name
										: el.category.name,
									debit: el.wallet && el.estimated.balance,
									credit: el.category && el.estimated.total,
								};
							}
						);
						// console.log(data);

						setEstimations(data);
						setEstimationsList(data);
					} else {
						const response = JSON.parse(
							resCatNote.request.response
						);

						AppMessage({
							content: response.message,
							type: 'error',
						});
					}
				} else {
					const response = JSON.parse(resWalletNote.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsLoading(false);
			};

			if (!isModalOpen.modalAdd && !isModalOpen.modalEdit) {
				getWalletAndCategory();
			} //eslint-disable-next-line
		}, [isModalOpen]);

		const handleClickAdd = () =>
			setIsModalOpen({
				...isModalOpen,
				modalAdd: true,
			});

		const handleClickEdit = (record: any) => {
			// console.log(record);
			setRecordEdit(record);
			setIsModalOpen({
				...isModalOpen,
				modalEdit: true,
			});
		};

		const handleChangeSearch = (e: any) => {
			if (e.target.value === '') {
				setEstimationsList(estimations);
			}
		};

		const handleSearch = (value: string) => {
			if (value) {
				const searchQuery = value.trim();

				if (searchQuery !== '' && searchQuery !== ' ') {
					setIsSearching(true);
					const regex = new RegExp(`${searchQuery}`, 'gi');
					setEstimationsList(
						estimations.filter((el) => el.name.match(regex))
					);
					setIsSearching(false);
				}
			}
		};

		const handleCancelAdd = () =>
			setIsModalOpen({
				...isModalOpen,
				modalAdd: false,
			});

		const handleCancelEdit = () =>
			setIsModalOpen({
				...isModalOpen,
				modalEdit: false,
			});

		const AddEstimationNoteForm =
			withAddEstimationNoteForm(EstimationNoteForm);

		const EditEstimationNoteForm =
			withEditEstimationNoteForm(EstimationNoteForm);

		const ModalAdd = (
			<>
				<AppModal
					title={
						<AppTitle
							title='Add Wallet or Category to The Note'
							level={4}
						/>
					}
					open={isModalOpen.modalAdd}
				>
					<AddEstimationNoteForm
						noteId={noteId}
						handleCancel={handleCancelAdd}
					/>
				</AppModal>
				{recordEdit && (
					<AppModal
						title={
							<AppTitle
								title={
									recordEdit.estimated.balance
										? 'Edit Wallet Estimation'
										: 'Edit Category Estimation'
								}
								level={4}
							/>
						}
						open={isModalOpen.modalEdit}
					>
						<EditEstimationNoteForm
							noteId={noteId}
							data={recordEdit}
							handleCancel={handleCancelEdit}
						/>
					</AppModal>
				)}
			</>
		);

		const pagination: TableProps<any>['pagination'] = {
			pageSize: pageSize,
			onShowSizeChange(current, size) {
				dispatch(
					setNotePaginationSize({
						paginationSize: { estimation: size },
					})
				);
			},
		};

		return (
			<Component
				isEstimation
				data={estimations}
				dataList={estimationsList}
				isLoading={isLoading}
				isSearching={isSearching}
				modalAdd={ModalAdd}
				pagination={pagination}
				handleClickAdd={handleClickAdd}
				handleClickEdit={handleClickEdit}
				handleChangeSearch={handleChangeSearch}
				handleSearch={handleSearch}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withEstimationNoteTab;
