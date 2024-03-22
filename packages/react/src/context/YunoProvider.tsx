'use client'

import { useEffect, useState } from "react";
import { loadYunoScript } from "@miguel-yuno/js";
import { YunoContext, YunoState } from "./YunoContext";

type YunoInitializedProps = {
  publicApiKey: string
}

type Props = {
  children: React.ReactNode;
  publicApiKey: string;
};

export function YunoProvider(props: Props) {
  const { children, publicApiKey } = props;
  const [value, setValue] = useState<YunoState | null>(null)

  useEffect(() => {
    (async () => {
      const Yuno = await loadYunoScript()
      const yuno = Yuno.initialize(publicApiKey)

      setValue({
        publicApiKey,
        yuno
      })
    })()
   
  }, [])

  return (
    <YunoContext.Provider value={value}>
      {children}
    </YunoContext.Provider>
  );
}
