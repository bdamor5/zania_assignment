import React, { createContext, useState } from "react";
import { SortedListInterface } from "../Interfaces/sortedListInterface";

interface ContextType {
  listState: SortedListInterface[];
  setListState: React.Dispatch<React.SetStateAction<SortedListInterface[]>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [listState, setListState] = useState<SortedListInterface[]>([]);
  return (
    <Context.Provider value={{ listState, setListState }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
