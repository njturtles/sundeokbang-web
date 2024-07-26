import React, { useEffect, useRef, useState } from "react";
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
    const { addCluster, resetCluster } = useCluster();
    const { data, refetch } = useRoomList(
        filter.deposit[0],
        filter.deposit[1],
        filter.cost[0],
        filter.cost[1],
    );

    useEffect(() => {
        if (filter.deposit && filter.cost) {
            refetch();
            setDetail(null);
        }
    }, [filter]);

    useEffect(() => {
        resetCluster();
        if (isMapView && data && mount) {
            if (data.data.code !== 2000)
                throw new Error("Unauthorized Request");
            addCluster(mapRef.current, data?.data.result.rows, setDetail);
        }
    }, [data, mount]);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(34.967338, 127.479688),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
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
            <MapLayout style={{ overflowY: isMapView ? "hidden" : undefined }}>
                <TopNavigation onBack={() => setIsMapView((prev) => !prev)} />
                {!isMapView && (
                    <ListContainer>
                        {!data?.data.result.rows && (
                            <NoItems>설정한 조건의 매물이 없습니다.</NoItems>
                        )}
                        {data?.data.result.rows &&
                            data.data.result.rows.map((room: RoomDataType) => {
                                return (
                                    <ListCard
                                        onClick={() =>
                                            router.push(`/detail/${room._id}`)
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
                                        imgSrc={room.files[0].url}
                                    />
                                );
                            })}
                    </ListContainer>
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
                                imgSrc={detail.files[0].url}
                                closeEvent={() => setDetail(null)}
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
    height: 100%;
`;

const MapDiv = styled.div`
    width: 100%;
    height: 100%;
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

export default Map;
