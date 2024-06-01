import React, { useEffect, useRef, useState } from "react";
import MapLayout from "@/layout/MapLayout";
import Script from "next/script";
import { MapOptions, NaverMap } from "@/types/navermaps";
import { AllItemList } from "@/components/button";
import styled from "@emotion/styled";
import Card from "@/components/card/Card";
import TopNavigation from "@/components/navigation/TopNavigation";
import MapMarker from "@/components/map/MapMarker";
import { RoomDataType } from "@/types/room";
import ListCard from "@/components/card/ListCard";
import { useRecoilValue } from "recoil";
import { schoolIdAtom } from "@/stores/schoolId";
import useRoomList from "@/queries/useRoomList";
import { filterAtom } from "@/stores/filter";
import { useRouter } from "next/router";

const apiKey = process.env.NEXT_PUBLIC_NAVERMAP_API_KEY;

const Map = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState<RoomDataType[] | null>(null);
    const [detail, setDetail] = useState<RoomDataType | null>(null);
    const [isMapView, setIsMapView] = useState<boolean>(true);
    const [mount, setMount] = useState<boolean>(false);
    const schoolId = useRecoilValue(schoolIdAtom);
    const filter = useRecoilValue(filterAtom);
    const { data, refetch } = useRoomList(
        schoolId,
        filter.deposit,
        filter.cost,
    );
    const mapRef = useRef<NaverMap | null>(null);

    useEffect(() => {
        data && setRooms(data.data.result);
    }, [data]);

    useEffect(() => {
        if (filter.deposit && filter.cost) {
            refetch();
            setDetail(null);
        }
        console.log(filter);
    }, [filter]);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(34.968416, 127.014755),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
        mapRef.current = map;
        setMount(true);
    };

    return (
        <>
            <MapLayout style={{ overflowY: isMapView ? "hidden" : undefined }}>
                {isMapView && (
                    <>
                        <TopNavigation onBack={() => undefined} />
                        <Script
                            strategy="beforeInteractive"
                            type="text/javascript"
                            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                            onReady={initializeMap}
                        />
                        <MapContainer>
                            <div
                                id="map"
                                style={{ width: "100%", height: "100%" }}
                            >
                                {mount &&
                                    mapRef.current &&
                                    rooms &&
                                    rooms.map((room) => (
                                        <MapMarker
                                            title={room.name}
                                            key={room._id}
                                            onClick={() => setDetail(room)}
                                            mapRef={mapRef.current || null}
                                            pos={{
                                                lat: room.latitude,
                                                lng: room.longitude,
                                            }}
                                        />
                                    ))}
                            </div>
                        </MapContainer>
                        <BottomContainer>
                            <AllItemList onClick={() => setIsMapView(false)} />
                            <CardContainer>
                                {detail && (
                                    <Card
                                        onClick={() =>
                                            router.push(`/detail/${detail._id}`)
                                        }
                                        title={detail.name}
                                        location={detail.address}
                                        label={{
                                            deposit: `${detail.deposit}만원`,
                                            cost: `${detail.cost}만원`,
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
                            {!rooms && (
                                <NoItems>
                                    설정한 조건의 매물이 없습니다.
                                </NoItems>
                            )}
                            {rooms &&
                                rooms?.map((room) => (
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
    padding: 32px 10px;
    padding-top: 0;
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
    width: 100%;
    height: auto;
    padding-top: 20px;
    overflow-y: visible;
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
