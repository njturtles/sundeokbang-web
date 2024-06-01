import React from "react";
import styled from "@emotion/styled";
import CommonButton from "../button/CommonButton";
import CallIcon from "@/assets/icons/call-icon.svg";
import StarIcon from "@/assets/icons/star-icon.svg";

const BottomNavigation = ({ tel }: { tel?: string }) => {
    const telHref = () =>
        tel ? (document.location.href = `tel:${tel}`) : null;
    return (
        <Container>
            <CommonButton type="secondary">
                <StarIcon />
                즐겨찾기
            </CommonButton>
            <CommonButton type="primary" onClick={() => telHref}>
                <CallIcon />
                연락하기
            </CommonButton>
        </Container>
    );
};

const Container = styled.nav`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    width: min(480px, 100%);
    height: 130px;
    padding: 20px 28px;
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue1};
    background-color: ${({ theme }) => theme.color.white.hue0};
    z-index: 999;
    & > button {
        flex-grow: 1;
    }
`;

export default BottomNavigation;
