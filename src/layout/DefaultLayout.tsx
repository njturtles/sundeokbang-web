import React from "react";
import styled from "@emotion/styled";

type Props = {
    children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
    return <Container>{children}</Container>;
};

const Container = styled.div`
    position: relative;
    width: min(480px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    background: white;
    overflow: hidden;
    overflow-y: scroll;
`;

export default DefaultLayout;
