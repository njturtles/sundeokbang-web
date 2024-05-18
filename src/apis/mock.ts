import { instance } from "./base";

export const mockApi = {
    getRoomById: (roomId: string) => instance().get(`mock/room/${roomId}`),
    getRoomsNearby: (lat: number, lng: number) =>
        instance().get(`mock/room/nearby`, {
            params: { latitude: lat, longitude: lng },
        }),
};
