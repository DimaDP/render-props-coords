import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_TODOS = 'SET_TODOS';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });
export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS, payload: todos });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const selectTodos = (state: RootState) => state.todos;

// Initial state
export interface RootState {
  loading: boolean;
  message: string;
  todos: Todo[];
}

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state: RootState = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    case SET_TODOS:
      return {
        ...state,
        loading: false,
        message: 'TODOS Loaded Successfully',
        todos: action.payload,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
