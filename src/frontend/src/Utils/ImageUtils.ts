import { RcFile } from 'antd/es/upload';

export const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const dataURLtoFile = (dataurl: string, filename: string) => {
	let arr = dataurl.split(',');
	let mime = arr[0].match(/:(.*?);/);
	let dataType: string = '';
	let bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	if (mime !== null) {
		dataType = mime[1];
	}

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: dataType });
};
