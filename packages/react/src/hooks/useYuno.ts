'use client'

import { useContext } from "react";
import { YunoContext } from "../context/YunoContext";

export const useYuno = () => {
  const yunoState = useContext(YunoContext)

  if (!yunoState) return yunoState

  return yunoState.yuno
};
