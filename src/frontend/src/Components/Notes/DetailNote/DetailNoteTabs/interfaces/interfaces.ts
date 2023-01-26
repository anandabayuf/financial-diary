import { TabsProps } from 'antd/es/tabs';

export interface DetailNoteTabsProps {
	noteId?: string;
	walletNote?: any;
	categoryNote?: any;
	isLoading?: {
		walletNote?: boolean;
		categoryNote?: boolean;
	};
}

export type DetailNoteTabsType = ({
	noteId,
	categoryNote,
	walletNote,
	isLoading,
}: DetailNoteTabsProps) => TabsProps['items'];
