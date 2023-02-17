import { TabsProps } from 'antd/es/tabs';
import { i18n } from 'i18next';

export interface DetailNoteTabsProps {
	noteId?: string;
	I18n?: i18n;
}

export type DetailNoteTabsType =
	({}: DetailNoteTabsProps) => TabsProps['items'];
