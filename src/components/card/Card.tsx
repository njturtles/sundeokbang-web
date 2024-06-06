import React from "react";
import styled from "@emotion/styled";
import { useLocaleFormatter } from "@/hooks/useLocaleFormatter";

type Props = {
    onClick?: () => void;
    imgSrc?: string;
    title: string;
    location: string;
    label: {
        deposit: string;
        cost: string;
    };
    closeEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({
    onClick,
    imgSrc,
    title,
    location,
    label,
    closeEvent,
}: Props) => {
    const formatter = useLocaleFormatter("ko-kr");
    return (
        <Container>
            <CloseButton onClick={closeEvent}></CloseButton>
            {null && <ItemImage src={imgSrc} onClick={onClick} />}
            <Information onClick={onClick}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "12px",
                        width: "100%",
                        marginBottom: "4px",
                    }}
                >
                    <ItemTitle>{title}</ItemTitle>
                    <ItemLocation>{location}</ItemLocation>
                </div>
                <LabelContainer>
                    <Label>
                        <b>보증금 </b>
                        {formatter(Number(label.deposit) * 10000)}원
                    </Label>
                    <Label>
                        <b>월세 </b>
                        {formatter(Number(label.cost) * 10000)}원
                    </Label>
                </LabelContainer>
            </Information>
        </Container>
    );
};

const Container = styled.li`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: min(100%, 400px);
    height: auto;
    padding: 20px 10px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 7px 13px -5px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    flex-shrink: 0;
`;

const ItemImage = styled.img`
    width: 144px;
    height: 144px;
    border: none;
    outline: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.gray.hue1};
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
`;

const ItemTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.bold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const ItemLocation = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    line-height: 1rem;
    font-size: 0.8rem;
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
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.black.hue1};
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: none;
    background: transparent;
    outline: none;
    z-index: 99;
    &:before {
        content: "✕";
        font-size: 1.25rem;
        color: ${({ theme }) => theme.color.black.hue0};
    }
`;

export default Card;
