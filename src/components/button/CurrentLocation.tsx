import React from "react";
import styled from "@emotion/styled";
import LocationIcon from "@/assets/icons/location-icon.svg";

type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CurrentLocation = ({ onClick }: Props) => {
    return (
        <Container onClick={onClick}>
            <LocationIcon />
        </Container>
    );
};

const Container = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 12px;
    border: none;
    border-radius: 12px;
    outline: none;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    & svg {
        fill: ${({ theme }) => theme.color.black.hue1};
    }
`;

export default CurrentLocation;
