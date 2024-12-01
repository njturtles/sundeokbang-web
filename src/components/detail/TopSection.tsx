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
            {images[0]?.url && (
                <Thumbnail
                    onClick={clickEvent}
                    alt="방 썸네일"
                    src={images[0]?.url || ""}
                    width={100}
                    height={100}
                />
            )}
            {!images[0]?.url && <ImagePlaceholder>NO IMAGE</ImagePlaceholder>}
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
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ImagePlaceholder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.gray.hue0};
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.color.black.hue1};
`;

export default TopSection;
