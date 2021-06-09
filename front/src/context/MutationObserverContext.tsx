import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';
import { FilterType } from '@/types/apiType';

type TargetType = {
  filter: FilterType;
  articleId: string;
  isSave: boolean;
};

export const MutationObserverTargetContext = createContext<TargetType | null>(null);
const MutationObserverSetTargetContext = createContext<Dispatch<
  SetStateAction<TargetType | null>
> | null>(null);

export default function MutationObserverProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<TargetType | null>(null);

  return (
    <MutationObserverTargetContext.Provider value={target}>
      <MutationObserverSetTargetContext.Provider value={setTarget}>
        {children}
      </MutationObserverSetTargetContext.Provider>
    </MutationObserverTargetContext.Provider>
  );
}

export function useMutationObserverTarget() {
  const target = useContext(MutationObserverTargetContext);
  if (target === undefined) throw new Error('Cannot find MutationObserverTargetProvider');
  return target;
}

export function useMutationObserverSetTarget() {
  const setTarget = useContext(MutationObserverSetTargetContext);
  if (!setTarget) throw new Error('Cannot find MutationObserverSetTargetProvider');
  return setTarget;
}
