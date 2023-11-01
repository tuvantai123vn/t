import axiosClient from './axiosClient';

const CheckoutAPI = {
	postEmail: (query) => {
		const url = `/order/checkout`;
		return axiosClient.post(url, query);
	},
};

export default CheckoutAPI;