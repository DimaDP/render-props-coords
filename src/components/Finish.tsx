import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';

import { AnyAction } from 'redux';
import {
  isLoading, finishLoading, RootState, startLoading,
} from '../store';
import { ReduxContext } from '../ReduxContex';

type Props = {
  title: string;
  message: string;
};

const useSelector = (selector: (state: RootState) => any) => {
  const store = useContext(ReduxContext);
  const [stateSlice, setStateSlice] = useState();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      setStateSlice(selector(state));
    });

    return () => unsubscribe();
  }, [store, setStateSlice]);

  return stateSlice;
};

const useAction = (actionCreator: (...args: any[]) => AnyAction) => {
  const store = useContext(ReduxContext);

  return (...args: any[]) => {
    const action = actionCreator(...args);

    store.dispatch(action);
  };
};

const useLoading = (): [boolean, { startLoading: Function; finishLoading: Function }] => {
  const loading = useSelector(isLoading) as any as boolean;
  const dispatchStartLoading = useAction(startLoading);
  const dispatchFinishLoading = useAction(finishLoading);

  return [
    loading,
    {
      startLoading: dispatchStartLoading,
      finishLoading: dispatchFinishLoading,
    },
  ];
};

export const Finish: React.FC<Props> = ({ title, message }) => {
  const [loading, actions] = useLoading();

  const handleClick = useCallback(
    () => actions.finishLoading(message),
    [actions.finishLoading, message],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!loading}
    >
      {title}
    </button>
  );
};
