import {instance} from "../axios/axios";

export default {
    isLogged: async () => {
        return await instance.get("/users/authenticated/");
    },
    login: async (data) => {
        return await instance.post(`/users/login/`, data);
    },
    register: async (data) => {
        return await instance.post(`/users/signup/`, data);
    },
    logout: async () => {
        return await instance.post(`/users/logout/`);
    },
    getExams: async () => {
        return await instance.get("exams/list/");
    },
    createExam: async (data) => {
        return await instance.post(`exams/create/`, data);
    },
    getExamById: async (id) => {
        return await instance.get(`exams/exam/${id}/questions/`);
    },
    submitExam: async (data) => {
        return await instance.post(`exams/response/`, data);
    },
};
