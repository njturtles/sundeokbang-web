import TopNavigation from "@/components/navigation/TopNavigation";
import MapLayout from "@/layout/MapLayout";
import React from "react";
import styled from "@emotion/styled";
import ListCard from "@/components/card/ListCard";

const MapList = () => {
    return (
        <MapLayout>
            <TopNavigation />
            <ListContainer>
                <ListCard
                    title="워워웡"
                    location="주소"
                    label={{ deposit: "13333", monthly: "13333" }}
                />
            </ListContainer>
        </MapLayout>
    );
};

const ListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    padding-top: 20px;
`;

export default MapList;
