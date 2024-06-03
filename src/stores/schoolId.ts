import { atom } from "recoil";

export const schoolIdAtom = atom<string>({
    key: "search.schoolId",
    default: "순천대학교",
});
