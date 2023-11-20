import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSicure = () => {
    return axiosSecure
};

export default useAxiosSicure;