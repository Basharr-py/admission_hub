import api from "./axios";

export async function getSubjects() {
    const response = await api.get("/subjects");

    return response.data;
}