import { atom } from "recoil";

export const schoolIdAtom = atom<string>({
    key: "schoolId",
    default: "0",
});