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

const NotesGrid: React.FC<NotesGridProps> = ({
	data,
	showYear,
	handleView,
	I18n,
	language,
}) => {
	const { color } = useTheme();

	return (
		<div className='flex justify-center'>
			<StyledGrid>
				{data?.map((el, index) => {
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
									{showYear === 'all-year' && (
										<AppText
											text={getFullYearFromDate(el.date)}
											className='flex justify-end'
										/>
									)}
									<div className='flex justify-end'>
										<AppTitle
											title={getLongMonthFromDate(
												el.date,
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
									onClick={() => handleView && handleView(el)}
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
