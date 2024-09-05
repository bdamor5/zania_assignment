import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { SortedListInterface } from "../Interfaces/sortedListInterface";

interface ContextType {
  listState: SortedListInterface[];
  setListState: Dispatch<SetStateAction<SortedListInterface[]>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [listState, setListState] = useState<SortedListInterface[]>([]);
  return (
    <Context.Provider value={{ listState, setListState }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
