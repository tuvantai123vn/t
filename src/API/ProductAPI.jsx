import axiosClient from './axiosClient';

const ProductAPI = {
	getAPI: () => {
		const url = '/products/topproducts';
		return axiosClient.get(url);
	},

	getCategory: (query) => {
		const url = `/products/category?category=${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		console.log(id);
		const url = `/products/detail/${id}`;
		console.log(url);
		return axiosClient.get(url);
	},

	getPagination: (query) => {
		const url = `/products/pagination${query}`;
		return axiosClient.get(url);
	},
};

export default ProductAPI;
