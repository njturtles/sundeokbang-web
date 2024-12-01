import React from "react";
import styled from "@emotion/styled";
import Filter from "../filter/Filter";

const TopNavigation = () => {
    return (
        <Container>
            <Filter />
        </Container>
    );
};

const Container = styled.nav`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 16px;
    width: 100%;
    height: 100px;
    padding: 40px 20px 12px 20px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue2};
    z-index: 99;
`;

// const TopFlexBox = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: flex-start;
//     align-items: center;
//     gap: 24px;
// `;

// const LocationTitle = styled.h1`
//     display: block;
//     width: auto;
//     font-size: 1.25rem;
//     font-weight: ${({ theme }) => theme.font.Pretendard.medium};
//     color: ${({ theme }) => theme.color.black.hue1};
// `;

export default TopNavigation;
