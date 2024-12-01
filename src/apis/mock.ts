import { instance } from "./base";
import qs from "qs";

export const mockApi = {
    getRoomById: (roomId: string) => instance().get(`mock/rooms/${roomId}`),
    getRoomsBySchoolId: (univName: string, deposit: number[], cost: number[]) =>
        instance().get(`mock/rooms`, {
            params: { university_name: univName, deposit: deposit, cost: cost },
            paramsSerializer: (params) => {
                return qs.stringify(params, {
                    arrayFormat: "comma",
                    encode: false,
                });
            },
        }),
};
