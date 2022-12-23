import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistConfigType } from './interfaces/interfaces';
import ThemeReducer from './Theme/ThemeSlice';

const reducers = combineReducers({
	theme: ThemeReducer,
	// language: LanguageReducer,
});

const persistConfig: persistConfigType = {
	key: 'inswb',
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
