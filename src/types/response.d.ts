/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomDataType } from "./room";

export interface ResponseType {
    code: number;
    message: string;
    result: { count: number; rows: RoomDataType[] } | any;
}
