import AppTitle from '../../../Components/General/AppTitle';
import MainLayout from '../../../Layouts/MainLayout';
import { useState, useEffect } from 'react';
import { getAllUserNotes } from '../../../Api/Notes';
import AppButton from '../../../Components/General/AppButton';
import { BsPlusLg } from 'react-icons/bs';
import { Space } from 'antd';
import AppTable from '../../../Components/General/AppTable/index';
import NotesColumns from '../../../Components/Notes/NotesList/NoteColumn';
import AppEmpty from '../../../Components/General/AppEmpty/index';
import AppLoader from '../../../Components/General/AppLoader';
import AppBreadcrumb from '../../../Components/General/AppBreadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteNames } from '../../../Utils/RouteUtils';
import RouteNames from '../../../Constants/RouteNames';
import { useAppSelector } from '../../../Hooks/useRedux';
import AppSegmented from '../../../Components/General/AppSegmented';
import AppSelect from '../../../Components/General/AppSelect';
import NotesOptionYear from '../../../Components/Notes/NotesList/NoteOptionYear';
import AppText from '../../../Components/General/AppText/index';
import { DataViewTypeNames } from '../../../Constants/DataViewTypeNames';
import NotesGrid from '../../../Components/Notes/NotesList/NoteGrid';
import AppMessage from '../../../Components/General/AppMessage/index';

const NotesListPage: React.FC = () => {
	const token = useAppSelector((state) => state.user.accessToken);
	const navigate = useNavigate();
	const location = useLocation();

	const [wallets, setWallets] = useState<any[]>([]);
	const [walletsList, setWalletsList] = useState<any[]>([]);
	const [optionYear, setOptionYear] = useState<number[]>([]);
	const [selectedYear, setSelectedYear] = useState<number | string>('');

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [dataViewType, setDataViewType] = useState<DataViewTypeNames>(
		DataViewTypeNames.LIST
	);

	useEffect(() => {
		const getNotes = async () => {
			setIsLoading(true);

			const res = await getAllUserNotes(token);

			if (res.request.status === 200) {
				const resNotes = [...res.data.data];
				let years: number[] = [];

				resNotes.forEach((note) => {
					const year = new Date(note.date).getFullYear();

					if (years.length === 0) {
						years = [year];
					} else if (!years.some((value) => value === year)) {
						years.push(year);
					}
				});

				setOptionYear(years);
				setSelectedYear('all-year');
				setWallets(
					resNotes.map((note: any) => {
						note['key'] = note._id;
						return note;
					})
				);
				setWalletsList(
					resNotes.map((note: any) => {
						note['key'] = note._id;
						return note;
					})
				);
			} else {
				const response = JSON.parse(res.request.response);

				AppMessage({ content: response.message, type: 'error' });
			}

			setIsLoading(false);
		};

		getNotes(); // eslint-disable-next-line
	}, []);

	const handleClickCreate = () => {
		navigate(getRouteNames(RouteNames.CREATE_NOTE));
	};

	const handleChangeDataViewType = (values: any) => {
		setDataViewType(values);
	};

	const handleChangeYear = (value: any) => {
		setSelectedYear(value);

		if (value === 'all-year') {
			setWalletsList(wallets);
		} else {
			let newWalletLists = [...wallets];

			newWalletLists = newWalletLists.filter(
				(el) => new Date(el.date).getFullYear() === value
			);

			setWalletsList(newWalletLists);
		}
	};

	useEffect(() => {
		const stateReceiveAction = () => {
			if (location.state) {
				AppMessage({
					content: location.state.message,
					type: 'success',
				});
				window.history.replaceState({}, document.title);
			}
		};

		stateReceiveAction(); // eslint-disable-next-line
	}, [location.state]);

	return (
		<MainLayout>
			<AppBreadcrumb />
			<div className='flex justify-between items-center mb-5'>
				<AppTitle
					title='Notes'
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
						Create Notes
					</Space>
				</AppButton>
			</div>
			{isLoading ? (
				<AppLoader />
			) : walletsList.length > 0 ? (
				<>
					<div className='flex justify-end items-center mb-3 gap-x-3'>
						<AppText
							text='Show:'
							className='text-sm'
						/>
						<AppSelect
							placeholder='Select year to show'
							value={selectedYear}
							options={NotesOptionYear({ years: optionYear })}
							loading={isLoading}
							handleChange={handleChangeYear}
						/>
						<AppSegmented
							value={dataViewType}
							handleChange={handleChangeDataViewType}
						/>
					</div>
					{dataViewType === DataViewTypeNames.LIST ? (
						<AppTable
							dataSource={walletsList}
							columns={NotesColumns({
								navigate,
								showYear: selectedYear,
							})}
						/>
					) : (
						<NotesGrid
							data={walletsList}
							showYear={selectedYear}
						/>
					)}
				</>
			) : (
				<AppEmpty />
			)}
		</MainLayout>
	);
};

export default NotesListPage;
