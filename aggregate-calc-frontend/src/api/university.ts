import api from "./axios";
import type { University } from "../types/university";

export async function getUniversities(): Promise<University[]> {
    const response = await api.get("/universities");

    return response.data;
}

export async function getCourses(universityId: number) {
    const response = await api.get(
        `/universities/${universityId}/courses`
    );

    return response.data;
}

export async function getAdmissionFormula(
    universityId: number
) {
    const response = await api.get(
        `/universities/${universityId}/formula`
    );

    return response.data;
}