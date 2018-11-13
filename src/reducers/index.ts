import { ReducersMapObject, combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import { GlobalState } from '../types';
import { history } from '../helpers/history';

import counterReducer from './counter.reducer';
import micstackReducer from './micstack.reducer';
import { MicApiState } from '../types/micapi.types';

const reducersMap: ReducersMapObject<GlobalState> = {
  counter: counterReducer,
  micapi: (s: MicApiState) => s || {},
  micstack: micstackReducer,
  router: connectRouter(history)
};

export const rootReducer = combineReducers(reducersMap);
