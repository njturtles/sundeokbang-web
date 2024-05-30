import { instance } from "./base";

export const mockApi = {
    getRoomById: (roomId: string) => instance().get(`mock/room/${roomId}`),
    getRoomsBySchoolId: (schoolId: string) =>
        instance().get(`mock/rooms/${schoolId}`),
};
