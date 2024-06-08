import React, { CSSProperties, useRef } from "react";
import styled from "@emotion/styled";
import { FilterDetail } from "@/components/filter";
import { useRecoilValue } from "recoil";
import { overlayAtom } from "@/stores/overlay";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    animate: { y: 0 },
    initial: { y: 500 },
    exit: { y: 500 },
};

const MapLayout = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: CSSProperties;
}) => {
    const overlay = useRecoilValue(overlayAtom);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    return (
        <Container style={{ ...style }}>
            <AnimatePresence>
                {overlay && (
                    <>
                        <FilterContainer ref={overlayRef}>
                            <motion.div
                                key="filter"
                                variants={variants}
                                animate="animate"
                                initial="initial"
                                exit="exit"
                                transition={{
                                    y: { type: "spring", bounce: 0 },
                                    duration: 0.1,
                                }}
                                style={{ width: "100%", height: "500px" }}
                            >
                                <FilterDetail />
                            </motion.div>
                        </FilterContainer>
                        <motion.div
                            key="background"
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                zIndex: "9999",
                                backgroundColor: "rgba(0,0,0,0.1)",
                                backdropFilter: "blur(5px)",
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
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

const FilterContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    z-index: 99999;
`;

export default MapLayout;
