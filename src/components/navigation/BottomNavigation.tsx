import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CommonButton from "../button/CommonButton";
import CallIcon from "@/assets/icons/call-icon.svg";
import StarIcon from "@/assets/icons/star-icon.svg";
import { roomApi } from "@/apis/room";
import { ResponseType } from "@/types/response";
import { AxiosResponse } from "axios";

const BottomNavigation = ({
    roomId,
    tel,
    initFav,
}: {
    roomId: string;
    tel: string;
    initFav: boolean;
}) => {
    const FAV_CLICK_DELAY = 1000;
    const [fav, setFav] = useState<boolean>(initFav ? true : false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const telHref = () =>
        tel ? (document.location.href = `tel:${tel}`) : null;

    const favHandler = async () => {
        if (disabled) return;

        if (fav) {
            await roomApi
                .deleteFavoriteRoom(roomId)
                .then((res: AxiosResponse<ResponseType>) => {
                    if (res.data.code === 2000) {
                        setFav(false);
                        setDisabled(true);
                        setTimeout(() => {
                            setDisabled(false);
                        }, FAV_CLICK_DELAY);
                    }
                });
        }

        if (!fav) {
            await roomApi
                .postFavoriteRoom(roomId)
                .then((res: AxiosResponse<ResponseType>) => {
                    if (res.data.code === 2000) {
                        setFav(true);
                        setDisabled(true);
                        setTimeout(() => {
                            setDisabled(false);
                        }, FAV_CLICK_DELAY);
                    }
                });
        }
    };

    useEffect(() => {
        console.log(fav);
    }, [fav]);

    return (
        <Container>
            <CommonButton type="secondary" onClick={favHandler}>
                {fav && <StarIcon />}
                즐겨찾기
            </CommonButton>
            <CommonButton type="primary" onClick={() => telHref}>
                <CallIcon />
                연락하기
            </CommonButton>
        </Container>
    );
};

const Container = styled.nav`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    width: min(480px, 100%);
    height: 130px;
    padding: 20px 28px;
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue1};
    background-color: ${({ theme }) => theme.color.white.hue0};
    z-index: 999;
    & > button {
        flex-grow: 1;
    }
`;

export default BottomNavigation;
