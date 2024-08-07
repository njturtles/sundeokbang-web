import { useState } from "react";
import { markerCluster } from "@/utils/marker-cluster";
import { ClusterType, HtmlIcon, ImageIcon, NaverMap } from "@/types/navermaps";
import { RoomDataType } from "@/types/room";

const useCluster = () => {
    const clusterIconImg =
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:1rem;font-weight:600;color:white;text-shadow: 0px 2px 2px rgba(0,0,0,0.3);text-align:center;font-weight:bold;background:url(./assets/icons/cluster-icon.png);background-size:contain;"></div>';
    const markerIconSrc = "./assets/icons/marker-icon.svg";
    const [cluster, setCluster] = useState<ClusterType | null>(null);

    const addCluster = (
        map: NaverMap,
        data: RoomDataType[],
        count: number,
        clickHandler: (room: RoomDataType) => void,
    ) => {
        if (window.naver) {
            const MarkerClustering = markerCluster(window.naver);
            const clusterIcon: HtmlIcon = {
                content: clusterIconImg,
                size: new naver.maps.Size(40, 40),
                anchor: new naver.maps.Point(20, 20),
            };

            const markerIcon: ImageIcon = {
                url: markerIconSrc,
                anchor: new naver.maps.Point(21, 27),
                size: new naver.maps.Size(28, 35),
            };

            const markers = data.map((room) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(
                        room.latitude,
                        room.longitude,
                    ),
                    title: room.name,
                    icon: markerIcon,
                });
                marker.addListener("click", () => clickHandler(room));
                return marker;
            });

            const clusterObject = new MarkerClustering({
                minClusterSize: 2,
                maxZoom: 15,
                map: map,
                markers: markers,
                disableClickZoom: false,
                gridSize: 120,
                icons: [clusterIcon],
                indexGenerator: [10, 100, 200, 500, 1000],
                stylingFunction: function (clusterMarker: NaverMap) {
                    clusterMarker
                        .getElement()
                        .querySelector("div:first-child").innerText = count;
                },
            });
            setCluster(clusterObject);
        }
    };

    const resetCluster = () => {
        if (window.naver) {
            cluster &&
                setCluster((prev) => {
                    prev?.delMap();
                    return null;
                });
        }
    };

    return { addCluster, resetCluster };
};

export default useCluster;
