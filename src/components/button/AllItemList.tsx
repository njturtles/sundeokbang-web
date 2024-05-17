import React from "react";
import styled from "@emotion/styled";
import ListIcon from "@/assets/icons/list-icon.svg";

type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const AllItemList = ({ onClick }: Props) => {
    return (
        <Container onClick={onClick}>
            <ListIcon />
            매물 전체보기
        </Container>
    );
};

const Container = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 170px;
    height: 50px;
    padding: 10px 20px;
    border: none;
    border-radius: 16px;
    outline: none;
    background-color: ${({ theme }) => theme.color.primary.hue1};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 8px 9px -8px rgba(0, 0, 0, 0.25);
`;

export default AllItemList;
