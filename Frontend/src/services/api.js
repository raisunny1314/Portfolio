import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});


export const getProject = () => api.get('/projects');
export const getCodingProfiles = () => api.get('/codingprofile');
export const getExperience = () => api.get('/experience');
export const getSocialLink = () => api.get('/sociallink');
export const getGeneralInfo = () => api.get('/generalinfo');

export default api;
