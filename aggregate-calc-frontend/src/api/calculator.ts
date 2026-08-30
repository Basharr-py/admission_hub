import api from "./axios";

export async function calculateAggregate(payload: unknown) {
    const response = await api.post(
        "/calculator/calculate",
        payload
    );

    return response.data;
}