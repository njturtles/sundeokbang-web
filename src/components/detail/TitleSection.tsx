import React from "react";
import styled from "@emotion/styled";
import MarkerIcon from "@/assets/icons/location-marker.svg";

type Props = {
    title: string;
    location: string;
};

const TitleSection = ({ title, location }: Props) => {
    return (
        <Container>
            <Location>
                <MarkerIcon />
                {location}
            </Location>
            <Title>{title}</Title>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    width: 100%;
    height: 120px;
    padding: 16px 28px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue0};
`;

const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const Location = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.regular};
    color: ${({ theme }) => theme.color.gray.hue3};
`;

export default TitleSection;
