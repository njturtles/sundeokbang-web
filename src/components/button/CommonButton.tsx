import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

type Props = {
    type: "primary" | "secondary";
    children: React.ReactNode;
    onClick?: () => void;
    style?: CSSProperties;
    disabled?: boolean;
};

const CommonButton = ({ type, children, onClick, style, disabled }: Props) => {
    return (
        <Container
            onClick={onClick || undefined}
            $type={type}
            style={{ ...style }}
            disabled={disabled}
        >
            {children}
        </Container>
    );
};

const Container = styled.button<{ $type: Props["type"] }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 120px;
    height: 50px;
    padding: 10px 30px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    background-color: ${({ theme }) => theme.color.primary.hue1};
    color: ${({ theme }) => theme.color.white.hue0};
    ${({ theme, $type }) =>
        $type === "secondary" &&
        `
        border: 1px solid ${theme.color.primary.hue1};
        background-color: ${theme.color.white.hue0};
        color: ${theme.color.primary.hue1};
    `}
`;

export default CommonButton;
