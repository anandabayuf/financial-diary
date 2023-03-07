export const appendKey = (data: any[]) => {
	return data.map((element, index) => {
		element['key'] = index;
		return element;
	});
};
