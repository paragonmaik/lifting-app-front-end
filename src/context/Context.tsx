import { ReactNode, createContext, useState } from 'react';

type ContextType = {
  curProgramPos: number;
  setCurProgramPos: (curProgramPos: number) => void;
};
type ContextProps = {
  children: ReactNode;
};

export const Context = createContext({} as ContextType);

export function Provider({ children }: ContextProps) {
  const [curProgramPos, setCurProgramPos] = useState<number>(0);

  return (
    <Context.Provider
      value={{
        curProgramPos,
        setCurProgramPos,
      }}
    >
      {children}
    </Context.Provider>
  );
}
