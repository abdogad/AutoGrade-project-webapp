import {instance} from "../axios/axios";

export default {
    isLogged: async () => {
        return await instance.get("/users/authenticated/");
    },
    login: async (data) => {
        return await instance.post(`/users/login/`, data);
    },
    register: async (data) => {
        return await instance.post(`/users/register/`, data);
    },
    logout: async () => {
        return await instance.post(`/users/logout/`);
    },
    getExams: async () => {
        return await instance.get("exams/list/");
    },
    createExam: async (data) => {
        return await instance.post(`exams/create/`, data,{
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("access_token")
                ? "Token " + localStorage.getItem("access_token")
                : null,
            },
          });
    },
    getExamById: async (id) => {
        return await instance.get(`exams/exam/${id}/questions/`);
    },
    submitExam: async (data) => {
        return await instance.post(`exams/response/`, data);
    },
};
