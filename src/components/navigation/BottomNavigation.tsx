import React, { useState } from "react";
import styled from "@emotion/styled";
import CommonButton from "../button/CommonButton";
import CallIcon from "@/assets/icons/call-icon.svg";
import { roomApi } from "@/apis/room";
import { ResponseType } from "@/types/response";
import { AxiosResponse } from "axios";
import FavIconChecked from "@/assets/icons/favorite-icon-checked.svg";
import FavIcon from "@/assets/icons/favorite-icon.svg";

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

    return (
        <Container>
            <FavButton onClick={favHandler} favorited={fav}>
                {fav && <FavIconChecked />}
                {!fav && <FavIcon />}
                즐겨찾기
            </FavButton>
            <CommonButton type="primary" onClick={telHref}>
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
    justify-content: space-between;
    gap: 10px;
    width: min(480px, 100%);
    height: 130px;
    padding: 20px 28px;
    border-top: 1px solid ${({ theme }) => theme.color.gray.hue1};
    background-color: ${({ theme }) => theme.color.white.hue0};
    z-index: 999;
`;

const FavButton = styled.button<{ favorited: boolean }>`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 50px;
    outline: none;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.color.gray.hue0};
    ${({ favorited, theme }) =>
        favorited && `color: ${theme.color.primary.hue0};`}
`;

export default BottomNavigation;
