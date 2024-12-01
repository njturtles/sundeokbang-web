import { atom } from "recoil";

export const overlayAtom = atom<boolean>({
    key: "search.overlay",
    default: false,
});
