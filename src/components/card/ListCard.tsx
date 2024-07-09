import React from "react";
import styled from "@emotion/styled";
import FavButton from "./FavButton";

type Props = {
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
    imgSrc?: string;
    title: string;
    location: string;
    label: {
        deposit: string;
        cost: string;
    };
    favorite?: boolean;
};

const ListCard = ({
    onClick,
    imgSrc,
    title,
    location,
    label,
    favorite = true,
}: Props) => {
    return (
        <Container onClick={onClick || undefined}>
            <FavButton checked={favorite} />
            <Thumbnail src={imgSrc || undefined} />
            <InfoContainer>
                <TitleContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <Location>
                        <p>{location}</p>
                    </Location>
                </TitleContainer>
                <LabelContainer>
                    <Label>
                        <b>보증금</b> {label.deposit}원
                    </Label>
                    <Label>
                        <b>월세 </b>
                        {label.cost}원
                    </Label>
                </LabelContainer>
            </InfoContainer>
        </Container>
    );
};

const Container = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
    width: 100%;
    min-height: 180px;
    padding: 20px 20px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue1};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue1};
    cursor: pointer;
`;

const Thumbnail = styled.img`
    min-width: 120px;
    min-height: 120px;
    max-width: 144px;
    max-height: 144px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.gray.hue0};
    aspect-ratio: 1 / 1;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    height: 100%;
    padding: 10px 0;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const ItemTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const Location = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
    line-height: 1.25rem;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.regular};
    color: ${({ theme }) => theme.color.black.hue2};
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
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.black.hue1};
`;

export default ListCard;
