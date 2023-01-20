import { NavigateFunction } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';

export interface DetailNoteColumnsProps {
	isWallet?: boolean;
	handleView?: () => void;
}

export type DetailNoteColumnsType = ({
	handleView,
	isWallet,
}: DetailNoteColumnsProps) => ColumnsType<any>;
