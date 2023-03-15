import { CloseNoteModalProps } from './interfaces/interfaces';
import AppModal from '../../../General/AppModal';
import AppTitle from '../../../General/AppTitle';
import AppText from '../../../General/AppText';
import AppButton from '../../../General/AppButton';
import AppLoader from '../../../General/AppLoader';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../../Utils/DateUtils';

const CloseNoteModal: React.FC<CloseNoteModalProps> = ({
	data,
	isLoading,
	isModalOpen,
	I18n,
	language,
	handleCancel,
	handleClose,
}) => {
	return (
		<AppModal
			title={
				<AppTitle
					title={I18n?.t('title.note.close')}
					level={4}
				/>
			}
			open={isModalOpen}
			closable={true}
			onCancel={handleCancel}
		>
			<div>
				<div className='mb-3'>
					<AppText
						text={I18n?.t('content.note_close_confirmation')}
					/>
				</div>
				<div className='flex justify-center'>
					<div className='w-[400px]'>
						<div className='flex justify-between gap-x-3 mb-2'>
							<AppText text={`${I18n?.t('content.note')}: `} />
							<AppText
								text={`${getLongMonthFromDate(
									data.date,
									language
								)} - ${getFullYearFromDate(data.date)}`}
							/>
						</div>
						{isLoading ? (
							<AppLoader />
						) : (
							<div className='flex justify-center mt-8 gap-x-4'>
								<AppButton
									type='text'
									onClick={handleCancel}
								>
									{I18n?.t('label.cancel')}
								</AppButton>
								<AppButton
									danger
									type='text'
									onClick={handleClose}
								>
									{I18n?.t('label.close_note')}
								</AppButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</AppModal>
	);
};

export default CloseNoteModal;
