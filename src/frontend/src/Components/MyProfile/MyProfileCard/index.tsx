import AppCard from '../../General/AppCard';
import { MyProfileCardProps } from './interfaces/interfaces';
import AppLoader from '../../General/AppLoader/index';
import { Avatar, Image } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import AppText from '../../General/AppText';
import AppTitle from '../../General/AppTitle/index';

const MyProfileCard: React.FC<MyProfileCardProps> = ({ user }) => {
	return user ? (
		<AppCard>
			<div className='flex justify-center mb-5'>
				{user && user.picture !== undefined && user.picture !== null ? (
					<Avatar
						src={`data:image/png;base64,${user.picture.data}`}
						// style={{ width: '200px', height: '200px' }}\
						className='w-[150px] h-[150px] shadow-lg'
					/>
				) : (
					<Avatar
						icon={<AiOutlineUser size={70} />}
						className='w-[150px] h-[150px] flex justify-center items-center'
					/>
				)}
			</div>
			<div className='grid grid-cols-1 gap-y-2 mb-8'>
				<AppTitle
					title='Username'
					level={5}
				/>
				<AppText text={user.username} />
			</div>
			<div className='grid grid-cols-1 gap-y-2'>
				<AppTitle
					title='Name'
					level={5}
				/>
				<AppText text={user.name} />
			</div>
		</AppCard>
	) : (
		<AppLoader />
	);
};

export default MyProfileCard;
