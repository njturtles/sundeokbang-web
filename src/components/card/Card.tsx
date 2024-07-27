import React from "react";
import styled from "@emotion/styled";
import { useLocaleFormatter } from "@/hooks/useLocaleFormatter";
import Image from "next/image";

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
            <ImageContainer>
                {imgSrc && (
                    <ItemImage
                        alt="방 썸네일"
                        width={120}
                        height={120}
                        src={imgSrc}
                        onClick={onClick}
                        placeholder={`data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyMDAgMjAwJz48cmFkaWFsR3JhZGllbnQgaWQ9J2EzJyBjeD0nLjY2JyBmeD0nLjY2JyBjeT0nLjMxMjUnIGZ5PScuMzEyNScgZ3JhZGllbnRUcmFuc2Zvcm09J3NjYWxlKDEuNSknPjxzdG9wIG9mZnNldD0nMCcgc3RvcC1jb2xvcj0nI0Y2Nzg0NCc+PC9zdG9wPjxzdG9wIG9mZnNldD0nLjMnIHN0b3AtY29sb3I9JyNGNjc4NDQnIHN0b3Atb3BhY2l0eT0nLjknPjwvc3RvcD48c3RvcCBvZmZzZXQ9Jy42JyBzdG9wLWNvbG9yPScjRjY3ODQ0JyBzdG9wLW9wYWNpdHk9Jy42Jz48L3N0b3A+PHN0b3Agb2Zmc2V0PScuOCcgc3RvcC1jb2xvcj0nI0Y2Nzg0NCcgc3RvcC1vcGFjaXR5PScuMyc+PC9zdG9wPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI0Y2Nzg0NCcgc3RvcC1vcGFjaXR5PScwJz48L3N0b3A+PC9yYWRpYWxHcmFkaWVudD48Y2lyY2xlIHRyYW5zZm9ybS1vcmlnaW49J2NlbnRlcicgZmlsbD0nbm9uZScgc3Ryb2tlPSd1cmwoI2EzKScgc3Ryb2tlLXdpZHRoPScxNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtZGFzaGFycmF5PScyMDAgMTAwMCcgc3Ryb2tlLWRhc2hvZmZzZXQ9JzAnIGN4PScxMDAnIGN5PScxMDAnIHI9JzcwJz48YW5pbWF0ZVRyYW5zZm9ybSB0eXBlPSdyb3RhdGUnIGF0dHJpYnV0ZU5hbWU9J3RyYW5zZm9ybScgY2FsY01vZGU9J3NwbGluZScgZHVyPScyJyB2YWx1ZXM9JzM2MDswJyBrZXlUaW1lcz0nMDsxJyBrZXlTcGxpbmVzPScwIDAgMSAxJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZSc+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjxjaXJjbGUgdHJhbnNmb3JtLW9yaWdpbj0nY2VudGVyJyBmaWxsPSdub25lJyBvcGFjaXR5PScuMicgc3Ryb2tlPScjRjY3ODQ0JyBzdHJva2Utd2lkdGg9JzE1JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIGN4PScxMDAnIGN5PScxMDAnIHI9JzcwJz48L2NpcmNsZT48L3N2Zz4=`}
                    />
                )}
            </ImageContainer>
            <Information onClick={onClick}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "8px",
                        width: "100%",
                        height: "70px",
                    }}
                >
                    <ItemTitle>{title}</ItemTitle>
                    <ItemLocation>{location}</ItemLocation>
                </div>
                <LabelContainer>
                    <Label>
                        <b>보증금 </b>
                        {formatter(Number(label.deposit))}원
                    </Label>
                    <Label>
                        <b>월세 </b>
                        {formatter(Number(label.cost))}원
                    </Label>
                </LabelContainer>
            </Information>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 7px 13px -5px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    flex-shrink: 0;
    z-index: 99;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`;

const ItemImage = styled(Image)`
    width: 120px;
    height: 120px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray.hue1};
    object-fit: cover;
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    width: 100%;
    height: auto;
    padding-left: 12px;
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
    height: auto;
`;

const Label = styled.li`
    width: auto;
    height: auto;
    padding: 6px 8px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.white.hue3};
    font-size: 0.75rem;
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
