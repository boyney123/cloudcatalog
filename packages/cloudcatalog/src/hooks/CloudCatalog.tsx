import React, { useContext, ReactNode } from "react";
import { CatalogConfig } from "@/types/index";

import defaultConfig from "../../cloudcatalog.config";

export const Context = React.createContext<CatalogConfig | null>(defaultConfig);

export function AWSCatalogContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Context.Provider value={defaultConfig}>{children}</Context.Provider>;
}

//@ts-ignore
export const useCatalogConfig = () => useContext<CatalogConfig>(Context);
