import { AppTagProps } from './interfaces/interfaces';
import StyledTag from './styled/StyledTag';

const AppTag: React.FC<AppTagProps> = ({ ...rest }) => {
	return <StyledTag {...rest} />;
};

export default AppTag;
