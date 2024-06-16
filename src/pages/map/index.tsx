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
import { schoolIdAtom } from "@/stores/schoolId";
import useRoomList from "@/queries/useRoomList";
import { filterAtom } from "@/stores/filter";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import useCluster from "@/hooks/useCluster";

const apiKey = process.env.NEXT_PUBLIC_NAVERMAP_API_KEY;

const Map = () => {
    const router = useRouter();
    const [detail, setDetail] = useState<RoomDataType | null>(null);
    const [isMapView, setIsMapView] = useState<boolean>(true);
    const schoolId = useRecoilValue(schoolIdAtom);
    const filter = useRecoilValue(filterAtom);
    const [mount, setMount] = useState<boolean>(false);
    const mapRef = useRef<NaverMap | null>(null);
    const { addCluster, resetCluster } = useCluster();
    const { data, refetch } = useRoomList(
        schoolId,
        filter.deposit,
        filter.cost,
    );

    useEffect(() => {
        if (filter.deposit && filter.cost) {
            refetch();
            setDetail(null);
        }
    }, [filter]);

    useEffect(() => {
        resetCluster();
        if (isMapView && data?.data.result && mount)
            addCluster(mapRef.current, data?.data.result, setDetail);
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
            <MapLayout style={{ overflowY: isMapView ? "hidden" : undefined }}>
                <TopNavigation onBack={() => setIsMapView((prev) => !prev)} />
                {!isMapView && (
                    <ListContainer>
                        {!data?.data.result && (
                            <NoItems>설정한 조건의 매물이 없습니다.</NoItems>
                        )}
                        {data?.data.result &&
                            data.data.result.map((room: RoomDataType) => (
                                <ListCard
                                    onClick={() =>
                                        router.push(`/detail/${room._id}`)
                                    }
                                    key={room.name}
                                    title={room.name}
                                    location={room.address}
                                    label={{
                                        deposit: String(
                                            room.deposit.toLocaleString(
                                                "ko-kr",
                                            ),
                                        ),
                                        cost: String(
                                            room.cost.toLocaleString("ko-kr"),
                                        ),
                                    }}
                                    imgSrc={room.imageUrls[0]}
                                />
                            ))}
                    </ListContainer>
                )}
                <>
                    <Script
                        strategy="afterInteractive"
                        type="text/javascript"
                        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                        onReady={initializeMap}
                    />
                    <MapContainer>
                        <div
                            id="map"
                            style={{ width: "100%", height: "100%" }}
                        ></div>
                        {data?.data.result && (
                            <AllItemList onClick={() => setIsMapView(false)} />
                        )}
                    </MapContainer>

                    <BottomContainer>
                        <AnimatePresence>
                            {detail && isMapView && (
                                <CardContainer
                                    key="roomCard"
                                    initial={{ y: 200 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: 200 }}
                                    transition={{
                                        y: { type: "spring", bounce: 0 },
                                        duration: 0.05,
                                    }}
                                >
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
                                        imgSrc={detail.imageUrls[0]}
                                        closeEvent={() => setDetail(null)}
                                    />
                                </CardContainer>
                            )}
                        </AnimatePresence>
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

const CardContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: auto;
    z-index: 999;
`;

const MapContainer = styled.main`
    position: relative;
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
    z-index: 999;
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
