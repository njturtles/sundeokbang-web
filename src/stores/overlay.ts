import { atom } from "recoil";

const overlayAtom = atom<boolean>({ key: "search.overlay", default: false });

export { overlayAtom };
