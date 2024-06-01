import React, { CSSProperties, useRef } from "react";
import styled from "@emotion/styled";
import { FilterDetail } from "@/components/filter";
import { useRecoilState } from "recoil";
import { overlayAtom } from "@/stores/overlay";

const MapLayout = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style: CSSProperties;
}) => {
    const [overlay, setOverlay] = useRecoilState(overlayAtom);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const overlayClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) setOverlay(false);
    };

    return (
        <Container onClick={overlayClickHandler} style={{ ...style }}>
            {overlay && (
                <Overlay ref={overlayRef}>
                    <FilterDetail />
                </Overlay>
            )}
            {children}
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: min(480px, 100%);
    height: 100vh;
    margin: 0 auto;
    background: white;
`;

const Overlay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 9999;
    backdrop-filter: blur(4px);
`;

export default MapLayout;
