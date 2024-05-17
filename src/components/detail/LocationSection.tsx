import React from "react";
import styled from "@emotion/styled";
import MarkerIcon from "@/assets/icons/location-marker.svg";

type Props = {
    children: React.ReactNode;
    title: string;
    location: string;
};

const LocationSection = ({ children, title, location }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <MapContainer>
                <Map>{children}</Map>
                <Location>
                    <MarkerIcon />
                    {location}
                </Location>
            </MapContainer>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    padding: 28px 24px;
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue0};
`;

const Title = styled.h1`
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.semibold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const MapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    height: auto;
`;

const Map = styled.div`
    width: 100%;
    height: 175px;
    border: 1px solid ${({ theme }) => theme.color.white.hue3};
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

export default LocationSection;
