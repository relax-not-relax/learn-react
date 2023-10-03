import axiosClient from "./axiosClient";

const userAPI = {

    register(data) {
        const url = '/auth/local/register';
        return axiosClient.post(url, data);
    },

    login(data) {
        //const url = '/users/authentication';
        const url = '/auth/local';
        return axiosClient.post(url, data);
    },

};

export default userAPI;