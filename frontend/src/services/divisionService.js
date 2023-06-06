import api from './api';
import {createAuthHeaders} from "./authService";

export const getAllDivisions = async () => {
    try {
        const headers = createAuthHeaders();
        const response = await api.get('/divisions', {headers});

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getDivisionById = async (id) => {
    try {
        const headers = createAuthHeaders();
        const response = await api.get(`/divisions/${id}`, {headers});

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const createDivision = async (divisionData) => {
    try {
        const headers = createAuthHeaders();
        const response = await api.post('/divisions', divisionData, {headers});

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const deleteDivision = async (id) => {
    try {
        const headers = createAuthHeaders();
        await api.delete(`/divisions/${id}`, {headers});
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
