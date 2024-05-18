import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

export const instance = () => {
    return axios.create({ baseURL: baseURL });
};
