import { ReducersMapObject, combineReducers } from "redux";

import { connectRouter } from "connected-react-router";

import { GlobalState } from "../types";
import { history } from "../helpers/history";

import counterReducer from "./counter.reducer";
import micapiReducer from "./micapi.reducer";

const reducersMap: ReducersMapObject<GlobalState> = {
  counter: counterReducer,
  micapi: micapiReducer,
  router: connectRouter(history)
};

export const rootReducer = combineReducers(reducersMap);
