import React, { CSSProperties } from "react";
import styled from "@emotion/styled";
import FavCheckedIcon from "@/assets/icons/favorite-icon-checked.svg";
import FavIcon from "@/assets/icons/favorite-icon.svg";

type Props = {
    onClick?(): void;
    checked?: boolean;
    style?: CSSProperties;
};

const FavButton = ({ onClick, checked, style }: Props) => {
    return (
        <Container onClick={onClick || undefined} style={{ ...style }}>
            {checked ? <FavCheckedIcon /> : <FavIcon />}
        </Container>
    );
};

const Container = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    border: none;
    outline: none;
    background: transparent;
`;

export default FavButton;
