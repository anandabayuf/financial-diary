import { ColumnsType } from 'antd/es/table';

export interface DetailNoteColumnsProps {
	isWallet?: boolean;
	isCategory?: boolean;
	isEstimation?: boolean;
	handleView?: (record: any) => void;
	handleEdit?: (record: any) => void;
}

export type DetailNoteColumnsType = ({
	isWallet,
	isCategory,
	isEstimation,
	handleView,
	handleEdit,
}: DetailNoteColumnsProps) => ColumnsType<any>;
