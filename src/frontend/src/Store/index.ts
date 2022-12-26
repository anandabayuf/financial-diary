import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistConfigType } from './interfaces/interfaces';
import ThemeReducer from './Theme/ThemeSlice';
import UserReducer from './User/UserSlice';

const reducers = combineReducers({
	theme: ThemeReducer,
	user: UserReducer,
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
