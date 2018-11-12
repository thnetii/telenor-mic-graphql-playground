import { Reducer } from "redux";

import { CounterState, initialState } from "../types/counter.types";
import { CounterAnyAction } from "../actions/counter.actions";
import { COUNTER_RESET, COUNTER_ADD } from "../constants/counter.constants";

const counterReducer: Reducer<CounterState, CounterAnyAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case COUNTER_ADD:
        return { ...state, count: state.count + action.payload };
      case COUNTER_RESET:
        return { ...state, count: initialState.count };
      default:
        return state;
    }
  };

export default counterReducer;
