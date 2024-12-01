import { HtmlIcon } from "./navermaps";

interface MarkerClusterOptions {
    map: naver.maps;
    markers: naver.maps.Marker[];
    disableClickZoom: boolean;
    minClusterSize: number;
    maxZoom: number;
    gridSize: number;
    icons: HtmlIcon[] | ImageIcon[];
    indexGenerator: number[];
    averageCenter: boolean;
    stylingFunction: () => void;
}
