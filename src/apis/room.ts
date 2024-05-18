import { instance } from "./base";

export const roomApi = {
    getRoomDetail: (roomId: string) => instance().get(`/rooms/${roomId}`),
};
