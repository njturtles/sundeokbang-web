type Props = {
    width?: string;
    height?: string;
    center: { lat: number; lng: number };
    apiKey: string;
    apiSecret: string;
    level?: number;
    markers?: string;
};

const useStaticMapURI = (props: Props) => {
    const { width, height, center, apiKey, level, apiSecret, markers } = props;
    const uri = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=${width || 300}&h=${height || 300}&markers=${markers}&center=${center.lng},${center.lat}&level=${level || 16}&X-NCP-APIGW-API-KEY-ID=${apiKey}&X-NCP-APIGW-API-KEY=${apiSecret}`;
    return uri;
};

export default useStaticMapURI;
