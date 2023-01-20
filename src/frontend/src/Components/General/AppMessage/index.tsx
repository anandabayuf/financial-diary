import { message } from 'antd';
import { AppMessageProps } from './interfaces/interfaces';

const AppMessage = ({ content, type }: AppMessageProps) => {
	return message.open({
		content: content,
		type: type,
	});
};

export default AppMessage;
