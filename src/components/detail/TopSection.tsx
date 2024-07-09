import React from "react";
import styled from "@emotion/styled";
import BackButton from "../button/BackButton";
import { ThumbnailFile } from "@/types/room";
// import ImageIndicator from "../indicator/ImageIndicator";
// import Image from "next/image";

type Props = {
    images: ThumbnailFile[];
    clickEvent: () => void;
};

const TopSection = ({ images, clickEvent }: Props) => {
    return (
        <TopContainer>
            <BackButton
                type="default"
                style={{ position: "absolute", top: "70px", left: "20px" }}
            />
            {/* <Image
                alt="방 썸네일"
                src={images[0]}
                width={100}
                height={100}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            /> */}
            <Thumbnail
                onClick={clickEvent}
                alt="방 썸네일"
                src={images[0].url}
                width={100}
                height={100}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                }}
            />
            {/* <ImageIndicator
                current={1}
                max={images.length}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                }}
            /> */}
        </TopContainer>
    );
};

const TopContainer = styled.section`
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #ccc;
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default TopSection;
