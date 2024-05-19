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
        monthly: string;
    };
};

const Card = ({ onClick, imgSrc, title, location, label }: Props) => {
    return (
        <Container onClick={onClick}>
            <ItemImage src={imgSrc} />
            <Information>
                <div>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemLocation>
                        <MarkerIcon />
                        {location}
                    </ItemLocation>
                </div>
                <LabelContainer>
                    <Label>
                        <b>보증금</b> {label.deposit}
                    </Label>
                    <Label>
                        <b>월세 </b>
                        {label.monthly}
                    </Label>
                </LabelContainer>
            </Information>
        </Container>
    );
};

const Container = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 360px;
    height: 160px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    flex-shrink: 0;
`;

const ItemImage = styled.img`
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border: none;
    outline: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.gray.hue1};
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
`;

const ItemTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.black.hue0};
    margin-bottom: 8px;
`;

const ItemLocation = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.gray.hue3};
`;

const LabelContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 8px;
    width: 100%;
    height: 70px;
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

export default Card;
