import { ReducersMapObject, combineReducers } from 'redux';

import { connectRouter } from "connected-react-router";

import { GlobalState } from '../types';
import { history } from '../helpers/history';

import counterReducer from './counter.reducer';

const reducersMap: ReducersMapObject<GlobalState> = {
  counter: counterReducer,
  router: connectRouter(history)
};

export const rootReducer = combineReducers(reducersMap);
