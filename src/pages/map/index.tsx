import React, { useRef, useState } from "react";
import MapLayout from "@/layout/MapLayout";
import Script from "next/script";
import { MapOptions, NaverMap } from "@/types/navermaps";
import { AllItemList, CurrentLocation } from "@/components/button";
import styled from "@emotion/styled";
import Card from "@/components/card/Card";
import TopNavigation from "@/components/navigation/TopNavigation";
import MapMarker from "@/components/map/MapMarker";

const apiKey = process.env.NEXT_PUBLIC_NAVERMAP_API_KEY;

const Map = () => {
    const [mount, setMount] = useState<boolean>(false);
    const mapRef = useRef<NaverMap | null>(null);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
        mapRef.current = map;
        setMount(true);
    };

    const moveToCurrentPos = () => {
        if (mapRef.current) {
            const curPos = new window.naver.maps.LatLng(37.3595704, 127.105399);
            mapRef.current.morph(curPos, 16, { easing: "easeInCubic" });
        }
    };

    return (
        <>
            <Script
                strategy="beforeInteractive"
                type="text/javascript"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                onReady={initializeMap}
            />

            <MapLayout>
                <TopNavigation />
                <MapContainer>
                    <ButtonContainer>
                        <CurrentLocation onClick={() => moveToCurrentPos()} />
                    </ButtonContainer>
                    <div id="map" style={{ width: "100%", height: "100%" }}>
                        {mount && mapRef.current && (
                            <MapMarker
                                mapRef={mapRef.current || null}
                                pos={{ lat: 37.3595704, lng: 127.105399 }}
                            />
                        )}
                    </div>
                </MapContainer>
                <BottomContainer>
                    <AllItemList />
                    <CardContainer>
                        <Card
                            title="방 이름"
                            location="주소"
                            label={{ deposit: "1000만원", monthly: "1000원" }}
                        />
                        <Card
                            title="방 이름"
                            location="주소"
                            label={{ deposit: "1000만원", monthly: "1000원" }}
                        />
                        <Card
                            title="방 이름"
                            location="주소"
                            label={{ deposit: "1000만원", monthly: "1000원" }}
                        />
                    </CardContainer>
                </BottomContainer>
            </MapLayout>
        </>
    );
};

const ButtonContainer = styled.div`
    position: absolute;
    width: auto;
    height: auto;
    right: 20px;
    top: 238px;
    z-index: 999;
`;

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
`;

const CardContainer = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: auto;
    padding-left: 40px;
    padding-right: 20px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const MapContainer = styled.main`
    width: 100%;
    height: 100%;
`;

export default Map;
