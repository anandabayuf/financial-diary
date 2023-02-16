import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { getAllUserWalletNote } from '../../../../Api/Wallet-Note';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppModal from '../../../General/AppModal';
import AppTitle from '../../../General/AppTitle';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import withAddEstimationNoteForm from '../EstimationNoteForm/withAddEstimationNoteForm';
import EstimationNoteForm from '../EstimationNoteForm/index';
import withEditEstimationNoteForm from '../EstimationNoteForm/withEditEstimationNoteForm';
import { setNotePaginationSize } from '../../../../Store/Note/NoteSlice';
import { TableProps } from 'antd';
import { errorHandling } from '../../../../Api/errorHandling';

const withEstimationNoteTab = (
	Component: React.ComponentType<DetailNoteTabProps>
) => {
	const NewComponent: React.FC<DetailNoteTabProps> = ({
		noteId,
		I18n,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const dispatch = useAppDispatch();
		const pageSize = useAppSelector(
			(state) => state.note.paginationSize?.estimation
		);

		const [budgets, setBudgets] = useState<any[]>([]);
		const [budgetsList, setBudgetsList] = useState<any[]>([]);

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

				try {
					const resWalletNote = await getAllUserWalletNote(
						token,
						noteId
					);

					const walletNote = await resWalletNote.data.data;

					try {
						const resCatNote = await getAllUserCategoryNote(
							token,
							noteId
						);

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

						setBudgets(data);
						setBudgetsList(data);
					} catch (error) {
						errorHandling(error, I18n!);
					}
				} catch (error) {
					errorHandling(error, I18n!);
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
				setBudgetsList(budgets);
			}
		};

		const handleSearch = (value: string) => {
			if (value) {
				const searchQuery = value.trim();

				if (searchQuery !== '' && searchQuery !== ' ') {
					setIsSearching(true);
					const regex = new RegExp(`${searchQuery}`, 'gi');
					setBudgetsList(
						budgets.filter((el) => el.name.match(regex))
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
							title={I18n?.t(
								'title.note.detail.budget_tab.create'
							)}
							level={4}
						/>
					}
					open={isModalOpen.modalAdd}
				>
					<AddEstimationNoteForm
						noteId={noteId}
						handleCancel={handleCancelAdd}
						I18n={I18n}
					/>
				</AppModal>
				{recordEdit && (
					<AppModal
						title={
							<AppTitle
								title={
									recordEdit.estimated.balance
										? I18n?.t(
												'title.note.detail.budget_tab.edit.wallet'
										  )
										: I18n?.t(
												'title.note.detail.budget_tab.edit.category'
										  )
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
							I18n={I18n}
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
				isBudget
				data={budgets}
				dataList={budgetsList}
				isLoading={isLoading}
				isSearching={isSearching}
				modalAdd={ModalAdd}
				pagination={pagination}
				I18n={I18n}
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
