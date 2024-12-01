import React, { useCallback, useEffect, useRef, useState } from "react";
import MapLayout from "@/layout/MapLayout";
import Script from "next/script";
import { MapOptions, NaverMap } from "@/types/navermaps";
import { AllItemList } from "@/components/button";
import styled from "@emotion/styled";
import Card from "@/components/card/Card";
import TopNavigation from "@/components/navigation/TopNavigation";
import { RoomDataType } from "@/types/room";
import ListCard from "@/components/card/ListCard";
import { useRecoilValue } from "recoil";
import useRoomList from "@/queries/useRoomList";
import { filterAtom } from "@/stores/filter";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import useCluster from "@/hooks/useCluster";

const apiKey = process.env.NEXT_PUBLIC_NAVERMAP_API_KEY;

const Map = () => {
    const router = useRouter();
    const [detail, setDetail] = useState<RoomDataType | null>(null);
    const [isMapView, setIsMapView] = useState<boolean>(true);
    const filter = useRecoilValue(filterAtom);
    const [mount, setMount] = useState<boolean>(false);
    const mapRef = useRef<NaverMap | null>(null);
    const { addCluster, resetCluster, resetSelected } = useCluster();
    const { data, refetch } = useRoomList(
        filter.deposit[0],
        filter.deposit[1],
        filter.cost[0],
        filter.cost[1],
    );
    const memoizeCluster = useCallback(
        (
            mapRef: NaverMap,
            data: RoomDataType[],
            count: number,
            callback: (room: RoomDataType) => void,
        ) => addCluster(mapRef, data, count, callback),
        [detail],
    );

    useEffect(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        window.addEventListener("resize", () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    });

    useEffect(() => {
        if (filter.deposit && filter.cost) {
            refetch();
            resetSelected();
            setDetail(null);
        }
    }, [filter]);

    useEffect(() => {
        resetCluster();
        resetSelected();
        if (isMapView && data && mount) {
            if (data.data.code !== 2000)
                throw new Error("Unauthorized Request");
            memoizeCluster(
                mapRef.current,
                data.data.result.rows,
                data.data.result.rows.length,
                (room: RoomDataType | null) => setDetail(room),
            );
        }
    }, [data, mount]);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(34.967338, 127.479688),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
        map.addListener("click", () => {
            resetSelected();
            setDetail(null);
        });
        mapRef.current = map;
        setMount(true);
    };

    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                onReady={initializeMap}
            />
            <MapLayout>
                <TopNavigation />
                {!isMapView && (
                    <>
                        <ListContainer>
                            {!data?.data.result.rows && (
                                <NoItems>
                                    설정한 조건의 매물이 없습니다.
                                </NoItems>
                            )}
                            {data?.data.result.rows &&
                                data.data.result.rows.map(
                                    (room: RoomDataType) => {
                                        return (
                                            <ListCard
                                                onClick={() =>
                                                    router.push(
                                                        `/detail/${room._id}`,
                                                    )
                                                }
                                                key={room.name}
                                                title={room.name}
                                                location={room.address}
                                                label={{
                                                    deposit:
                                                        room.deposit.toLocaleString(
                                                            "ko-kr",
                                                        ),
                                                    cost: room.cost.toLocaleString(
                                                        "ko-kr",
                                                    ),
                                                }}
                                                imgSrc={
                                                    room.files[0]?.url || ""
                                                }
                                            />
                                        );
                                    },
                                )}
                        </ListContainer>
                        <ShowMap onClick={() => setIsMapView(true)}>
                            지도로 보기
                        </ShowMap>
                    </>
                )}
                <>
                    <MapContainer>
                        <MapDiv
                            id="map"
                            style={{ width: "100%", height: "100%" }}
                        ></MapDiv>
                        {data && (
                            <AllItemList onClick={() => setIsMapView(false)} />
                        )}
                    </MapContainer>

                    <BottomContainer>
                        {detail && isMapView && (
                            <Card
                                onClick={() =>
                                    router.push(`/detail/${detail._id}`)
                                }
                                title={detail.name}
                                location={detail.address}
                                label={{
                                    deposit: `${detail.deposit}`,
                                    cost: `${detail.cost}`,
                                }}
                                imgSrc={detail.files[0]?.url || ""}
                                closeEvent={() => {
                                    resetSelected();
                                    setDetail(null);
                                }}
                            />
                        )}
                    </BottomContainer>
                </>
            </MapLayout>
        </>
    );
};

const BottomContainer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    width: min(480px, 100%);
    height: auto;
    margin: 0 auto;
    padding: 16px;
`;

const MapContainer = styled.main`
    position: relative;
    width: 100%;
    height: calc(100% - 100px);
`;

const MapDiv = styled.div`
    width: 100%;
    height: 100%;
    z-index: 9;
`;

const ListContainer = styled(motion.ul)`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    min-height: 100%;
    padding-top: 12px;
    overflow-y: visible;
    background-color: ${({ theme }) => theme.color.white.hue2};
    z-index: 99;
`;

const NoItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding-top: 100px;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.color.gray.hue2};
`;

const ShowMap = styled.button`
    position: fixed;
    left: 50%;
    bottom: 40px;
    width: auto;
    height: 48px;
    padding: 0 28px;
    border: none;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.color.primary.hue1};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.font.Pretendard.medium};
    color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px 8px 9px -8px rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
    z-index: 99;
`;

export default Map;
