import { useEffect, useState } from 'react';
import { getAvailableUserWallet } from '../../../../Api/Wallet-Note';
import { useAppSelector } from '../../../../Hooks/useRedux';
import AppMessage from '../../../General/AppMessage/index';
import {
	getAvailableUserCategory,
	addCategoryNoteEstimated,
} from '../../../../Api/Category-Note';
import { addWalletNoteEstimated } from '../../../../Api/Wallet-Note';
import { EstimationNoteFormProps } from './interfaces/interfaces';

const withAddEstimationNoteForm = (
	Component: React.ComponentType<EstimationNoteFormProps>
) => {
	const NewComponent: React.FC<EstimationNoteFormProps> = ({
		noteId,
		handleCancel,
		...rest
	}) => {
		const token = useAppSelector((state) => state.user.accessToken);
		const [availableWallet, setAvailableWallet] = useState<any[]>([]);
		const [availableCategory, setAvailableCategory] = useState<any[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [isFetching, setIsFetching] = useState<boolean>(false);

		useEffect(() => {
			const getAvailableWalletAndCategory = async () => {
				setIsFetching(true);

				const resWallet = await getAvailableUserWallet(token, noteId);
				if (resWallet.request.status === 200) {
					const resCat = await getAvailableUserCategory(
						token,
						noteId
					);
					if (resCat.request.status === 200) {
						setAvailableWallet(resWallet.data.data);
						setAvailableCategory(resCat.data.data);
					} else {
						const response = JSON.parse(resCat.request.response);

						AppMessage({
							content: response.message,
							type: 'error',
						});
					}
				} else {
					const response = JSON.parse(resWallet.request.response);

					AppMessage({ content: response.message, type: 'error' });
				}

				setIsFetching(false);
			};

			getAvailableWalletAndCategory(); // eslint-disable-next-line
		}, []);

		const handleSubmit = async (values: any) => {
			setIsLoading(true);
			if (values && (values.wallets || values.categories)) {
				if (values.wallets && values.wallets.length > 0) {
					const walletsPayload = values.wallets.map((wallet: any) => {
						return {
							walletId: wallet.walletId.value,
							noteId,
							estimated: {
								balance: parseInt(wallet.estimatedBalance),
							},
						};
					});
					// console.log(walletsPayload);
					const res = await addWalletNoteEstimated(
						token,
						walletsPayload
					);

					if (res.request.status === 201) {
						AppMessage({
							content: res.data.message,
							type: 'success',
						});
						if (handleCancel) {
							handleCancel();
						}
					} else {
						AppMessage({
							content: res.data.message,
							type: 'error',
						});
					}
				}

				if (values.categories && values.categories.length > 0) {
					const categoriesPayload = values.categories.map(
						(category: any) => {
							return {
								categoryId: category.categoryId.value,
								noteId,
								estimated: {
									total: parseInt(category.estimatedTotal),
								},
							};
						}
					);
					// console.log(categoriesPayload);
					const res = await addCategoryNoteEstimated(
						token,
						categoriesPayload
					);

					if (res.request.status === 201) {
						AppMessage({
							content: res.data.message,
							type: 'success',
						});
						if (handleCancel) {
							handleCancel();
						}
					} else {
						AppMessage({
							content: res.data.message,
							type: 'error',
						});
					}
				}
			}

			setIsLoading(false);
		};

		return (
			<Component
				isAdd
				handleSubmit={handleSubmit}
				walletData={availableWallet}
				categoryData={availableCategory}
				isLoading={isLoading}
				isFetching={isFetching}
				handleCancel={handleCancel}
				{...rest}
			/>
		);
	};

	return NewComponent;
};

export default withAddEstimationNoteForm;
