import { createContext } from "react";
import { Yuno, YunoInstance } from "../types";

export type YunoState = { publicApiKey: string; yuno: YunoInstance }

export const YunoContext = createContext<YunoState | null>(null);
