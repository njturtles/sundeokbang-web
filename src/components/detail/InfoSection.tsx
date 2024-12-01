import React from "react";
import styled from "@emotion/styled";

type Props = {
    title: string;
    paragraphs: { title: string; content?: string }[];
};

const SectionContainer = ({ title, paragraphs }: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Paragraphs>
                {paragraphs.map((para) => (
                    <Paragraph key={para.title}>
                        <ParagraphTitle>{para.title}</ParagraphTitle>
                        <ParagraphContent>
                            {para.content || ""}
                        </ParagraphContent>
                    </Paragraph>
                ))}
            </Paragraphs>
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

const Paragraphs = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 14px;
`;

const Paragraph = styled.li`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const ParagraphTitle = styled.span`
    display: block;
    width: 100px;
    height: 100%;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.black.hue2};
`;

const ParagraphContent = styled.span`
    display: block;
    width: auto;
    height: 100%;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.regular};
    color: ${({ theme }) => theme.color.black.hue0};
`;

export default SectionContainer;
