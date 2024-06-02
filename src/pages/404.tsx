import React from "react";
import styled from "@emotion/styled";
import LogoImage from "@/assets/images/logo_1.svg";
import CommonButton from "@/components/button/CommonButton";

const NotFoundPage = () => {
    return (
        <Container>
            <LogoImage />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
                <CommonButton type="primary">홈으로 돌아가기</CommonButton>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    width: 500px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 40px;
    font-size: 1.25rem;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default NotFoundPage;
