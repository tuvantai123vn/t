import axiosClient from './axiosClient';

const UserAPI = {
  postSignin: (body) => {
    const url = '/auth/login';
    return axiosClient.post(url, body);
  },

  postSignUp: (query) => {
    const url = '/auth/register';
    return axiosClient.post(url, query);
  },
  getDetailData: (id) => {
    const url = `/auth/${id}`
    return axiosClient.get(url)
},
};

export default UserAPI;
