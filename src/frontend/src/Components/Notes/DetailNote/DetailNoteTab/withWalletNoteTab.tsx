import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { getAllUserWalletNote } from '../../../../Api/Wallet-Note';
import AppMessage from '../../../General/AppMessage/index';
import { useAppSelector } from '../../../../Hooks/useRedux';
import { DataViewTypeNames } from '../../../../Constants/DataViewTypeNames';
import DetailNoteGrid from '../DetailNoteGrid/index';

const withWalletNoteTab = (
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

		const [walletNote, setWalletNote] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);

		useEffect(() => {
			const getWalletNote = async () => {
				setIsLoading(true);

				const res = await getAllUserWalletNote(token, noteId);
				if (res.request.status === 200) {
					setWalletNote(
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

			getWalletNote(); // eslint-disable-next-line
		}, []);

		const handleClickAdd = () => {};

		const handleClickView = () => {};

		return (
			<Component
				isWallet
				data={walletNote}
				isLoading={isLoading}
				dataViewType={dataViewType}
				handleClickAdd={handleClickAdd}
				handleClickView={handleClickView}
				handleChangeDataViewType={handleChangeDataViewType}
				detailNoteGrid={
					<DetailNoteGrid
						isWallet
						data={walletNote}
						handleView={handleClickView}
					/>
				}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withWalletNoteTab;
