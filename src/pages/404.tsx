import React from "react";
import styled from "@emotion/styled";
import LogoImage from "@/assets/images/logo_1.svg";

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
    width: auto;
    height: 100vh;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 1.25rem;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2rem;
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default NotFoundPage;
