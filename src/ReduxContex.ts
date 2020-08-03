import { createContext } from 'react';
import { Store, AnyAction } from 'redux';
import { RootState } from './store';

export const ReduxContext = createContext<Store<RootState, AnyAction>>(null as any);
