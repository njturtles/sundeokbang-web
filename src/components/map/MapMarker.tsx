/* eslint-disable prefer-const */
import { NaverMap, Marker, MarkerOptions, ImageIcon } from "@/types/navermaps";
import { useEffect } from "react";

type Props = {
    mapRef: NaverMap | null;
    pos: { lat: number; lng: number };
    title?: string;
    onClick?: () => void;
};

const MapMarker = ({ mapRef, pos, title, onClick }: Props) => {
    // const [marker, setMarker] = useState<Marker | null>(null);

    useEffect(() => {
        let marker: Marker | null = null;
        if (mapRef) {
            const markerIcon: ImageIcon = {
                url: "./assets/icons/marker-icon.svg",
                anchor: new naver.maps.Point(12, 24),
                size: new naver.maps.Size(24, 24),
            };

            const markerOptions: MarkerOptions = {
                map: mapRef,
                position: new naver.maps.LatLng(pos.lat, pos.lng),
                icon: markerIcon,
            };

            marker = new naver.maps.Marker(markerOptions);
            if (marker) {
                title && marker.setTitle(title);
                onClick &&
                    naver.maps.Event.addListener(marker, "click", onClick);
            }
        }
    }, [mapRef]);
    return null;
};

export default MapMarker;
