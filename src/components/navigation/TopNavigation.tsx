import React from "react";
import styled from "@emotion/styled";
import Filter from "../filter/Filter";
import BackButton from "../button/BackButton";

type Props = {
    onBack: () => void;
};

const TopNavigation = ({ onBack }: Props) => {
    return (
        <Container>
            <TopFlexBox>
                <BackButton type="map" onClick={onBack} />
                <LocationTitle>순천대학교</LocationTitle>
            </TopFlexBox>
            <Filter />
        </Container>
    );
};

const Container = styled.nav`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: 160px;
    padding: 40px 20px 12px 20px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue2};
    z-index: 99;
`;

const TopFlexBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
`;

const LocationTitle = styled.h1`
    display: block;
    width: auto;
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.black.hue1};
`;

export default TopNavigation;
