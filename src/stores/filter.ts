import { depositLimit, monthlyLimit } from "@/constants/filter";
import { IFilter } from "@/types/filter";
import { atom } from "recoil";

const filterAtom = atom<IFilter>({
    key: "search.filter",
    default: { deposit: depositLimit, monthly: monthlyLimit },
});

export { filterAtom };
