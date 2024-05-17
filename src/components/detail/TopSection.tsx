import React from "react";
import styled from "@emotion/styled";
import BackButton from "../button/BackButton";
import ImageIndicator from "../indicator/ImageIndicator";

const TopSection = () => {
    return (
        <TopContainer>
            <BackButton
                type="default"
                style={{ position: "absolute", top: "70px", left: "20px" }}
            />
            <ImageIndicator
                current={1}
                max={5}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                }}
            />
        </TopContainer>
    );
};

const TopContainer = styled.section`
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #ccc;
`;

export default TopSection;
