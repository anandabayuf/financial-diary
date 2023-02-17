import { notification } from 'antd';
import { AppNotificationProps } from './interfaces/interfaces';

const AppNotification = ({
	message = '',
	description,
	placement = 'topRight',
	type,
	...rest
}: AppNotificationProps) => {
	return notification.open({
		message: message,
		description: description,
		placement: placement,
		type: type,
		...rest,
	});
};

export default AppNotification;
