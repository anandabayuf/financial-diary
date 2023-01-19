import { DetailNoteGridProps } from './interfaces/interfaces';
import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import AppTitle from '../../../General/AppTitle';
import useTheme from '../../../../Hooks/useTheme';
import StyledDetailNoteGridCard from './styled/StyledDetailNoteGridCard';
import StyledGrid from '../../NotesList/NoteGrid/styled/StyledGrid';
import { IoWalletOutline } from 'react-icons/io5';
import { BsCreditCard2Front } from 'react-icons/bs';
import { formatIDR } from '../../../../Utils/CurrencyUtils';

const DetailNoteGrid: React.FC<DetailNoteGridProps> = ({
	isWallet,
	data,
	handleView,
}) => {
	const theme = useTheme();

	return (
		<div className='flex justify-center'>
			<StyledGrid>
				{data?.map((el, index) => {
					return (
						<StyledDetailNoteGridCard
							key={index}
							isMobileShowCard='true'
							className={`rounded-2xl shadow-2xl`}
						>
							<div className='flex justify-between items-center mb-5'>
								{isWallet ? (
									<IoWalletOutline
										color={theme?.text}
										size={32}
									/>
								) : (
									<BsCreditCard2Front
										color={theme?.text}
										size={32}
									/>
								)}
								<div>
									<AppText
										text={
											isWallet
												? el.wallet.name
												: el.category.name
										}
										className='flex justify-end'
									/>
									<div className='flex justify-end'>
										<AppTitle
											title={formatIDR(
												isWallet ? el.balance : el.total
											)}
											level={5}
										/>
									</div>
								</div>
							</div>
							<div className='flex justify-end'>
								<AppButton
									type='text'
									onClick={handleView}
								>
									View
								</AppButton>
							</div>
						</StyledDetailNoteGridCard>
					);
				})}
			</StyledGrid>
		</div>
	);
};

export default DetailNoteGrid;
