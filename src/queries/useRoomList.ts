import { mockApi } from "@/apis/mock";
import { ResponseType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useRoomList = (univName: string, deposit: number[], cost: number[]) => {
    const { data, ...rest } = useQuery<AxiosResponse<ResponseType>>({
        queryKey: [`${new Date().getTime}.schoolId`],
        queryFn: () => mockApi.getRoomsBySchoolId(univName, deposit, cost),
    });

    return { data, ...rest };
};

export default useRoomList;
