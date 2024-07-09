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
                minDeposit: minDeposit || undefined,
                maxDeposit: maxDeposit || undefined,
                minCost: minCost || undefined,
                maxCost: maxCost || undefined,
            },
        }),
};
