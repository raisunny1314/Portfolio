import axios from "axios";


const api = axios.create({
    baseURL: "https://portfolio-bxpt.onrender.com/api",
    withCredentials: true,
});


export const getProject = () => api.get('/projects');
export const getCodingProfiles = () => api.get('/codingprofile');
export const getExperience = () => api.get('/experience');
export const getSocialLink = () => api.get('/sociallink');
export const getGeneralInfo = () => api.get('/generalinfo');
export const Login = () => api.post('/admin/login',{email,password});

export default api;
