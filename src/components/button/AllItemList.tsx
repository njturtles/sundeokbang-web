import React from "react";
import styled from "@emotion/styled";

type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AllItemList = ({ onClick }: Props) => {
    return <Container onClick={onClick}>매물 전체보기</Container>;
};

const Container = styled.button`
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: auto;
    height: auto;
    padding: 10px 20px;
    border: none;
    border-radius: 0 0 16px 16px;
    outline: none;
    background-color: ${({ theme }) => theme.color.primary.hue1};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 8px 9px -8px rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
    z-index: 99;
`;

export default AllItemList;
