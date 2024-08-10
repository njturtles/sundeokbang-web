import { useState } from "react";
import { markerCluster } from "@/utils/marker-cluster";
import { ClusterType, HtmlIcon, NaverMap } from "@/types/navermaps";
import { RoomDataType } from "@/types/room";

const useCluster = () => {
    const clusterIconImg =
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:1rem;font-weight:600;color:white;text-shadow: 0px 2px 2px rgba(0,0,0,0.3);text-align:center;font-weight:bold;background:url(./assets/icons/cluster-icon.png);background-size:contain;"></div>';
    const markerIconSrc = "./assets/icons/marker-icon.svg";
    const markerSelectedIconSrc = "./assets/icons/marker-selected-icon.svg";
    const [cluster, setCluster] = useState<ClusterType | null>(null);
    const [, setSelected] = useState<naver.maps.Marker | undefined>(undefined);

    const clusterIcon: HtmlIcon = {
        content: clusterIconImg,
        anchor: { x: 20, y: 20 },
        size: { width: 40, height: 40 },
    };
    const markerIcon: HtmlIcon = {
        content: `<img src="${markerIconSrc}" width="28" height="35" />`,
        anchor: { x: 21, y: 27 },
        size: { width: 28, height: 35 },
    };
    const markerSelectedIcon: HtmlIcon = {
        content: `<img src="${markerSelectedIconSrc}" width="39" height="51" />`,
        anchor: { x: 27, y: 43 },
        size: { width: 39, height: 51 },
    };

    const resetSelected = () =>
        setSelected((prev) => {
            prev?.setIcon(markerIcon);
            prev?.setZIndex(1);
            return undefined;
        });

    const addCluster = (
        map: NaverMap,
        data: RoomDataType[],
        count: number,
        clickHandler: (room: RoomDataType) => void,
    ) => {
        if (window.naver) {
            const MarkerClustering = markerCluster(window.naver);

            const markers = data.map((room) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(
                        room.latitude,
                        room.longitude,
                    ),
                    title: room.name,
                    icon: markerIcon,
                    zIndex: 1,
                });
                marker.addListener("click", () => {
                    clickHandler(room);
                    setSelected((prev) => {
                        prev?.setIcon(markerIcon);
                        prev?.setZIndex(1);
                        marker.setIcon(markerSelectedIcon);
                        marker.setZIndex(2);
                        return marker;
                    });
                });

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

    return { addCluster, resetCluster, resetSelected };
};

export default useCluster;
