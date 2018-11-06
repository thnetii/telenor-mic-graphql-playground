import { Store, ReducersMapObject, Reducer, Middleware, StoreEnhancer, combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { History } from 'history';
import { routerMiddleware, connectRouter, } from 'connected-react-router';

import { GlobalState, GlobalAction, GlobalAppState, GlobalAppAction } from './types';

import { CounterReducer } from './reducers/Counter';
import { AppNavBarReducer } from './reducers/AppNavBar';

export default (history: History, initialState?: GlobalState): Store<GlobalState, GlobalAction> => {
  const reducerMap: ReducersMapObject<GlobalAppState, GlobalAppAction> = {
    counter: CounterReducer,
    appNavBar: AppNavBarReducer
  };

  const middleware: Middleware[] = [];
  if (typeof logger !== 'undefined') {
    middleware.push(logger);
  }
  middleware.push(thunk);
  middleware.push(routerMiddleware(history));

  const enhancers: StoreEnhancer[] = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
    enhancers.push((window as any).devToolsExtension() as StoreEnhancer);
  }

  const rootReducer = connectRouter(history)(
    combineReducers(reducerMap)
  ) as Reducer<GlobalState, GlobalAction>;

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
};
