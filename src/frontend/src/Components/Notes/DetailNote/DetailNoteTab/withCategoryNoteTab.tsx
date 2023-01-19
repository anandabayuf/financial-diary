import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import AppMessage from '../../../General/AppMessage/index';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { DataViewTypeNames } from '../../../../Constants/DataViewTypeNames';
import { getAllUserCategoryNote } from '../../../../Api/Category-Note';
import DetailNoteGrid from '../DetailNoteGrid/index';

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

		const handleChangeDataViewType = (values: any) => {
			setDataViewType(values);
		};

		const [categoryNote, setCategoryNote] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);

		useEffect(() => {
			const getCategoryNote = async () => {
				setIsLoading(true);

				const res = await getAllUserCategoryNote(token, noteId);
				if (res.request.status === 200) {
					setCategoryNote(
						res.data.data.map((el: any, index: number) => {
							return {
								...el,
								key: index,
							};
						})
					);
				} else {
					const response = JSON.parse(res.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsLoading(false);
			};

			getCategoryNote(); // eslint-disable-next-line
		}, []);

		const handleClickAdd = () => {};

		const handleClickView = () => {};

		return (
			<Component
				isWallet={false}
				data={categoryNote}
				isLoading={isLoading}
				dataViewType={dataViewType}
				handleClickAdd={handleClickAdd}
				handleClickView={handleClickView}
				handleChangeDataViewType={handleChangeDataViewType}
				detailNoteGrid={
					<DetailNoteGrid
						isWallet={false}
						data={categoryNote}
						handleView={handleClickView}
					/>
				}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withCategoryNoteTab;
