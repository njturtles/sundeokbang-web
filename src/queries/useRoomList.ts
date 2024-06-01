import { mockApi } from "@/apis/mock";
import { useQuery } from "@tanstack/react-query";

const useRoomList = (univName: string, deposit: number[], cost: number[]) => {
    const { data, ...rest } = useQuery({
        queryKey: [`${new Date().getTime}.schoolId`],
        queryFn: () => mockApi.getRoomsBySchoolId(univName, deposit, cost),
    });

    return { data, ...rest };
};

export default useRoomList;
