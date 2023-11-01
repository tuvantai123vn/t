import axiosClient from './axiosClient';

const HistoryAPI = {
	getHistoryAPI: (query) => {
		const url = `/order/getuser/${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `/order/${id}`;
		return axiosClient.get(url);
	},
};

export default HistoryAPI;