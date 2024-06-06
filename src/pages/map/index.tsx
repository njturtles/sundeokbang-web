import React, { useEffect, useRef, useState } from "react";
import MapLayout from "@/layout/MapLayout";
import Script from "next/script";
import { HtmlIcon, ImageIcon, MapOptions, NaverMap } from "@/types/navermaps";
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
import { markerCluster } from "@/utils/marker-cluster";

const apiKey = process.env.NEXT_PUBLIC_NAVERMAP_API_KEY;

interface ClusterType extends Partial<naver.maps.OverlayView> {
    delMap(): void;
}

const Map = () => {
    const router = useRouter();
    const [detail, setDetail] = useState<RoomDataType | null>(null);
    const [isMapView, setIsMapView] = useState<boolean>(true);
    const schoolId = useRecoilValue(schoolIdAtom);
    const filter = useRecoilValue(filterAtom);
    const { data, refetch } = useRoomList(
        schoolId,
        filter.deposit,
        filter.cost,
    );
    const mapRef = useRef<NaverMap | null>(null);

    const [cluster, setCluster] = useState<ClusterType | null>(null);

    useEffect(() => {
        if (filter.deposit && filter.cost) {
            refetch();
            setDetail(null);
        }
    }, [filter]);

    useEffect(() => {
        cluster &&
            setCluster((prev) => {
                prev?.delMap();
                return null;
            });

        if (isMapView && data?.data.result && mapRef.current) {
            const MarkerClustering = markerCluster(window.naver);
            const clusterMarker: HtmlIcon = {
                content:
                    '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:1rem;font-weight:600;color:white;text-shadow: 0px 2px 2px rgba(0,0,0,0.3);text-align:center;font-weight:bold;background:url(./assets/icons/cluster-icon.png);background-size:contain;"></div>',
                size: new naver.maps.Size(40, 40),
                anchor: new naver.maps.Point(20, 20),
            };

            const markerIcon: ImageIcon = {
                url: "./assets/icons/marker-icon.svg",
                anchor: new naver.maps.Point(12, 24),
                size: new naver.maps.Size(24, 24),
            };

            const markers = data?.data.result.map((room) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(
                        room.latitude,
                        room.longitude,
                    ),
                    title: room.name,
                    icon: markerIcon,
                });
                marker.addListener("click", () => setDetail(room));
                return marker;
            });

            const clusterObj = new MarkerClustering({
                minClusterSize: 2,
                maxZoom: 15,
                map: mapRef.current,
                markers: markers,
                disableClickZoom: false,
                gridSize: 120,
                icons: [clusterMarker],
                indexGenerator: [10, 100, 200, 500, 1000],
                stylingFunction: function (
                    clusterMarker: NaverMap,
                    count: string,
                ) {
                    clusterMarker
                        .getElement()
                        .querySelector("div:first-child").innerText = count;
                },
            });
            setCluster(clusterObj);
        }
    }, [data, isMapView]);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(34.967338, 127.479688),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
        mapRef.current = map;
    };

    return (
        <>
            <MapLayout style={{ overflowY: isMapView ? "hidden" : undefined }}>
                {isMapView && (
                    <>
                        <TopNavigation onBack={() => undefined} />
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
                        </MapContainer>
                        <BottomContainer>
                            {data?.data.result && (
                                <AllItemList
                                    onClick={() => setIsMapView(false)}
                                />
                            )}
                            <CardContainer>
                                {detail && (
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
                                )}
                            </CardContainer>
                        </BottomContainer>
                    </>
                )}
                {!isMapView && (
                    <>
                        <TopNavigation onBack={() => setIsMapView(true)} />
                        <ListContainer>
                            {!data?.data.result && (
                                <NoItems>
                                    설정한 조건의 매물이 없습니다.
                                </NoItems>
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
                                                room.cost.toLocaleString(
                                                    "ko-kr",
                                                ),
                                            ),
                                        }}
                                        imgSrc={room.imageUrls[0]}
                                    />
                                ))}
                        </ListContainer>
                    </>
                )}
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

const CardContainer = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: auto;
`;

const MapContainer = styled.main`
    width: 100%;
    height: 100%;
`;

const ListContainer = styled.ul`
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
