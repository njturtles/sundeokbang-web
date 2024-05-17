import React, { CSSProperties } from "react";
import styled from "@emotion/styled";

type Props = {
    current: number;
    max: number;
    style?: CSSProperties;
};

const ImageIndicator = ({ current, max, style }: Props) => {
    return (
        <Container style={style || undefined}>
            <Current>{current}</Current>
            <Max>{max}</Max>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 70px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
`;

const Indicator = styled.span`
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.white.hue0};
`;

const Current = styled(Indicator)`
    &::after {
        padding-left: 8px;
        content: " / ";
        color: rgba(0, 0, 0, 0.2);
    }
`;

const Max = styled(Indicator)`
    color: rgba(0, 0, 0, 0.2);
`;

export default ImageIndicator;
