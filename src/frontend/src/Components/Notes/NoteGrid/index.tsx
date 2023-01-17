import AppButton from '../../General/AppButton';
import AppText from '../../General/AppText';
import AppTitle from '../../General/AppTitle';
import { useNavigate } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';
import useTheme from '../../../Hooks/useTheme';
import { NotesGridProps } from './interfaces/interfaces';
import StyledNoteGridCard from './styled/StyledNoteGridCard';
import StyledGrid from './styled/StyledGrid';

const NotesGrid: React.FC<NotesGridProps> = ({ data, showYear }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<div className='flex justify-center'>
			<StyledGrid>
				{data?.map((el, index) => {
					const year = new Date(el.date).toLocaleString('en-us', {
						year: 'numeric',
					});
					const month = new Date(el.date).toLocaleString('en-us', {
						month: 'long',
					});
					return (
						<div key={index}>
							<StyledNoteGridCard isMobileShowCard={true}>
								<div className='flex justify-between items-center mb-5'>
									<GiNotebook
										color={theme?.text}
										size={32}
									/>
									<div>
										{showYear === 'all-year' && (
											<AppText
												text={year}
												className='flex justify-end'
											/>
										)}
										<AppTitle
											title={month}
											level={4}
										/>
									</div>
								</div>
								<div className='flex justify-end'>
									<AppButton
										type='text'
										onClick={() =>
											navigate &&
											navigate(`/notes/${el._id}`, {
												state: el,
											})
										}
									>
										View
									</AppButton>
								</div>
							</StyledNoteGridCard>
						</div>
					);
				})}
			</StyledGrid>
		</div>
	);
};

export default NotesGrid;
