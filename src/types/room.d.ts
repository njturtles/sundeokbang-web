export interface ThumbnailFile {
    _id: number;
    createdAt: string | null;
    deletedAt: string | null;
    updatedAt: string | null;
    url: string;
}

export interface RoomDataType {
    _id: number;
    name: string;
    address: string;
    contracttype: string;
    deposit: number;
    cost: number;
    term: string;
    maintenanceCost: number;
    commonArea: string;
    type: string;
    exclusiveArea: number;
    parking: boolean;
    heatingSystem: string;
    furniture: string;
    appliances: string;
    prevention: string;
    etc: string;
    detail: string;
    phone: string;
    owner: string;
    latitude: number;
    longitude: number;
    files: ThumbnailFile[];
    createdAt: string;
    updatedAt: string;
    distance?: number;
    favorited: boolean;
}
