import React, { useState } from "react";
import styled from "@emotion/styled";
import ArrowIcon from "@/assets/icons/back-button.svg";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Image from "next/image";
import { ThumbnailFile } from "@/types/room";

type Props = {
    images: ThumbnailFile[];
    closeEvent: () => void;
};

const ImageDetail = ({ images, closeEvent }: Props) => {
    const [current, setCurrent] = useState<number>(0);

    return (
        <Container>
            <ImageContainer>
                <CloseButton onClick={closeEvent}>
                    <CloseIcon />
                </CloseButton>
                <ButtonContainer>
                    <PrevButton
                        onClick={() =>
                            setCurrent((prev) => {
                                if (prev === 0) return images.length - 1;
                                return prev - 1;
                            })
                        }
                    >
                        <ArrowIcon />
                    </PrevButton>

                    <NextButton
                        onClick={() =>
                            setCurrent((prev) => {
                                if (prev === images.length - 1) return 0;
                                return prev + 1;
                            })
                        }
                    >
                        <ArrowIcon />
                    </NextButton>
                </ButtonContainer>
                <OptimizedImgContainer>
                    <OptimizedImg
                        alt="방 이미지"
                        fill={true}
                        src={images[current].url}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </OptimizedImgContainer>
            </ImageContainer>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 0 40px;
    background-color: rgba(0, 0, 0, 0.25);
    overflow: hidden;
    z-index: 9999;
    backdrop-filter: blur(5px);
`;

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    margin-bottom: 160px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0 10px;
    z-index: 999;
`;

const OptimizedImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const OptimizedImg = styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    background: white;
`;

const PrevButton = styled.button`
    width: auto;
    height: auto;
    outline: none;
    border: none;
    background: transparent;
    & svg path {
        stroke: ${({ theme }) => theme.color.white.hue0};
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
`;

const NextButton = styled(PrevButton)`
    & svg {
        transform: rotate(180deg);
    }
`;

const CloseButton = styled(PrevButton)`
    position: absolute;
    top: 20px;
    right: 20px;
    & svg path {
        fill: ${({ theme }) => theme.color.white.hue0};
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    z-index: 999;
`;

export default ImageDetail;
