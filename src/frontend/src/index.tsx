import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Styles/Global.scss';
import { Provider } from 'react-redux';
import { store } from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const persist = persistStore(store);

root.render(
	<Provider store={store}>
		<PersistGate persistor={persist}>
			<App />
		</PersistGate>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
