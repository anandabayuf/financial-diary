import axios, { AxiosInstance } from 'axios';
import { API_BASE_PATH } from '../Constants/Constants';

const instance: AxiosInstance = axios.create({
	baseURL: API_BASE_PATH,
	headers: { 'Content-Type': 'application/json' },
});

export default instance;
