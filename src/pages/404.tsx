import React from "react";
import styled from "@emotion/styled";
import LogoImage from "@/assets/images/logo_1.svg";
import CommonButton from "@/components/button/CommonButton";

const NotFoundPage = () => {
    return (
        <Container>
            <LogoImage />
            <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
            <CommonButton type="primary">홈으로 돌아가기</CommonButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    padding-top: 80px;
    font-size: 1.25rem;
`;

const Title = styled.h1`
    padding-top: 60px;
    font-size: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default NotFoundPage;
