import { NoteItemsDeleteModalProps } from './interfaces/interfaces';
import AppModal from '../../General/AppModal/index';
import AppTitle from '../../General/AppTitle/index';
import AppText from '../../General/AppText/index';
import dayjs from 'dayjs';
import { formatIDR } from '../../../Utils/CurrencyUtils';
import { Space } from 'antd';
import AppButton from '../../General/AppButton/index';
import AppLoader from '../../General/AppLoader';

const NoteItemsDeleteModal: React.FC<NoteItemsDeleteModalProps> = ({
	deletedData,
	isCategory,
	isLoading,
	isModalDeleteOpen,
	handleCancelDelete,
	handleDelete,
}) => {
	return (
		<AppModal
			title={
				<AppTitle
					title='Delete Item'
					level={4}
				/>
			}
			open={isModalDeleteOpen}
			closable={true}
			onCancel={handleCancelDelete}
		>
			<div>
				<div className='mb-3'>
					<AppText
						text={`Are you sure you want to delete this item?`}
					/>
				</div>
				<div className='flex justify-center'>
					<div className='w-[400px]'>
						<div className='flex justify-between gap-x-3 mb-2'>
							<AppText text='Date: ' />
							<AppText
								text={dayjs(deletedData.date).format(
									'YYYY-MM-DD'
								)}
							/>
						</div>
						<div className='flex justify-between gap-x-3 mb-2'>
							<AppText text='Description: ' />
							<AppText text={deletedData.description} />
						</div>
						{!isCategory && (
							<div className='flex justify-between gap-x-3 mb-2'>
								<AppText text='Debit: ' />
								<AppText text={formatIDR(deletedData.debit)} />
							</div>
						)}
						<div className='flex justify-between gap-x-3'>
							<AppText text='Credit: ' />
							<AppText text={formatIDR(deletedData.credit)} />
						</div>
						{isLoading ? (
							<AppLoader />
						) : (
							<div className='flex justify-center mt-8 gap-x-4'>
								<AppButton
									type='text'
									onClick={handleCancelDelete}
								>
									Cancel
								</AppButton>
								<AppButton
									danger
									type='text'
									onClick={handleDelete}
								>
									Delete
								</AppButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</AppModal>
	);
};

export default NoteItemsDeleteModal;
