import React, { useRef } from "react";
import styled from "@emotion/styled";
import DefaultLayout from "@/layout/DefaultLayout";
import TopSection from "@/components/detail/TopSection";
import InfoSection from "@/components/detail/InfoSection";
import TitleSection from "@/components/detail/TitleSection";
import OptionsSection from "@/components/detail/OptionsSection";
import DetailSection from "@/components/detail/DetailSection";
import Script from "next/script";
import { MapOptions, NaverMap } from "@/types/navermaps";
import LocationSection from "@/components/detail/LocationSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const apiKey = process.env.NEXT_PUBLIC_NAVER_API_KEY;

const Detail = () => {
    const mapRef = useRef<NaverMap | null>(null);

    const initializeMap = () => {
        const mapOptions: MapOptions = {
            center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        };

        const map = new window.naver.maps.Map("map", mapOptions);
        mapRef.current = map;
    };

    return (
        <>
            <Script
                strategy="beforeInteractive"
                type="text/javascript"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}&callback=initMap`}
                onReady={initializeMap}
            />

            <DefaultLayout>
                <TopSection />
                <MainContainer>
                    <TitleSection title="방 이름" location="주소" />
                    <InfoSection title="계약 정보" />
                    <InfoSection title="방 정보" />
                    <OptionsSection title="옵션 정보" />
                    <DetailSection title="상세 정보" />
                    <LocationSection title="위치" location="주소">
                        <div
                            id="map"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </LocationSection>
                </MainContainer>
                <BottomNavigation />
            </DefaultLayout>
        </>
    );
};

const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding-bottom: 144px;
    background-color: ${({ theme }) => theme.color.white.hue2};
    box-shadow: 0px -6px 30px 5px rgba(0, 0, 0, 0.1);
`;

export default Detail;
