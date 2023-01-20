import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import AppMessage from '../../../General/AppMessage/index';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { DataViewTypeNames } from '../../../../Constants/DataViewTypeNames';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import withCategoryNoteForm from '../DetailNoteForm/withCategoryNoteForm';
import DetailNoteForm from '../DetailNoteForm/index';
import AppModal from '../../../General/AppModal/index';
import AppTitle from '../../../General/AppTitle/index';

const withCategoryNoteTab = (
	Component: React.ComponentType<DetailNoteTabProps>
) => {
	const NewComponent: React.FC<DetailNoteTabProps> = ({
		noteId,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);

		// const navigate = useNavigate();
		// const location = useLocation();

		const [dataViewType, setDataViewType] = useState<DataViewTypeNames>(
			DataViewTypeNames.LIST
		);

		const [categoryNote, setCategoryNote] = useState<any[]>([]);
		const [categoryNoteList, setCategoryNoteList] = useState<any[]>([]);

		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isSearching, setIsSearching] = useState<boolean>(false);
		const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

		useEffect(() => {
			const getCategoryNote = async () => {
				setIsLoading(true);

				const res = await getAllUserCategoryNote(token, noteId);
				if (res.request.status === 200) {
					const data = res.data.data.map((el: any, index: number) => {
						return {
							...el,
							key: index,
						};
					});
					setCategoryNote(data);
					setCategoryNoteList(data);
				} else {
					const response = JSON.parse(res.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsLoading(false);
			};

			if (!isModalOpen) {
				getCategoryNote(); // eslint-disable-next-line
			}
		}, [isModalOpen]);

		const handleChangeDataViewType = (values: any) => {
			setDataViewType(values);
		};

		const handleClickAdd = () => setIsModalOpen(true);

		const handleClickView = () => {};

		const handleChangeSearch = (e: any) => {
			if (e.target.value === '') {
				setCategoryNoteList(categoryNote);
			}
		};

		const handleSearch = (value: string) => {
			if (value) {
				const searchQuery = value.trim();

				if (searchQuery !== '' && searchQuery !== ' ') {
					setIsSearching(true);
					const regex = new RegExp(`${searchQuery}`, 'gi');
					setCategoryNoteList(
						categoryNote.filter((categoryNote) =>
							categoryNote.category.name.match(regex)
						)
					);
					setIsSearching(false);
				}
			}
		};

		const handleCancelAdd = () => setIsModalOpen(false);

		const CategoryNoteForm = withCategoryNoteForm(DetailNoteForm);

		const ModalAdd = (
			<AppModal
				title={
					<AppTitle
						title='Add Category to The Note'
						level={4}
					/>
				}
				open={isModalOpen}
			>
				<CategoryNoteForm
					noteId={noteId}
					handleCancel={handleCancelAdd}
				/>
			</AppModal>
		);

		return (
			<Component
				isWallet={false}
				data={categoryNote}
				dataList={categoryNoteList}
				isLoading={isLoading}
				isSearching={isSearching}
				dataViewType={dataViewType}
				modalAdd={ModalAdd}
				handleClickAdd={handleClickAdd}
				handleClickView={handleClickView}
				handleChangeDataViewType={handleChangeDataViewType}
				handleChangeSearch={handleChangeSearch}
				handleSearch={handleSearch}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withCategoryNoteTab;
