import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { getAllUserWalletNote } from '../../../../Api/Wallet-Note';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppModal from '../../../General/AppModal';
import AppTitle from '../../../General/AppTitle';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import withAddBudgetNoteForm from '../BudgetNoteForm/withAddBudgetNoteForm';
import BudgetNoteForm from '../BudgetNoteForm/index';
import withEditBudgetNoteForm from '../BudgetNoteForm/withEditBudgetNoteForm';
import { setNotePaginationSize } from '../../../../Store/Note/NoteSlice';
import { TableProps } from 'antd';
import { errorHandling } from '../../../../Api/errorHandling';
import { useNavigate } from 'react-router-dom';
import { TFetchErrorResponse } from '../../../../Api/interfaces/types';

const withBudgetNoteTab = (
	Component: React.ComponentType<DetailNoteTabProps>
) => {
	const NewComponent: React.FC<DetailNoteTabProps> = ({
		noteId,
		I18n,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const dispatch = useAppDispatch();
		const navigate = useNavigate();
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

				if (token && noteId) {
					try {
						const resWalletNote = await getAllUserWalletNote(
							token,
							noteId
						);

						const walletNote = [...resWalletNote.data.data].map(
							(data) => {
								return {
									...data,
									name: data.wallet.name,
									debit: data.estimated.balance,
								};
							}
						);

						try {
							const resCatNote = await getAllUserCategoryNote(
								token,
								noteId
							);

							const catNote = [...resCatNote.data.data].map(
								(data) => {
									return {
										...data,
										name: data.category.name,
										credit: data.estimated.total,
									};
								}
							);

							const data = [...walletNote, ...catNote].map(
								(dataElement, index) => {
									return {
										...dataElement,
										key: index,
									};
								}
							);

							setBudgets(data);
							setBudgetsList(data);
						} catch (error) {
							errorHandling(
								error as TFetchErrorResponse,
								navigate
							);
						}
					} catch (error) {
						errorHandling(error as TFetchErrorResponse, navigate);
					}
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

		const AddBudgetNoteForm = withAddBudgetNoteForm(BudgetNoteForm);

		const EditBudgetNoteForm = withEditBudgetNoteForm(BudgetNoteForm);

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
					<AddBudgetNoteForm
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
						<EditBudgetNoteForm
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
				dispatch(setNotePaginationSize({ estimation: size }));
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

export default withBudgetNoteTab;
