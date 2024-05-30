import React from "react";
import styled from "@emotion/styled";
import MarkerIcon from "@/assets/icons/location-marker.svg";

type Props = {
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
    imgSrc?: string;
    title: string;
    location: string;
    label: {
        deposit: string;
        cost: string;
    };
};

const ListCard = ({ onClick, imgSrc, title, location, label }: Props) => {
    return (
        <Container onClick={onClick || undefined}>
            <Thumbnail src={imgSrc || undefined} />
            <InfoContainer>
                <TitleContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <Location>
                        <MarkerIcon />
                        {location}
                    </Location>
                </TitleContainer>
                <LabelContainer>
                    <Label>보증금 {label.deposit}원</Label>
                    <Label>월세 {label.cost}원</Label>
                </LabelContainer>
            </InfoContainer>
        </Container>
    );
};

const Container = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
    width: 100%;
    height: 180px;
    padding: 20px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue0};
    background-color: ${({ theme }) => theme.color.white.hue0};
`;

const Thumbnail = styled.img`
    width: 144px;
    height: 144px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.gray.hue0};
    flex-shrink: 0;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 10px 0;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    height: 100%;
`;

const ItemTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const Location = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.regular};
    color: ${({ theme }) => theme.color.gray.hue3};
`;

const LabelContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const Label = styled.li`
    width: auto;
    height: auto;
    padding: 6px 8px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.white.hue3};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default ListCard;
