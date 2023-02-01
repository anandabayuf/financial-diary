import { DetailNoteTabProps } from './interfaces/interfaces';
import { useState, useEffect } from 'react';
import { getAllUserWalletNote } from '../../../../Api/Wallet-Note';
import AppMessage from '../../../General/AppMessage/index';
import { useAppSelector, useAppDispatch } from '../../../../Hooks/useRedux';
import AppModal from '../../../General/AppModal';
import withWalletNoteForm from '../DetailNoteForm/withWalletNoteForm';
import DetailNoteForm from '../DetailNoteForm/index';
import AppTitle from '../../../General/AppTitle';
import { toURLFormat } from '../../../../Utils/UrlUtils';
import {
	setDataViewTypeWalletNote,
	setSelectedWalletNote,
} from '../../../../Store/Note/NoteSlice';
import { useNavigate } from 'react-router-dom';

const withWalletNoteTab = (
	Component: React.ComponentType<DetailNoteTabProps>
) => {
	const NewComponent: React.FC<DetailNoteTabProps> = ({
		noteId,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const dispatch = useAppDispatch();
		const navigate = useNavigate();
		// const location = useLocation();

		const dataViewType = useAppSelector(
			(state) => state.note.dataViewType?.wallet
		);

		const [walletNote, setWalletNote] = useState<any[]>([]);
		const [walletNoteList, setWalletNoteList] = useState<any[]>([]);

		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isSearching, setIsSearching] = useState<boolean>(false);
		const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

		useEffect(() => {
			const getWalletNote = async () => {
				setIsLoading(true);

				const res = await getAllUserWalletNote(token, noteId);
				if (res.request.status === 200) {
					const data = res.data.data.map((el: any, index: number) => {
						return {
							...el,
							key: index,
						};
					});
					setWalletNote(data);
					setWalletNoteList(data);
				} else {
					const response = JSON.parse(res.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsLoading(false);
			};

			if (!isModalOpen) {
				getWalletNote();
			} //eslint-disable-next-line
		}, [isModalOpen]);

		const handleChangeDataViewType = (values: any) =>
			dispatch(
				setDataViewTypeWalletNote({ dataViewType: { wallet: values } })
			);

		const handleClickAdd = () => setIsModalOpen(true);

		const handleClickView = (record: any) => {
			dispatch(
				setSelectedWalletNote({
					selectedWalletNote: {
						id: record._id,
						name: record.wallet.name,
					},
				})
			);
			navigate(`${toURLFormat(record.wallet.name)}`);
		};

		const handleChangeSearch = (e: any) => {
			if (e.target.value === '') {
				setWalletNoteList(walletNote);
			}
		};

		const handleSearch = (value: string) => {
			if (value) {
				const searchQuery = value.trim();

				if (searchQuery !== '' && searchQuery !== ' ') {
					setIsSearching(true);
					const regex = new RegExp(`${searchQuery}`, 'gi');
					setWalletNoteList(
						walletNote.filter((walletNote) =>
							walletNote.wallet.name.match(regex)
						)
					);
					setIsSearching(false);
				}
			}
		};

		const handleCancelAdd = () => setIsModalOpen(false);

		const WalletNoteForm = withWalletNoteForm(DetailNoteForm);

		const ModalAdd = (
			<AppModal
				title={
					<AppTitle
						title='Add Wallet to The Note'
						level={4}
					/>
				}
				open={isModalOpen}
			>
				<WalletNoteForm
					noteId={noteId}
					handleCancel={handleCancelAdd}
				/>
			</AppModal>
		);

		return (
			<Component
				isWallet
				data={walletNote}
				dataList={walletNoteList}
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

export default withWalletNoteTab;
