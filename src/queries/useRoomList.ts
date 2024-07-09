import { roomApi } from "@/apis/room";
import { ResponseType } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useRoomList = (
    minDeposit: number,
    maxDeposit: number,
    minCost: number,
    maxCost: number,
) => {
    const { data, ...rest } = useQuery<AxiosResponse<ResponseType>>({
        queryKey: [`${new Date().getTime}.schoolId`],
        queryFn: () =>
            roomApi.getRoomsBySchool(minDeposit, maxDeposit, minCost, maxCost),
    });

    return { data, ...rest };
};

export default useRoomList;
