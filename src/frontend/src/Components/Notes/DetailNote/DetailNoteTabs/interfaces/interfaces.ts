import { TabsProps } from 'antd/es/tabs';

export interface DetailNoteTabsProps {
	noteId?: string;
	categoryId?: string;
}

export type DetailNoteTabsType = ({
	noteId,
	categoryId,
}: DetailNoteTabsProps) => TabsProps['items'];
