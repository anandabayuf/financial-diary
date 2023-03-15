import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import AppTitle from '../../../General/AppTitle';
import { GiNotebook } from 'react-icons/gi';
import useTheme from '../../../../Hooks/useTheme';
import { NotesGridProps } from './interfaces/interfaces';
import StyledNoteGridCard from './styled/StyledNoteGridCard';
import StyledGrid from './styled/StyledGrid';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../../Utils/DateUtils';
import { Tag } from 'antd';
import AppTag from '../../../General/AppTag';

const NotesGrid: React.FC<NotesGridProps> = ({
	data,
	showYear,
	showClosed,
	handleView,
	I18n,
	language,
}) => {
	const { color } = useTheme();

	return (
		<div className='flex justify-center'>
			<StyledGrid>
				{data?.map((note, index) => {
					return (
						<StyledNoteGridCard
							key={index}
							isMobileShowCard='true'
							className={`rounded-2xl shadow-2xl`}
						>
							<div className='flex justify-between items-center mb-5'>
								<GiNotebook
									color={color?.text}
									size={32}
								/>
								<div>
									{showClosed === 'all' && (
										<div className='flex justify-end mb-2'>
											<AppTag
												color={
													note.closed
														? 'error'
														: 'success'
												}
											>
												{I18n?.t(
													note.closed
														? 'label.closed'
														: 'label.active'
												)}
											</AppTag>
										</div>
									)}
									{showYear === 'all-year' && (
										<AppText
											text={getFullYearFromDate(
												note.date
											)}
											className='flex justify-end'
										/>
									)}
									<div className='flex justify-end'>
										<AppTitle
											title={getLongMonthFromDate(
												note.date,
												language
											)}
											level={4}
										/>
									</div>
								</div>
							</div>
							<div className='flex justify-end'>
								<AppButton
									type='text'
									onClick={() =>
										handleView && handleView(note)
									}
								>
									{I18n?.t('label.view')}
								</AppButton>
							</div>
						</StyledNoteGridCard>
					);
				})}
			</StyledGrid>
		</div>
	);
};

export default NotesGrid;
