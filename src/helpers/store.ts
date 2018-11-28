import { Middleware, StoreEnhancer, DeepPartial, createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import { history } from './history';

import { GlobalState } from '../types';
import { rootReducer } from '../reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState: DeepPartial<GlobalState> | undefined = (window as any).initialReduxState;

const logger = /*isDevelopment ? require('redux-logger').logger : */undefined;

const middlewares = (() => {

  const middleware: Middleware[] = [];

  if (typeof logger !== 'undefined') {
    middleware.push(logger);
  }
  middleware.push(routerMiddleware(history));

  return middleware;
})();

const enhancers = (() => {
  // tslint:disable-next-line:no-shadowed-variable
  const enhancers: StoreEnhancer[] = [];
  if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
    enhancers.push((window as any).devToolsExtension() as StoreEnhancer);
  }
  return enhancers;
})();

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares), ...enhancers)
);
