import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import BackIcon from "@/assets/icons/back-button.svg";

type Props = {
    onClick?: () => void;
    type: "map" | "default";
    style?: CSSProperties;
};

const BackButton = ({ onClick, type, style }: Props) => {
    return (
        <Container
            $type={type}
            onClick={onClick || undefined}
            style={style || undefined}
        >
            <BackIcon />
        </Container>
    );
};

const Container = styled.button<{ $type: Props["type"] }>`
    width: auto;
    height: auto;
    border: none;
    outline: none;
    background: transparent;
    ${({ theme, $type }) =>
        $type === "default" &&
        `& svg path {
            stroke: ${theme.color.white.hue0};
            filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
        }
    `}
`;

export default BackButton;
