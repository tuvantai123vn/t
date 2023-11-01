import axiosClient from './axiosClient';

const CartAPI = {
	getCarts: (query) => {
		const url = `/auth/getCart/${query}`;
		return axiosClient.get(url);
	},

	postAddToCart: (query) => {
		const url = `/auth/addToCart/${query}`;
		return axiosClient.post(url);
	},

	deleteToCart: (query) => {
		const url = `/auth/delete${query}`;
		return axiosClient.put(url);
	},

	putToCart: (query) => {
		const url = `/auth/update${query}`;
		return axiosClient.put(url);
	},
};

export default CartAPI;