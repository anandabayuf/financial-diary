import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import withCategoryNoteForm from '../DetailNoteForm/withCategoryNoteForm';
import DetailNoteForm from '../DetailNoteForm/index';
import AppModal from '../../../General/AppModal/index';
import AppTitle from '../../../General/AppTitle/index';
import {
	setNoteDataViewType,
	setNotePaginationSize,
	setSelectedCategoryNote,
} from '../../../../Store/Note/NoteSlice';
import { useNavigate } from 'react-router-dom';
import { toURLFormat } from '../../../../Utils/UrlUtils';
import { TableProps } from 'antd';

const withCategoryNoteTab = (
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
		// const location = useLocation();

		const dataViewType = useAppSelector(
			(state) => state.note.dataViewType?.category
		);
		const pageSize = useAppSelector(
			(state) => state.note.paginationSize?.category
		);

		const [categoryNote, setCategoryNote] = useState<any[]>([]);
		const [categoryNoteList, setCategoryNoteList] = useState<any[]>([]);

		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isSearching, setIsSearching] = useState<boolean>(false);
		const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

		useEffect(() => {
			const getCategoryNote = async () => {
				setIsLoading(true);

				try {
					const res = await getAllUserCategoryNote(token, noteId);

					const data = res.data.data.map((el: any, index: number) => {
						return {
							...el,
							key: index,
						};
					});
					setCategoryNote(data);
					setCategoryNoteList(data);
				} catch (error) {}

				setIsLoading(false);
			};

			if (!isModalOpen) {
				getCategoryNote();
			} // eslint-disable-next-line
		}, [isModalOpen, noteId, token]);

		const handleChangeDataViewType = (values: any) =>
			dispatch(
				setNoteDataViewType({
					dataViewType: { category: values },
				})
			);

		const handleClickAdd = () => setIsModalOpen(true);

		const handleClickView = (record: any) => {
			dispatch(
				setSelectedCategoryNote({
					selectedCategoryNote: {
						id: record._id,
						name: record.category.name,
					},
				})
			);
			navigate(`${toURLFormat(record.category.name)}`);
		};

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
						title={I18n?.t('title.note.detail.category_tab.create')}
						level={4}
					/>
				}
				open={isModalOpen}
			>
				<CategoryNoteForm
					noteId={noteId}
					handleCancel={handleCancelAdd}
					I18n={I18n}
				/>
			</AppModal>
		);

		const pagination: TableProps<any>['pagination'] = {
			pageSize: pageSize,
			onShowSizeChange(current, size) {
				dispatch(
					setNotePaginationSize({
						paginationSize: { category: size },
					})
				);
			},
		};

		return (
			<Component
				isCategory
				data={categoryNote}
				dataList={categoryNoteList}
				isLoading={isLoading}
				isSearching={isSearching}
				dataViewType={dataViewType}
				modalAdd={ModalAdd}
				pagination={pagination}
				I18n={I18n}
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
