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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "16px",
                }}
            >
                <BackButton type="map" onClick={onBack} />
                <LocationTitle>순천대학교</LocationTitle>
            </div>
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
    height: auto;
    padding: 100px 20px 12px 20px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue2};
    z-index: 999;
`;

const LocationTitle = styled.h1`
    display: block;
    width: auto;
    height: 100%;
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.black.hue1};
`;

export default TopNavigation;
