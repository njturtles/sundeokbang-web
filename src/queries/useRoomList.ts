import { mockApi } from "@/apis/mock";
import { useQuery } from "@tanstack/react-query";

const useRoomList = (schoolId: string) => {
    const { data, ...rest } = useQuery({
        queryKey: [`${new Date().getTime}.schoolId`],
        queryFn: () => mockApi.getRoomsBySchoolId(schoolId),
    });

    return { data, ...rest };
};

export default useRoomList;
