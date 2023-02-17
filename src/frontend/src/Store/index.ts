import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistConfigType } from './interfaces/interfaces';
import ThemeReducer from './Theme/ThemeSlice';
import UserReducer from './User/UserSlice';
import MenuReducer from './Menu/MenuSlice';
import NoteReducer from './Note/NoteSlice';
import ManagementReducer from './Management/ManagementSlice';
import LocalizationReducer from './Localization/LocalizationSlice';

const reducers = combineReducers({
	theme: ThemeReducer,
	user: UserReducer,
	menu: MenuReducer,
	note: NoteReducer,
	management: ManagementReducer,
	localization: LocalizationReducer,
});

const persistConfig: persistConfigType = {
	key: 'financialdiary',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
