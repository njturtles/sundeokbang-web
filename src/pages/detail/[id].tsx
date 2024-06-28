import React, { useState } from "react";
import styled from "@emotion/styled";
import DefaultLayout from "@/layout/DefaultLayout";
import TopSection from "@/components/detail/TopSection";
import InfoSection from "@/components/detail/InfoSection";
import TitleSection from "@/components/detail/TitleSection";
import OptionsSection from "@/components/detail/OptionsSection";
import DetailSection from "@/components/detail/DetailSection";
import LocationSection from "@/components/detail/LocationSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import useStaticMapURI from "@/hooks/useStaticMapURI";
import { mockApi } from "@/apis/mock";
import ImageDetail from "@/components/detail/ImageDetail";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import { useLocaleFormatter } from "@/hooks/useLocaleFormatter";

const apiKey = `${process.env.NEXT_PUBLIC_NAVERMAP_API_KEY_STATIC}`;
const apiSecret = `${process.env.NEXT_PUBLIC_NAVERMAP_API_SECRET_STATIC}`;

export const getServerSideProps = (async ({
    query,
}: GetServerSidePropsContext) => {
    if (!query.id) return { notFound: true };
    const response = await mockApi
        .getRoomById(String(query.id))
        .then(({ data }) => data)
        .catch((e) => {
            throw new Error(`An error occured while fetching data.: ${e}`);
        });
    if (response.code === 4040) return { notFound: true };
    return { props: { data: response } };
}) satisfies GetServerSideProps;

const Detail = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [olVisible, setOlVisible] = useState<boolean>(false);
    const formatter = useLocaleFormatter("ko-kr");
    const staticMapURI = useStaticMapURI({
        apiKey: apiKey,
        center: {
            lat: data?.result.latitude || 37.3591614,
            lng: data?.result.longitude || 127.1054221,
        },
        apiSecret: apiSecret,
        width: "500",
        height: "300",
        markers: `markers=type:d|size:mid|color:red|pos:${data?.result.longitude}%20${data?.result.latitude}`,
    });

    return (
        <>
            <DefaultLayout>
                {olVisible && (
                    <ImageDetail
                        images={data?.result.imageUrls || []}
                        closeEvent={() => setOlVisible(false)}
                    />
                )}
                <TopSection
                    images={data?.result.imageUrls || []}
                    clickEvent={() => setOlVisible(true)}
                />
                <MainContainer>
                    <TitleSection
                        title={data?.result.name || ""}
                        location={data?.result.address || ""}
                    />
                    <InfoSection
                        title="계약 정보"
                        paragraphs={[
                            {
                                title: "보증금",
                                content: formatter(data?.result.deposit) + "원",
                            },
                            {
                                title: "월세",
                                content: formatter(data?.result.cost) + "원",
                            },
                            {
                                title: "관리비",
                                content:
                                    formatter(data?.result.maintenanceCost) +
                                    "원",
                            },
                            {
                                title: "계약기간",
                                content: data?.result.term,
                            },
                        ]}
                    />
                    <InfoSection
                        title="방 정보"
                        paragraphs={[
                            {
                                title: "세대공동구역",
                                content: data?.result.commonArea,
                            },
                            {
                                title: "방 개수",
                                content: data?.result.type,
                            },
                            {
                                title: "전용 면적",
                                content: data?.result.exclusiveArea + "㎡",
                            },
                            {
                                title: "주차",
                                content: data?.result.parking
                                    ? "가능"
                                    : "불가능",
                            },
                            {
                                title: "난방방식",
                                content: data?.result.heatingSystem,
                            },
                        ]}
                    />
                    <OptionsSection
                        title="옵션 정보"
                        options={{
                            furniture: data?.result.furniture,
                            appliances: data?.result.appliances,
                            prevention: data?.result.prevention,
                            etc: data?.result.etc,
                        }}
                    />
                    <DetailSection
                        title="상세 정보"
                        content={
                            data?.result.detail || "No givien Information."
                        }
                    />
                    <LocationSection
                        title="위치"
                        location={data?.result.address || "주소"}
                    >
                        <MapImage src={staticMapURI} />
                    </LocationSection>
                </MainContainer>
                <BottomNavigation tel={data?.result.phone} />
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

const MapImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default Detail;
