import React, { useEffect } from "react";
import { mockApi } from "@/apis/mock";

const Index = () => {
    useEffect(() => {
        mockApi.getRoomById("1").then((response) => console.log(response));
    }, []);
    return <div></div>;
};

export default Index;
