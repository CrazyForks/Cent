import { create, type StateCreator } from "zustand";
import {
    createJSONStorage,
    type PersistOptions,
    persist,
} from "zustand/middleware";
import { getBrowserLang, type LocaleName } from "@/locale/utils";

type State = {
    locale: LocaleName;
    autoLocateWhenAddBill?: boolean;
    enterAddBillWhenReduceMotionChanged?: boolean;
};
type Store = State;

type Persist<S> = (
    config: StateCreator<S>,
    options: PersistOptions<S>,
) => StateCreator<S>;

export const usePreferenceStore = create<Store>()(
    (persist as Persist<Store>)(
        (set, get) => {
            return {
                locale: getBrowserLang(),
                autoLocateWhenAddBill: false,
            };
        },
        {
            name: "preference-store",
            storage: createJSONStorage(() => localStorage),
            version: 0,
        },
    ),
);

export const usePreference = <K extends keyof Store>(
    key: K,
): [Store[K], (value: Store[K]) => void] => {
    const value = usePreferenceStore((state) => state[key]);
    const setValue = (val: Store[K]) => {
        usePreferenceStore.setState({ [key]: val } as Partial<Store>);
    };
    return [value, setValue];
};
