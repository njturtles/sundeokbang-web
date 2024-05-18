import React from "react";
import styled from "@emotion/styled";

type Props = {
    title: string;
    content: string;
};

const DetailSection = ({ title, content }: Props) => {
    const paras = content.includes("\n") ? content.split("\n") : content;
    return (
        <Container>
            <Title>{title}</Title>
            <Content>
                {typeof paras === "string" && <Paragraph>{content}</Paragraph>}
                {typeof paras === "object" &&
                    paras.map((para, index) => (
                        <Paragraph key={index}>{para}</Paragraph>
                    ))}
            </Content>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    padding: 28px 24px;
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.color.white.hue0};
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue0};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.hue0};
`;

const Title = styled.h1`
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.semibold};
    color: ${({ theme }) => theme.color.black.hue0};
`;

const Content = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
`;

const Paragraph = styled.li`
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.regular};
    color: ${({ theme }) => theme.color.black.hue2};
`;

export default DetailSection;
