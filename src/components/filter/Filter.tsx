import React from "react";
import styled from "@emotion/styled";
import FilterButton from "./FilterButton";
import { filterAtom } from "@/stores/filter";
import { useRecoilValue } from "recoil";
import { formatToWon } from "@/utils/formatter";
import { depositLimit, monthlyLimit } from "@/constants/filter";

const Filter = () => {
    const filterValue = useRecoilValue(filterAtom);

    return (
        <Container>
            <FilterButton
                selected={
                    filterValue.deposit[0] === depositLimit[0] &&
                    filterValue.deposit[1] === depositLimit[1]
                        ? false
                        : true
                }
                label="보증금"
            >
                <b>{`${formatToWon(filterValue.deposit, depositLimit)}`}</b>
            </FilterButton>
            <FilterButton
                selected={
                    filterValue.cost[0] === monthlyLimit[0] &&
                    filterValue.cost[1] === monthlyLimit[1]
                        ? false
                        : true
                }
                label="월세"
            >
                <b>{`${formatToWon(filterValue.cost, monthlyLimit)}`}</b>
            </FilterButton>
        </Container>
    );
};

const Container = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: 8px;
    width: calc(100% + 20px);
    padding: 4px 0;
    padding-right: 10px;
    height: auto;
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default Filter;
