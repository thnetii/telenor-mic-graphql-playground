import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { GlobalState } from "../types";
import { CounterState } from "../types/counter.types";

import { CounterAnyAction, counterActions } from "../actions/counter.actions";

import CounterPageUnconnected from "../pages/counter.page";

const CounterPage = connect(
  (state: GlobalState): CounterState => state.counter,
  (dispatch: Dispatch<CounterAnyAction>) => bindActionCreators(counterActions, dispatch)
)(CounterPageUnconnected);

export default CounterPage;
