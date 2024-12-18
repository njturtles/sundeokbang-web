import { authInstance } from "./base";

export const roomApi = {
    getRoomDetail: (roomId: string, token?: string) =>
        authInstance.get(`/rooms/${roomId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
    getRoomsBySchool: (
        minDeposit: number,
        maxDeposit: number,
        minCost: number,
        maxCost: number,
    ) =>
        authInstance.get(`/rooms`, {
            params: {
                minDeposit: minDeposit,
                maxDeposit: maxDeposit,
                minCost: minCost,
                maxCost: maxCost,
            },
        }),
    postFavoriteRoom: (roomId: string, token?: string) =>
        authInstance.post(`/rooms/${roomId}/favorite`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
    deleteFavoriteRoom: (roomId: string, token?: string) =>
        authInstance.delete(`/rooms/${roomId}/favorite`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }),
};
