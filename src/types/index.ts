import { Store, ReducersMapObject, Reducer, Middleware, StoreEnhancer, combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { History } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { CounterState } from './Counter';
import * as Counter from '../reducers/Counter';
import { CounterAction } from 'src/actions/Counter';

export interface GlobalState {
  counter: CounterState;
}

type GlobalAction = CounterAction;

export function configureStore(history: History, initialState?: GlobalState): Store<GlobalState, GlobalAction> {
  const reducerMap: ReducersMapObject<GlobalState, GlobalAction> = {
    counter: Counter.counterReducer
  };

  const middleware: Middleware[] = [
    routerMiddleware(history)
  ];

  const enhancers: StoreEnhancer[] = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
    enhancers.push((window as any).devToolsExtension() as StoreEnhancer);
  }

  const rootReducer: Reducer<GlobalState, GlobalAction> = connectRouter(history)(
    combineReducers(reducerMap)
  );

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
};
